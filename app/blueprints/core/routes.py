"""Core blueprint - home, dashboard"""
from flask import Blueprint, jsonify

core_bp = Blueprint('core', __name__)


@core_bp.route('/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({'status': 'ok', 'message': 'Trade Tutor API is running'}), 200
