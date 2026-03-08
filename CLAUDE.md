# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TradeTutor is a trading education and simulator app (stocks/crypto/forex) with guided lessons and simulated "SimCash" practice. It uses a Flask backend and a React + Vite frontend with a subscription model (Stripe).

## Development Commands

### Backend (Flask — runs on port 5000)
```bash
# Activate virtual environment first (Windows)
.venv/Scripts/Activate.ps1

# Start dev server
python run.py
```

- Loads env from `.env.flask` if it exists, otherwise `.env`
- Set `FLASK_ENV=production` to use `ProductionConfig`

### Frontend (Vite — runs on port 5173 or 5174)
```bash
cd client
npm install
npm run dev
```

From the repo root, convenience scripts are also available:
```bash
npm run dev           # cd client && npm run dev
npm run build         # cd client && npm run build (output: dist/public/)
npm run client:install
npm run typecheck     # tsc -p tsconfig.json
```

### Database
- Default: `instance/trade_tutor.db` (SQLite, auto-created)
- Override: `DATABASE_URL` env var (use PostgreSQL URI for production)
- Migrations via Flask-Migrate: `flask db upgrade`
- Seed lessons: `python seed_lessons.py`

## Architecture

**Dual-process development:** Flask backend (`localhost:5000`) and Vite dev server (`localhost:5173`) run separately. Vite proxies `/api/*` to Flask.

**Frontend** (`client/src/`):
- Router: `wouter` (not React Router)
- Data fetching: `@tanstack/react-query` — all API calls go through hooks in `client/src/hooks/`
- UI: `shadcn/ui` (Radix primitives) + Tailwind CSS
- Charts: `lightweight-charts` (trading) + `recharts` (portfolio)
- Auth state: `useAuth()` hook queries `/api/auth/user`; returns `null` when unauthenticated
- API calls use `apiUrl()` from `client/src/lib/api.ts`, which prepends `VITE_API_BASE_URL` (empty in dev, so Vite proxy handles it)
- All pages that require auth are wrapped in `<AppShell>` which handles layout/sidebar
- Shared TypeScript types live in `shared/` (imported as `@shared/...`)

**Backend** (`app/`):
- App factory: `app/__init__.py` → `create_app()`
- Blueprints registered at startup:
  - `/api/auth` — login, logout, register, session
  - `/api` (core) — user profile, SimCash balance
  - `/api` (trading) — place/list trades
  - `/api/lessons` — lesson list, detail, progress tracking
  - `/api/payment` — Stripe checkout, billing portal, webhooks
  - `/api` (api blueprint) — market data, RTT coach
- Models: `User`, `Portfolio`, `Trade`, `Lesson`, `LessonProgress`, `Payment`
- Auth via Flask-Login (session cookies with `credentials: "include"` on all fetch calls)

**Subscription tiers** (`User.tier`): `'free'`, `'starter'`, `'pro'`, `'lifetime'`
`tier_source`: `'none'`, `'stripe'`, `'paypal'`, `'lifetime'`

## Key Env Vars

| Variable | Purpose |
|---|---|
| `SECRET_KEY` | Flask session signing |
| `DATABASE_URL` | DB connection (SQLite default) |
| `OPENAI_API_KEY` | RTT AI coach (optional) |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_PUBLISHABLE_KEY` | Stripe frontend |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `STRIPE_PRICE_*` | Price IDs for plans |
| `VITE_API_BASE_URL` | Frontend API base (empty in dev, set in production) |
| `FRONTEND_URL` | Added to CORS allowed origins |

## Deployment

- Frontend: Vercel (SPA). `vercel.json` at repo root proxies `/api/*` to `https://api.tradetutor.academy` and rewrites everything else to `/index.html`.
- Backend: Render/Gunicorn or Vercel serverless via `api/index.py`.
- Production uses PostgreSQL (`DATABASE_URL` must be set).

## Important Conventions

- The `legacy/` folder contains an old TypeScript backend (replaced by Flask) — do not edit or import from it.
- All API fetch calls must include `credentials: "include"` for session cookies to work.
- Flask-Migrate handles schema changes; never edit the database directly in production.
- Rate limiting uses in-memory storage by default; configure Redis via `RATELIMIT_STORAGE_URL` in production.
