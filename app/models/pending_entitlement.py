"""Pending entitlement model.

Stores a subscription/plan purchase keyed by payer email so users who pay via
Stripe Payment Links (without being logged in) can still receive access once
they register/login with the same email.
"""

from datetime import datetime
from app.extensions import db


class PendingEntitlement(db.Model):
    __tablename__ = 'pending_entitlements'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    plan = db.Column(db.String(20), nullable=False)  # 'starter' or 'pro'

    provider = db.Column(db.String(20), nullable=False, default='stripe')
    provider_subscription_id = db.Column(db.String(255), index=True)
    provider_customer_id = db.Column(db.String(255), index=True)

    current_period_end = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<PendingEntitlement {self.provider} {self.email} {self.plan}>'
