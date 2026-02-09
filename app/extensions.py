"""Flask extensions initialization"""
import os
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_bcrypt import Bcrypt

# Initialize extensions (without app - app factory pattern)
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=os.getenv("RATELIMIT_STORAGE_URL", "memory://"),
    default_limits=["200 per day", "50 per hour"]
)
bcrypt = Bcrypt()

# Configure login manager
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Please log in to access this page.'


@login_manager.unauthorized_handler
def _unauthorized():
    """Return JSON 401 for API requests instead of redirecting.

    This API is consumed by a SPA; redirects cause confusing 405/HTML responses
    when the login route is POST-only.
    """
    if request.path.startswith('/api/'):
        return jsonify({'error': 'Authentication required'}), 401

    return jsonify({'error': 'Authentication required'}), 401


@login_manager.user_loader
def load_user(user_id):
    from app.models.user import User
    return User.query.get(user_id)
