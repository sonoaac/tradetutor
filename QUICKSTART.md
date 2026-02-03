# Trade Tutor - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Start Flask Backend
```powershell
cd C:\Users\chuch\Downloads\Trade-Tutor\Trade-Tutor
$env:DATABASE_URL="sqlite:///trade_tutor.db"
$env:SECRET_KEY="dev-secret-key"
python run.py
```

✅ Should see: `* Running on http://127.0.0.1:5000`

### Step 2: Start Vite Frontend  
```powershell
# New terminal window
cd C:\Users\chuch\Downloads\Trade-Tutor\Trade-Tutor
npm run dev
```

✅ Should see: `Local: http://localhost:5173/`

### Step 3: Open Browser
Navigate to: `http://localhost:5173`

---

## 🎯 First-Time Setup (Database)

**Only if this is your first time running:**

```powershell
cd C:\Users\chuch\Downloads\Trade-Tutor\Trade-Tutor
$env:FLASK_APP="run.py"
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

---

## 📱 User Flow

### Browse Market (No Login Required)
1. Click **"Start Trading Now"** on landing page
2. Browse 50 training assets
3. Click any asset to see details
4. **Need login to trade** → Prompted when clicking "Trade" button

### Register & Start Trading
1. Click **"Log In"** → Switch to **"Register"**
2. Enter email + password → Create account
3. Get **$10,000 SimCash** automatically
4. Return to Market → Click "Trade" on any asset
5. Enter trade details:
   - Side: Buy or Sell
   - Size: Number of units
   - Stop Loss (optional but recommended)
   - Take Profit (optional)
6. Submit → Trade placed!

### Enable RTT Coaching (AI Mentor)
1. Go to Market page
2. Toggle **"RTT Mode"** switch (top right)
3. Click on any asset
4. See AI coaching panel with:
   - Buy/Sell/Hold recommendation
   - Technical indicators (RSI, MA9, MA21)
   - Coaching tips and warnings
   - Position sizing advice

### View Portfolio
1. Click **"Portfolio"** in sidebar
2. See:
   - Current SimCash balance
   - Open positions
   - Trade history
   - Total P&L

---

## 🎓 What to Try

### Test Market Hours
1. Browse Stock assets during **9:30 AM - 4:00 PM EST**
   - Market is open ✅
2. Try outside those hours:
   - Market closed ❌
   - RTT warns you

### Test RTT Coaching
1. Enable RTT Mode
2. Click on **SMBY** (SmartBuy)
3. See coaching advice:
   - If RSI > 70 → "Don't buy now (overbought)"
   - If RSI < 30 → "Cautious buy (oversold)"
   - Trend analysis
   - Position size recommendations

### Test Different Timeframes
- View Market → Click asset
- In Simulator (future feature): Select timeframe
  - 1m, 5m, 15m, 1h, 4h, 1d, 1w

### Test Trading
1. Place a BUY trade on **BTN** (BitNova)
   - Size: 0.5
   - Check balance decrease
2. Wait (or manually close)
3. Place SELL trade or Close position
4. See P&L calculation
5. Balance updates

---

## 🔧 Troubleshooting

### Flask Won't Start
**Error:** `ModuleNotFoundError: No module named 'flask'`
```powershell
python -m pip install -r requirements.txt
```

**Error:** Database not found
```powershell
flask db init
flask db migrate
flask db upgrade
```

### Vite Won't Start  
**Error:** `npm ERR! Missing script: "dev"`
```powershell
cd C:\Users\chuch\Downloads\Trade-Tutor\Trade-Tutor
npm install
npm run dev
```

### Market Page Shows Loading Forever
- ✅ Check Flask is running on port 5000
- ✅ Check browser console (F12) for errors
- ✅ Try hard refresh: `Ctrl + Shift + R`

### Can't Place Trades
- ✅ Are you logged in?
- ✅ Is your balance sufficient?
- ✅ Check Flask terminal for errors

---

## 📊 Key Endpoints to Test

### Market Data (No Auth Required)
```
GET http://localhost:5000/api/assets/search?class=all
GET http://localhost:5000/api/market/quote/SMBY
GET http://localhost:5000/api/market/candles/BTN?timeframe=1d&limit=120
GET http://localhost:5000/api/market/rtt/SMBY?side=buy
GET http://localhost:5000/api/market/status?class=stock
```

### Trading (Auth Required)
```
POST http://localhost:5000/trading/trades
  Body: {"symbol": "BTN", "side": "buy", "size": 1, "entryPrice": 5000}

GET http://localhost:5000/trading/portfolio
GET http://localhost:5000/trading/trades
```

---

## 🎯 Features to Explore

### ✅ Working Now:
- Market browsing with 50 assets
- Real-time quote fetching
- Search and filter assets
- Register and login
- RTT AI coaching
- Place buy/sell trades
- Portfolio tracking
- P&L calculation
- Market hours simulation
- Time-of-day volatility
- Realistic candles

### 🚧 Coming Soon:
- Simulator page with live charts
- Trade receipts UI
- Challenges and leaderboards
- Lesson system
- Payment integration

---

## 💡 Pro Tips

### For Learning:
1. **Always use stop-losses** → RTT will remind you
2. **Start small** → 1-2% position sizes
3. **Follow RTT advice** → Especially as a beginner
4. **Review your trades** → Check Portfolio history
5. **Avoid trading at market open** → High volatility

### For Testing:
1. **Reset portfolio** → POST `/trading/portfolio/reset`
2. **Try different assets** → Each has unique volatility
3. **Test tier system** → Free users see limited assets
4. **Check RTT free mode** → Add `?free_mode=true` to API
5. **Test offline mode** → Stop Flask, Market still works

---

## 📝 Quick Reference

### Asset Classes
| Class | Open Hours | Volatility | Example |
|-------|------------|------------|---------|
| Stock | 9:30 AM - 4 PM EST | Medium | SMBY |
| Crypto | 24/7 | High | BTN |
| Forex | 24/5 (Mon-Fri) | Low | USXEUR |
| Index | 9:30 AM - 4 PM EST | Low | TOP500 |

### Tiers
| Tier | Access | Cost |
|------|--------|------|
| Free | 2-3 assets | $0 |
| Gold | 10+ assets | $10/mo |
| Premium | All 50 assets | $25/mo |

### RTT Signals
| Signal | Meaning | Action |
|--------|---------|--------|
| BUY | Strong uptrend | Enter long |
| CAUTIOUS BUY | Oversold bounce | Small size + stop-loss |
| HOLD | Neutral | Wait for clearer signal |
| WAIT | Near resistance | Patience required |
| DON'T BUY | Overbought/Downtrend | Avoid entry |

---

## 🆘 Need Help?

1. **Check FEATURES_UPDATE.md** → Full feature documentation
2. **Check README.md** → Project overview
3. **Browser Console** → F12 for error messages
4. **Flask Terminal** → Backend errors
5. **GitHub Issues** → Report bugs

---

## 🎉 You're Ready!

**Open** `http://localhost:5173` and **start trading risk-free!**

Remember: This is for **education only** → Not real money, not financial advice.

---

*Happy Learning! 📚💹*
