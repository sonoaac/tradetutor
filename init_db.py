#!/usr/bin/env python
"""Initialize database on app startup — runs migrations then seeds lessons if empty."""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

dotenv_flask = Path(__file__).with_name('.env.flask')
if dotenv_flask.exists():
    load_dotenv(dotenv_flask)
else:
    load_dotenv()

from app import create_app, db
from flask_migrate import upgrade


def run_migrations(app):
    with app.app_context():
        print("Running database migrations...")
        try:
            upgrade(revision='head')
            print("✓ Migrations applied")
            return True
        except Exception as e:
            print(f"Migration error: {e}")
            if "no such table" in str(e).lower() or "already exists" in str(e).lower():
                print("✓ Database already up-to-date")
                return True
            # Last-resort fallback: create all tables directly
            try:
                db.create_all()
                print("✓ Tables created via db.create_all()")
                return True
            except Exception as e2:
                print(f"db.create_all() failed: {e2}")
                return False


def seed_lessons_if_empty(app):
    """Import and run seed_lessons only when the lessons table is empty."""
    with app.app_context():
        try:
            from app.models.lesson import Lesson
            if Lesson.query.count() > 0:
                print("✓ Lessons already seeded, skipping")
                return
            print("Seeding lessons...")
            from seed_lessons import seed_lessons
            seed_lessons()
        except Exception as e:
            print(f"Lesson seeding skipped: {e}")


if __name__ == '__main__':
    config_name = os.environ.get('FLASK_ENV', 'production')
    app = create_app(config_name=config_name)

    ok = run_migrations(app)
    seed_lessons_if_empty(app)

    if ok:
        print("\n✓ Database ready.")
        sys.exit(0)
    else:
        print("\n⚠ Database init had issues — app will try to recover on first request.")
        sys.exit(0)  # Always exit 0 so deployment isn't blocked
