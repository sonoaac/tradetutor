"""Billing models for Stripe and PayPal integration"""
from datetime import datetime
from app.extensions import db


class BillingAccount(db.Model):
    """Tracks customer IDs for each payment provider"""
    __tablename__ = 'billing_accounts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    
    provider = db.Column(db.String(20), nullable=False)  # 'stripe' or 'paypal'
    provider_customer_id = db.Column(db.String(255), nullable=False)  # Stripe customer ID or PayPal payer ID
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Unique constraint: one account per user per provider
    __table_args__ = (
        db.UniqueConstraint('user_id', 'provider', name='unique_user_provider'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'provider': self.provider,
            'providerCustomerId': self.provider_customer_id,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<BillingAccount {self.provider} {self.provider_customer_id}>'


class BillingSubscription(db.Model):
    """Tracks active subscriptions from Stripe or PayPal"""
    __tablename__ = 'billing_subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    
    provider = db.Column(db.String(20), nullable=False)  # 'stripe' or 'paypal'
    plan = db.Column(db.String(20), nullable=False)  # 'starter' or 'pro'
    
    provider_subscription_id = db.Column(db.String(255), unique=True, nullable=False, index=True)
    status = db.Column(db.String(20), nullable=False)  # 'active', 'trialing', 'past_due', 'canceled', 'expired'
    
    current_period_start = db.Column(db.DateTime)
    current_period_end = db.Column(db.DateTime)
    cancel_at_period_end = db.Column(db.Boolean, default=False)
    canceled_at = db.Column(db.DateTime)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'provider': self.provider,
            'plan': self.plan,
            'providerSubscriptionId': self.provider_subscription_id,
            'status': self.status,
            'currentPeriodStart': self.current_period_start.isoformat() if self.current_period_start else None,
            'currentPeriodEnd': self.current_period_end.isoformat() if self.current_period_end else None,
            'cancelAtPeriodEnd': self.cancel_at_period_end,
            'canceledAt': self.canceled_at.isoformat() if self.canceled_at else None,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<BillingSubscription {self.provider} {self.plan} {self.status}>'


class BillingEvent(db.Model):
    """Webhook event log for debugging and idempotency"""
    __tablename__ = 'billing_events'
    
    id = db.Column(db.Integer, primary_key=True)
    
    provider = db.Column(db.String(20), nullable=False)  # 'stripe' or 'paypal'
    event_id = db.Column(db.String(255), unique=True, nullable=False, index=True)  # Provider's event ID
    event_type = db.Column(db.String(100), nullable=False)  # 'checkout.session.completed', etc.
    
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), index=True)  # Nullable until mapped
    payload = db.Column(db.JSON, nullable=False)  # Raw webhook data
    
    processed = db.Column(db.Boolean, default=False)
    processed_at = db.Column(db.DateTime)
    error_message = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'provider': self.provider,
            'eventId': self.event_id,
            'eventType': self.event_type,
            'userId': self.user_id,
            'processed': self.processed,
            'processedAt': self.processed_at.isoformat() if self.processed_at else None,
            'errorMessage': self.error_message,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<BillingEvent {self.provider} {self.event_type} {self.processed}>'
