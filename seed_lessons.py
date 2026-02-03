import os
import sys
from app import create_app, db
from app.models.lesson import Lesson

def seed_lessons():
    """Seed the database with comprehensive lesson content"""
    
    lessons_data = [
        {
            "title": "Trading Basics: Your First Steps",
            "slug": "trading-basics",
            "description": "Learn the fundamental concepts of trading: buying low, selling high, and managing risk.",
            "content": """# Trading Basics: Your First Steps

Welcome to your trading journey! In this lesson, you'll learn the core principles that every successful trader needs to know.

## What is Trading?

Trading is the act of buying and selling financial assets (like stocks) with the goal of making a profit. The fundamental principle is simple:

**Buy Low, Sell High**

This means you purchase an asset when the price is low and sell it when the price rises, capturing the difference as profit.

## Key Concepts

### 1. Long Positions (Buying)
When you **buy** a stock, you're taking a "long position." You profit when the price goes **up**.

**Example:** You buy 10 shares of AAPL at $150. The price rises to $160. You sell and make:
- Profit = (Selling Price - Buying Price) × Quantity
- Profit = ($160 - $150) × 10 = **$100**

### 2. Short Positions (Selling)
Advanced traders can also **sell first** (called "shorting") and buy back later. You profit when the price goes **down**.

**Example:** You short 10 shares of TSLA at $200. The price drops to $180. You buy back and make:
- Profit = (Selling Price - Buying Price) × Quantity
- Profit = ($200 - $180) × 10 = **$100**

### 3. Risk Management

**The Golden Rule:** Never risk more than 1-2% of your total capital on a single trade.

If you have $10,000, you should risk no more than $100-$200 per trade. This protects you from devastating losses.

## Market Orders vs Limit Orders

- **Market Order:** Buy/sell immediately at the current price
- **Limit Order:** Buy/sell only at a specific price or better

## Next Steps

Practice these concepts in the simulator! Start with small positions and gradually build your confidence.
""",
            "track": "fundamentals",
            "difficulty": "beginner",
            "order": 1,
            "quiz_data": {
                "questions": [
                    {
                        "question": "If you buy 50 shares of a stock at $20 and sell them at $25, what is your profit?",
                        "options": ["$100", "$250", "$500", "$1,250"],
                        "correct": 1,
                        "explanation": "Profit = ($25 - $20) × 50 = $5 × 50 = $250"
                    },
                    {
                        "question": "What does 'Buy Low, Sell High' mean?",
                        "options": [
                            "Buy when the stock is expensive",
                            "Purchase at a low price and sell when the price increases",
                            "Always buy the lowest-priced stock",
                            "Sell first, then buy"
                        ],
                        "correct": 1,
                        "explanation": "The fundamental principle of trading is buying when prices are low and selling when they rise to capture profit."
                    },
                    {
                        "question": "According to the golden rule, what percentage of your capital should you risk per trade?",
                        "options": ["10-15%", "5-10%", "1-2%", "0.5-1%"],
                        "correct": 2,
                        "explanation": "The golden rule of risk management is to never risk more than 1-2% of your total capital on a single trade."
                    }
                ]
            }
        },
        {
            "title": "Understanding Candlestick Charts",
            "slug": "candlestick-charts",
            "description": "Master the art of reading candlestick patterns to understand price movements and market sentiment.",
            "content": """# Understanding Candlestick Charts

Candlestick charts are the most popular way traders visualize price movements. Each "candle" tells a story about market sentiment.

## Anatomy of a Candlestick

Each candlestick represents price action during a specific time period (1 minute, 5 minutes, 1 hour, 1 day, etc.).

```
      Upper Wick (Shadow)
           ⎸
    ┌──────┴──────┐
    │             │  <- Body (Open to Close)
    └──────┬──────┘
           ⎸
      Lower Wick (Shadow)
```

### Four Key Prices:
1. **Open:** Price at the start of the period
2. **High:** Highest price reached
3. **Low:** Lowest price reached
4. **Close:** Price at the end of the period

## Green vs Red Candles

### 🟢 Green (Bullish) Candle
- **Close > Open**
- Buyers were in control
- Price went **up** during this period
- Bottom of body = Open price
- Top of body = Close price

### 🔴 Red (Bearish) Candle
- **Close < Open**
- Sellers were in control
- Price went **down** during this period
- Top of body = Open price
- Bottom of body = Close price

## Reading the Wicks

**Wicks (also called shadows)** show price rejection:

- **Long upper wick:** Price went high but buyers couldn't sustain it. Sellers pushed it down. **Bearish signal.**
- **Long lower wick:** Price went low but sellers couldn't sustain it. Buyers pushed it up. **Bullish signal.**
- **No wicks:** Strong conviction. The open/close were the high/low.

## Common Patterns

### Doji
A candle with almost no body (open ≈ close). Shows **indecision** in the market. Often signals a potential reversal.

### Hammer
Small body at the top, long lower wick. After a downtrend, this is **bullish** (buyers stepping in).

### Shooting Star
Small body at the bottom, long upper wick. After an uptrend, this is **bearish** (sellers stepping in).

## Timeframes

- **1-minute candles:** Day trading, scalping
- **5-minute candles:** Short-term trading
- **1-hour candles:** Swing trading
- **Daily candles:** Position trading, long-term analysis

## Practice

In the simulator, watch how candles form in real-time. Try to predict: will the next candle be green or red?
""",
            "track": "fundamentals",
            "difficulty": "beginner",
            "order": 2,
            "quiz_data": {
                "questions": [
                    {
                        "question": "What does a green candlestick indicate?",
                        "options": [
                            "The price closed lower than it opened",
                            "The price closed higher than it opened",
                            "The price didn't move",
                            "The volume was high"
                        ],
                        "correct": 1,
                        "explanation": "A green candle means buyers were in control and the price closed higher than it opened during that period."
                    },
                    {
                        "question": "What does a long lower wick on a candlestick suggest?",
                        "options": [
                            "Sellers are very strong",
                            "Price went down and stayed down",
                            "Price went down but buyers pushed it back up (bullish)",
                            "The market is closed"
                        ],
                        "correct": 2,
                        "explanation": "A long lower wick shows that the price dropped but buyers rejected those low prices and pushed it back up, indicating buying pressure."
                    },
                    {
                        "question": "What is a Doji candlestick?",
                        "options": [
                            "A candle with a very long body",
                            "A candle with no wicks",
                            "A candle where open and close are nearly equal, showing indecision",
                            "A green candle that gaps up"
                        ],
                        "correct": 2,
                        "explanation": "A Doji has almost no body (open ≈ close), indicating indecision in the market and often signals a potential trend reversal."
                    }
                ]
            }
        },
        {
            "title": "Support and Resistance",
            "slug": "support-resistance",
            "description": "Identify key price levels where stocks tend to bounce or break through.",
            "content": """# Support and Resistance

Support and resistance are the foundations of technical analysis. These are price levels where the stock tends to stop and reverse direction.

## What is Support?

**Support** is a price level where buying pressure is strong enough to prevent the price from falling further. Think of it as a **floor**.

### Why Support Forms:
- Many traders believe the price is a "good deal" at this level
- Previous buyers who sold want to buy back in
- Psychological round numbers ($50, $100)

**Example:** A stock keeps bouncing off $45. That $45 level is support.

## What is Resistance?

**Resistance** is a price level where selling pressure is strong enough to prevent the price from rising further. Think of it as a **ceiling**.

### Why Resistance Forms:
- Many traders think the price is "too high" at this level
- Previous buyers who are stuck want to "break even" and sell
- Psychological round numbers

**Example:** A stock keeps getting rejected at $60. That $60 level is resistance.

## How to Identify These Levels

1. **Look for multiple touches:** The more times a price bounces off a level, the stronger it is
2. **Draw horizontal lines:** Connect the lows (support) or highs (resistance)
3. **Watch for round numbers:** $50, $100, $150, etc.
4. **Check previous highs/lows:** Previous peaks often become resistance, previous valleys become support

## Support and Resistance Zones

Price levels aren't exact. Think of them as **zones** rather than precise numbers. A support at $50 might actually be $49.80 to $50.20.

## Breakouts and Breakdowns

### Breakout (Bullish)
When price **breaks above** resistance with strong volume, it often continues higher. The old resistance often becomes new support.

### Breakdown (Bearish)
When price **breaks below** support with strong volume, it often continues lower. The old support often becomes new resistance.

## Role Reversal

This is crucial: **Support becomes resistance, and resistance becomes support!**

- If a stock breaks through support, that level often becomes resistance on the way back up
- If a stock breaks through resistance, that level often becomes support on pullbacks

## Trading Strategy

1. **Buy near support** (expecting a bounce)
2. **Sell near resistance** (expecting rejection)
3. **Buy on breakouts** above resistance (momentum trade)
4. **Sell on breakdowns** below support (or short)

## Practice

In the simulator, try to identify support and resistance levels before placing trades. Place buy orders near support and take profits near resistance!
""",
            "track": "technical-analysis",
            "difficulty": "intermediate",
            "order": 3,
            "quiz_data": {
                "questions": [
                    {
                        "question": "What is a support level?",
                        "options": [
                            "A price ceiling where selling pressure is strong",
                            "A price floor where buying pressure prevents further decline",
                            "The highest price of the day",
                            "The average price over 50 days"
                        ],
                        "correct": 1,
                        "explanation": "Support is a price level where buying interest is strong enough to prevent the price from falling further, acting like a floor."
                    },
                    {
                        "question": "What happens when a stock breaks above resistance on high volume?",
                        "options": [
                            "It immediately crashes",
                            "Nothing, resistance stays resistance",
                            "It's a breakout, often continuing higher, and the old resistance becomes new support",
                            "The stock splits"
                        ],
                        "correct": 2,
                        "explanation": "A breakout above resistance with strong volume often signals continued upward movement, and the broken resistance level frequently becomes new support."
                    },
                    {
                        "question": "What is 'role reversal' in trading?",
                        "options": [
                            "When traders switch from buying to selling",
                            "When a stock changes sectors",
                            "When support becomes resistance and vice versa after being broken",
                            "When day trading becomes swing trading"
                        ],
                        "correct": 2,
                        "explanation": "Role reversal occurs when a support level, once broken, becomes resistance (and vice versa). This is a key concept in technical analysis."
                    }
                ]
            }
        },
        {
            "title": "Risk Management Essentials",
            "slug": "risk-management",
            "description": "Protect your capital with proper position sizing, stop losses, and risk-reward ratios.",
            "content": """# Risk Management Essentials

Risk management is **the most important skill** in trading. You can have the best strategy, but without risk management, one bad trade can wipe you out.

## The 1-2% Rule

**Never risk more than 1-2% of your total capital on a single trade.**

### Why This Rule Exists:
- Protects you from catastrophic losses
- Allows you to survive losing streaks
- Keeps you in the game long enough to find winners

### Example:
- Account size: $10,000
- Risk per trade: 2% = $200
- Even if you lose 5 trades in a row, you've only lost $1,000 (10%)
- You still have $9,000 to recover

## Position Sizing

How many shares should you buy? Work backwards from your risk limit:

**Formula:**
```
Shares = Risk Amount ÷ (Entry Price - Stop Loss Price)
```

### Example:
- Account: $10,000
- Risk: 2% = $200
- Entry: $50
- Stop Loss: $48
- Risk per share: $50 - $48 = $2

**Shares to buy = $200 ÷ $2 = 100 shares**

## Stop Loss Orders

A **stop loss** is an automatic order that sells your position if the price hits a certain level. It's your safety net.

### Types:
1. **Percentage-based:** 2% below entry
2. **Technical:** Just below support level
3. **Time-based:** Exit if trade doesn't work out in X days

### Example:
- Buy at $50
- Set stop loss at $48 (4% risk)
- If price drops to $48, you're automatically sold
- Maximum loss is capped

**Never trade without a stop loss!**

## Risk-Reward Ratio

Don't just focus on risk. Consider the **potential reward** too.

**Risk-Reward Ratio = Potential Profit ÷ Potential Loss**

### Minimum Target: 2:1

For every $1 you risk, aim to make at least $2.

### Example:
- Entry: $50
- Stop Loss: $48 (risk $2)
- Target: $54 (reward $4)
- Risk-Reward: $4 ÷ $2 = **2:1** ✓

With a 2:1 ratio, you only need to win 40% of trades to be profitable!

## Win Rate vs Risk-Reward

Even with a 40% win rate, you're profitable with 2:1 risk-reward:

**10 trades example:**
- 4 wins × $200 profit = +$800
- 6 losses × $100 loss = -$600
- Net profit = **+$200**

## Common Mistakes

1. ❌ **Risking too much:** "This trade is a sure thing!" (it's not)
2. ❌ **No stop loss:** "I'll just hold until it comes back" (it might not)
3. ❌ **Moving stop loss:** "Just a little more room..." (recipe for disaster)
4. ❌ **Trading too large:** "Let me go all-in!" (gambler's mentality)

## Professional Approach

✅ Calculate position size **before** entering
✅ Set stop loss **immediately** after buying
✅ Know your exit (target) before entering
✅ Accept small losses as part of trading
✅ Protect your capital above all else

## Psychological Benefits

Proper risk management:
- Reduces stress and emotion
- Lets you sleep at night
- Keeps you confident and disciplined
- Prevents revenge trading after losses

## Practice

In the simulator, practice:
1. Calculating position sizes
2. Setting stop losses
3. Taking small losses without emotion
4. Measuring risk-reward before entry

Remember: **Protect your capital. Trading is a marathon, not a sprint.**
""",
            "track": "risk-management",
            "difficulty": "beginner",
            "order": 4,
            "quiz_data": {
                "questions": [
                    {
                        "question": "What is the maximum percentage of your total capital you should risk on a single trade?",
                        "options": ["10%", "5%", "1-2%", "0.1%"],
                        "correct": 2,
                        "explanation": "The golden rule of risk management is to risk no more than 1-2% of your total capital on any single trade. This protects you from catastrophic losses."
                    },
                    {
                        "question": "What is a stop loss order?",
                        "options": [
                            "An order to buy more shares",
                            "An automatic sell order that triggers if price hits a certain level, limiting your loss",
                            "A target price for taking profit",
                            "An order that never expires"
                        ],
                        "correct": 1,
                        "explanation": "A stop loss is an automatic order that sells your position if the price drops to a specified level, acting as your safety net and capping your maximum loss."
                    },
                    {
                        "question": "What is a good minimum risk-reward ratio to target?",
                        "options": ["1:1", "2:1", "1:2", "3:1"],
                        "correct": 1,
                        "explanation": "A minimum 2:1 risk-reward ratio means you aim to make $2 for every $1 you risk. This allows you to be profitable even with a win rate below 50%."
                    },
                    {
                        "question": "If you have $10,000 and risk 2% per trade, how much should you risk on one trade?",
                        "options": ["$20", "$200", "$2,000", "$1,000"],
                        "correct": 1,
                        "explanation": "2% of $10,000 = $200. This is the maximum amount you should risk on a single trade according to proper risk management principles."
                    }
                ]
            }
        }
    ]
    
    print("🌱 Seeding lessons...")
    
    for lesson_data in lessons_data:
        # Check if lesson already exists
        existing = Lesson.query.filter_by(slug=lesson_data['slug']).first()
        if existing:
            print(f"   ⏭️  Lesson '{lesson_data['title']}' already exists, skipping.")
            continue
        
        # Create new lesson
        lesson = Lesson(
            title=lesson_data['title'],
            slug=lesson_data['slug'],
            description=lesson_data['description'],
            content=lesson_data['content'],
            track=lesson_data['track'],
            difficulty=lesson_data['difficulty'],
            order=lesson_data['order'],
            quiz_data=lesson_data['quiz_data']
        )
        db.session.add(lesson)
        print(f"   ✅ Created: {lesson_data['title']}")
    
    db.session.commit()
    print("✨ Lesson seeding complete!")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        # Create all database tables
        db.create_all()
        print("✅ Database tables created")
        seed_lessons()
