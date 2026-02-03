"""Local development runner"""
from app import create_app
import os

if __name__ == '__main__':
    # Load environment variables from .env
    from dotenv import load_dotenv
    load_dotenv()
    
    # Create app
    app = create_app(config_name='development')
    
    # Run development server
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
