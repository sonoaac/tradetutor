"""Payment service for Stripe integration"""
from datetime import datetime
import stripe
from flask import current_app
from app.extensions import db
from app.models.billing import BillingAccount, BillingSubscription, BillingEvent
from app.models.payment import Payment
from app.models.user import User


class PaymentService:
    """Handles Stripe payment processing and subscription management"""
    
    # Price IDs for different plans (set these in your environment or Stripe dashboard)
    PRICE_IDS = {
        'starter_monthly': 'price_starter_monthly',  # Replace with actual Stripe price ID
        'starter_yearly': 'price_starter_yearly',
        'pro_monthly': 'price_pro_monthly',
        'pro_yearly': 'price_pro_yearly',
    }
    
    def __init__(self):
        self.stripe = stripe
    
    def _get_stripe_key(self):
        """Get Stripe secret key from config"""
        key = current_app.config.get('STRIPE_SECRET_KEY')
        if key:
            self.stripe.api_key = key
        return key
    
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
        
        # Get price ID
        price_key = f'{plan}_{interval}ly'
        price_id = self.PRICE_IDS.get(price_key)
        
        if not price_id:
            raise ValueError(f'Invalid plan or interval: {plan} {interval}')
        
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
    
    def get_user_subscription(self, user_id: str):
        """Get active subscription for user"""
        return BillingSubscription.query.filter_by(
            user_id=user_id,
            provider='stripe'
        ).filter(
            BillingSubscription.status.in_(['active', 'trialing'])
        ).first()
    
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
