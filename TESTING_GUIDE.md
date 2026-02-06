# PayPal Testing Quick Reference

## 🧪 Test Card Numbers (Sandbox Only)

### Cards with 3D Secure
| Card Number         | Type       | Brand      | CVV | Exp Date |
|---------------------|------------|------------|-----|----------|
| 4032039812345677    | Credit     | Visa       | Any | Future   |
| 5425233430109903    | Credit     | Mastercard | Any | Future   |

### Cards without 3D Secure
| Card Number         | Type       | Brand      | CVV | Exp Date |
|---------------------|------------|------------|-----|----------|
| 378282246310005     | Credit     | Amex       | Any | Future   |
| 6011111111111117    | Credit     | Discover   | Any | Future   |
| 4012000033330026    | Credit     | Visa       | Any | Future   |

### Declined Cards (For Error Testing)
| Card Number         | Result              |
|---------------------|---------------------|
| 4000000000000002    | Generic Decline     |
| 4000000000009995    | Insufficient Funds  |
| 4000000000009987    | Lost Card           |
| 4000000000009979    | Stolen Card         |

## 🧪 Test Billing Addresses

### US Address (Success)
```
Street: 123 Main Street
City: San Francisco
State: CA
ZIP: 94102
Country: US
```

### US Address (3DS Test)
```
Street: 1 Main St
City: San Jose
State: CA
ZIP: 95131
Country: US
```

## 🔐 Sandbox PayPal Accounts

Create test accounts at: https://developer.paypal.com/dashboard/accounts

### Personal Account (Buyer)
- Email: buyer@example.com
- Password: Set in PayPal Dashboard

### Business Account (Seller)
- Email: seller@example.com
- Password: Set in PayPal Dashboard

## ✅ Test Scenarios Checklist

### Basic Payment Flow
- [ ] Load pricing page (both payment methods visible)
- [ ] Toggle between PayPal Subscription and Card payment
- [ ] Complete payment with PayPal subscription button
- [ ] Complete payment with Card Fields
- [ ] Verify user subscription status updated
- [ ] Check payment record in database

### Card Fields Validation
- [ ] Enter invalid card number (shows error)
- [ ] Enter expired date (shows error)
- [ ] Enter invalid CVV (shows error)
- [ ] Leave fields empty and submit (shows validation)
- [ ] Enter valid card details (payment succeeds)

### 3D Secure Flow
- [ ] Use 3DS card (4032039812345677)
- [ ] Complete 3DS authentication popup
- [ ] Payment succeeds after authentication
- [ ] Verify liability shift response

### Error Handling
- [ ] Use declined card (shows error message)
- [ ] Test with INSTRUMENT_DECLINED (prompts restart)
- [ ] Test network error (shows retry option)
- [ ] Cancel PayPal popup (returns to pricing page)

### Subscription Management
- [ ] Subscribe to Starter Monthly
- [ ] Upgrade to Pro Monthly (cancel + new)
- [ ] Subscribe to Yearly plan
- [ ] Cancel subscription
- [ ] Verify tier downgrade on period end

### Webhook Testing
- [ ] Complete payment
- [ ] Verify webhook received
- [ ] Check database updated correctly
- [ ] Test subscription cancelled webhook
- [ ] Test payment completed webhook

### Refund Testing
- [ ] Complete a card payment
- [ ] Issue full refund via API
- [ ] Issue partial refund
- [ ] Verify refund status in PayPal
- [ ] Check user subscription status

## 🚨 Common Issues & Solutions

### Issue: Card Fields Not Rendering
**Solution:** 
- Open browser console
- Check for JavaScript errors
- Verify SDK loaded: `window.paypal.CardFields`
- Ensure client ID is correct

### Issue: Payment Stuck on Processing
**Solution:**
- Check Flask logs for errors
- Verify PayPal API credentials
- Check network tab for API failures
- Ensure webhook URL is accessible

### Issue: 3DS Authentication Not Showing
**Solution:**
- Use 3DS test card (4032039812345677)
- Check payment_source includes verification
- Verify SCA_WHEN_REQUIRED in order creation
- Test in incognito/private window

### Issue: Webhook Not Received
**Solution:**
- Use ngrok for local testing
- Verify webhook URL in PayPal Dashboard
- Check webhook event subscriptions
- Review Flask logs for webhook errors

## 📊 Testing Matrix

| Test Case | PayPal Button | Card Fields | Expected Result |
|-----------|---------------|-------------|-----------------|
| Starter Monthly | ✅ | ✅ | $9.99 charged, tier=starter |
| Starter Yearly | ✅ | ✅ | $99 charged, tier=starter |
| Pro Monthly | ✅ | ✅ | $19.99 charged, tier=pro, RTT enabled |
| Pro Yearly | ✅ | ✅ | $199 charged, tier=pro, RTT enabled |
| Cancel Payment | ✅ | ❌ | Return to pricing page |
| Declined Card | ❌ | ✅ | Show error, allow retry |
| 3DS Auth | ❌ | ✅ | Show 3DS popup, then complete |

## 🔍 Debugging Commands

### Check PayPal Configuration
```python
from app.services.payment_service import PaymentService
ps = PaymentService()
config = ps.get_paypal_config()
print(config)
```

### Test PayPal API Connection
```python
ps = PaymentService()
token = ps._get_paypal_access_token()
print(f"Token: {token[:20]}...")
```

### Check User Subscription
```python
from app.models.user import User
user = User.query.filter_by(email='test@example.com').first()
print(f"Tier: {user.tier}, Premium: {user.is_premium}, RTT: {user.rtt_enabled}")
```

### View Payment Records
```python
from app.models.payment import Payment
payments = Payment.query.order_by(Payment.created_at.desc()).limit(10).all()
for p in payments:
    print(f"{p.id}: {p.amount} {p.currency} - {p.status}")
```

## 📝 Test Report Template

```markdown
## PayPal Integration Test Report

**Date:** [Date]
**Environment:** Sandbox / Production
**Tester:** [Name]

### Test Results

#### PayPal Subscription Buttons
- [ ] Starter Monthly: PASS / FAIL - [Notes]
- [ ] Starter Yearly: PASS / FAIL - [Notes]
- [ ] Pro Monthly: PASS / FAIL - [Notes]
- [ ] Pro Yearly: PASS / FAIL - [Notes]

#### Card Fields
- [ ] Card input validation: PASS / FAIL - [Notes]
- [ ] Billing address collection: PASS / FAIL - [Notes]
- [ ] 3DS authentication: PASS / FAIL - [Notes]
- [ ] Error handling: PASS / FAIL - [Notes]

#### Backend
- [ ] Order creation: PASS / FAIL - [Notes]
- [ ] Payment capture: PASS / FAIL - [Notes]
- [ ] User tier update: PASS / FAIL - [Notes]
- [ ] Webhook processing: PASS / FAIL - [Notes]

#### Issues Found
1. [Issue description]
2. [Issue description]

#### Recommendations
- [Recommendation]
```

---

**Ready to test?** Start with the basic payment flow using test cards! 🚀
