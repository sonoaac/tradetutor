# Deployment Guide - Trade Tutor with PayPal

## What Was Fixed

### 1. **Authentication Issue (CRITICAL)**
- **Problem**: Database tables weren't created on app startup
- **Cause**: Flask migrations needed to be run before signup/login could work
- **Solution**: Run `flask db upgrade` to initialize database schema

### 2. **PayPal Plan IDs Missing**
- **Problem**: Plan IDs were placeholders in .env
- **Solution**: Added all 4 plan IDs from PayPal Dashboard to .env

### 3. **Blueprint Registration Issue (ALREADY FIXED)**
- **Problem**: Payment blueprint circular import prevented route registration
- **Solution**: Fixed `app/blueprints/payment/__init__.py` import structure

---

## Local Development Setup

### 1. First Time Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py

# Or manually run migrations
flask db upgrade
```

### 2. Run the App
```bash
# Backend (Flask) - terminal 1
python run.py

# Frontend (Vite) - terminal 2
cd client
npm run dev
```

### 3. Test Signup & Login
1. Open http://localhost:5173
2. Click "Sign up"
3. Fill in email, password, first name, last name
4. Click "Create Account"
5. Should redirect to dashboard
6. Test login on the same page

---

## Render Deployment Steps

### Step 1: Ensure Code is Pushed
```bash
git push  # ✓ Already done
```

### Step 2: Add Environment Variables to Render

Go to: **https://dashboard.render.com** → Select Trade-Tutor Service → **Environment**

Add these variables:

```
PAYPAL_CLIENT_ID=<your_client_id>
PAYPAL_SECRET=<your_secret>
PAYPAL_WEBHOOK_ID=<your_webhook_id>
PAYPAL_API_BASE=https://api-m.paypal.com
PAYPAL_PLAN_STARTER_MONTHLY=P-10T31267SC831883NNGCXNFY
PAYPAL_PLAN_STARTER_YEARLY=P-4C60682351017391JNGCXQEA
PAYPAL_PLAN_PRO_MONTHLY=P-3L647236YD419215TNGCXRYY
PAYPAL_PLAN_PRO_YEARLY=P-4XB638751J2506536NGCXPKA
DATABASE_URL=<existing_database_url>
FRONTEND_URL=<your_frontend_url>
```

### Step 3: Update Build Command (if needed)

In Render Service Settings → **Build Command**, ensure it includes:
```bash
pip install -r requirements.txt && python init_db.py
```

Or add to **Start Command**:
```bash
python init_db.py && gunicorn app.wsgi:app
```

### Step 4: Trigger Redeploy

Click **"Redeploy Latest Commit"** in Render dashboard to apply changes.

---

## Testing Signup/Login After Deployment

1. Open your Render frontend URL
2. Navigate to signup page
3. Try creating a new account
4. Verify redirect to dashboard works
5. Try logging out and logging back in

---

## Database Migration (What Happens)

When `init_db.py` or `flask db upgrade` runs:

```
Creates tables:
✓ users (email, password_hash, tier, etc.)
✓ portfolios (balance, track, experience)
✓ trades (trade history)
✓ payments (payment records)
✓ lessons (course lessons)
✓ lesson_progress (user progress)
✓ billing_accounts (billing info)
✓ billing_subscriptions (subscription records)
✓ billing_events (payment events)
```

---

## Troubleshooting

### Issue: "no such table: users" error

**Solution**: Run migrations
```bash
# Local
flask db upgrade

# Or
python init_db.py
```

### Issue: PayPal buttons not showing on pricing page

**Check**:
1. Verify plan IDs are set in environment: `echo $PAYPAL_PLAN_STARTER_MONTHLY`
2. Verify client ID is set: `echo $PAYPAL_CLIENT_ID`
3. Call `/api/payment/paypal/config` endpoint to verify they're being served

### Issue: Signup works but can't login

**Possible causes**:
1. Different database instances (check `DATABASE_URL`)
2. Session cookie issues (verify `SESSION_COOKIE_SAMESITE` setting)
3. CORS issues (check frontend URL matches `FRONTEND_URL`)

---

## Files Modified

- `app/blueprints/payment/__init__.py` - Fixed circular import
- `app/blueprints/auth/routes.py` - Auto-login after signup
- `.env` - Added all PayPal plan IDs
- `.env.example` - Updated template
- `init_db.py` - Created database initialization script (NEW)

---

## Next Steps

1. ✓ Push code to GitHub
2. ✓ Add PayPal credentials to Render
3. ✓ Run database migrations on Render
4. Test signup/login
5. Test PayPal payment flow (subscription buttons + card fields)
6. Monitor Render logs for errors

---

## Support

If signup still fails:
1. Check Render logs: **Dashboard → Logs**
2. Look for database errors
3. Verify all environment variables are set
4. Check that migrations ran successfully

