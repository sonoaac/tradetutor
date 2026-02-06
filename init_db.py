#!/usr/bin/env python
"""Initialize database on app startup - auto-run migrations if needed"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

from app import create_app, db

def init_db():
    """Initialize database with migrations"""
    app = create_app(os.environ.get('FLASK_ENV', 'development'))
    
    with app.app_context():
        print("Initializing database...")
        
        # Run migrations
        from flask_migrate import Migrate, upgrade
        Migrate(app, db)
        
        try:
            upgrade(revision='head')
            print("✓ Database migrations completed successfully")
        except Exception as e:
            print(f"✗ Migration error: {e}")
            return False
    
    return True

if __name__ == '__main__':
    if init_db():
        print("\n✓ Database initialization complete. You can now run the app.")
        sys.exit(0)
    else:
        print("\n✗ Database initialization failed.")
        sys.exit(1)
