# 🚀 PayPal Integration Quick Start

## Complete Setup Checklist

Follow these steps in order to get your PayPal integration working:

### ✅ Step 1: PayPal Developer Account Setup (5 minutes)

- [ ] Go to https://developer.paypal.com/
- [ ] Sign in with your PayPal account
- [ ] Navigate to **Dashboard** > **Apps & Credentials**
- [ ] Switch to **Sandbox** tab for testing

### ✅ Step 2: Create Sandbox App (2 minutes)

- [ ] Click **Create App** button
- [ ] Enter app name: "Trade Tutor Sandbox"
- [ ] Click **Create App**
- [ ] Copy **Client ID** (starts with `A...`)
- [ ] Click **Show** under Secret and copy **Secret**

### ✅ Step 3: Create Subscription Plans (10 minutes)

Go to https://www.paypal.com/billing/plans (or Dashboard > Billing Plans)

**Plan 1: Starter Monthly**
- [ ] Click **Create Plan**
- [ ] Name: "Starter Monthly"
- [ ] Billing cycle: Every 1 month
- [ ] Price: $9.99 USD
- [ ] Setup: Auto-renewing
- [ ] Click **Save**
- [ ] Copy Plan ID (format: `P-XXXXXXXXXXXXXXXXXXXX`)

**Plan 2: Starter Yearly**
- [ ] Create new plan
- [ ] Name: "Starter Yearly"  
- [ ] Billing cycle: Every 1 year
- [ ] Price: $99.99 USD
- [ ] Click **Save**
- [ ] Copy Plan ID

**Plan 3: Pro Monthly**
- [ ] Create new plan
- [ ] Name: "Pro Monthly"
- [ ] Billing cycle: Every 1 month
- [ ] Price: $19.99 USD
- [ ] Click **Save**
- [ ] Copy Plan ID

**Plan 4: Pro Yearly**
- [ ] Create new plan
- [ ] Name: "Pro Yearly"
- [ ] Billing cycle: Every 1 year
- [ ] Price: $179.99 USD
- [ ] Click **Save**
- [ ] Copy Plan ID

### ✅ Step 4: Set Up Webhook (5 minutes)

- [ ] Go to Dashboard > **Webhooks**
- [ ] Click **Add Webhook**
- [ ] Webhook URL: `https://your-domain.com/api/payment/paypal/webhook`
  - For local testing, use ngrok: `https://your-ngrok-url.ngrok.io/api/payment/paypal/webhook`
- [ ] Select **All events** or specific events:
  - `BILLING.SUBSCRIPTION.ACTIVATED`
  - `BILLING.SUBSCRIPTION.CANCELLED`
  - `BILLING.SUBSCRIPTION.SUSPENDED`
  - `BILLING.SUBSCRIPTION.UPDATED`
  - `PAYMENT.SALE.COMPLETED`
- [ ] Click **Save**
- [ ] Copy **Webhook ID**

### ✅ Step 5: Update .env File (3 minutes)

Open `.env` file and update these values:

```env
# PayPal Sandbox Credentials
PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_SECRET=your_secret_here
PAYPAL_WEBHOOK_ID=your_webhook_id_here

# API Base (Sandbox for testing)
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com

# Subscription Plan IDs
PAYPAL_PLAN_STARTER_MONTHLY=P-your_plan_id_here
PAYPAL_PLAN_STARTER_YEARLY=P-your_plan_id_here
PAYPAL_PLAN_PRO_MONTHLY=P-your_plan_id_here
PAYPAL_PLAN_PRO_YEARLY=P-your_plan_id_here
```

**✅ All values filled in without "your_" placeholders**

### ✅ Step 6: Install Dependencies (2 minutes)

```powershell
# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Verify PayPal SDK installed
python -c "import paypal; print('PayPal SDK installed!')"
```

If error, run:
```powershell
pip install paypal-server-sdk==1.0.0
```

### ✅ Step 7: Test Backend Configuration (2 minutes)

```powershell
# Start Flask app
python run.py
```

**Check logs for:**
- ✅ No errors about missing environment variables
- ✅ Flask server starts on http://127.0.0.1:5000
- ✅ Routes registered successfully

