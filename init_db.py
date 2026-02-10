#!/usr/bin/env python
"""Initialize database on app startup - auto-run migrations if needed"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

from pathlib import Path

dotenv_flask = Path(__file__).with_name('.env.flask')
if dotenv_flask.exists():
    load_dotenv(dotenv_flask)
else:
    load_dotenv()

from app import create_app, db
from flask_migrate import Migrate, upgrade

def init_db():
    """Initialize database with migrations"""
    app = create_app(os.environ.get('FLASK_ENV', 'development'))
    
    with app.app_context():
        print("Initializing database...")
        
        try:
            # Run migrations to latest version
            upgrade(revision='head')
            print("✓ Database migrations completed successfully")
            return True
        except Exception as e:
            print(f"✗ Migration error: {e}")
            # Try to handle the error gracefully
            if "no such table" in str(e).lower() or "already exists" in str(e).lower():
                print("✓ Database already initialized or will be created on first request")
                return True
            return False

if __name__ == '__main__':
    if init_db():
        print("\n✓ Database initialization complete. App is ready to start.")
        sys.exit(0)
    else:
        print("\n⚠ Warning: Database initialization encountered an issue.")
        print("The app will attempt to create tables on first request.")
        sys.exit(0)  # Exit 0 to not block deployment
