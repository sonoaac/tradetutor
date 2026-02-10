"""Auth blueprint - registration, login, logout"""
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from app.extensions import db, bcrypt, limiter
from app.models.user import User
from app.models.portfolio import Portfolio
from decimal import Decimal
from app.services.payment_service import PaymentService
import re
import random
import uuid

auth_bp = Blueprint('auth', __name__)

payment_service = PaymentService()


def _username_part(value: str | None) -> str:
    if not value:
        return ''
    value = value.strip().lower()
    return re.sub(r'[^a-z0-9]', '', value)


def _generate_unique_username(*, first_name: str | None, last_name: str | None, email: str) -> str:
    first = _username_part(first_name)
    last_initial = _username_part(last_name)[:1]

    if first:
        base = f"{first}{last_initial}"
    else:
        base = _username_part(email.split('@', 1)[0])

    base = (base or 'trader')[:20]

    for _ in range(25):
        suffix = str(random.randint(100, 9999))
        candidate = f"{base}{suffix}"[:50]
        if not User.query.filter_by(username=candidate).first():
            return candidate

    return f"{base}{uuid.uuid4().hex[:8]}"[:50]


def _ensure_username(user: User) -> None:
    if user.username:
        return
    user.username = _generate_unique_username(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
    )
    db.session.add(user)
    db.session.commit()


def _is_valid_password(password: str) -> bool:
    if not password or len(password) < 7:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'\d', password):
        return False
    return True


def _normalize_username(value: str | None) -> str | None:
    if not value:
        return None
    value = value.strip()
    if not value:
        return None
    return value


def _is_valid_username(username: str) -> bool:
    if not username:
        return False
    if len(username) < 3 or len(username) > 20:
        return False
    return bool(re.fullmatch(r'[A-Za-z0-9_]+', username))


@auth_bp.route('/register', methods=['POST'])
@limiter.limit("5 per hour")
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate required fields
    email = (data.get('email') or '').strip().lower()
    password = data.get('password')
    username = _normalize_username(data.get('username'))
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    if not _is_valid_password(password):
        return jsonify({'message': 'Password must be at least 7 characters and include 1 uppercase letter and 1 number'}), 400

    if username:
        if not _is_valid_username(username):
            return jsonify({'message': 'Username must be 3–20 characters and use only letters, numbers, or underscore'}), 400
        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'Username is already taken'}), 400
    
    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    
    # Create user
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(
        email=email,
        password_hash=password_hash,
        first_name=data.get('firstName'),
        last_name=data.get('lastName'),
        username=username
        or _generate_unique_username(
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=email,
        ),
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Automatically log in the user after registration
    login_user(user, remember=True)

    # If the user paid via Payment Link before creating an account,
    # grant access now based on email.
    try:
        payment_service.apply_pending_entitlement_for_user(user)
    except Exception:
        # Non-fatal
        pass
    
    return jsonify({
        'message': 'User created successfully',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    """Login user"""
    data = request.get_json()
    
    identifier = (data.get('identifier') or data.get('email') or '').strip()
    password = data.get('password')
    
    if not identifier or not password:
        return jsonify({'message': 'Email/username and password are required'}), 400
    
    # Find user
    if '@' in identifier:
        user = User.query.filter_by(email=identifier.lower()).first()
    else:
        user = User.query.filter_by(username=identifier).first()
    
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Log in user
    login_user(user, remember=True)

    # Backfill username for older accounts
    _ensure_username(user)

    # If the user paid via Payment Link, grant access now.
    try:
        payment_service.apply_pending_entitlement_for_user(user)
    except Exception:
        pass
    
    return jsonify({
        'message': 'Logged in successfully',
        'user': user.to_dict()
    }), 200


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logout user"""
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    """Get current authenticated user"""
    _ensure_username(current_user)
    return jsonify({'user': current_user.to_dict()}), 200


@auth_bp.route('/user', methods=['GET'])
@login_required
def get_user():
    """Get current user (alternative endpoint)"""
    _ensure_username(current_user)
    return jsonify(current_user.to_dict()), 200
