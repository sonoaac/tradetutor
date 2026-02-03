"""Trade model"""
from datetime import datetime
from app.extensions import db
from decimal import Decimal


class Trade(db.Model):
    __tablename__ = 'trades'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Trade details
    symbol = db.Column(db.String(20), nullable=False)
    asset_class = db.Column(db.String(20))  # 'stock', 'crypto', 'forex'
    side = db.Column(db.String(10), nullable=False)  # 'buy' or 'sell'
    size = db.Column(db.Numeric(15, 8), nullable=False)
    
    # Pricing
    entry_price = db.Column(db.Numeric(15, 8), nullable=False)
    exit_price = db.Column(db.Numeric(15, 8))
    
    # Risk management
    stop_loss = db.Column(db.Numeric(15, 8))
    take_profit = db.Column(db.Numeric(15, 8))
    
    # Calculated metrics
    risk_amount = db.Column(db.Numeric(15, 2))
    reward_amount = db.Column(db.Numeric(15, 2))
    rr_ratio = db.Column(db.Numeric(10, 2))
    pnl = db.Column(db.Numeric(15, 2))
    
    # Status and timing
    status = db.Column(db.String(20), default='open')  # 'open', 'closed'
    entry_time = db.Column(db.DateTime, default=datetime.utcnow)
    exit_time = db.Column(db.DateTime)
    
    # AI feedback (optional)
    score = db.Column(db.Integer)
    feedback = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert trade to dictionary"""
        return {
            'id': self.id,
            'userId': self.user_id,
            'symbol': self.symbol,
            'assetClass': self.asset_class,
            'side': self.side,
            'size': str(self.size),
            'entryPrice': str(self.entry_price),
            'exitPrice': str(self.exit_price) if self.exit_price else None,
            'stopLoss': str(self.stop_loss) if self.stop_loss else None,
            'takeProfit': str(self.take_profit) if self.take_profit else None,
            'riskAmount': str(self.risk_amount) if self.risk_amount else None,
            'rewardAmount': str(self.reward_amount) if self.reward_amount else None,
            'rrRatio': str(self.rr_ratio) if self.rr_ratio else None,
            'pnl': str(self.pnl) if self.pnl else None,
            'status': self.status,
            'entryTime': self.entry_time.isoformat(),
            'exitTime': self.exit_time.isoformat() if self.exit_time else None,
            'score': self.score,
            'feedback': self.feedback,
            'createdAt': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<Trade {self.symbol} {self.side} {self.status}>'
