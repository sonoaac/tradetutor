"""Trading blueprint - trades, positions, portfolio"""
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.extensions import db
from app.models.portfolio import Portfolio
from app.models.trade import Trade
from app.services.entitlements import get_starting_simcash
from datetime import datetime
from decimal import Decimal

trading_bp = Blueprint('trading', __name__)


_TIER_RANK = {
    'free': 0,
    'starter': 1,
    'pro': 2,
    'lifetime': 2,
}


def _has_min_tier(min_tier: str) -> bool:
    current = getattr(current_user, 'tier', 'free') or 'free'
    return _TIER_RANK.get(current, 0) >= _TIER_RANK.get(min_tier, 0)


def _require_min_tier(min_tier: str, message: str):
    if _has_min_tier(min_tier):
        return None
    return jsonify({
        'message': message,
        'requiredTier': min_tier,
        'currentTier': getattr(current_user, 'tier', 'free') or 'free'
    }), 403


def _tier_starting_balance_decimal() -> Decimal:
    """Tier-based starting SimCash balance as a Decimal(15,2)."""
    amount = int(get_starting_simcash(current_user))
    return Decimal(f"{amount}.00")


def _get_or_create_portfolio() -> Portfolio:
    """Get the user's portfolio, creating it if missing (Starter+ only)."""
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if portfolio:
        return portfolio

    portfolio = Portfolio(
        user_id=current_user.id,
        balance=_tier_starting_balance_decimal(),
        track=None,
        experience=None,
    )
    db.session.add(portfolio)
    db.session.commit()
    return portfolio


# === PORTFOLIO / WALLET ===

@trading_bp.route('/wallet', methods=['GET'])
@trading_bp.route('/portfolio', methods=['GET'])
@login_required
def get_wallet():
    """Get user's wallet/portfolio"""
    denied = _require_min_tier('starter', 'Your portfolio unlocks when you start trading. Upgrade to Starter to track P&L, positions, and performance stats.')
    if denied:
        return denied

    portfolio = _get_or_create_portfolio()
    
    return jsonify(portfolio.to_dict()), 200


@trading_bp.route('/portfolio/onboard', methods=['POST'])
@login_required
def onboard_portfolio():
    """Create portfolio during onboarding"""
    denied = _require_min_tier('starter', 'Trading is locked in Learn Mode. Upgrade to Starter to place trades and unlock your portfolio.')
    if denied:
        return denied

    data = request.get_json()
    
    # Check if portfolio already exists
    existing = Portfolio.query.filter_by(user_id=current_user.id).first()
    if existing:
        return jsonify({'message': 'Portfolio already exists'}), 400
    
    portfolio = Portfolio(
        user_id=current_user.id,
        balance=_tier_starting_balance_decimal(),
        track=data.get('track'),  # 'stocks', 'crypto', 'forex'
        experience=data.get('experience')  # 'beginner', 'intermediate', 'advanced'
    )
    
    db.session.add(portfolio)
    db.session.commit()
    
    return jsonify(portfolio.to_dict()), 201


@trading_bp.route('/portfolio/reset', methods=['POST'])
@login_required
def reset_portfolio():
    """Reset portfolio balance to tier-based starting SimCash"""
    denied = _require_min_tier('starter', 'Portfolio tools are locked in Learn Mode. Upgrade to Starter to reset and track your portfolio.')
    if denied:
        return denied

    portfolio = _get_or_create_portfolio()
    portfolio.balance = _tier_starting_balance_decimal()
    db.session.commit()
    
    return jsonify(portfolio.to_dict()), 200


# === TRADES ===

@trading_bp.route('/trades', methods=['GET'])
@trading_bp.route('/positions', methods=['GET'])
@login_required
def get_trades():
    """Get user's trades"""
    denied = _require_min_tier('starter', 'Trading history unlocks when you start trading. Upgrade to Starter to view trades and positions.')
    if denied:
        return denied

    # Ensure the portfolio exists so Starter+ users don't get stuck on a missing wallet.
    _get_or_create_portfolio()
    trades = Trade.query.filter_by(user_id=current_user.id).order_by(Trade.created_at.desc()).all()
    return jsonify([trade.to_dict() for trade in trades]), 200


