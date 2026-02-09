# TradeTutor

TradeTutor is a trading education + simulator app that teaches fundamentals (stocks/crypto/forex concepts) using guided lessons and simulated “SimCash” practice.

## Tech Stack

- Frontend: React + TypeScript + Vite, Tailwind, shadcn/ui
- Backend: Flask + SQLAlchemy (API under `/api/*`)
- Payments: Stripe (Checkout + Billing Portal + webhooks). PayPal code may exist, but the user-facing UI is provider-neutral.

## Project Structure

- `client/`: Frontend
- `app/`: Flask app (config, models, services, blueprints)
- `api/`: Deployment entry (Vercel serverless adapter)
- `migrations/`: Database migrations

## Local Development

Backend:

```powershell
./.venv/Scripts/Activate.ps1
python run.py
```

Frontend (separate terminal):

```powershell
cd client
npm install
npm run dev
```

## Deployment Notes (Vercel)

SPA routing requires a fallback rewrite to `/index.html`, and API proxying requires a rewrite for `/api/*`.

This repo includes both:

- `vercel.json` (use when Vercel project root is the repo root)
- `client/vercel.json` (use when Vercel project root is `client/`)

## Payments (Stripe)

Once you add Stripe keys, the backend supports:

- Create Checkout Session
- Billing Portal
- Webhooks
- PaymentIntent + SetupIntent endpoints (for future custom payment flows)

See `PAYMENT_SETUP.md` for the exact env vars and endpoints.

## Legal / Risk Disclosure

TradeTutor is for educational use only.

- Not financial, investment, tax, or legal advice.
- Trading involves risk and can result in loss.
- Any performance examples are hypothetical and for demonstration purposes.
