"""Gunicorn production configuration"""
import os
import multiprocessing

# Server socket
bind = f"0.0.0.0:{os.environ.get('PORT', '10000')}"

# Workers — Render free tier: keep at 2; scale up on paid plans
workers = int(os.environ.get('WEB_CONCURRENCY', min(multiprocessing.cpu_count() * 2 + 1, 4)))
worker_class = "sync"

# Timeouts — generous for OpenAI coaching calls
timeout = 120
keepalive = 5

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Reload on code changes (disable in production)
reload = False
