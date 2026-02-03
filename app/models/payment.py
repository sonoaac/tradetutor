"""Payment model for Stripe and PayPal transactions"""
from datetime import datetime
from app.extensions import db
from decimal import Decimal


class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Payment details
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    status = db.Column(db.String(20), nullable=False)  # 'pending', 'completed', 'failed', 'refunded'
    
    # Provider info
    provider = db.Column(db.String(20), nullable=False)  # 'stripe' or 'paypal'
    transaction_id = db.Column(db.String(255), unique=True, index=True)  # External payment ID
    
    # Subscription info (if applicable)
    subscription_id = db.Column(db.String(255))
    plan_type = db.Column(db.String(50))  # 'premium_monthly', 'premium_yearly', etc.
    
    # Additional data (JSON)
    extra_data = db.Column(db.JSON)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert payment to dictionary"""
        return {
            'id': self.id,
            'userId': self.user_id,
            'amount': str(self.amount),
            'currency': self.currency,
            'status': self.status,
            'provider': self.provider,
            'transactionId': self.transaction_id,
            'subscriptionId': self.subscription_id,
            'planType': self.plan_type,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<Payment {self.provider} {self.amount} {self.status}>'
