# Deployment + Payments TODO (Render + Vercel + Stripe)

Use this as the single checklist for what to configure in production.

## 1) Backend (Render) — environment variables

Set these in your Render **Web Service** (Flask API).

### Required (core app)

- `FLASK_ENV=production`
- `SECRET_KEY` = long random string (do not reuse dev)
- `DATABASE_URL` = Render Postgres connection string (or any SQLAlchemy DB URL)
- `FRONTEND_URL` = your deployed frontend origin (example: `https://your-app.vercel.app` or your custom domain)

### Optional

- `OPENAI_API_KEY` = only needed if you enable AI coaching features

### Payments — Stripe (subscriptions)

Required if you want Stripe checkout to work:


### Security note

- Never commit or share `sk_*` / `whsec_*` values. If one is accidentally shared, rotate it in Stripe immediately and update the Render env var.

- `STRIPE_PRICE_PRO_MONTHLY` = `price_...`
- `STRIPE_PRICE_PRO_YEARLY` = `price_...`

### Payments — PayPal (if you use PayPal)

- `PAYPAL_CLIENT_ID`
- `PAYPAL_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_API_BASE` (optional; defaults to live: `https://api-m.paypal.com`)

Plan IDs (created in PayPal dashboard):

- `PAYPAL_PLAN_STARTER_MONTHLY`
- `PAYPAL_PLAN_STARTER_YEARLY`
- `PAYPAL_PLAN_PRO_MONTHLY`
- `PAYPAL_PLAN_PRO_YEARLY`

## 2) Frontend (Vercel) — environment variables

This project can work **without** frontend env vars if you keep the Vercel rewrite for `/api/*`.

### Option A (recommended): use Vercel rewrites for `/api/*`

- No env var strictly required.
- Make sure your Vercel rewrites point to your Render backend.

You have 2 valid choices for the rewrite destination:

- **Custom domain (recommended)**: `https://api.tradetutor.academy` (cleaner, stable)
- **Default Render URL**: `https://<your-service>.onrender.com` (works fine too)

Files to update if your API domain is not `https://api.tradetutor.academy`:

- [vercel.json](vercel.json)
- [client/vercel.json](client/vercel.json)

What to change inside those files:

- Replace the existing destination
   - from: `https://api.tradetutor.academy/api/:path*`
   - to: `https://<your-service>.onrender.com/api/:path*`

### Option B: call the API directly from the browser (no rewrites)

Set:

- `VITE_API_BASE_URL` = your backend base URL (example: `https://your-backend.onrender.com`)

Notes:
- Code that uses the `apiUrl()` helper will use this value.
- Some pages still call relative `/api/...` directly; those require a proxy/rewrite (Option A) or you’ll want to refactor them to use `apiUrl()`.

## 3) Stripe setup — what to create for subscriptions

In Stripe Dashboard (Live mode when going to production):

1. Create **Products**:
   - Starter
   - Pro

2. For each product, create **2 recurring Prices**:
   - Monthly (interval = month)
   - Yearly (interval = year)

3. Copy the created `price_...` IDs into Render env vars:
   - Starter monthly → `STRIPE_PRICE_STARTER_MONTHLY`
   - Starter yearly → `STRIPE_PRICE_STARTER_YEARLY`
   - Pro monthly → `STRIPE_PRICE_PRO_MONTHLY`
   - Pro yearly → `STRIPE_PRICE_PRO_YEARLY`

4. Create a Stripe webhook endpoint pointing to:
   - `https://<your-backend-domain>/api/payment/webhook`

5. Copy the webhook signing secret (`whsec_...`) into:
   - `STRIPE_WEBHOOK_SECRET`

Recommended webhook events to enable:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

## 4) Quick verification

- Backend health: `GET https://<backend>/api/health`
- Frontend can call backend with cookies (auth): log in, then refresh `/dashboard`
- Pricing checkout:
  - Open `/pricing`
  - Click Starter/Pro checkout
  - If you see “Missing Stripe Price ID…”, it means the `STRIPE_PRICE_*` env vars aren’t set in Render.

## 5) Known note: Lifetime plan

The codebase supports `tier = lifetime` at the entitlement level, but Stripe “Lifetime” as a one-time purchase flow may require additional wiring (separate one-time Checkout session or PaymentIntent + fulfillment).
If you want, tell me whether Lifetime should be **one-time Stripe Checkout** or **manual admin grant**, and I’ll implement the minimal flow.
