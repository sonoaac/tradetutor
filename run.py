"""Local development runner"""
from app import create_app
import os

if __name__ == '__main__':
    # Load environment variables from .env
    from dotenv import load_dotenv
    from pathlib import Path
    dotenv_flask = Path(__file__).with_name('.env.flask')
    if dotenv_flask.exists():
        load_dotenv(dotenv_flask)
    else:
        load_dotenv()
    
    # Create app
    # Default to development for local use, but allow overriding via FLASK_ENV.
    config_name = os.environ.get('FLASK_ENV', 'development')
    app = create_app(config_name=config_name)
    
    # Run development server
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=(config_name == 'development'))
