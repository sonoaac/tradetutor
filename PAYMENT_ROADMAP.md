# 💳 Payment Integration Roadmap

## ✅ Phase 1: Database & Tier System (COMPLETED)

### Models Created:
- ✅ **User** - Added `tier`, `tier_source`, `tier_expires_at`
- ✅ **BillingAccount** - Tracks Stripe/PayPal customer IDs
- ✅ **BillingSubscription** - Manages active subscriptions
- ✅ **BillingEvent** - Webhook event log for debugging

### Entitlements Service:
- ✅ `get_user_entitlements(user)` - Single source of truth for permissions
- ✅ Tier configs for: `free`, `starter`, `pro`, `lifetime`

### Next Step:
```bash
python migrate_billing.py
```

---

## 📋 Phase 2: Tier Enforcement (TODO)

### Backend Endpoints to Protect:

1. **Trading Endpoints** (`app/blueprints/trading/routes.py`)
   - Check `check_trade_limit()` before allowing trade
   - Validate `can_access_asset()` for asset selection

2. **Lesson Endpoints** (`app/blueprints/lessons/routes.py`)
   - Check `can_access_lesson()` before serving content

3. **RTT Coach Endpoint** (`app/blueprints/api/routes.py`)
   - Check `can_use_rtt()` before providing coaching

### Example Protection Pattern:
```python
from app.services.entitlements import get_user_entitlements, can_access_asset

@bp.route('/api/trade', methods=['POST'])
@login_required
def create_trade():
    data = request.json
    symbol = data.get('symbol')
    
    # Check entitlements
    if not can_access_asset(current_user, symbol):
        return jsonify({'error': 'Asset not available in your tier'}), 403
    
    # ... rest of trade logic
```

---

## 🎨 Phase 3: Pricing UI & Checkout Buttons (TODO)

### Frontend Changes:

1. **Update Dashboard.tsx** - Add checkout button handlers
2. **Create Checkout Flow** - Modal or redirect to checkout
3. **Add Success/Cancel Pages** - Post-payment flow

### API Endpoints Needed:
```python
POST /api/billing/stripe/checkout       # Create Stripe session
POST /api/billing/paypal/checkout       # Create PayPal order
POST /api/billing/lifetime              # One-time lifetime purchase
GET  /api/billing/portal                # Manage subscription
POST /api/billing/cancel                # Cancel subscription
```

---

## 💰 Phase 4: Stripe Integration (TODO)

### Setup:
1. Install: `pip install stripe`
2. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Create Products in Stripe Dashboard:
- **Starter** - $4.99/month (price_...)
- **Pro** - $9.99/month (price_...)

### Implement:
1. **Checkout Session** - `/api/billing/stripe/checkout`
2. **Webhook Handler** - `/api/webhooks/stripe`
3. **Events to Handle**:
   - `checkout.session.completed` → Create subscription
   - `customer.subscription.updated` → Update tier
   - `customer.subscription.deleted` → Downgrade to free
   - `invoice.payment_failed` → Mark as past_due

### Webhook Processing:
```python
@bp.route('/webhooks/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    # Verify webhook
    event = stripe.Webhook.construct_event(
        payload, sig_header, webhook_secret
    )
    
    # Log event (idempotency check)
    existing = BillingEvent.query.filter_by(
        provider='stripe',
        event_id=event.id
    ).first()
    
    if existing:
        return jsonify({'status': 'already_processed'}), 200
    
    # Create event log
    billing_event = BillingEvent(
        provider='stripe',
        event_id=event.id,
        event_type=event.type,
        payload=event.to_dict()
    )
    db.session.add(billing_event)
    
    # Process event...
    # Update user tier, subscription status, etc.
    
    billing_event.processed = True
    billing_event.processed_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({'status': 'success'}), 200
```

---

## 💳 Phase 5: PayPal Integration (TODO)

### Setup:
1. Install: `pip install paypalrestsdk`
2. Add to `.env`:
   ```
   PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   PAYPAL_MODE=sandbox  # or 'live'
   PAYPAL_WEBHOOK_ID=...
   ```

### Create Plans in PayPal:
- **Starter** - $4.99/month (PLAN-...)
- **Pro** - $9.99/month (PLAN-...)

### Implement:
1. **Subscription Creation** - `/api/billing/paypal/checkout`
2. **Webhook Handler** - `/api/webhooks/paypal`
3. **Events to Handle**:
   - `BILLING.SUBSCRIPTION.ACTIVATED` → Create subscription
   - `BILLING.SUBSCRIPTION.UPDATED` → Update status
   - `BILLING.SUBSCRIPTION.CANCELLED` → Downgrade
   - `BILLING.SUBSCRIPTION.EXPIRED` → Downgrade
   - `PAYMENT.SALE.COMPLETED` → For one-time lifetime purchase

---

## 🔐 Phase 6: Production Ready (TODO)

### Before Launch Checklist:

#### Database:
- [ ] Migrate from SQLite to PostgreSQL
- [ ] Set up database backups
- [ ] Add database indexes for performance

#### Security:
- [ ] HTTPS enabled (SSL certificate)
- [ ] Secure cookies (`SESSION_COOKIE_SECURE=True`)
- [ ] CSRF protection enabled
- [ ] Rate limiting on checkout endpoints

#### Environment Variables:
- [ ] All secrets in environment (not in code)
- [ ] Webhook secrets properly configured
- [ ] Production API keys (not test keys)

#### Testing:
- [ ] Test full checkout flow (Stripe + PayPal)
- [ ] Test webhooks with Stripe CLI
- [ ] Test failed payments
- [ ] Test cancellations
- [ ] Test upgrades/downgrades
- [ ] Test lifetime purchase

#### Monitoring:
- [ ] Log all webhook events
- [ ] Monitor failed payments
- [ ] Alert on webhook processing errors
- [ ] Track conversion rates

---

## 🚀 Deployment

### Recommended Hosting:
- **Backend**: Railway, Render, or Heroku (Flask + PostgreSQL)
- **Frontend**: Vercel or Netlify (React)

### Environment Setup:
```bash
# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=live
PAYPAL_WEBHOOK_ID=...

# App
SECRET_KEY=your-production-secret-key
SESSION_COOKIE_SECURE=True
SESSION_COOKIE_HTTPONLY=True
SESSION_COOKIE_SAMESITE=Lax
```

---

## 📊 Pricing Structure

### Current Tiers:

| Tier | Price | SimCash | Assets | Lessons | Trades | RTT |
|------|-------|---------|--------|---------|--------|-----|
| **FREE** | $0 | $100 | 1 (BTN) | 1 | 1 ever | ❌ |
| **STARTER** | $4.99/mo | $20,000 | 8 free | All 6 | Unlimited | ❌ |
| **PRO** | $9.99/mo | $50,000 | All 20 | All 6 | Unlimited | ✅ |
| **LIFETIME** | $150 once | $50,000 | All 20 | All 6 | Unlimited | ✅ + VIP |

---

## 🛠️ Development Commands

```bash
# Run migration
python migrate_billing.py

# Test entitlements
python -c "from app import create_app; from app.models import User; from app.services.entitlements import get_user_entitlements; app = create_app(); with app.app_context(): user = User.query.first(); print(get_user_entitlements(user))"

# Test Stripe webhook locally
stripe listen --forward-to localhost:5000/api/webhooks/stripe

# Seed database with test user
python seed_users.py
```

---

## 📚 Documentation

- [Stripe Subscriptions](https://stripe.com/docs/billing/subscriptions/overview)
- [PayPal Subscriptions](https://developer.paypal.com/docs/subscriptions/)
- [Flask SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
