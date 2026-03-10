"""Core blueprint - home, dashboard, SimCash sync"""
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.extensions import db
from app.models.portfolio import Portfolio

core_bp = Blueprint('core', __name__)


@core_bp.route('/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({'status': 'ok', 'message': 'Trade Tutor API is running'}), 200


# ─── SimCash persistence ──────────────────────────────────────────────────────

@core_bp.route('/simcash', methods=['GET'])
@login_required
def get_simcash():
    """Return user's server-side SimCash balance."""
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    balance = portfolio.simcash_balance if portfolio else 0
    return jsonify({'balance': balance or 0}), 200


@core_bp.route('/simcash/sync', methods=['POST'])
@login_required
def sync_simcash():
    """Save client-side SimCash balance to the database.

    Body: { "balance": <int> }
    Only saves if the provided balance differs from the stored value.
    Guards against negative balances.
    """
    data = request.get_json(silent=True) or {}
    try:
        new_balance = max(0, int(data.get('balance', 0)))
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid balance'}), 400

    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if not portfolio:
        portfolio = Portfolio(user_id=current_user.id, simcash_balance=new_balance)
        db.session.add(portfolio)
    else:
        portfolio.simcash_balance = new_balance

    db.session.commit()
    return jsonify({'balance': portfolio.simcash_balance}), 200