@trading_bp.route('/trades', methods=['POST'])
@login_required
def create_trade():
    """Place a new trade"""
    denied = _require_min_tier('starter', 'Trading is locked in Learn Mode. Upgrade to Starter to place trades, track performance, and practice safely.')
    if denied:
        return denied

    data = request.get_json()
    
    # Get portfolio
    portfolio = _get_or_create_portfolio()
    
    # Validate required fields
    required = ['symbol', 'side', 'size', 'entryPrice']
    for field in required:
        if field not in data:
            return jsonify({'message': f'Missing required field: {field}'}), 400
    
    side = data['side']
    size = Decimal(str(data['size']))
    entry_price = Decimal(str(data['entryPrice']))
    
    # Check balance for buy orders
    if side == 'buy':
        cost = entry_price * size
        if portfolio.balance < cost:
            return jsonify({
                'message': 'Insufficient funds',
                'balance': str(portfolio.balance),
                'required': str(cost),
                'hint': 'You can reset your practice cash from the Portfolio page to restore your starting SimCash.'
            }), 400
        
        # Deduct balance
        portfolio.balance -= cost
    
    # Calculate risk/reward metrics
    risk_amount = None
    reward_amount = None
    rr_ratio = None
    
    if 'stopLoss' in data and data['stopLoss']:
        stop_loss = Decimal(str(data['stopLoss']))
        risk_amount = abs(entry_price - stop_loss) * size
    
    if 'takeProfit' in data and data['takeProfit']:
        take_profit = Decimal(str(data['takeProfit']))
        reward_amount = abs(take_profit - entry_price) * size
    
    if risk_amount and reward_amount and risk_amount > 0:
        rr_ratio = reward_amount / risk_amount
    
    # Create trade
    trade = Trade(
        user_id=current_user.id,
        symbol=data['symbol'],
        asset_class=data.get('assetClass'),
        side=side,
        size=size,
        entry_price=entry_price,
        stop_loss=Decimal(str(data['stopLoss'])) if data.get('stopLoss') else None,
        take_profit=Decimal(str(data['takeProfit'])) if data.get('takeProfit') else None,
        risk_amount=risk_amount,
        reward_amount=reward_amount,
        rr_ratio=rr_ratio,
        status='open'
    )
    
    db.session.add(trade)
    db.session.commit()
    
    return jsonify(trade.to_dict()), 201


@trading_bp.route('/trades/<int:trade_id>/close', methods=['POST'])
@trading_bp.route('/positions/<int:trade_id>/close', methods=['POST'])
@login_required
def close_trade(trade_id):
    """Close an open trade"""
    denied = _require_min_tier('starter', 'Trading is locked in Learn Mode. Upgrade to Starter to manage and close positions.')
    if denied:
        return denied

    trade = Trade.query.get_or_404(trade_id)
    
    # Verify ownership
    if trade.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    if trade.status == 'closed':
        return jsonify({'message': 'Trade already closed'}), 400
    
    data = request.get_json()
    exit_price = Decimal(str(data.get('exitPrice')))
    
    # Calculate P&L
    if trade.side == 'buy':
        pnl = (exit_price - trade.entry_price) * trade.size
        # Return principal + pnl
        proceeds = (trade.entry_price * trade.size) + pnl
    else:
        # Short selling (simplified)
        pnl = (trade.entry_price - exit_price) * trade.size
        proceeds = pnl
    
    # Update portfolio
    portfolio = _get_or_create_portfolio()
    portfolio.balance += proceeds
    
    # Update trade
    trade.exit_price = exit_price
    trade.exit_time = datetime.utcnow()
    trade.pnl = pnl
    trade.status = 'closed'
    
    db.session.commit()
    
    return jsonify(trade.to_dict()), 200
