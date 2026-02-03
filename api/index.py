"""Vercel serverless entrypoint for Flask app"""
from app import create_app
import os

# Create app instance
app = create_app(config_name=os.environ.get('FLASK_ENV', 'production'))

# Vercel requires the app to be named 'app' or exposed via handler
# This file acts as the WSGI entry point for serverless functions
