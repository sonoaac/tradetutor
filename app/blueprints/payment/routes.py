"""Payment routes - Stripe checkout and webhooks"""
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from app.blueprints.payment import payment_bp
from app.services.payment_service import PaymentService
from app.extensions import limiter
import stripe

payment_service = PaymentService()


@payment_bp.route('/config', methods=['GET'])
def get_stripe_config():
    """Get Stripe publishable key"""
    return jsonify({
        'publishableKey': current_app.config.get('STRIPE_PUBLISHABLE_KEY')
    }), 200


@payment_bp.route('/paypal/config', methods=['GET'])
def get_paypal_config():
    """Get PayPal client config and plan IDs"""
    return jsonify(payment_service.get_paypal_config()), 200


@payment_bp.route('/create-checkout-session', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def create_checkout_session():
    """Create a Stripe checkout session for subscription"""
    try:
        data = request.get_json()
        plan = data.get('plan')  # 'starter' or 'pro'
        interval = data.get('interval', 'month')  # 'month' or 'year'
        
        if not plan or plan not in ['starter', 'pro']:
            return jsonify({'error': 'Invalid plan'}), 400
        
        session = payment_service.create_checkout_session(
            user_id=current_user.id,
            email=current_user.email,
            plan=plan,
            interval=interval
        )
        
        return jsonify({
            'sessionId': session.id,
            'url': session.url
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Checkout error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/create-payment-intent', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def create_payment_intent():
    """Create a Stripe PaymentIntent (for future one-time payments/top-ups)."""
    try:
        data = request.get_json() or {}
        amount = int(data.get('amount', 0))
        currency = (data.get('currency') or 'usd').lower()

        if amount <= 0:
            return jsonify({'error': 'Invalid amount'}), 400

        intent = payment_service.create_payment_intent(
            user_id=current_user.id,
            amount=amount,
            currency=currency,
            metadata=data.get('metadata') or {}
        )

        return jsonify({'clientSecret': intent.client_secret}), 200
    except Exception as e:
        current_app.logger.error(f'PaymentIntent error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/create-setup-intent', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def create_setup_intent():
    """Create a Stripe SetupIntent (save a card for future off-session use)."""
    try:
        data = request.get_json() or {}
        intent = payment_service.create_setup_intent(
            user_id=current_user.id,
            metadata=data.get('metadata') or {}
        )
        return jsonify({'clientSecret': intent.client_secret}), 200
    except Exception as e:
        current_app.logger.error(f'SetupIntent error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/create-portal-session', methods=['POST'])
@login_required
@limiter.limit("5 per minute")
def create_portal_session():
    """Create a Stripe customer portal session for managing subscription"""
    try:
        session = payment_service.create_portal_session(
            user_id=current_user.id
        )
        
        return jsonify({
            'url': session.url
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Portal error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/subscription', methods=['GET'])
@login_required
def get_subscription():
    """Get current user's subscription details"""
    try:
        provider = request.args.get('provider')
        subscription = payment_service.get_user_subscription(current_user.id, provider=provider)
        
        if subscription:
            return jsonify(subscription.to_dict()), 200
        else:
            return jsonify({'subscription': None}), 200
            
    except Exception as e:
        current_app.logger.error(f'Get subscription error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/activate-subscription', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def activate_paypal_subscription():
    """Store PayPal subscription after approval"""
    try:
        data = request.get_json() or {}
        subscription_id = data.get('subscriptionId')
        plan = data.get('plan')
        interval = data.get('interval', 'month')

        if not subscription_id or plan not in ['starter', 'pro']:
            return jsonify({'error': 'Invalid subscription request'}), 400

        payment_service.activate_paypal_subscription(
            user_id=current_user.id,
            plan=plan,
            interval=interval,
            subscription_id=subscription_id
        )

        return jsonify({'success': True}), 200
    except Exception as e:
        current_app.logger.error(f'PayPal activation error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/cancel-subscription', methods=['POST'])
@login_required
@limiter.limit("5 per minute")
def cancel_paypal_subscription():
    """Cancel PayPal subscription"""
    try:
        result = payment_service.cancel_paypal_subscription(current_user.id)
        return jsonify(result), 200
    except Exception as e:
        current_app.logger.error(f'PayPal cancel error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook events"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature') or request.headers.get('stripe-signature')
    
    try:
        event = payment_service.verify_webhook(payload, sig_header)

        # Basic idempotency: record the event id and skip already-processed events.
        user_id = None
        try:
            if event['type'] == 'checkout.session.completed':
                user_id = (event['data']['object'].get('metadata') or {}).get('user_id')
        except Exception:
            user_id = None

        billing_event, should_process = payment_service.upsert_stripe_billing_event(event, user_id=user_id)
        if not should_process:
            return jsonify({'success': True}), 200
        
        try:
            # Handle the event
            if event['type'] == 'checkout.session.completed':
                payment_service.handle_checkout_completed(event['data']['object'])
            elif event['type'] == 'customer.subscription.updated':
                payment_service.handle_subscription_updated(event['data']['object'])
            elif event['type'] == 'customer.subscription.deleted':
                payment_service.handle_subscription_deleted(event['data']['object'])
            elif event['type'] == 'invoice.payment_succeeded':
                payment_service.handle_payment_succeeded(event['data']['object'])
            elif event['type'] == 'invoice.payment_failed':
                payment_service.handle_payment_failed(event['data']['object'])
            else:
                current_app.logger.info(f"Unhandled Stripe event type: {event['type']}")

            payment_service.mark_billing_event_processed(billing_event)
            return jsonify({'success': True}), 200
        except Exception as e:
            payment_service.mark_billing_event_error(billing_event, str(e))
            raise
        
    except ValueError as e:
        current_app.logger.error(f'Invalid webhook payload: {str(e)}')
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        current_app.logger.error(f'Invalid webhook signature: {str(e)}')
        return jsonify({'error': 'Invalid signature'}), 400
    except Exception as e:
        current_app.logger.error(f'Webhook error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/webhook', methods=['POST'])
def paypal_webhook():
    """Handle PayPal webhook events"""
    try:
        body = request.get_json() or {}
        payment_service.verify_paypal_webhook(dict(request.headers), body)
        payment_service.handle_paypal_webhook(body)
        return jsonify({'success': True}), 200
    except Exception as e:
        current_app.logger.error(f'PayPal webhook error: {str(e)}')
        return jsonify({'error': str(e)}), 400


@payment_bp.route('/cancel-subscription', methods=['POST'])
@login_required
@limiter.limit("5 per minute")
def cancel_subscription():
    """Cancel current user's subscription at period end"""
    try:
        result = payment_service.cancel_subscription(current_user.id)
        
        return jsonify(result), 200
        
    except Exception as e:
        current_app.logger.error(f'Cancel subscription error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/orders', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def create_paypal_order():
    """Create PayPal order for one-time or subscription payment"""
    try:
        data = request.get_json() or {}
        plan = data.get('plan')
        interval = data.get('interval')
        
        if not plan or plan not in ['starter', 'pro']:
            return jsonify({'error': 'Invalid plan'}), 400
        
        order = payment_service.create_paypal_order(
            user_id=current_user.id,
            plan=plan,
            interval=interval or 'month'
        )
        
        return jsonify(order), 200
        
    except Exception as e:
        current_app.logger.error(f'Create PayPal order error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/orders/<order_id>/capture', methods=['POST'])
@login_required
@limiter.limit("10 per minute")
def capture_paypal_order(order_id):
    """Capture a PayPal order"""
    try:
        result = payment_service.capture_paypal_order(
            order_id=order_id,
            user_id=current_user.id
        )
        
        return jsonify(result), 200
        
    except Exception as e:
        current_app.logger.error(f'Capture PayPal order error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/paypal/captures/<capture_id>/refund', methods=['POST'])
@login_required
@limiter.limit("5 per minute")
def refund_paypal_capture(capture_id):
    """Refund a PayPal capture"""
    try:
        data = request.get_json() or {}
        amount = data.get('amount')
        currency = data.get('currency', 'USD')
        
        result = payment_service.refund_paypal_capture(
            capture_id=capture_id,
            amount=amount,
            currency=currency
        )
        
        return jsonify(result), 200
        
    except Exception as e:
        current_app.logger.error(f'Refund PayPal capture error: {str(e)}')
        return jsonify({'error': str(e)}), 500
