"""Payment blueprint module"""
from flask import Blueprint

payment_bp = Blueprint('payment', __name__)

from app.blueprints.payment import routes
