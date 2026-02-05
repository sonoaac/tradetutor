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
        subscription = payment_service.get_user_subscription(current_user.id)
        
        if subscription:
            return jsonify(subscription.to_dict()), 200
        else:
            return jsonify({'subscription': None}), 200
            
    except Exception as e:
        current_app.logger.error(f'Get subscription error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@payment_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook events"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = payment_service.verify_webhook(payload, sig_header)
        
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
        
        return jsonify({'success': True}), 200
        
    except ValueError as e:
        current_app.logger.error(f'Invalid webhook payload: {str(e)}')
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        current_app.logger.error(f'Invalid webhook signature: {str(e)}')
        return jsonify({'error': 'Invalid signature'}), 400
    except Exception as e:
        current_app.logger.error(f'Webhook error: {str(e)}')
        return jsonify({'error': str(e)}), 500


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
