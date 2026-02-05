# Payment System Setup Guide

This guide will help you set up and test the Stripe payment integration in Trade Tutor.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Python environment with dependencies installed
3. Node.js environment for the frontend

## Step 1: Get Stripe Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

## Step 2: Configure Environment Variables

Add these to your `.env` file (or create one from `.env.example`):

```env
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:5173
```

## Step 3: Create Stripe Products and Prices

You need to create products in Stripe Dashboard for your subscription plans:

### Option A: Using Stripe Dashboard (Recommended for Testing)

1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"

**For Starter Plan:**
- Name: "Starter Plan"
- Pricing: Recurring
- Monthly Price: $9.99
- Copy the Price ID (starts with `price_`) and update `payment_service.py`:
  ```python
  'starter_monthly': 'price_YOUR_ACTUAL_PRICE_ID',
  ```

**For Starter Plan (Yearly):**
- Add another price: $99/year
- Update the price ID in `payment_service.py`

**For Pro Plan:**
- Create another product: "Pro Trader Plan"
- Monthly: $19.99
- Yearly: $199
- Update both price IDs in `payment_service.py`

### Option B: Using Stripe CLI

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli

# Create Starter Monthly
stripe products create --name="Starter Plan" --description="Perfect for beginners"
stripe prices create --product=prod_XXX --unit-amount=999 --currency=usd --recurring[interval]=month

# Create Starter Yearly
stripe prices create --product=prod_XXX --unit-amount=9900 --currency=usd --recurring[interval]=year

# Create Pro Monthly
stripe products create --name="Pro Trader Plan" --description="For serious traders"
stripe prices create --product=prod_YYY --unit-amount=1999 --currency=usd --recurring[interval]=month

# Create Pro Yearly
stripe prices create --product=prod_YYY --unit-amount=19900 --currency=usd --recurring[interval]=year
```

## Step 4: Update Price IDs

Edit `app/services/payment_service.py` and update the `PRICE_IDS` dictionary:

```python
PRICE_IDS = {
    'starter_monthly': 'price_XXX',  # Your actual price ID
    'starter_yearly': 'price_YYY',
    'pro_monthly': 'price_ZZZ',
    'pro_yearly': 'price_AAA',
}
```

## Step 5: Run Database Migrations

The payment tables should already be in your database schema. If not, run:

```bash
flask db migrate -m "Add payment tables"
flask db upgrade
```

## Step 6: Test the Payment Flow

1. Start your Flask backend:
```bash
python run.py
```

2. Start your frontend:
```bash
cd client
npm run dev
```

3. Navigate to `http://localhost:5173/pricing`

4. Click "Get Started" on any plan

5. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC

6. Complete the checkout - you'll be redirected to the success page

## Step 7: Setup Webhooks (For Production)

### Local Testing with Stripe CLI:

```bash
# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:5000/api/payment/webhook

# Copy the webhook signing secret (starts with whsec_)
# Add it to your .env as STRIPE_WEBHOOK_SECRET
```

### Production Setup:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/payment/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to your production environment

## Testing Subscription Management

1. After creating a subscription, go to `/subscription`
2. You can:
   - View subscription details
   - Manage billing (opens Stripe Customer Portal)
   - Cancel subscription

## Troubleshooting

### "Invalid price ID" error
- Make sure you've created products in Stripe Dashboard
- Update the price IDs in `payment_service.py`

### Webhook errors
- Check that `STRIPE_WEBHOOK_SECRET` is set correctly
- Use `stripe listen` for local testing
- Check Flask logs for detailed error messages

### Checkout session creation fails
- Verify `STRIPE_SECRET_KEY` is correct
- Check that user is logged in
- Ensure `FRONTEND_URL` is set correctly

## Monitoring Payments

1. **Stripe Dashboard**: https://dashboard.stripe.com/test/payments
2. **Customer Portal**: Test at https://dashboard.stripe.com/test/customers
3. **Webhooks Log**: https://dashboard.stripe.com/test/webhooks

## Going to Production

Before going live:

1. Switch to live mode API keys (starts with `pk_live_` and `sk_live_`)
2. Test with real cards (small amounts)
3. Set up production webhooks endpoint
4. Configure proper error logging
5. Set up email notifications for failed payments
6. Review Stripe's compliance requirements

## Payment Pages

The following pages are now available:

- `/pricing` - View and select subscription plans
- `/payment/success` - Shown after successful payment
- `/payment/cancel` - Shown when user cancels checkout
- `/subscription` - Manage active subscription

## API Endpoints

- `POST /api/payment/create-checkout-session` - Create Stripe checkout
- `POST /api/payment/create-portal-session` - Open customer portal
- `GET /api/payment/subscription` - Get user's subscription
- `POST /api/payment/cancel-subscription` - Cancel at period end
- `POST /api/payment/webhook` - Handle Stripe webhooks
- `GET /api/payment/config` - Get publishable key

## Support

For issues:
- Stripe Dashboard: https://dashboard.stripe.com/test/logs
- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