### ✅ Step 8: Test Frontend (2 minutes)

Open new terminal:

```powershell
cd client
npm install
npm run dev
```

**Open browser to:** http://localhost:5173/pricing

**Verify:**
- [ ] Page loads without errors
- [ ] Payment method toggle visible
- [ ] 4 pricing cards visible
- [ ] No console errors in browser DevTools

### ✅ Step 9: Test PayPal Buttons (5 minutes)

- [ ] Select **"PayPal Subscription"** toggle
- [ ] Click button on any plan
- [ ] PayPal popup appears (sandbox)
- [ ] Login with sandbox account or create test buyer
- [ ] Complete payment flow
- [ ] Redirected back to success page

**If buttons don't show:** Check browser console for errors

### ✅ Step 10: Test Card Fields (5 minutes)

- [ ] Select **"Credit/Debit Card"** toggle
- [ ] Card input fields appear
- [ ] Enter test card: `4032039812345677`
- [ ] CVV: `123`, Expiry: any future date
- [ ] Fill billing address
- [ ] Click **"Pay Now"**
- [ ] 3DS popup may appear (complete authentication)
- [ ] Payment succeeds
- [ ] Redirected to success page

### ✅ Step 11: Verify Database (2 minutes)

```python
# In Python shell
from app import create_app
from app.models.user import User
from app.extensions import db

app = create_app()
with app.app_context():
    user = User.query.first()
    print(f"Tier: {user.tier}")
    print(f"Premium: {user.is_premium}")
    print(f"RTT: {user.rtt_enabled}")
```

**Expected for Pro plan:**
- Tier: `pro`
- Premium: `True`
- RTT: `True`

### ✅ Step 12: Test Webhook (Optional - 5 minutes)

**For local testing, use ngrok:**

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 5000
```

- [ ] Copy ngrok URL (e.g., `https://abc123.ngrok.io`)
- [ ] Update PayPal webhook URL to: `https://abc123.ngrok.io/api/payment/paypal/webhook`
- [ ] Complete a payment
- [ ] Check Flask logs for webhook received

---

## 🎉 Setup Complete!

You now have:
- ✅ PayPal Subscription Buttons working
- ✅ Card Fields with 3DS authentication
- ✅ Billing address collection
- ✅ Payment processing and user tier updates
- ✅ Webhook integration (if configured)

## 📝 Next Steps

1. **Test all 4 subscription plans** with test cards
2. **Review logs** for any errors or warnings
3. **Test cancellation flow** (cancel subscription)
4. **Test error scenarios** (declined cards)
5. **Review** [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing

## 🚨 Troubleshooting

### Buttons Not Showing
```
Problem: PayPal buttons don't render
Solution: 
1. Check browser console for errors
2. Verify PAYPAL_CLIENT_ID in .env
3. Verify Plan IDs are correct
4. Check Flask logs for API errors
```

### Card Fields Not Appearing
```
Problem: Card input fields don't show
Solution:
1. Toggle to "Credit/Debit Card" option
2. Check browser console for cardFields errors
3. Verify SDK loaded with card-fields component
4. Refresh page and try again
```

### Payment Not Updating User
```
Problem: Payment succeeds but user tier not updated
Solution:
1. Check Flask logs for errors
2. Verify database connection
3. Check payment_service.py capture logic
4. View payment table in database
```

### Webhook Not Received
```
Problem: Webhook events not triggering
Solution:
1. Use ngrok for local testing
2. Verify webhook URL in PayPal Dashboard
3. Check event subscriptions
4. Review Flask logs
```

## 📞 Need Help?

1. Check **[PAYPAL_INTEGRATION_GUIDE.md](PAYPAL_INTEGRATION_GUIDE.md)** for detailed docs
2. Review **[TESTING_GUIDE.md](TESTING_GUIDE.md)** for test scenarios
3. Check Flask application logs
4. Review browser console for frontend errors
5. Visit PayPal Developer Dashboard for API errors

---

**Estimated Total Setup Time: 40-50 minutes**

Ready to accept payments! 💰
