"""Auth blueprint - registration, login, logout"""
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from app.extensions import db, bcrypt, limiter
from app.models.user import User
from app.models.portfolio import Portfolio
from decimal import Decimal

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
@limiter.limit("5 per hour")
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate required fields
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    
    # Create user
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(
        email=email,
        password_hash=password_hash,
        first_name=data.get('firstName'),
        last_name=data.get('lastName')
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Automatically log in the user after registration
    login_user(user, remember=True)
    
    return jsonify({
        'message': 'User created successfully',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    """Login user"""
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    # Find user
    user = User.query.filter_by(email=email).first()
    
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Log in user
    login_user(user, remember=True)
    
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
    return jsonify({'user': current_user.to_dict()}), 200


@auth_bp.route('/user', methods=['GET'])
@login_required
def get_user():
    """Get current user (alternative endpoint)"""
    return jsonify(current_user.to_dict()), 200
