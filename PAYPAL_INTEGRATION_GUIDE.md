# PayPal Integration Guide - Trade Tutor

## ✅ Integration Complete

Your Trade Tutor app now has a complete PayPal payment integration with:
- **PayPal Subscription Buttons** - Recurring billing through PayPal
- **Card Fields** - Direct credit/debit card payments with 3DS authentication
- **Refund Capability** - Full or partial refunds for captures
- **Error Handling** - INSTRUMENT_DECLINED recovery with restart
- **Billing Address Collection** - Complete address fields for card payments

---

## 🔧 Setup Instructions

### 1. Environment Configuration

Update your `.env` file with PayPal credentials:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_actual_client_id_here
PAYPAL_SECRET=your_actual_secret_here
PAYPAL_WEBHOOK_ID=your_actual_webhook_id_here

# PayPal API Base
# Sandbox for testing: https://api-m.sandbox.paypal.com
# Live for production: https://api-m.paypal.com
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com

# PayPal Subscription Plan IDs (get from PayPal Dashboard)
PAYPAL_PLAN_STARTER_MONTHLY=P-XXXXXXXXXXXXXXXXXXXX
PAYPAL_PLAN_STARTER_YEARLY=P-XXXXXXXXXXXXXXXXXXXX
PAYPAL_PLAN_PRO_MONTHLY=P-XXXXXXXXXXXXXXXXXXXX
PAYPAL_PLAN_PRO_YEARLY=P-XXXXXXXXXXXXXXXXXXXX
```

### 2. Get PayPal Credentials

**For Sandbox (Testing):**
1. Visit https://developer.paypal.com/dashboard/applications/sandbox
2. Create or select an app
3. Copy **Client ID** and **Secret**

**For Production:**
1. Visit https://developer.paypal.com/dashboard/applications/live
2. Create or select an app
3. Copy **Client ID** and **Secret**

### 3. Create Subscription Plans

1. Go to PayPal Dashboard > Billing Plans
2. Create 4 subscription plans:
   - **Starter Monthly**: $9.99/month
   - **Starter Yearly**: $99/year
   - **Pro Monthly**: $19.99/month
   - **Pro Yearly**: $199/year
3. Copy each Plan ID (format: `P-XXXXXXXXXXXXXXXXXXXX`)
4. Paste into `.env` file

### 4. Set Up Webhooks

1. Go to PayPal Dashboard > Webhooks
2. Create a webhook endpoint: `https://your-domain.com/api/payment/paypal/webhook`
3. Subscribe to these events:
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.SUSPENDED`
   - `BILLING.SUBSCRIPTION.UPDATED`
   - `PAYMENT.SALE.COMPLETED`
4. Copy Webhook ID and paste into `.env`

---

## 🚀 Running the Application

### Start Virtual Environment

```powershell
# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Run Flask application
python run.py
```

### Start Frontend (separate terminal)

```powershell
cd client
npm install
npm run dev
```

---

## 🧪 Testing Guide

### Test Card Numbers (Sandbox)

Use these test cards in sandbox environment:

| Card Number         | Type       | 3DS Auth |
|---------------------|------------|----------|
| 4032039812345677    | Visa       | Yes      |
| 5425233430109903    | Mastercard | Yes      |
| 378282246310005     | Amex       | No       |
| 6011111111111117    | Discover   | No       |

### Test Scenarios

**1. PayPal Subscription Flow**
- Navigate to `/pricing`
- Ensure "PayPal Subscription" is selected
- Click on a plan button
- Login with sandbox PayPal account
- Approve subscription
- Verify redirect to success page

**2. Card Fields Flow**
- Navigate to `/pricing`
- Toggle to "Credit/Debit Card"
- Enter test card details
- Fill billing address
- Click "Pay Now"
- Complete 3DS authentication if prompted
- Verify payment success

**3. INSTRUMENT_DECLINED Handling**
- Use declined card: `4000000000000002`
- Attempt payment
- System should prompt to try another payment method

**4. Test Refunds**
- Complete a card payment
- Get capture ID from admin/logs
- Call refund API:
```bash
POST /api/payment/paypal/captures/{capture_id}/refund
{
  "amount": "9.99",
  "currency": "USD"
}
```

### Testing Webhooks Locally

Use ngrok to test webhooks on localhost:

```bash
ngrok http 5000
```

Update PayPal webhook URL to ngrok URL.

---

## 📋 API Endpoints

### Payment Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payment/paypal/config` | GET | Get PayPal client config |
| `/api/payment/paypal/activate-subscription` | POST | Activate PayPal subscription |
| `/api/payment/paypal/cancel-subscription` | POST | Cancel PayPal subscription |
| `/api/payment/paypal/orders` | POST | Create PayPal order |
| `/api/payment/paypal/orders/<order_id>/capture` | POST | Capture payment |
| `/api/payment/paypal/captures/<capture_id>/refund` | POST | Refund payment |
| `/api/payment/paypal/webhook` | POST | Handle PayPal webhooks |

