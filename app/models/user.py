"""User model"""
from datetime import datetime
from app.extensions import db
from flask_login import UserMixin
import uuid


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    username = db.Column(db.String(50), unique=True, index=True)
    profile_image_url = db.Column(db.String(500))
    
    # Subscription tier: 'free', 'starter', 'pro', 'lifetime'
    tier = db.Column(db.String(20), default='free', nullable=False)
    tier_source = db.Column(db.String(20), default='none')  # 'none', 'stripe', 'paypal', 'lifetime'
    tier_expires_at = db.Column(db.DateTime)  # NULL for lifetime, subscription end date for others
    
    # RTT Mode (RealTimeTutor) - only for paid users
    rtt_enabled = db.Column(db.Boolean, default=False)
    rtt_points = db.Column(db.Integer, default=0)  # Gamification points for RTT mode
    
    # Legacy premium fields (can be removed later or used for compatibility)
    is_premium = db.Column(db.Boolean, default=False)
    premium_until = db.Column(db.DateTime)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    portfolio = db.relationship('Portfolio', backref='user', uselist=False, cascade='all, delete-orphan')
    trades = db.relationship('Trade', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    lesson_progress = db.relationship('LessonProgress', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    payments = db.relationship('Payment', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'profileImageUrl': self.profile_image_url,
            'tier': self.tier,
            'tierSource': self.tier_source,
            'tierExpiresAt': self.tier_expires_at.isoformat() if self.tier_expires_at else None,
            'isPremium': self.is_premium,
            'premiumUntil': self.premium_until.isoformat() if self.premium_until else None,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<User {self.email}>'
