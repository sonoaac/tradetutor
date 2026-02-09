"""Payment service for Stripe integration"""
from datetime import datetime, timedelta
from decimal import Decimal
import requests
import stripe
from flask import current_app
from app.extensions import db
from app.models.billing import BillingAccount, BillingSubscription, BillingEvent
from app.models.payment import Payment
from app.models.portfolio import Portfolio
from app.models.user import User
from app.services.entitlements import get_starting_simcash


class PaymentService:
    """Handles Stripe payment processing and subscription management"""

    # Back-compat mapping (actual values must be provided via env vars/config)
    PRICE_IDS = {
        'starter_monthly': None,
        'starter_yearly': None,
        'pro_monthly': None,
        'pro_yearly': None,
    }
    
    def __init__(self):
        self.stripe = stripe
    
    def _get_stripe_key(self):
        """Get Stripe secret key from config"""
        key = current_app.config.get('STRIPE_SECRET_KEY')
        if key:
            self.stripe.api_key = key
        return key

    def _get_stripe_price_id(self, plan: str, interval: str) -> str:
        """Resolve Stripe Price ID for a subscription plan.

        Expects env vars (via config):
        - STRIPE_PRICE_STARTER_MONTHLY / STRIPE_PRICE_STARTER_YEARLY
        - STRIPE_PRICE_PRO_MONTHLY / STRIPE_PRICE_PRO_YEARLY
        """
        interval = (interval or '').lower()
        plan = (plan or '').lower()

        if interval not in {'month', 'year'}:
            raise ValueError(f'Invalid interval: {interval}')
        if plan not in {'starter', 'pro'}:
            raise ValueError(f'Invalid plan: {plan}')

        key = f'STRIPE_PRICE_{plan.upper()}_{"MONTHLY" if interval == "month" else "YEARLY"}'
        price_id = current_app.config.get(key)

        if not price_id:
            raise ValueError(
                f'Missing Stripe Price ID. Set {key} in your environment.'
            )

        return price_id

    def _get_paypal_access_token(self):
        """Get PayPal access token using client credentials"""
        client_id = current_app.config.get('PAYPAL_CLIENT_ID')
        secret = current_app.config.get('PAYPAL_SECRET')
        api_base = current_app.config.get('PAYPAL_API_BASE')

        if not client_id or not secret:
            raise ValueError('PayPal credentials are not configured')

        response = requests.post(
            f"{api_base}/v1/oauth2/token",
            auth=(client_id, secret),
            headers={
                'Accept': 'application/json',
                'Accept-Language': 'en_US'
            },
            data={'grant_type': 'client_credentials'},
            timeout=15
        )

        if response.status_code != 200:
            raise ValueError(f"PayPal auth failed: {response.text}")

        return response.json().get('access_token')

    def _paypal_request(self, method: str, path: str, payload=None, headers=None):
        """Make an authenticated PayPal API request"""
        api_base = current_app.config.get('PAYPAL_API_BASE')
        token = self._get_paypal_access_token()

        request_headers = {
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {token}"
        }
        if headers:
            request_headers.update(headers)

        response = requests.request(
            method,
            f"{api_base}{path}",
            json=payload,
            headers=request_headers,
            timeout=20
        )

        if response.status_code >= 400:
            raise ValueError(f"PayPal API error: {response.text}")

        return response.json() if response.text else {}

    def _parse_paypal_datetime(self, value: str):
        if not value:
            return None
        try:
            if value.endswith('Z'):
                value = value.replace('Z', '+00:00')
            return datetime.fromisoformat(value)
        except ValueError:
            return None

    def _get_paypal_plan_id(self, plan: str, interval: str):
        key_map = {
            ('starter', 'month'): 'PAYPAL_PLAN_STARTER_MONTHLY',
            ('starter', 'year'): 'PAYPAL_PLAN_STARTER_YEARLY',
            ('pro', 'month'): 'PAYPAL_PLAN_PRO_MONTHLY',
            ('pro', 'year'): 'PAYPAL_PLAN_PRO_YEARLY'
        }
        env_key = key_map.get((plan, interval))
        if not env_key:
            raise ValueError('Invalid plan or interval')

        plan_id = current_app.config.get(env_key)
        if not plan_id:
            raise ValueError(f'Missing PayPal plan ID for {plan} {interval}')

        return plan_id

    def get_paypal_config(self):
        """Return PayPal client config and plan IDs for UI"""
        return {
            'clientId': current_app.config.get('PAYPAL_CLIENT_ID'),
            'plans': {
                'starter': {
                    'month': current_app.config.get('PAYPAL_PLAN_STARTER_MONTHLY'),
                    'year': current_app.config.get('PAYPAL_PLAN_STARTER_YEARLY')
                },
                'pro': {
                    'month': current_app.config.get('PAYPAL_PLAN_PRO_MONTHLY'),
                    'year': current_app.config.get('PAYPAL_PLAN_PRO_YEARLY')
                }
            }
        }

    def get_paypal_subscription(self, subscription_id: str):
        """Fetch PayPal subscription details"""
        return self._paypal_request('GET', f"/v1/billing/subscriptions/{subscription_id}")

    def activate_paypal_subscription(self, user_id: str, plan: str, interval: str, subscription_id: str):
        """Store PayPal subscription data after approval"""
        subscription = self.get_paypal_subscription(subscription_id)

        payer_id = None
        subscriber = subscription.get('subscriber', {})
        payer_id = subscriber.get('payer_id')

        if payer_id:
            billing_account = BillingAccount.query.filter_by(
                user_id=user_id,
                provider='paypal'
            ).first()

            if billing_account:
                billing_account.provider_customer_id = payer_id
            else:
                billing_account = BillingAccount(
                    user_id=user_id,
                    provider='paypal',
                    provider_customer_id=payer_id
                )
                db.session.add(billing_account)

        status = subscription.get('status', 'pending').lower()
        start_time = self._parse_paypal_datetime(subscription.get('start_time'))
        billing_info = subscription.get('billing_info', {})
        next_billing_time = self._parse_paypal_datetime(billing_info.get('next_billing_time'))

        billing_sub = BillingSubscription.query.filter_by(
            provider_subscription_id=subscription_id
        ).first()

        if not billing_sub:
            billing_sub = BillingSubscription(
                user_id=user_id,
                provider='paypal',
                plan=plan,
                provider_subscription_id=subscription_id,
                status=status,
                current_period_start=start_time,
                current_period_end=next_billing_time
            )
            db.session.add(billing_sub)
        else:
            billing_sub.status = status
            billing_sub.current_period_start = start_time
            billing_sub.current_period_end = next_billing_time

        user = User.query.get(user_id)
        if user:
            user.tier = plan
            user.tier_source = 'paypal'
            user.tier_expires_at = next_billing_time
            user.is_premium = True
            user.premium_until = next_billing_time

        last_payment = billing_info.get('last_payment')
        if last_payment:
            amount_value = last_payment.get('amount', {}).get('value')
            amount_currency = last_payment.get('amount', {}).get('currency_code', 'USD')
            transaction_id = last_payment.get('transaction_id')

            if amount_value and transaction_id:
                payment = Payment(
                    user_id=user_id,
                    amount=amount_value,
                    currency=amount_currency,
                    status='completed',
                    provider='paypal',
                    transaction_id=transaction_id,
                    subscription_id=subscription_id,
                    plan_type=f'{plan}_{interval}'
                )
                db.session.add(payment)

        db.session.commit()
        return subscription

    def cancel_paypal_subscription(self, user_id: str):
        """Cancel PayPal subscription for user"""
        billing_sub = BillingSubscription.query.filter_by(
            user_id=user_id,
            provider='paypal'
        ).filter(
            BillingSubscription.status.in_(['active', 'trialing', 'suspended'])
        ).first()

        if not billing_sub:
            raise ValueError('No active PayPal subscription found')

        self._paypal_request(
            'POST',
            f"/v1/billing/subscriptions/{billing_sub.provider_subscription_id}/cancel",
            payload={'reason': 'User requested cancellation'}
        )

        billing_sub.status = 'canceled'
        billing_sub.canceled_at = datetime.utcnow()

        user = User.query.get(user_id)
        if user:
            user.tier = 'free'
            user.tier_source = 'none'
            user.tier_expires_at = None
            user.is_premium = False
            user.premium_until = None
            user.rtt_enabled = False

        db.session.commit()

        return {'message': 'Subscription canceled'}
    
    def create_checkout_session(self, user_id: str, email: str, plan: str, interval: str = 'month'):
        """Create a Stripe Checkout session for subscription"""
        self._get_stripe_key()
        
        # Get or create Stripe customer
        billing_account = BillingAccount.query.filter_by(
            user_id=user_id,
            provider='stripe'
        ).first()
        
        if billing_account:
            customer_id = billing_account.provider_customer_id
        else:
            # Create new Stripe customer
            customer = self.stripe.Customer.create(
                email=email,
                metadata={'user_id': user_id}
            )
            customer_id = customer.id
            
            # Save billing account
            billing_account = BillingAccount(
                user_id=user_id,
                provider='stripe',
                provider_customer_id=customer_id
            )
            db.session.add(billing_account)
            db.session.commit()
        
        price_id = self._get_stripe_price_id(plan=plan, interval=interval)
        
        # Create checkout session
        frontend_url = current_app.config.get('FRONTEND_URL', 'http://localhost:5173')
        
        session = self.stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f'{frontend_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{frontend_url}/payment/cancel',
            metadata={
                'user_id': user_id,
                'plan': plan
            }
        )
        
        return session
    
    def create_portal_session(self, user_id: str):
        """Create a Stripe customer portal session"""
        self._get_stripe_key()
        
        billing_account = BillingAccount.query.filter_by(
            user_id=user_id,
            provider='stripe'
        ).first()
        
        if not billing_account:
            raise ValueError('No billing account found')
        
        frontend_url = current_app.config.get('FRONTEND_URL', 'http://localhost:5173')
        
        session = self.stripe.billing_portal.Session.create(
            customer=billing_account.provider_customer_id,
            return_url=f'{frontend_url}/subscription',
        )
        
        return session

    def create_payment_intent(self, user_id: str, amount: int, currency: str = 'usd', metadata: dict | None = None):
        """Create a Stripe PaymentIntent.

        Notes:
        - Amount is in the smallest currency unit (e.g. cents for USD).
        - This endpoint is provided for future one-time purchases/top-ups.
        """
        self._get_stripe_key()

        if amount <= 0:
            raise ValueError('Invalid amount')

        intent = self.stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={'enabled': True},
            metadata={
                'user_id': user_id,
                **(metadata or {})
            }
        )
        return intent

    def create_setup_intent(self, user_id: str, metadata: dict | None = None):
        """Create a Stripe SetupIntent to save a payment method for future use."""
        self._get_stripe_key()
        intent = self.stripe.SetupIntent.create(
            payment_method_types=['card'],
            metadata={
                'user_id': user_id,
                **(metadata or {})
            }
        )
        return intent
    
    def get_user_subscription(self, user_id: str, provider: str | None = None):
        """Get active subscription for user"""
        query = BillingSubscription.query.filter_by(user_id=user_id)

        if provider:
            query = query.filter_by(provider=provider)
        else:
            query = query.filter(BillingSubscription.provider.in_(['paypal', 'stripe']))

        return query.filter(
            BillingSubscription.status.in_(['active', 'trialing'])
        ).order_by(BillingSubscription.created_at.desc()).first()
    
    def verify_webhook(self, payload, sig_header):
        """Verify and parse Stripe webhook"""
        self._get_stripe_key()
        
        webhook_secret = current_app.config.get('STRIPE_WEBHOOK_SECRET')
        if not webhook_secret:
            raise ValueError('No webhook secret configured')
        
        event = self.stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        
        return event
    
    def handle_checkout_completed(self, session):
        """Handle successful checkout session"""
        user_id = session['metadata'].get('user_id')
        plan = session['metadata'].get('plan')
        subscription_id = session.get('subscription')
        customer_id = session.get('customer')
        
        if not user_id or not plan:
            current_app.logger.error('Missing user_id or plan in checkout session')
            return
        
        # Get subscription details from Stripe
        subscription = self.stripe.Subscription.retrieve(subscription_id)
        
        # Create or update BillingSubscription
        billing_sub = BillingSubscription.query.filter_by(
            provider_subscription_id=subscription_id
        ).first()
        
        if not billing_sub:
            billing_sub = BillingSubscription(
                user_id=user_id,
                provider='stripe',
                plan=plan,
                provider_subscription_id=subscription_id,
                status=subscription['status'],
                current_period_start=datetime.fromtimestamp(subscription['current_period_start']),
                current_period_end=datetime.fromtimestamp(subscription['current_period_end'])
            )
            db.session.add(billing_sub)
        
        # Update user tier
        user = User.query.get(user_id)
        if user:
            user.tier = plan
            user.tier_source = 'stripe'
            user.tier_expires_at = datetime.fromtimestamp(subscription['current_period_end'])
            user.is_premium = True
            user.premium_until = datetime.fromtimestamp(subscription['current_period_end'])

            # Ensure the user has starting SimCash after upgrade.
            # Grant only if the portfolio is missing or their balance is currently 0.
            starting = Decimal(f"{int(get_starting_simcash(user))}.00")
            portfolio = Portfolio.query.filter_by(user_id=user.id).first()
            if not portfolio:
                portfolio = Portfolio(user_id=user.id, balance=starting)
                db.session.add(portfolio)
            else:
                try:
                    if Decimal(str(portfolio.balance)) <= Decimal('0'):
                        portfolio.balance = starting
                except Exception:
                    portfolio.balance = starting
        
        # Create payment record
        amount = session.get('amount_total', 0) / 100  # Convert cents to dollars
        payment = Payment(
            user_id=user_id,
            amount=amount,
            currency=session.get('currency', 'usd').upper(),
            status='completed',
            provider='stripe',
            transaction_id=session['id'],
            subscription_id=subscription_id,
            plan_type=plan
        )
        db.session.add(payment)
        
        db.session.commit()
        current_app.logger.info(f'Checkout completed for user {user_id}, plan {plan}')
    
    def handle_subscription_updated(self, subscription):
        """Handle subscription update"""
        subscription_id = subscription['id']
        
        billing_sub = BillingSubscription.query.filter_by(
            provider_subscription_id=subscription_id
        ).first()
        
        if billing_sub:
            billing_sub.status = subscription['status']
            billing_sub.current_period_start = datetime.fromtimestamp(subscription['current_period_start'])
            billing_sub.current_period_end = datetime.fromtimestamp(subscription['current_period_end'])
            billing_sub.cancel_at_period_end = subscription.get('cancel_at_period_end', False)
            
            # Update user tier
            user = User.query.get(billing_sub.user_id)
            if user:
                if subscription['status'] in ['active', 'trialing']:
                    user.tier_expires_at = datetime.fromtimestamp(subscription['current_period_end'])
                    user.premium_until = datetime.fromtimestamp(subscription['current_period_end'])
            
            db.session.commit()
            current_app.logger.info(f'Subscription updated: {subscription_id}')
    
    def handle_subscription_deleted(self, subscription):
        """Handle subscription cancellation/deletion"""
        subscription_id = subscription['id']
        
        billing_sub = BillingSubscription.query.filter_by(
            provider_subscription_id=subscription_id
        ).first()
        
        if billing_sub:
            billing_sub.status = 'canceled'
            billing_sub.canceled_at = datetime.utcnow()
            
            # Downgrade user to free tier
            user = User.query.get(billing_sub.user_id)
            if user:
                user.tier = 'free'
                user.tier_source = 'none'
                user.tier_expires_at = None
                user.is_premium = False
                user.premium_until = None
                user.rtt_enabled = False
            
            db.session.commit()
            current_app.logger.info(f'Subscription deleted: {subscription_id}')
    
    def handle_payment_succeeded(self, invoice):
        """Handle successful payment"""
        subscription_id = invoice.get('subscription')
        customer_id = invoice.get('customer')
        
        if subscription_id:
            billing_sub = BillingSubscription.query.filter_by(
                provider_subscription_id=subscription_id
            ).first()
            
            if billing_sub:
                # Create payment record
                amount = invoice.get('amount_paid', 0) / 100
                payment = Payment(
                    user_id=billing_sub.user_id,
                    amount=amount,
                    currency=invoice.get('currency', 'usd').upper(),
                    status='completed',
                    provider='stripe',
                    transaction_id=invoice['id'],
                    subscription_id=subscription_id,
                    plan_type=billing_sub.plan
                )
                db.session.add(payment)
                db.session.commit()
                current_app.logger.info(f'Payment succeeded for subscription {subscription_id}')
    
    def handle_payment_failed(self, invoice):
        """Handle failed payment"""
        subscription_id = invoice.get('subscription')
        
        if subscription_id:
            billing_sub = BillingSubscription.query.filter_by(
                provider_subscription_id=subscription_id
            ).first()
            
            if billing_sub:
                billing_sub.status = 'past_due'
                db.session.commit()
                current_app.logger.warning(f'Payment failed for subscription {subscription_id}')
    
    def cancel_subscription(self, user_id: str):
        """Cancel user's subscription at period end"""
        self._get_stripe_key()
        
        billing_sub = self.get_user_subscription(user_id)
        
        if not billing_sub:
            raise ValueError('No active subscription found')
        
        # Cancel at period end in Stripe
        subscription = self.stripe.Subscription.modify(
            billing_sub.provider_subscription_id,
            cancel_at_period_end=True
        )
        
        # Update local record
        billing_sub.cancel_at_period_end = True
        db.session.commit()
        
        return {
            'success': True,
            'message': 'Subscription will be canceled at the end of the billing period',
            'periodEnd': billing_sub.current_period_end.isoformat()
        }

    def _paypal_plan_to_tier(self, plan_id: str):
        plan_map = {
            current_app.config.get('PAYPAL_PLAN_STARTER_MONTHLY'): 'starter',
            current_app.config.get('PAYPAL_PLAN_STARTER_YEARLY'): 'starter',
            current_app.config.get('PAYPAL_PLAN_PRO_MONTHLY'): 'pro',
            current_app.config.get('PAYPAL_PLAN_PRO_YEARLY'): 'pro'
        }
        return plan_map.get(plan_id)

    def verify_paypal_webhook(self, headers: dict, body: dict):
        """Verify PayPal webhook signature"""
        webhook_id = current_app.config.get('PAYPAL_WEBHOOK_ID')
        if not webhook_id:
            raise ValueError('PayPal webhook ID is not configured')

        payload = {
            'auth_algo': headers.get('PayPal-Auth-Algo'),
            'cert_url': headers.get('PayPal-Cert-Url'),
            'transmission_id': headers.get('PayPal-Transmission-Id'),
            'transmission_sig': headers.get('PayPal-Transmission-Sig'),
            'transmission_time': headers.get('PayPal-Transmission-Time'),
            'webhook_id': webhook_id,
            'webhook_event': body
        }

        result = self._paypal_request('POST', '/v1/notifications/verify-webhook-signature', payload=payload)
        status = result.get('verification_status')
        if status != 'SUCCESS':
            raise ValueError('Invalid PayPal webhook signature')

        return True

    def handle_paypal_webhook(self, event: dict):
        """Handle PayPal webhook events"""
        event_type = event.get('event_type')
        resource = event.get('resource', {})

        if event_type in ['BILLING.SUBSCRIPTION.ACTIVATED', 'BILLING.SUBSCRIPTION.UPDATED']:
            subscription_id = resource.get('id')
            plan_id = resource.get('plan_id')
            status = resource.get('status', 'ACTIVE').lower()

            billing_sub = BillingSubscription.query.filter_by(
                provider_subscription_id=subscription_id
            ).first()

            if billing_sub:
                billing_sub.status = status
                billing_sub.current_period_start = self._parse_paypal_datetime(resource.get('start_time'))
                billing_sub.current_period_end = self._parse_paypal_datetime(
                    resource.get('billing_info', {}).get('next_billing_time')
                )

                user = User.query.get(billing_sub.user_id)
                if user and status in ['active', 'trialing']:
                    user.tier = billing_sub.plan
                    user.tier_source = 'paypal'
                    user.tier_expires_at = billing_sub.current_period_end
                    user.is_premium = True
                    user.premium_until = billing_sub.current_period_end

                db.session.commit()

        if event_type in ['BILLING.SUBSCRIPTION.CANCELLED', 'BILLING.SUBSCRIPTION.SUSPENDED', 'BILLING.SUBSCRIPTION.EXPIRED']:
            subscription_id = resource.get('id')
            billing_sub = BillingSubscription.query.filter_by(
                provider_subscription_id=subscription_id
            ).first()

            if billing_sub:
                billing_sub.status = 'canceled'
                billing_sub.canceled_at = datetime.utcnow()

                user = User.query.get(billing_sub.user_id)
                if user:
                    user.tier = 'free'
                    user.tier_source = 'none'
                    user.tier_expires_at = None
                    user.is_premium = False
                    user.premium_until = None
                    user.rtt_enabled = False

                db.session.commit()

        if event_type == 'PAYMENT.SALE.COMPLETED':
            subscription_id = resource.get('billing_agreement_id')
            amount = resource.get('amount', {}).get('total')
            currency = resource.get('amount', {}).get('currency', 'USD')
            transaction_id = resource.get('id')

            if subscription_id and amount and transaction_id:
                billing_sub = BillingSubscription.query.filter_by(
                    provider_subscription_id=subscription_id
                ).first()

                if billing_sub:
                    payment = Payment(
                        user_id=billing_sub.user_id,
                        amount=amount,
                        currency=currency,
                        status='completed',
                        provider='paypal',
                        transaction_id=transaction_id,
                        subscription_id=subscription_id,
                        plan_type=billing_sub.plan
                    )
                    db.session.add(payment)
                    db.session.commit()

    def create_paypal_order(self, user_id: str, plan: str, interval: str = 'month'):
        """Create a PayPal order for one-time payment to start subscription with 3DS"""
        # Define plan prices
        prices = {
            ('starter', 'month'): '9.99',
            ('starter', 'year'): '99.00',
            ('pro', 'month'): '19.99',
            ('pro', 'year'): '199.00'
        }
        
        price = prices.get((plan, interval))
        if not price:
            raise ValueError('Invalid plan or interval')
        
        # Create order via PayPal API with 3DS support
        order_data = {
            'intent': 'CAPTURE',
            'purchase_units': [{
                'amount': {
                    'currency_code': 'USD',
                    'value': price
                },
                'description': f'{plan.capitalize()} Plan - {interval}ly subscription'
            }],
            'payment_source': {
                'card': {
                    'attributes': {
                        'verification': {
                            'method': 'SCA_WHEN_REQUIRED'
                        }
                    }
                }
            }
        }
        
        result = self._paypal_request('POST', '/v2/checkout/orders', payload=order_data)
        return result

    def capture_paypal_order(self, order_id: str, user_id: str):
        """Capture a PayPal order and process subscription"""
        # Capture the order
        result = self._paypal_request('POST', f'/v2/checkout/orders/{order_id}/capture')
        
        # Extract payment details
        purchase_unit = result.get('purchase_units', [{}])[0]
        capture = purchase_unit.get('payments', {}).get('captures', [{}])[0]
        
        if capture.get('status') == 'COMPLETED':
            amount = capture.get('amount', {}).get('value')
            transaction_id = capture.get('id')
            
            # Determine plan from amount
            plan = None
            interval = None
            if amount in ['9.99', '9.990']:
                plan, interval = 'starter', 'month'
            elif amount in ['99.00', '99.0', '99']:
                plan, interval = 'starter', 'year'
            elif amount in ['19.99', '19.990']:
                plan, interval = 'pro', 'month'
            elif amount in ['199.00', '199.0', '199']:
                plan, interval = 'pro', 'year'
            
            if plan and transaction_id:
                # Record the payment
                payment = Payment(
                    user_id=user_id,
                    amount=amount,
                    currency='USD',
                    status='completed',
                    provider='paypal',
                    transaction_id=transaction_id,
                    plan_type=plan
                )
                db.session.add(payment)
                
                # Update user tier
                user = User.query.get(user_id)
                if user:
                    user.tier = plan
                    user.tier_source = 'paypal'
                    user.is_premium = True
                    
                    if plan == 'pro':
                        user.rtt_enabled = True
                    
                    # Set expiration based on interval
                    if interval == 'month':
                        user.premium_until = datetime.utcnow() + timedelta(days=30)
                        user.tier_expires_at = datetime.utcnow() + timedelta(days=30)
                    else:
                        user.premium_until = datetime.utcnow() + timedelta(days=365)
                        user.tier_expires_at = datetime.utcnow() + timedelta(days=365)
                
                db.session.commit()
        
        return result

    def refund_paypal_capture(self, capture_id: str, amount: str = None, currency: str = 'USD'):
        """Refund a PayPal capture (either full or partial amount)"""
        refund_data = {}
        if amount:
            refund_data['amount'] = {
                'value': amount,
                'currency_code': currency
            }
        
        result = self._paypal_request('POST', f'/v2/payments/captures/{capture_id}/refund', payload=refund_data)
        
        if result.get('status') == 'COMPLETED':
            refund_id = result.get('id')
            # Log the refund in database
            current_app.logger.info(f'PayPal refund completed: {refund_id} for capture {capture_id}')
        
        return result
