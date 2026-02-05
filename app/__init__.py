"""Flask app factory for Trade Tutor API"""
from flask import Flask
from flask_cors import CORS
from app.config import config
from app.extensions import db, migrate, login_manager, limiter, bcrypt


def create_app(config_name='development'):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    limiter.init_app(app)
    bcrypt.init_app(app)
    
    # Enable CORS for React frontend
    CORS(app, supports_credentials=True, origins=[
        'http://localhost:5173',  # Vite dev server
        'http://localhost:5174',  # Vite dev server alternate port
        'http://localhost:3000',  # Alternative frontend port
        app.config.get('FRONTEND_URL', '*')
    ])
    
    # Register blueprints
    from app.blueprints.auth.routes import auth_bp
    from app.blueprints.core.routes import core_bp
    from app.blueprints.trading.routes import trading_bp
    from app.blueprints.lessons.routes import lessons_bp
    from app.blueprints.api.routes import api_bp
    from app.blueprints.payment.routes import payment_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(core_bp, url_prefix='/api')
    app.register_blueprint(trading_bp, url_prefix='/api')
    app.register_blueprint(lessons_bp, url_prefix='/api/lessons')
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')
    
    # Health check endpoint
    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'message': 'Trade Tutor API is running'}
    
    return app