---

## 🔒 Security Features

✅ **3D Secure (3DS)** - SCA_WHEN_REQUIRED for EU compliance  
✅ **Client-side validation** - PayPal hosted card fields  
✅ **Webhook verification** - PayPal signature validation  
✅ **Rate limiting** - 10 requests/minute for payments  
✅ **Authentication required** - All payment routes require login  

---

## 🐛 Troubleshooting

### Card Fields Not Showing
- Check browser console for JavaScript errors
- Verify PayPal SDK loaded with `card-fields` component
- Ensure `cardFields.isEligible()` returns true

### Subscription Buttons Not Working
- Verify Plan IDs are correct in `.env`
- Check PayPal API credentials
- Ensure API base URL is correct (sandbox vs live)

### Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check webhook event subscriptions in PayPal Dashboard
- Review Flask logs for webhook errors

### Payment Not Updating User Subscription
- Check database logs for errors
- Verify user is logged in
- Review payment_service.py logic

---

## 📖 Additional Resources

- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal JavaScript SDK Reference](https://developer.paypal.com/sdk/js/reference/)
- [PayPal Orders API](https://developer.paypal.com/docs/api/orders/v2/)
- [PayPal Subscriptions API](https://developer.paypal.com/docs/api/subscriptions/v1/)
- [PayPal Webhooks Guide](https://developer.paypal.com/api/rest/webhooks/)

---

## 🎯 Going Live Checklist

- [ ] Complete production onboarding in PayPal Dashboard
- [ ] Request Expanded Credit and Debit Card Payments
- [ ] Update `.env` with live credentials
- [ ] Change `PAYPAL_API_BASE` to `https://api-m.paypal.com`
- [ ] Create live subscription plans
- [ ] Set up live webhook endpoint
- [ ] Test all payment flows in production
- [ ] Monitor logs for errors
- [ ] Set up payment reconciliation process

---

## 💡 Features Implemented

### Frontend (`client/src/pages/PricingPage.tsx`)
- ✅ Payment method toggle (Subscription vs Card)
- ✅ PayPal subscription buttons for 4 plans
- ✅ Card Fields with labels and styling
- ✅ Billing address collection (street, city, state, zip, country)
- ✅ INSTRUMENT_DECLINED error recovery
- ✅ User-friendly error messages via toast notifications

### Backend (`app/services/payment_service.py`)
- ✅ PayPal order creation with pricing
- ✅ 3DS authentication support (SCA_WHEN_REQUIRED)
- ✅ Payment capture and subscription activation
- ✅ Refund capability (full and partial)
- ✅ Subscription management
- ✅ Webhook event handling

### Routes (`app/blueprints/payment/routes.py`)
- ✅ RESTful API endpoints
- ✅ Rate limiting protection
- ✅ Authentication requirements
- ✅ Comprehensive error handling

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review application logs
3. Check PayPal Developer Dashboard for API errors
4. Review PayPal documentation

Happy integrating! 🎉
