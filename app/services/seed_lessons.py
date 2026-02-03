"""Seed lessons data"""
from app.extensions import db
from app.models.lesson import Lesson

def seed_lessons():
    """Create initial lessons"""
    
    lessons_data = [
        {
            'title': 'Trading Basics: What is a Trade?',
            'slug': 'trading-basics',
            'description': 'Learn the fundamentals of buying and selling assets',
            'track': 'general',
            'difficulty': 'beginner',
            'order': 1,
            'content': '''
# Trading Basics

## What is Trading?

Trading is the act of buying and selling financial instruments (stocks, crypto, forex) with the goal of making a profit.

### Key Concepts:

**Buy (Long):** You think the price will go UP
- Buy at $100
- Sell at $120
- Profit: $20 ✅

**Sell (Short):** You think the price will go DOWN
- Sell at $100
- Buy back at $80
- Profit: $20 ✅

### Important Terms:

- **Entry Price:** The price you buy/sell at
- **Exit Price:** The price you close the position at
- **Position Size:** How many units you trade
- **P&L (Profit & Loss):** Your gain or loss on a trade

### The Golden Rule:

**Buy Low, Sell High** 📈

Or in short selling: **Sell High, Buy Low** 📉

### Risk Management:

NEVER risk more than 1-2% of your portfolio on a single trade!

If you have $10,000:
- Max risk per trade: $200
- This allows you to survive 50 losses in a row
''',
            'quiz_data': {
                'questions': [
                    {
                        'question': 'If you BUY a stock at $50 and sell it at $70, what is your profit?',
                        'options': ['$20', '$70', '$50', '$120'],
                        'correct': 0,
                        'explanation': 'Profit = Exit Price - Entry Price = $70 - $50 = $20'
                    },
                    {
                        'question': 'What does "Buy Low, Sell High" mean?',
                        'options': [
                            'Buy when price is expensive, sell when cheap',
                            'Buy when price is low, sell when price is higher',
                            'Only trade high-priced stocks',
                            'Never sell your positions'
                        ],
                        'correct': 1,
                        'explanation': 'The goal is to buy when prices are low and sell when they rise to make a profit.'
                    },
                    {
                        'question': 'What is the maximum % of your portfolio you should risk per trade?',
                        'options': ['10%', '5%', '1-2%', '50%'],
                        'correct': 2,
                        'explanation': 'Professional traders risk 1-2% max per trade to preserve capital and survive losing streaks.'
                    }
                ]
            }
        },
        {
            'title': 'Understanding Candlesticks',
            'slug': 'candlesticks',
            'description': 'Learn to read candlestick charts like a pro',
            'track': 'general',
            'difficulty': 'beginner',
            'order': 2,
            'content': '''
# Understanding Candlesticks

## What is a Candlestick?

A candlestick shows 4 key prices for a time period:
- **Open:** Starting price
- **Close:** Ending price
- **High:** Highest price reached
- **Low:** Lowest price reached

## Green vs Red Candles

**🟢 Green Candle (Bullish):**
- Close > Open
- Buyers won
- Price went UP

**🔴 Red Candle (Bearish):**
- Close < Open
- Sellers won
- Price went DOWN

## Anatomy of a Candle

```
    High
     |  ← Upper Wick (Rejection)
   ┌───┐
   │   │ ← Body (Open to Close)
   └───┘
     |  ← Lower Wick (Support)
    Low
```

### The Body:
- Shows the range between Open and Close
- **Large body** = Strong move (conviction)
- **Small body** = Weak move (indecision)

### The Wicks (Shadows):
- Show price rejection
- **Long upper wick** = Sellers rejected higher prices
- **Long lower wick** = Buyers defended lower prices

## Common Patterns:

**Doji:** Open = Close (Indecision)
```
    |
  ──┼──
    |
```

**Hammer:** Long lower wick (Bullish reversal)
```
    |
  ┌─┐
  └─┘
    |
   |||
```

**Shooting Star:** Long upper wick (Bearish reversal)
```
   |||
    |
  ┌─┐
  └─┘
```

## Why Candlesticks Matter:

They show **market psychology**:
- Who's winning (buyers or sellers)
- Where prices got rejected
- When indecision happens

Master candlesticks = Understand market emotions! 🧠
''',
            'quiz_data': {
                'questions': [
                    {
                        'question': 'What does a GREEN candle mean?',
                        'options': [
                            'Price went down',
                            'Price went up (Close > Open)',
                            'Market is closed',
                            'Volume is high'
                        ],
                        'correct': 1,
                        'explanation': 'Green candles show bullish price action where the closing price is higher than the opening price.'
                    },
                    {
                        'question': 'What does a long lower wick indicate?',
                        'options': [
                            'Sellers are strong',
                            'Buyers defended lower prices (support)',
                            'Price will crash',
                            'Nothing important'
                        ],
                        'correct': 1,
                        'explanation': 'A long lower wick shows that buyers stepped in and pushed the price back up, defending a support level.'
                    },
                    {
                        'question': 'What is a Doji candle?',
                        'options': [
                            'A very large green candle',
                            'A candle where Open equals Close (indecision)',
                            'A candle with no wicks',
                            'A red candle only'
                        ],
                        'correct': 1,
                        'explanation': 'A Doji forms when open and close prices are nearly equal, showing indecision in the market.'
                    }
                ]
            }
        },
        {
            'title': 'Support and Resistance',
            'slug': 'support-resistance',
            'description': 'Identify key price levels where trends reverse',
            'track': 'general',
            'difficulty': 'intermediate',
            'order': 3,
            'content': '''
# Support and Resistance

## What Are They?

**Support:** A price level where buyers consistently step in
- Think of it as a "floor"
- Price bounces UP from support

**Resistance:** A price level where sellers consistently step in
- Think of it as a "ceiling"
- Price bounces DOWN from resistance

## Why They Matter:

Markets are NOT random. They remember important levels.

### Support Example:
```
Price hits $100 → Bounces to $120
Price hits $100 → Bounces to $125
Price hits $100 → Bounces to $130

$100 is SUPPORT ✅
```

### Resistance Example:
```
Price hits $150 → Drops to $130
Price hits $150 → Drops to $125
Price hits $150 → Drops to $120

$150 is RESISTANCE ✅
```

## How to Find Them:

1. **Look left** on the chart
2. Find levels where price bounced multiple times
3. Draw horizontal lines at those levels

## The Rules:

**At Support:**
- Look for BUY signals
- Buyers likely to defend this level
- If it breaks, RUN (becomes resistance)

**At Resistance:**
- Look for SELL signals
- Sellers likely to push back here
- If it breaks, CHASE (becomes support)

## Breakouts:

When price breaks through resistance → **BUY**
When price breaks through support → **SELL**

### After a Breakout:
- Old resistance becomes NEW support
- Old support becomes NEW resistance

This is called **role reversal**!

## Pro Tips:

- Support/Resistance are ZONES, not exact prices
- The more times a level is tested, the stronger it is
- Round numbers (100, 200, 500) often act as psychological levels
- Use these with other indicators for best results

Remember: **Buy support, sell resistance!** 📊
''',
            'quiz_data': {
                'questions': [
                    {
                        'question': 'What is Support?',
                        'options': [
                            'A price level where price always stops',
                            'A level where buyers consistently defend (floor)',
                            'The highest price ever reached',
                            'A type of candlestick'
                        ],
                        'correct': 1,
                        'explanation': 'Support is a price level where buying pressure is strong enough to prevent further price decline.'
                    },
                    {
                        'question': 'What happens when resistance is broken?',
                        'options': [
                            'Price immediately crashes',
                            'It becomes new support (role reversal)',
                            'Trading stops',
                            'Nothing changes'
                        ],
                        'correct': 1,
                        'explanation': 'When resistance breaks, it often becomes new support through role reversal - old ceiling becomes new floor.'
                    },
                    {
                        'question': 'Where should you look to BUY?',
                        'options': [
                            'At resistance levels',
                            'At support levels with confirmation',
                            'Randomly at any price',
                            'Only when RSI is 100'
                        ],
                        'correct': 1,
                        'explanation': 'Buying near support levels (with confirmation) gives you better risk/reward as you have a clear invalidation point.'
                    }
                ]
            }
        },
        {
            'title': 'Risk Management Essentials',
            'slug': 'risk-management',
            'description': 'Protect your capital and survive long-term',
            'track': 'general',
            'difficulty': 'beginner',
            'order': 4,
            'content': '''
# Risk Management

## The #1 Rule of Trading:

**DON'T LOSE MONEY!**

Seriously. Protecting capital matters MORE than making profits.

## Why Most Traders Fail:

- 😵 They risk too much per trade (5-10%)
- 😵 No stop losses (hope it comes back)
- 😵 Revenge trading after losses
- 😵 Over-leveraging / going "all in"

## The 1-2% Rule:

NEVER risk more than 1-2% of your portfolio on ONE trade.

### Example:
Portfolio: $10,000
Max risk: $200 (2%)

If you lose 10 trades in a row:
- Loss: $2,000
- Remaining: $8,000
- Still alive! ✅

If you risked 10% per trade:
- After 10 losses: $3,487 left
- Emotionally destroyed 💀

## Stop-Loss Orders:

**A stop-loss is your safety net.**

### How It Works:
1. You BUY stock at $100
2. Set stop-loss at $95
3. If price hits $95, you're automatically OUT
4. Loss: $5 per share (controlled!)

### Benefits:
- ✅ Limits losses automatically
- ✅ Removes emotion
- ✅ Lets you sleep at night
- ✅ Prevents disaster

## Position Sizing Formula:

```
Position Size = (Account Risk) / (Entry - Stop Loss)

Example:
- Account: $10,000
- Risk: 2% = $200
- Entry: $100
- Stop Loss: $95
- Risk per share: $5

Position Size = $200 / $5 = 40 shares
```

## The Risk/Reward Ratio:

NEVER take a trade with R:R less than 1:2

### Good Trade Example:
- Risk: $100
- Potential Reward: $300
- R:R = 1:3 ✅

### Bad Trade Example:
- Risk: $100
- Potential Reward: $50
- R:R = 1:0.5 ❌

## Golden Rules:

1. **Never risk more than 1-2% per trade**
2. **Always use stop-losses**
3. **Only take trades with 1:2+ R:R**
4. **Accept losses as part of the game**
5. **Don't revenge trade**

## Professional Mindset:

Trading is about **probabilities**, not certainty.

You can:
- ✅ Win 40% of trades
- ✅ Still be profitable
- ✅ If your winners are 3x your losers

Protect your capital = Stay in the game long enough to win! 🛡️
''',
            'quiz_data': {
                'questions': [
                    {
                        'question': 'What is the maximum % you should risk per trade?',
                        'options': ['10%', '5%', '1-2%', 'All in!'],
                        'correct': 2,
                        'explanation': 'The 1-2% rule protects you from catastrophic losses and lets you survive long losing streaks.'
                    },
                    {
                        'question': 'What is a stop-loss?',
                        'options': [
                            'A way to lock in profits',
                            'An automatic exit that limits your loss',
                            'A type of candlestick',
                            'A trading strategy'
                        ],
                        'correct': 1,
                        'explanation': 'A stop-loss automatically closes your position if price moves against you, limiting your loss to a predetermined amount.'
                    },
                    {
                        'question': 'What is a good Risk/Reward ratio?',
                        'options': ['1:0.5', '1:1', '1:2 or better', 'Doesn\'t matter'],
                        'correct': 2,
                        'explanation': 'You want to risk $1 to make at least $2 (1:2 ratio). This ensures even with a 40% win rate, you stay profitable.'
                    },
                    {
                        'question': 'If you have $10,000 and risk 2% per trade, how much is your max loss per trade?',
                        'options': ['$1,000', '$500', '$200', '$100'],
                        'correct': 2,
                        'explanation': '2% of $10,000 = $200. This is your maximum loss per trade regardless of position size.'
                    }
                ]
            }
        }
    ]
    
    # Add lessons to database
    for lesson_data in lessons_data:
        existing = Lesson.query.filter_by(slug=lesson_data['slug']).first()
        if not existing:
            lesson = Lesson(**lesson_data)
            db.session.add(lesson)
            print(f"Added lesson: {lesson.title}")
        else:
            print(f"Lesson already exists: {lesson_data['title']}")
    
    db.session.commit()
    print(f"\n✅ Seeded {len(lessons_data)} lessons!")

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_lessons()
