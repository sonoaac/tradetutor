"""WSGI entrypoint for production servers (e.g., Gunicorn on Render).

Start command example:
  gunicorn app.wsgi:app

Config selection:
- Uses FLASK_ENV when set (expected: 'production' or 'development')
- Defaults to 'production'
"""

import os

from app import create_app


_config_name = os.environ.get('FLASK_ENV', 'production')
if _config_name not in {'production', 'development', 'default'}:
    _config_name = 'production'

app = create_app(config_name=_config_name)
