"""Portfolio/Wallet model"""
from datetime import datetime
from app.extensions import db
from decimal import Decimal


class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True)
    
    # Trading configuration
    balance = db.Column(db.Numeric(15, 2), default=Decimal('10000.00'), nullable=False)
    track = db.Column(db.String(20))  # 'stocks', 'crypto', 'forex'
    experience = db.Column(db.String(20))  # 'beginner', 'intermediate', 'advanced'
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert portfolio to dictionary"""
        return {
            'id': self.id,
            'userId': self.user_id,
            'balance': str(self.balance),
            'track': self.track,
            'experience': self.experience,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<Portfolio user={self.user_id} balance={self.balance}>'
