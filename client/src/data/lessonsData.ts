// Complete lessons database with 500+ questions across all levels
// Each lesson includes questions, explanations, and real-life trading insights

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  realLifeInsight: string;
  category: string;
}

export interface LessonContent {
  title: string;
  level: string;
  totalQuestions: number;
  passingScore: number;
  pointsAwarded: number;
  description: string;
  learningObjectives: string[];
  keyTakeaways: string[];
  questions: Question[];
}

export const LESSONS_DATABASE: Record<string, LessonContent> = {
  // BEGINNER LEVEL - 30 questions each (90 total)
  '1': {
    title: 'Trading Basics 101',
    level: 'Beginner',
    totalQuestions: 30,
    passingScore: 70,
    pointsAwarded: 50,
    description: 'Master the fundamental concepts of stock trading, including market mechanics, order types, and basic terminology.',
    learningObjectives: [
      'Understand how stock markets operate',
      'Learn different types of trading orders',
      'Master essential trading terminology',
      'Recognize market participants and their roles'
    ],
    keyTakeaways: [
      'Markets match buyers and sellers to determine prices',
      'Different order types serve different trading strategies',
      'Liquidity is crucial for efficient trading',
      'Market hours affect trading opportunities'
    ],
    questions: [
      {
        id: 1,
        question: 'What is a stock?',
        options: ['A loan to a company', 'Ownership share in a company', 'A type of bond', 'A government security'],
        correctAnswer: 1,
        explanation: 'A stock represents partial ownership in a company. When you buy stock, you become a shareholder and own a piece of that business.',
        realLifeInsight: 'When Apple was founded, early investors who bought stock became owners of a tiny part of the company. As Apple grew, their ownership stake became incredibly valuable.',
        category: 'Fundamentals'
      },
      {
        id: 2,
        question: 'What does a "bull market" mean?',
        options: ['Markets are closed', 'Prices are falling', 'Prices are rising', 'High volatility'],
        correctAnswer: 2,
        explanation: 'A bull market refers to a period when stock prices are generally rising. The term comes from how a bull attacks - thrusting its horns upward.',
        realLifeInsight: 'The longest bull market in history lasted from 2009 to 2020, recovering from the financial crisis and creating massive wealth for investors who stayed invested.',
        category: 'Market Cycles'
      },
      {
        id: 3,
        question: 'What is a market order?',
        options: ['An order to buy at a specific price', 'An order executed immediately at current market price', 'An order that expires at end of day', 'An order for large quantities only'],
        correctAnswer: 1,
        explanation: 'A market order executes immediately at the best available current price. It prioritizes speed of execution over price.',
        realLifeInsight: 'During high volatility, a market order might execute at a very different price than you expected. In 2010\'s "Flash Crash", market orders executed at terrible prices as the market plunged.',
        category: 'Order Types'
      },
      {
        id: 4,
        question: 'What is liquidity in trading?',
        options: ['Amount of cash in your account', 'How easily an asset can be bought or sold', 'Water content in the market', 'Company profits'],
        correctAnswer: 1,
        explanation: 'Liquidity refers to how quickly and easily you can buy or sell an asset without significantly affecting its price.',
        realLifeInsight: 'Apple stock is highly liquid - you can instantly trade millions of dollars worth. A small penny stock might take hours to sell even a small position.',
        category: 'Market Mechanics'
      },
      {
        id: 5,
        question: 'What is a limit order?',
        options: ['Maximum number of shares you can buy', 'Order that executes at a specified price or better', 'Trading restriction', 'Daily trading limit'],
        correctAnswer: 1,
        explanation: 'A limit order only executes at your specified price or better. It gives you price control but doesn\'t guarantee execution.',
        realLifeInsight: 'Professional traders use limit orders to get better prices. They might place a buy limit order below current price, waiting for a dip to get filled.',
        category: 'Order Types'
      },
      {
        id: 6,
        question: 'What does "bid" price mean?',
        options: ['The price you want to sell at', 'Highest price buyers are willing to pay', 'Average price of the stock', 'Yesterday\'s closing price'],
        correctAnswer: 1,
        explanation: 'The bid price is the highest price that buyers are currently willing to pay for the stock.',
        realLifeInsight: 'The bid-ask spread represents the market\'s liquidity. For major stocks like Microsoft, the spread might be just 1 cent. For illiquid stocks, it could be dollars wide.',
        category: 'Market Mechanics'
      },
      {
        id: 7,
        question: 'What does "ask" price mean?',
        options: ['Price you ask your broker', 'Lowest price sellers are willing to accept', 'Your desired purchase price', 'Tomorrow\'s predicted price'],
        correctAnswer: 1,
        explanation: 'The ask (or offer) price is the lowest price that sellers are currently willing to accept for the stock.',
        realLifeInsight: 'When you place a market buy order, you typically pay the ask price. When selling with a market order, you receive the bid price.',
        category: 'Market Mechanics'
      },
      {
        id: 8,
        question: 'What is a bear market?',
        options: ['Market with high volatility', 'Market with extended price declines', 'Market that is closed', 'Market for commodities only'],
        correctAnswer: 1,
        explanation: 'A bear market occurs when prices fall 20% or more from recent highs. The term comes from how a bear attacks - swiping downward.',
        realLifeInsight: 'The 2008 financial crisis bear market saw the S&P 500 drop 57%. Investors who panicked and sold locked in losses, while those who held and added to positions eventually recovered.',
        category: 'Market Cycles'
      },
      {
        id: 9,
        question: 'What is market capitalization?',
        options: ['Total value of a company\'s outstanding shares', 'Company\'s annual profit', 'Cash in company\'s bank', 'Number of employees'],
        correctAnswer: 0,
        explanation: 'Market cap is calculated by multiplying share price by total shares outstanding. It represents the total market value of a company.',
        realLifeInsight: 'Apple became the first trillion-dollar company in 2018. Today there are multiple trillion-dollar companies, showing how market cap reflects investor confidence.',
        category: 'Fundamentals'
      },
      {
        id: 10,
        question: 'What is a dividend?',
        options: ['Stock price increase', 'Payment from company to shareholders', 'Trading fee', 'Tax on profits'],
        correctAnswer: 1,
        explanation: 'A dividend is a distribution of a company\'s profits to shareholders, usually paid quarterly in cash.',
        realLifeInsight: 'Coca-Cola has paid dividends for over 100 years. Many retirees build portfolios of dividend-paying stocks to generate income without selling shares.',
        category: 'Fundamentals'
      },
      {
        id: 11,
        question: 'What does P/E ratio stand for?',
        options: ['Profit/Equity ratio', 'Price/Earnings ratio', 'Purchase/Exit ratio', 'Portfolio/Expense ratio'],
        correctAnswer: 1,
        explanation: 'P/E ratio (Price-to-Earnings) compares stock price to earnings per share. It helps assess if a stock is over or undervalued.',
        realLifeInsight: 'Tech stocks often have high P/E ratios (30+) because investors expect high growth. Value stocks might have P/E ratios of 10-15, suggesting lower growth expectations.',
        category: 'Valuation'
      },
      {
        id: 12,
        question: 'What is a stop-loss order?',
        options: ['Order to stop trading', 'Order that triggers a sell when price falls to specified level', 'Limit on daily losses', 'Broker restriction'],
        correctAnswer: 1,
        explanation: 'A stop-loss automatically triggers a sell order when price drops to your specified level, limiting potential losses.',
        realLifeInsight: 'Professional traders always use stop-losses. If you bought a stock at $100, you might set a stop-loss at $90 to limit your maximum loss to 10%.',
        category: 'Risk Management'
      },
      {
        id: 13,
        question: 'What is volatility?',
        options: ['Trading volume', 'Rate and magnitude of price changes', 'Company profit margins', 'Number of trades per day'],
        correctAnswer: 1,
        explanation: 'Volatility measures how much and how quickly prices change. High volatility means larger, faster price swings.',
        realLifeInsight: 'Tesla stock is highly volatile, sometimes moving 5-10% in a single day. Utility stocks like Duke Energy typically move less than 1% daily.',
        category: 'Risk'
      },
      {
        id: 14,
        question: 'What are trading hours for US stock markets?',
        options: ['24 hours a day', '9:30 AM - 4:00 PM ET', '8:00 AM - 5:00 PM ET', 'Varies by stock'],
        correctAnswer: 1,
        explanation: 'Regular US stock market hours are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday (excluding holidays).',
        realLifeInsight: 'Pre-market (4:00-9:30 AM) and after-hours (4:00-8:00 PM) trading exists but has lower volume and wider spreads, making it riskier.',
        category: 'Market Structure'
      },
      {
        id: 15,
        question: 'What is a stock exchange?',
        options: ['A bank for stocks', 'Marketplace where stocks are bought and sold', 'Government agency', 'Type of brokerage account'],
        correctAnswer: 1,
        explanation: 'A stock exchange is an organized marketplace that facilitates the buying and selling of securities.',
        realLifeInsight: 'The New York Stock Exchange (NYSE) is the world\'s largest by market cap. NASDAQ is known for tech stocks like Apple, Google, and Amazon.',
        category: 'Market Structure'
      },
      {
        id: 16,
        question: 'What is a broker?',
        options: ['Someone who owns stocks', 'Intermediary who executes trades for investors', 'Stock exchange employee', 'Company CEO'],
        correctAnswer: 1,
        explanation: 'A broker is a licensed professional or firm that executes buy and sell orders on behalf of investors.',
        realLifeInsight: 'Modern online brokers like Fidelity, Schwab, and Robinhood have made trading accessible to everyone with commission-free trades and mobile apps.',
        category: 'Market Participants'
      },
      {
        id: 17,
        question: 'What is diversification?',
        options: ['Buying many shares of one stock', 'Spreading investments across different assets', 'Trading frequently', 'Investing only in one sector'],
        correctAnswer: 1,
        explanation: 'Diversification means spreading investments across different assets to reduce risk. Don\'t put all eggs in one basket.',
        realLifeInsight: 'During the 2000 dot-com crash, investors with only tech stocks lost 80%+. Those diversified across sectors, bonds, and international stocks lost much less.',
        category: 'Risk Management'
      },
      {
        id: 18,
        question: 'What is a ticker symbol?',
        options: ['Stock price graph', 'Unique abbreviation identifying a stock', 'Trading volume indicator', 'Market index'],
        correctAnswer: 1,
        explanation: 'A ticker symbol is a unique series of letters identifying a publicly traded company (e.g., AAPL for Apple).',
        realLifeInsight: 'Some companies choose clever ticker symbols: ZOOM for Zoom Video, CAKE for Cheesecake Factory, and even GEEK for a gaming company.',
        category: 'Market Structure'
      },
      {
        id: 19,
        question: 'What is the S&P 500?',
        options: ['Top 500 richest people', 'Index of 500 large US companies', 'Stock priced at $500', 'Trading strategy'],
        correctAnswer: 1,
        explanation: 'The S&P 500 is an index tracking 500 of the largest US companies, representing about 80% of total US stock market value.',
        realLifeInsight: 'Over the long term, the S&P 500 has averaged about 10% annual returns. Warren Buffett recommends most people just invest in an S&P 500 index fund.',
        category: 'Market Indices'
      },
      {
        id: 20,
        question: 'What does IPO stand for?',
        options: ['Internal Profit Operations', 'Initial Public Offering', 'Investment Portfolio Options', 'International Price Order'],
        correctAnswer: 1,
        explanation: 'An IPO is when a private company first sells shares to the public, becoming a publicly traded company.',
        realLifeInsight: 'Facebook\'s 2012 IPO valued the company at $104 billion. Many IPOs are volatile - Uber fell 18% in first 3 months, while Zoom doubled.',
        category: 'Market Events'
      },
      {
        id: 21,
        question: 'What is day trading?',
        options: ['Trading during lunch break', 'Buying and selling within same trading day', 'Trading once per day', 'Long-term investing'],
        correctAnswer: 1,
        explanation: 'Day trading involves buying and selling securities within the same trading day, never holding positions overnight.',
        realLifeInsight: 'Studies show 90%+ of day traders lose money. It requires significant capital, time, experience, and emotional discipline to succeed.',
        category: 'Trading Styles'
      },
      {
        id: 22,
        question: 'What is a short sale?',
        options: ['Selling quickly', 'Borrowing shares to sell, hoping to buy back cheaper', 'Selling at a loss', 'Selling fractional shares'],
        correctAnswer: 1,
        explanation: 'Short selling means borrowing shares, selling them, and hoping to buy them back at a lower price to profit from decline.',
        realLifeInsight: 'In 2021, GameStop short squeeze caused massive losses for hedge funds betting against it. Short selling has unlimited risk potential.',
        category: 'Advanced Concepts'
      },
      {
        id: 23,
        question: 'What is market sentiment?',
        options: ['Market opening time', 'Overall attitude of investors toward market', 'Stock ratings', 'Trading volume'],
        correctAnswer: 1,
        explanation: 'Market sentiment reflects the overall mood of investors - optimistic (bullish) or pessimistic (bearish).',
        realLifeInsight: 'The Fear & Greed Index measures sentiment. Extreme fear often signals buying opportunities, while extreme greed suggests caution.',
        category: 'Market Psychology'
      },
      {
        id: 24,
        question: 'What is a blue-chip stock?',
        options: ['Tech company stock', 'Large, well-established, reliable company stock', 'Penny stock', 'Foreign stock'],
        correctAnswer: 1,
        explanation: 'Blue-chip stocks are shares of large, established companies with strong financials and long track records.',
        realLifeInsight: 'Companies like Microsoft, Johnson & Johnson, and Coca-Cola are blue-chips. They\'re generally less risky but offer slower growth than small caps.',
        category: 'Stock Categories'
      },
      {
        id: 25,
        question: 'What is a penny stock?',
        options: ['Stock that costs one cent', 'Stock trading below $5 per share', 'Stock with small dividends', 'Fractional share'],
        correctAnswer: 1,
        explanation: 'Penny stocks typically trade for less than $5 per share and are often from small, unproven companies.',
        realLifeInsight: 'Penny stocks are extremely risky and prone to manipulation. The SEC warns that many penny stocks are fraudulent schemes.',
        category: 'Stock Categories'
      },
      {
        id: 26,
        question: 'What is a portfolio?',
        options: ['Trading platform', 'Collection of investment holdings', 'Stock certificate', 'Market index'],
        correctAnswer: 1,
        explanation: 'A portfolio is the collection of all your investment holdings - stocks, bonds, ETFs, and other assets.',
        realLifeInsight: 'Institutional investors manage portfolios worth billions. Individual investors should review and rebalance their portfolios quarterly.',
        category: 'Investment Management'
      },
      {
        id: 27,
        question: 'What is a market maker?',
        options: ['Government regulator', 'Firm that provides liquidity by buying and selling', 'Company CEO', 'Popular investor'],
        correctAnswer: 1,
        explanation: 'Market makers are firms that continuously buy and sell securities to provide liquidity and facilitate trading.',
        realLifeInsight: 'Citadel Securities is the largest market maker, handling about 40% of US retail trades. They profit from bid-ask spreads.',
        category: 'Market Participants'
      },
      {
        id: 28,
        question: 'What is technical analysis?',
        options: ['Analyzing computer systems', 'Using price charts and patterns to predict movements', 'Studying company financials', 'Reading news articles'],
        correctAnswer: 1,
        explanation: 'Technical analysis uses historical price data, charts, and indicators to forecast future price movements.',
        realLifeInsight: 'Technical analysts believe "history repeats itself" and use patterns like head-and-shoulders, support/resistance levels, and moving averages.',
        category: 'Analysis Methods'
      },
      {
        id: 29,
        question: 'What is fundamental analysis?',
        options: ['Basic trading rules', 'Evaluating company financial health and value', 'Chart patterns', 'Market timing'],
        correctAnswer: 1,
        explanation: 'Fundamental analysis evaluates a company\'s financial statements, management, competitive advantages, and industry to determine intrinsic value.',
        realLifeInsight: 'Warren Buffett uses fundamental analysis, focusing on companies with strong competitive advantages, good management, and reasonable valuations.',
        category: 'Analysis Methods'
      },
      {
        id: 30,
        question: 'What does SEC stand for?',
        options: ['Stock Exchange Commission', 'Securities and Exchange Commission', 'Safe Exchange Certification', 'Standard Equity Council'],
        correctAnswer: 1,
        explanation: 'The SEC is the federal agency that regulates securities markets and protects investors from fraud.',
        realLifeInsight: 'The SEC was created after the 1929 crash to restore investor confidence. It requires public companies to file detailed financial reports.',
        category: 'Regulation'
      }
    ]
  },
  
  '2': {
    title: 'Understanding Market Orders',
    level: 'Beginner',
    totalQuestions: 30,
    passingScore: 70,
    pointsAwarded: 50,
    description: 'Deep dive into different order types and when to use each one effectively.',
    learningObjectives: [
      'Master all order types',
      'Understand order execution',
      'Learn order routing',
      'Recognize order risks'
    ],
    keyTakeaways: [
      'Order type affects execution price and speed',
      'Market orders prioritize speed over price',
      'Limit orders provide price control',
      'Stop orders help manage risk'
    ],
    questions: [
      {
        id: 1,
        question: 'Which order type guarantees execution but not price?',
        options: ['Limit order', 'Market order', 'Stop order', 'Stop-limit order'],
        correctAnswer: 1,
        explanation: 'A market order is guaranteed to execute (assuming normal market conditions) but the price is not guaranteed. You get the best available price at that moment.',
        realLifeInsight: 'During the 2010 Flash Crash, market orders executed at wildly different prices as the market plunged and recovered within minutes.',
        category: 'Order Basics'
      },
      {
        id: 2,
        question: 'Which order type guarantees price but not execution?',
        options: ['Market order', 'Limit order', 'Fill-or-kill order', 'Trailing stop'],
        correctAnswer: 1,
        explanation: 'A limit order guarantees you won\'t pay more (buy) or receive less (sell) than your specified price, but it might never execute if the price doesn\'t reach your limit.',
        realLifeInsight: 'Patient traders use limit orders to get better prices. If you see a stock at $50 but want to buy at $48, a limit order will wait for that price.',
        category: 'Order Basics'
      },
      {
        id: 3,
        question: 'What is slippage?',
        options: ['Trading fees', 'Difference between expected and actual execution price', 'Price decline', 'Order cancellation'],
        correctAnswer: 1,
        explanation: 'Slippage occurs when your order executes at a different price than expected, usually worse. It\'s common with market orders in fast-moving markets.',
        realLifeInsight: 'In volatile stocks or low-liquidity situations, slippage can be significant. A $100 market order might fill at $101 or $99 due to slippage.',
        category: 'Order Execution'
      },
      {
        id: 4,
        question: 'What is a stop order?',
        options: ['Order to pause trading', 'Order that becomes market order when price hits trigger', 'Order with time limit', 'Cancellation request'],
        correctAnswer: 1,
        explanation: 'A stop order becomes a market order once the stop price is reached. It\'s used to limit losses or protect profits.',
        realLifeInsight: 'Traders use stop orders to exit losing positions automatically. If you bought at $100, a stop at $95 helps limit your loss to 5%.',
        category: 'Order Types'
      },
      {
        id: 5,
        question: 'What is a stop-limit order?',
        options: ['Stop order with maximum shares', 'Stop order that becomes limit order when triggered', 'Stop order during lunch', 'Limited-time stop order'],
        correctAnswer: 1,
        explanation: 'A stop-limit combines stop and limit orders. When stop price is hit, it becomes a limit order, giving price control but risking non-execution.',
        realLifeInsight: 'In fast-moving markets, stop-limit orders might not execute if price gaps through your limit. This happened to many traders during COVID-19 crash.',
        category: 'Advanced Orders'
      },
      {
        id: 6,
        question: 'What does GTC mean in order terms?',
        options: ['Get The Cash', 'Good \'Til Cancelled', 'Government Trading Commission', 'General Trading Clause'],
        correctAnswer: 1,
        explanation: 'GTC (Good \'Til Cancelled) means the order remains active until executed or manually cancelled, lasting multiple trading days.',
        realLifeInsight: 'Swing traders use GTC limit orders to catch specific price points over days or weeks without constantly monitoring.',
        category: 'Order Duration'
      },
      {
        id: 7,
        question: 'What does DAY order mean?',
        options: ['Order for daily stocks', 'Order expires at end of trading day', 'Daytime trading only', 'Order placed during day'],
        correctAnswer: 1,
        explanation: 'A DAY order is only valid for the current trading session and automatically cancels if not filled by market close.',
        realLifeInsight: 'Most brokers default to DAY orders. If you place an order Monday afternoon and it doesn\'t fill, it\'s cancelled at 4 PM.',
        category: 'Order Duration'
      },
      {
        id: 8,
        question: 'What is a fill-or-kill order?',
        options: ['Aggressive market order', 'Order that must execute immediately in full or cancel', 'Stop-loss variant', 'High-risk order type'],
        correctAnswer: 1,
        explanation: 'FOK (Fill-Or-Kill) must execute the entire order immediately at specified price or cancel completely. No partial fills allowed.',
        realLifeInsight: 'Large institutional traders use FOK orders to ensure they get the entire position at once or not at all, avoiding partial fills.',
        category: 'Special Orders'
      },
      {
        id: 9,
        question: 'What is an AON order?',
        options: ['All-Or-Nothing order', 'After-Open-Notice', 'Automatic Order Network', 'Advanced Option Notice'],
        correctAnswer: 0,
        explanation: 'AON (All-Or-Nothing) requires the entire order quantity to be filled, but unlike FOK, it can wait for execution.',
        realLifeInsight: 'AON prevents you from getting partial fills. If you want 1,000 shares, you get all 1,000 or none, avoiding odd lots.',
        category: 'Special Orders'
      },
      {
        id: 10,
        question: 'What is a trailing stop order?',
        options: ['Stop order that follows behind price', 'Stop order that adjusts with price movement', 'Delayed stop order', 'Stop order for lagging stocks'],
        correctAnswer: 1,
        explanation: 'A trailing stop automatically adjusts the stop price as the stock moves in your favor, locking in gains while limiting losses.',
        realLifeInsight: 'If you buy at $100 with 10% trailing stop, as stock rises to $120, stop moves to $108. If it drops from $120 to $108, you sell.',
        category: 'Advanced Orders'
      },
      {
        id: 11,
        question: 'When should you use a market order?',
        options: ['Only during market hours', 'When speed is more important than price', 'Only for small trades', 'Never use market orders'],
        correctAnswer: 1,
        explanation: 'Market orders are best when you need immediate execution and are willing to accept the current market price.',
        realLifeInsight: 'Use market orders for liquid stocks during normal hours. For illiquid stocks or high volatility, limit orders are safer.',
        category: 'Order Strategy'
      },
      {
        id: 12,
        question: 'When should you use a limit order?',
        options: ['Only for penny stocks', 'When specific price is more important than timing', 'Only at market open', 'For quick trades only'],
        correctAnswer: 1,
        explanation: 'Limit orders are ideal when you want price control and can wait for execution, especially in volatile or illiquid markets.',
        realLifeInsight: 'Professional traders predominantly use limit orders to get better prices and avoid slippage, even if it means waiting.',
        category: 'Order Strategy'
      },
      {
        id: 13,
        question: 'What is order routing?',
        options: ['Path your order takes to execution', 'Ordering system for trades', 'Route to trading floor', 'Order delivery method'],
        correctAnswer: 0,
        explanation: 'Order routing determines which market venue (exchange, dark pool, market maker) executes your order.',
        realLifeInsight: 'Robinhood routes orders to Citadel and other market makers (payment for order flow). Direct routing may give better prices.',
        category: 'Market Structure'
      },
      {
        id: 14,
        question: 'What is payment for order flow?',
        options: ['Trading commission', 'Brokers receiving money for routing orders to market makers', 'Payment to exchanges', 'Order processing fee'],
        correctAnswer: 1,
        explanation: 'PFOF is when brokers receive payment from market makers for routing customer orders to them. This enables commission-free trading.',
        realLifeInsight: 'Robinhood makes money through PFOF, not commissions. Critics argue this creates conflicts of interest in getting best execution.',
        category: 'Market Structure'
      },
      {
        id: 15,
        question: 'What is best execution?',
        options: ['Fastest order fill', 'Getting the best overall price and terms for customer', 'Highest priority order', 'Most profitable trade'],
        correctAnswer: 1,
        explanation: 'Best execution is the broker\'s obligation to get the most favorable terms for your order considering price, speed, and likelihood of execution.',
        realLifeInsight: 'By law, brokers must seek best execution. However, with PFOF, questions arise about whether customers get truly best prices.',
        category: 'Regulation'
      },
      {
        id: 16,
        question: 'What is a market-on-close order?',
        options: ['Last order of day', 'Order executed at closing price', 'Market closed order', 'End-of-day market order'],
        correctAnswer: 1,
        explanation: 'MOC orders execute at or near the closing price. They\'re submitted during the day but execute in the closing auction.',
        realLifeInsight: 'Index funds use MOC orders to track closing prices. The last minutes of trading often see huge volume from MOC orders.',
        category: 'Specialized Orders'
      },
      {
        id: 17,
        question: 'What is a limit-on-close order?',
        options: ['Limit order at closing bell', 'Limit order that executes at close within price limit', 'Last chance limit order', 'Closing time restriction'],
        correctAnswer: 1,
        explanation: 'LOC orders execute at closing price but only if the closing price is at or better than your limit price.',
        realLifeInsight: 'Traders use LOC to participate in closing auction while maintaining price discipline, common for index rebalancing days.',
        category: 'Specialized Orders'
      },
      {
        id: 18,
        question: 'What happens if your limit order is partially filled?',
        options: ['Order cancels', 'Remaining order stays active', 'Must resubmit', 'Converts to market order'],
        correctAnswer: 1,
        explanation: 'With partial fill, you get some shares and the remaining order continues to work until filled or cancelled (unless specified otherwise).',
        realLifeInsight: 'Partial fills can increase costs. If you wanted 1,000 shares and got 100, you might pay commission twice or face timing risk.',
        category: 'Order Execution'
      },
      {
        id: 19,
        question: 'What is order book depth?',
        options: ['How deep prices are', 'Visible buy and sell orders at various price levels', 'Order history length', 'Market complexity'],
        correctAnswer: 1,
        explanation: 'Order book depth shows pending buy and sell orders at different price levels, revealing supply and demand.',
        realLifeInsight: 'Level 2 quotes show order book depth. Large orders visible in book can signal institutional interest or resistance levels.',
        category: 'Market Data'
      },
      {
        id: 20,
        question: 'What is a hidden order?',
        options: ['Secret order', 'Order not displayed in public order book', 'Illegal order type', 'Private trade'],
        correctAnswer: 1,
        explanation: 'Hidden orders (iceberg orders) execute without being displayed in the order book, preventing market impact.',
        realLifeInsight: 'Institutions use hidden orders to buy/sell large positions without alerting other traders and moving the market against them.',
        category: 'Advanced Orders'
      },
      {
        id: 21,
        question: 'What is a dark pool?',
        options: ['Underground trading', 'Private exchange for large institutional trades', 'Illegal trading venue', 'After-hours market'],
        correctAnswer: 1,
        explanation: 'Dark pools are private exchanges where institutional investors can trade large blocks without impacting public market prices.',
        realLifeInsight: 'About 40% of US stock trading happens in dark pools. Critics worry about lack of transparency; supporters cite reduced market impact.',
        category: 'Market Structure'
      },
      {
        id: 22,
        question: 'What does it mean to "work an order"?',
        options: ['Process order quickly', 'Gradually fill large order to minimize market impact', 'Repair failed order', 'Monitor order status'],
        correctAnswer: 1,
        explanation: 'Working an order means breaking a large order into smaller pieces executed over time to get better average price.',
        realLifeInsight: 'If a fund wants 1 million shares, they might work it over hours/days, buying 10-50k at a time to avoid spiking the price.',
        category: 'Trading Strategy'
      },
      {
        id: 23,
        question: 'What is VWAP?',
        options: ['Very Wild Asset Price', 'Volume-Weighted Average Price', 'Volatile Warning Alert Protocol', 'Virtual Wall Average Point'],
        correctAnswer: 1,
        explanation: 'VWAP is the average price weighted by volume throughout the day. It\'s a benchmark for institutional execution quality.',
        realLifeInsight: 'Institutions aim to beat VWAP. If VWAP is $50 and they averaged $49.80 buying, they saved $0.20/share on their order.',
        category: 'Trading Metrics'
      },
      {
        id: 24,
        question: 'What is order urgency?',
        options: ['How fast order processes', 'Tradeoff between speed and price in order execution', 'Priority level', 'Emergency order'],
        correctAnswer: 1,
        explanation: 'Order urgency reflects whether you prioritize quick execution (market order) or better price (limit order).',
        realLifeInsight: 'Breaking news creates high urgency - traders use market orders to get in/out fast. Patience allows limit orders for better prices.',
        category: 'Order Strategy'
      },
      {
        id: 25,
        question: 'What is quote stuffing?',
        options: ['Adding extra orders', 'Rapidly placing and cancelling orders to create chaos', 'Market data overload', 'Order padding'],
        correctAnswer: 1,
        explanation: 'Quote stuffing is a manipulative practice where traders flood the market with orders then quickly cancel them to create confusion.',
        realLifeInsight: 'High-frequency traders sometimes quote stuff to slow down competitors or test market depth. SEC considers it market manipulation.',
        category: 'Market Manipulation'
      },
      {
        id: 26,
        question: 'What is an immediate-or-cancel order?',
        options: ['Rush order', 'Order that fills immediately or cancels unfilled portion', 'Fast execution order', 'Time-sensitive trade'],
        correctAnswer: 1,
        explanation: 'IOC orders execute whatever portion is immediately available and cancel the rest. Partial fills are acceptable.',
        realLifeInsight: 'Day traders use IOC to quickly grab available shares without committing to wait for full order, maintaining flexibility.',
        category: 'Special Orders'
      },
      {
        id: 27,
        question: 'What is order priority in the book?',
        options: ['Your account status', 'Price-time priority for order matching', 'VIP trading access', 'Order importance'],
        correctAnswer: 1,
        explanation: 'Orders are matched by price-time priority: best prices first, then earliest orders at same price execute first.',
        realLifeInsight: 'Being first in line at best bid/ask matters. If 10 traders bid $50, the first one gets filled first when someone sells at $50.',
        category: 'Market Structure'
      },
      {
        id: 28,
        question: 'What happens to limit orders in extended hours?',
        options: ['Automatically convert to market', 'Depend on broker and order settings', 'Always cancel', 'Get priority'],
        correctAnswer: 1,
        explanation: 'Extended hours limit orders behavior varies by broker. Some allow them, others require special designation or cancel them.',
        realLifeInsight: 'Check your broker\'s extended hours rules. Some orders placed during regular hours won\'t execute in extended hours.',
        category: 'Extended Hours'
      },
      {
        id: 29,
        question: 'What is a sweep-to-fill order?',
        options: ['Cleaning up old orders', 'Order that executes across multiple venues simultaneously', 'Market-wide order', 'Comprehensive order'],
        correctAnswer: 1,
        explanation: 'Sweep orders simultaneously execute across multiple exchanges/market makers to fill large orders at best available prices.',
        realLifeInsight: 'When you see unusual options activity, it\'s often sweep orders - institutional traders buying across all exchanges at once.',
        category: 'Advanced Orders'
      },
      {
        id: 30,
        question: 'What is the difference between maker and taker orders?',
        options: ['Who initiates trade', 'Maker adds liquidity, taker removes liquidity', 'Buy vs sell orders', 'Size of order'],
        correctAnswer: 1,
        explanation: 'Maker orders add liquidity to the order book (limit orders). Taker orders remove liquidity (market orders matching existing orders).',
        realLifeInsight: 'Some brokers charge taker fees but pay maker rebates. Professional traders optimize order types to earn rebates and reduce costs.',
        category: 'Market Structure'
      }
    ]
  },

  '3': {
    title: 'Reading Stock Charts',
    level: 'Beginner',
    totalQuestions: 30,
    passingScore: 70,
    pointsAwarded: 60,
    description: 'Interpret candlesticks, trends, and basic chart patterns.',
    learningObjectives: [
      'Read candlestick patterns',
      'Identify trend directions',
      'Spot support and resistance',
      'Understand volume indicators'
    ],
    keyTakeaways: [
      'Charts visualize price action over time',
      'Candlesticks show open, high, low, close',
      'Trends indicate market direction',
      'Volume confirms price movements'
    ],
    questions: [
      {
        id: 1,
        question: 'What information does a candlestick show?',
        options: ['Only closing price', 'Open, high, low, close prices', 'Trading volume', 'Number of trades'],
        correctAnswer: 1,
        explanation: 'A candlestick displays four key prices: opening, highest, lowest, and closing price for a given time period.',
        realLifeInsight: 'Japanese rice traders invented candlesticks in the 1700s. Today, they\'re the most popular chart type worldwide for their rich information.',
        category: 'Chart Basics'
      },
      {
        id: 2,
        question: 'What does a green/white candlestick indicate?',
        options: ['Stock is profitable', 'Price closed higher than it opened', 'High volume', 'Market is open'],
        correctAnswer: 1,
        explanation: 'A green (or white) candlestick means the closing price was higher than the opening price - a bullish period.',
        realLifeInsight: 'During strong bull runs, you\'ll see many consecutive green candles. In 2020\'s tech rally, some stocks had weeks of green candles.',
        category: 'Candlesticks'
      },
      {
        id: 3,
        question: 'What does a red/black candlestick indicate?',
        options: ['Losing trade', 'Price closed lower than it opened', 'Market crash', 'Stop trading'],
        correctAnswer: 1,
        explanation: 'A red (or black) candlestick means the closing price was lower than the opening price - a bearish period.',
        realLifeInsight: 'The 2008 financial crisis charts showed weeks of consecutive red candles as markets plunged, creating a "stairway to hell" pattern.',
        category: 'Candlesticks'
      },
      {
        id: 4,
        question: 'What is a doji candlestick?',
        options: ['Very tall candle', 'Candle where open and close are nearly equal', 'First candle of day', 'Japanese trading term'],
        correctAnswer: 1,
        explanation: 'A doji forms when opening and closing prices are virtually the same, creating a cross shape. It signals indecision.',
        realLifeInsight: 'Dojis at market tops or bottoms often signal reversals. After a long rally, a doji suggests bulls and bears are in equilibrium.',
        category: 'Candlestick Patterns'
      },
      {
        id: 5,
        question: 'What is a hammer candlestick pattern?',
        options: ['Strong downward move', 'Long lower shadow with small body at top', 'High volume candle', 'Opening pattern'],
        correctAnswer: 1,
        explanation: 'A hammer has a long lower shadow (wick) and small body near the top, suggesting rejection of lower prices - potentially bullish.',
        realLifeInsight: 'Hammers at support levels signal strong buying. In March 2020 COVID crash, the final low showed a perfect hammer pattern.',
        category: 'Candlestick Patterns'
      },
      {
        id: 6,
        question: 'What is a shooting star pattern?',
        options: ['Bullish signal', 'Long upper shadow with small body at bottom', 'High-flying stock', 'Star-rated company'],
        correctAnswer: 1,
        explanation: 'A shooting star has a long upper shadow and small body at bottom, showing rejection of higher prices - potentially bearish.',
        realLifeInsight: 'Shooting stars at resistance levels warn of reversals. Bitcoin often forms shooting stars at major tops before corrections.',
        category: 'Candlestick Patterns'
      },
      {
        id: 7,
        question: 'What is support in chart analysis?',
        options: ['Help desk', 'Price level where buying pressure prevents further decline', 'Customer support', 'Technical assistance'],
        correctAnswer: 1,
        explanation: 'Support is a price level where demand is strong enough to prevent the price from declining further.',
        realLifeInsight: 'Tesla has strong support at $150-$160. When it drops there, buyers consistently step in, causing bounces back up.',
        category: 'Support & Resistance'
      },
      {
        id: 8,
        question: 'What is resistance in chart analysis?',
        options: ['Stock not moving', 'Price level where selling pressure prevents further advance', 'Market barrier', 'Trading difficulty'],
        correctAnswer: 1,
        explanation: 'Resistance is a price level where selling pressure is strong enough to prevent the price from rising further.',
        realLifeInsight: 'Apple had resistance at $200 for months in 2024. Each time it approached $200, sellers pushed it back down.',
        category: 'Support & Resistance'
      },
      {
        id: 9,
        question: 'What is an uptrend?',
        options: ['Popular stock', 'Series of higher highs and higher lows', 'Increasing volume', 'Positive news'],
        correctAnswer: 1,
        explanation: 'An uptrend is characterized by successively higher peaks (highs) and higher troughs (lows), showing strength.',
        realLifeInsight: 'The phrase "the trend is your friend" reminds traders to trade with the trend. Fighting uptrends by shorting often fails.',
        category: 'Trends'
      },
      {
        id: 10,
        question: 'What is a downtrend?',
        options: ['Declining stock', 'Series of lower highs and lower lows', 'Falling volume', 'Bad company'],
        correctAnswer: 1,
        explanation: 'A downtrend shows successively lower peaks and lower troughs, indicating weakness and selling pressure.',
        realLifeInsight: 'In 2022 tech selloff, Meta (Facebook) was in brutal downtrend for 10 months, falling from $380 to $88 - lower lows throughout.',
        category: 'Trends'
      },
      {
        id: 11,
        question: 'What does "break out" mean in charting?',
        options: ['Stock splits', 'Price moves above resistance or below support', 'High volatility', 'Market opens'],
        correctAnswer: 1,
        explanation: 'A breakout occurs when price decisively moves beyond established support or resistance levels, often starting new trends.',
        realLifeInsight: 'Nvidia broke out above $500 resistance in 2024 AI boom and never looked back, running to $900+. Breakouts can be powerful.',
        category: 'Chart Patterns'
      },
      {
        id: 12,
        question: 'What is volume in trading?',
        options: ['Sound level', 'Number of shares traded', 'Price range', 'Market size'],
        correctAnswer: 1,
        explanation: 'Volume represents the total number of shares traded during a specific time period.',
        realLifeInsight: 'Nvidia trades 300M+ shares daily. Low-volume stocks might trade under 100k shares daily, making them harder to trade.',
        category: 'Volume Analysis'
      },
      {
        id: 13,
        question: 'What does high volume on up day indicate?',
        options: ['Market manipulation', 'Strong conviction from buyers - bullish confirmation', 'Nothing significant', 'Stock overvalued'],
        correctAnswer: 1,
        explanation: 'High volume on up days confirms strong buying interest and validates the price move.',
        realLifeInsight: 'When stocks gap up on earnings with 10x normal volume, it shows institutional buying. This happened with Nvidia\'s AI earnings.',
        category: 'Volume Analysis'
      },
      {
        id: 14,
        question: 'What is a trendline?',
        options: ['Market average', 'Line connecting series of highs or lows to show trend direction', 'Trading path', 'Broker connection'],
        correctAnswer: 1,
        explanation: 'A trendline is a diagonal line drawn connecting multiple price points to visualize and confirm trend direction.',
        realLifeInsight: 'Drawing trendlines helps identify entry points. When price touches trendline and bounces, it\'s often good entry timing.',
        category: 'Technical Analysis'
      },
      {
        id: 15,
        question: 'What is a chart pattern?',
        options: ['Chart design', 'Recognizable formation suggesting future price direction', 'Trading schedule', 'Data visualization'],
        correctAnswer: 1,
        explanation: 'Chart patterns are recognizable formations in price action that historically suggest probable future price movements.',
        realLifeInsight: 'Head and shoulders pattern correctly predicted many tops. In 2021, Bitcoin formed this pattern before dropping from $69k to $15k.',
        category: 'Chart Patterns'
      },
      {
        id: 16,
        question: 'What is a head and shoulders pattern?',
        options: ['Body part chart', 'Bearish reversal pattern with three peaks', 'Bullish signal', 'Consolidation pattern'],
        correctAnswer: 1,
        explanation: 'Head and shoulders forms three peaks: left shoulder, higher head, right shoulder - classic top reversal pattern.',
        realLifeInsight: 'This pattern is remarkably reliable. When neck line breaks, measured move often equals distance from head to neckline.',
        category: 'Reversal Patterns'
      },
      {
        id: 17,
        question: 'What is a double bottom pattern?',
        options: ['Two losses', 'Bullish reversal with two similar lows', 'Dual account', 'Bottom tier stock'],
        correctAnswer: 1,
        explanation: 'Double bottom shows two lows at similar levels with peak between them - bullish reversal signal after downtrend.',
        realLifeInsight: 'Double bottoms often form after capitulation. Microsoft formed perfect double bottom at $214 in 2022 before rallying 40%.',
        category: 'Reversal Patterns'
      },
      {
        id: 18,
        question: 'What is a triangle pattern?',
        options: ['Three-way trade', 'Consolidation pattern with converging trendlines', 'Geometric analysis', 'Three-stage pattern'],
        correctAnswer: 1,
        explanation: 'Triangles form when price makes lower highs and higher lows, creating converging trendlines - consolidation before breakout.',
        realLifeInsight: 'Triangles act as coiled springs. The longer consolidation lasts, the more explosive the eventual breakout tends to be.',
        category: 'Continuation Patterns'
      },
      {
        id: 19,
        question: 'What is a cup and handle pattern?',
        options: ['Beverage chart', 'Bullish continuation pattern resembling tea cup', 'Holding pattern', 'Commodity pattern'],
        correctAnswer: 1,
        explanation: 'Cup and handle forms a rounded bottom (cup) followed by slight pullback (handle) before upside breakout.',
        realLifeInsight: 'William O\'Neil popularized this pattern. Many multi-bagger stocks like Monster Energy formed cups before massive runs.',
        category: 'Continuation Patterns'
      },
      {
        id: 20,
        question: 'What is a flag pattern?',
        options: ['Warning signal', 'Brief consolidation during strong trend', 'Country-specific pattern', 'Alert pattern'],
        correctAnswer: 1,
        explanation: 'A flag is short-term consolidation (rectangle) within strong trend, usually followed by continuation in original direction.',
        realLifeInsight: 'Flags are "half-mast patterns" - they typically occur at midpoint of move. If stock rallied $20, flag suggests another $20 ahead.',
        category: 'Continuation Patterns'
      },
      {
        id: 21,
        question: 'What does "golden cross" mean?',
        options: ['Profit milestone', '50-day moving average crosses above 200-day MA', 'Gold trading signal', 'Religious symbol'],
        correctAnswer: 1,
        explanation: 'Golden cross occurs when shorter-term moving average (50-day) crosses above longer-term MA (200-day) - bullish signal.',
        realLifeInsight: 'S&P 500 golden crosses often mark beginning of bull runs. The 2023 cross preceded strong market rally throughout year.',
        category: 'Moving Averages'
      },
      {
        id: 22,
        question: 'What does "death cross" mean?',
        options: ['Company bankruptcy', '50-day moving average crosses below 200-day MA', 'Market crash', 'Stop loss hit'],
        correctAnswer: 1,
        explanation: 'Death cross occurs when 50-day MA crosses below 200-day MA - bearish signal suggesting potential downtrend.',
        realLifeInsight: 'Netflix showed death cross in 2022 before falling 50%. However, false signals occur, so confirm with other indicators.',
        category: 'Moving Averages'
      },
      {
        id: 23,
        question: 'What is a gap in charting?',
        options: ['Missing data', 'Price range where no trading occurred', 'Time gap', 'Data error'],
        correctAnswer: 1,
        explanation: 'A gap is empty space between one candle\'s close and next candle\'s open, showing price jump without trading at levels between.',
        realLifeInsight: 'Earnings gaps are common. In 2024, Meta gapped up $30 on earnings, opening way above previous close on huge buy orders.',
        category: 'Gaps'
      },
      {
        id: 24,
        question: 'What does "fill the gap" mean?',
        options: ['Complete data', 'Price returns to level of previous gap', 'Buy more shares', 'Fix error'],
        correctAnswer: 1,
        explanation: 'Filling the gap means price eventually trades back to the gap area, "filling" the empty space on the chart.',
        realLifeInsight: 'Traders say "gaps get filled" because price often returns to gap. About 70% of gaps fill within weeks or months.',
        category: 'Gaps'
      },
      {
        id: 25,
        question: 'What is a wick (shadow) on a candlestick?',
        options: ['Candle error', 'Thin line showing high/low beyond body', 'Weak price action', 'Time marker'],
        correctAnswer: 1,
        explanation: 'Wicks (or shadows) are thin lines extending from candlestick body, showing price extremes that were rejected.',
        realLifeInsight: 'Long lower wicks show strong buying pressure that pushed price up from lows - bulls rejected lower prices.',
        category: 'Candlesticks'
      },
      {
        id: 26,
        question: 'What is a marubozu candlestick?',
        options: ['Japanese term', 'Candle with no wicks - strong conviction', 'Error candle', 'Large candle'],
        correctAnswer: 1,
        explanation: 'Marubozu has no wicks/shadows - open equals low and close equals high (bullish) or vice versa (bearish). Shows strong conviction.',
        realLifeInsight: 'Marubozu candles on high volume suggest powerful momentum. Green marubozu on breakout often leads to continued rally.',
        category: 'Candlestick Patterns'
      },
      {
        id: 27,
        question: 'What is a bullish engulfing pattern?',
        options: ['Large buy order', 'Green candle completely engulfs previous red candle', 'Market takeover', 'Bull market start'],
        correctAnswer: 1,
        explanation: 'Bullish engulfing occurs when green candle\'s body completely covers previous red candle - strong reversal signal.',
        realLifeInsight: 'Engulfing patterns at support levels are powerful. They show bears pushed price down, then bulls overwhelmed them.',
        category: 'Candlestick Patterns'
      },
      {
        id: 28,
        question: 'What is a bearish engulfing pattern?',
        options: ['Sell signal', 'Red candle completely engulfs previous green candle', 'Bear market', 'Large sell order'],
        correctAnswer: 1,
        explanation: 'Bearish engulfing is red candle body completely covering previous green candle - strong bearish reversal signal.',
        realLifeInsight: 'Bearish engulfing at resistance levels warns of tops. Bulls tried to push higher but bears overpowered them.',
        category: 'Candlestick Patterns'
      },
      {
        id: 29,
        question: 'What is consolidation?',
        options: ['Merging stocks', 'Period of sideways price movement', 'Account combining', 'Market closure'],
        correctAnswer: 1,
        explanation: 'Consolidation is sideways trading where price moves in tight range, pausing before next directional move.',
        realLifeInsight: 'Consolidation is healthy. Apple often consolidates for months after big moves, building base before next leg up.',
        category: 'Price Action'
      },
      {
        id: 30,
        question: 'Why is volume important with breakouts?',
        options: ['Required by law', 'Confirms genuine breakout vs false break', 'Shows manipulation', 'Increases price'],
        correctAnswer: 1,
        explanation: 'High volume on breakouts confirms participation and conviction. Low volume breakouts often fail and reverse.',
        realLifeInsight: 'Professional traders wait for volume confirmation. A breakout on 3x normal volume has much higher success rate than on light volume.',
        category: 'Volume Analysis'
      }
    ]
  },
  
  // ============================================
  // INSIDER LEVEL (70 questions per lesson)
  // ============================================
  
  '4': {
    title: 'Technical Analysis Intro',
    level: 'Insider',
    totalQuestions: 70,
    passingScore: 70,
    pointsAwarded: 140,
    description: 'Master technical indicators, chart analysis, and timing tools used by professional traders.',
    learningObjectives: [
      'Understand and use key technical indicators',
      'Identify overbought and oversold conditions',
      'Recognize divergence and convergence patterns',
      'Combine multiple indicators for confirmation'
    ],
    keyTakeaways: [
      'Indicators are tools, not crystal balls',
      'Use multiple indicators for confirmation',
      'Understand indicator limitations and false signals',
      'Different timeframes provide different perspectives'
    ],
    questions: [
      {
        id: 1,
        question: 'What does RSI stand for?',
        options: [
          'Rate of Stock Increase',
          'Relative Strength Index',
          'Random Signal Indicator',
          'Real-time Stock Information'
        ],
        correctAnswer: 1,
        explanation: 'RSI (Relative Strength Index) is a momentum oscillator that measures the speed and magnitude of price changes, ranging from 0 to 100.',
        realLifeInsight: 'J. Welles Wilder developed RSI in 1978. It\'s one of the most widely used technical indicators by both retail and institutional traders.',
        category: 'Indicators'
      },
      {
        id: 2,
        question: 'What RSI value typically indicates an overbought condition?',
        options: [
          'Above 30',
          'Above 50',
          'Above 70',
          'Above 90'
        ],
        correctAnswer: 2,
        explanation: 'RSI above 70 is traditionally considered overbought, suggesting the asset may be due for a pullback. However, strong trends can stay overbought for extended periods.',
        realLifeInsight: 'During the 2020-2021 bull market, many tech stocks stayed above RSI 70 for weeks. Blindly shorting overbought stocks can be costly in strong trends.',
        category: 'Overbought/Oversold'
      },
      {
        id: 3,
        question: 'What RSI value typically indicates an oversold condition?',
        options: [
          'Below 10',
          'Below 30',
          'Below 50',
          'Below 70'
        ],
        correctAnswer: 1,
        explanation: 'RSI below 30 is traditionally considered oversold, suggesting the asset may be due for a bounce. But downtrends can remain oversold for long periods.',
        realLifeInsight: 'During March 2020 COVID crash, many stocks showed RSI below 30 for days. Those who bought the "oversold" condition early caught falling knives.',
        category: 'Overbought/Oversold'
      },
      {
        id: 4,
        question: 'What is bullish divergence in RSI?',
        options: [
          'RSI moving up while price moves down',
          'Price making lower lows but RSI making higher lows',
          'Both price and RSI moving up together',
          'RSI above 70'
        ],
        correctAnswer: 1,
        explanation: 'Bullish divergence occurs when price makes lower lows but RSI makes higher lows, suggesting weakening selling pressure and potential reversal up.',
        realLifeInsight: 'Bitcoin showed bullish divergence in December 2022 at $15k, when price hit new lows but RSI made higher lows. It then rallied to $30k+ by April 2023.',
        category: 'Divergence'
      },
      {
        id: 5,
        question: 'What does MACD stand for?',
        options: [
          'Market Analysis and Chart Data',
          'Moving Average Convergence Divergence',
          'Multiple Asset Correlation Device',
          'Monthly Average Current Data'
        ],
        correctAnswer: 1,
        explanation: 'MACD (Moving Average Convergence Divergence) is a trend-following momentum indicator showing the relationship between two moving averages.',
        realLifeInsight: 'Gerald Appel created MACD in the late 1970s. It remains a staple on nearly every trading platform and is used by millions of traders daily.',
        category: 'Indicators'
      },
      {
        id: 6,
        question: 'What are the standard MACD parameters?',
        options: [
          '5, 10, 20',
          '12, 26, 9',
          '20, 50, 200',
          '14, 28, 7'
        ],
        correctAnswer: 1,
        explanation: 'Standard MACD uses 12-period and 26-period exponential moving averages, with a 9-period EMA as the signal line.',
        realLifeInsight: 'While 12-26-9 is standard, day traders often use faster settings like 5-13-5, and long-term investors might use 19-39-9 for slower signals.',
        category: 'Indicator Parameters'
      },
      {
        id: 7,
        question: 'What is a bullish MACD crossover?',
        options: [
          'MACD line crosses below signal line',
          'MACD line crosses above signal line',
          'MACD crosses above zero line',
          'Signal line crosses below zero'
        ],
        correctAnswer: 1,
        explanation: 'A bullish crossover occurs when the MACD line crosses above the signal line, suggesting upward momentum is building.',
        realLifeInsight: 'Nvidia showed a powerful MACD bullish crossover in October 2022 at $110. It signaled the start of an AI-driven rally to $900+ by 2024.',
        category: 'Crossovers'
      },
      {
        id: 8,
        question: 'What does the MACD histogram represent?',
        options: [
          'Volume',
          'Price range',
          'Distance between MACD and signal line',
          'Market volatility'
        ],
        correctAnswer: 2,
        explanation: 'The MACD histogram shows the distance between the MACD line and signal line. Expanding histogram suggests strengthening momentum.',
        realLifeInsight: 'Professional traders watch histogram expansion/contraction. Growing green bars show strengthening uptrend; shrinking bars warn momentum is fading.',
        category: 'Indicator Components'
      },
      {
        id: 9,
        question: 'What are Bollinger Bands?',
        options: [
          'Volume indicators',
          'Volatility bands around a moving average',
          'Support and resistance lines',
          'Trend channels'
        ],
        correctAnswer: 1,
        explanation: 'Bollinger Bands consist of a middle band (20-day SMA) with upper and lower bands at 2 standard deviations, measuring volatility.',
        realLifeInsight: 'John Bollinger created these bands in the 1980s. They expand during high volatility and contract during low volatility - the "squeeze" before big moves.',
        category: 'Indicators'
      },
      {
        id: 10,
        question: 'What does a "Bollinger Band squeeze" suggest?',
        options: [
          'Price will drop',
          'High volatility coming',
          'Low volatility period with potential breakout ahead',
          'Market is closing'
        ],
        correctAnswer: 2,
        explanation: 'A squeeze (bands narrowing) indicates low volatility, often preceding a significant price move. Direction is unknown until breakout occurs.',
        realLifeInsight: 'Tesla showed a tight Bollinger squeeze in October 2023 around $240. When it broke out in November, it rallied 70% to $410 in just 8 weeks.',
        category: 'Volatility'
      },
      {
        id: 11,
        question: 'What does it mean when price touches the upper Bollinger Band?',
        options: [
          'Guaranteed reversal downward',
          'Potentially overbought, but can continue in strong trends',
          'Buy signal',
          'Market manipulation'
        ],
        correctAnswer: 1,
        explanation: 'Price at the upper band suggests strength but can signal overbought conditions. In strong uptrends, price can "walk the band" for extended periods.',
        realLifeInsight: 'During Apple\'s 2023 rally to $200, it repeatedly touched the upper Bollinger Band. Shorting it as "overbought" would have caused losses.',
        category: 'Overbought/Oversold'
      },
      {
        id: 12,
        question: 'What is the Stochastic Oscillator used for?',
        options: [
          'Measuring volume',
          'Comparing closing price to price range over time',
          'Calculating moving averages',
          'Predicting earnings'
        ],
        correctAnswer: 1,
        explanation: 'The Stochastic Oscillator compares a closing price to its price range over a period, generating values from 0 to 100 to identify overbought/oversold.',
        realLifeInsight: 'George Lane developed this in the 1950s. It\'s particularly useful in ranging markets but gives many false signals in strong trends.',
        category: 'Indicators'
      },
      {
        id: 13,
        question: 'What are the standard Stochastic Oscillator levels?',
        options: [
          'Overbought above 80, oversold below 20',
          'Overbought above 70, oversold below 30',
          'Overbought above 90, oversold below 10',
          'Overbought above 60, oversold below 40'
        ],
        correctAnswer: 0,
        explanation: 'Traditional Stochastic uses 80 as overbought and 20 as oversold thresholds. Some traders use 70/30 for more frequent signals.',
        realLifeInsight: 'Day traders often use 70/30 levels for more signals, while swing traders stick with 80/20 to filter out noise and focus on extreme conditions.',
        category: 'Overbought/Oversold'
      },
      {
        id: 14,
        question: 'What is a moving average?',
        options: [
          'Average volume over time',
          'Average price over a specified period',
          'Average daily range',
          'Average P/E ratio'
        ],
        correctAnswer: 1,
        explanation: 'A moving average smooths price data by calculating the average price over a specific time period, helping identify trends.',
        realLifeInsight: 'The 200-day moving average is watched by institutions worldwide. Many mutual funds have rules to sell when stocks break below their 200-day MA.',
        category: 'Indicators'
      },
      {
        id: 15,
        question: 'What is the difference between SMA and EMA?',
        options: [
          'SMA is for stocks, EMA is for ETFs',
          'SMA weighs all data equally, EMA weighs recent data more',
          'SMA is faster, EMA is slower',
          'No difference, just different names'
        ],
        correctAnswer: 1,
        explanation: 'Simple Moving Average (SMA) treats all periods equally. Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive.',
        realLifeInsight: 'Day traders prefer EMAs for quicker signals. Long-term investors often use SMAs like the 50-day and 200-day for major trend identification.',
        category: 'Indicator Types'
      },
      {
        id: 16,
        question: 'What is a "golden cross"?',
        options: [
          'Price crossing above $1000',
          '50-day MA crossing above 200-day MA',
          'RSI crossing above 70',
          'Volume spike above average'
        ],
        correctAnswer: 1,
        explanation: 'A golden cross occurs when a short-term MA (typically 50-day) crosses above a long-term MA (typically 200-day), signaling potential bullish trend.',
        realLifeInsight: 'The S&P 500 golden cross in June 2023 signaled the bull market resumption. The index rallied 20%+ over the following 6 months.',
        category: 'Crossovers'
      },
      {
        id: 17,
        question: 'What is a "death cross"?',
        options: [
          'Stock going bankrupt',
          '50-day MA crossing below 200-day MA',
          'Price dropping 50%',
          'Company delisting'
        ],
        correctAnswer: 1,
        explanation: 'A death cross occurs when the 50-day MA crosses below the 200-day MA, suggesting a potential bearish trend ahead.',
        realLifeInsight: 'Netflix showed a death cross in April 2022 at $348. It continued falling to $162 by May, losing over 50% in weeks - a classic bearish signal.',
        category: 'Crossovers'
      },
      {
        id: 18,
        question: 'What does ADX measure?',
        options: [
          'Average Daily Exchange volume',
          'Trend strength regardless of direction',
          'Stock price average',
          'Dividend yield'
        ],
        correctAnswer: 1,
        explanation: 'Average Directional Index (ADX) measures trend strength on a scale of 0-100, not direction. High ADX means strong trend (up or down).',
        realLifeInsight: 'Professional traders use ADX to decide between trend-following and mean-reversion strategies. ADX above 25 suggests trending; below 20 suggests ranging.',
        category: 'Trend Indicators'
      },
      {
        id: 19,
        question: 'What ADX reading suggests a strong trend?',
        options: [
          'Above 10',
          'Above 25',
          'Above 50',
          'Above 70'
        ],
        correctAnswer: 1,
        explanation: 'ADX above 25 indicates a strong trend. Above 50 is very strong. Below 20 suggests weak or no trend (ranging market).',
        realLifeInsight: 'During Nvidia\'s AI rally in 2024, ADX remained above 40 for months, confirming the powerful uptrend and making trend-following strategies profitable.',
        category: 'Trend Strength'
      },
      {
        id: 20,
        question: 'What is volume in technical analysis?',
        options: [
          'How loud the stock is',
          'Number of shares traded',
          'Price range',
          'Market capitalization'
        ],
        correctAnswer: 1,
        explanation: 'Volume measures the number of shares traded during a period. High volume confirms price moves; low volume suggests weak commitment.',
        realLifeInsight: 'When GameStop rallied in January 2021, volume exploded from 10M to 200M+ shares daily. This massive volume confirmed the extraordinary interest.',
        category: 'Volume Analysis'
      },
      {
        id: 21,
        question: 'What does "volume confirms the trend" mean?',
        options: [
          'High volume validates price moves',
          'Volume should match price exactly',
          'Loud trading confirms trend',
          'More traders means trend continues'
        ],
        correctAnswer: 0,
        explanation: 'Volume confirmation means price moves accompanied by high volume are more reliable. Uptrends with increasing volume are stronger than those without.',
        realLifeInsight: 'Apple\'s 2023 breakout to new highs came on 2x normal volume, confirming institutional buying. Weak volume rallies often fail quickly.',
        category: 'Volume Confirmation'
      },
      {
        id: 22,
        question: 'What is bearish divergence?',
        options: [
          'Price making higher highs but indicator making lower highs',
          'Price and indicator both falling',
          'Price rising faster than indicator',
          'Negative news about stock'
        ],
        correctAnswer: 0,
        explanation: 'Bearish divergence occurs when price makes higher highs but an indicator (like RSI) makes lower highs, suggesting weakening momentum.',
        realLifeInsight: 'Bitcoin showed bearish divergence in November 2021 at $69k. Price hit new highs but RSI made lower highs. It then crashed to $15k by 2022.',
        category: 'Divergence'
      },
      {
        id: 23,
        question: 'What is a false breakout?',
        options: [
          'Illegal trading activity',
          'Price briefly breaks level then reverses',
          'News announcement error',
          'Indicator malfunction'
        ],
        correctAnswer: 1,
        explanation: 'A false breakout (or fakeout) occurs when price breaks through a level but quickly reverses, trapping traders who entered on the breakout.',
        realLifeInsight: 'Market makers often engineer false breakouts to trigger stop-losses and create liquidity before the real move. Tesla had a false breakdown in September 2023.',
        category: 'False Signals'
      },
      {
        id: 24,
        question: 'Why do false signals occur in technical analysis?',
        options: [
          'Indicators are broken',
          'Markets are random and indicators lag',
          'Brokers manipulate charts',
          'Bad internet connection'
        ],
        correctAnswer: 1,
        explanation: 'False signals occur because indicators are based on past data (lagging) and markets don\'t always behave predictably. No indicator is perfect.',
        realLifeInsight: 'Professional traders expect 40-50% of signals to be false. They use proper position sizing and stop-losses to manage inevitable false signals.',
        category: 'False Signals'
      },
      {
        id: 25,
        question: 'What is the best way to reduce false signals?',
        options: [
          'Use more indicators',
          'Use multiple timeframes and confirmation',
          'Only trade in the morning',
          'Use only one perfect indicator'
        ],
        correctAnswer: 1,
        explanation: 'Combining multiple timeframes and waiting for confirmation from different indicators reduces (but doesn\'t eliminate) false signals.',
        realLifeInsight: 'Professional traders use a "triple screen" - checking daily, 4-hour, and 1-hour charts. A signal that aligns across timeframes has higher probability.',
        category: 'Signal Confirmation'
      },
      {
        id: 26,
        question: 'What is a "triple screen" trading system?',
        options: [
          'Using three monitors',
          'Analyzing three different timeframes',
          'Checking three indicators',
          'Trading three different stocks'
        ],
        correctAnswer: 1,
        explanation: 'Triple screen method analyzes the same security across three timeframes (e.g., weekly, daily, hourly) to find high-probability setups.',
        realLifeInsight: 'Dr. Alexander Elder popularized this method. It helps ensure you\'re trading with the larger trend, not against it - a key to profitability.',
        category: 'Multiple Timeframes'
      },
      {
        id: 27,
        question: 'What does "the trend is your friend" mean?',
        options: [
          'Make friends with trending traders',
          'Trade in the direction of the overall trend',
          'Follow social media trends',
          'Trending stocks are safe'
        ],
        correctAnswer: 1,
        explanation: 'This principle emphasizes trading with the prevailing trend rather than against it. Fighting strong trends typically leads to losses.',
        realLifeInsight: 'Traders who tried shorting Tesla during its 2020-2021 bull run lost billions. The stock rose 1000%+. Fighting strong trends is expensive.',
        category: 'Trading Principles'
      },
      {
        id: 28,
        question: 'What is momentum in technical analysis?',
        options: [
          'Speed of price movement',
          'Trading volume',
          'Market excitement',
          'Broker execution speed'
        ],
        correctAnswer: 0,
        explanation: 'Momentum measures the rate of price change - how fast prices are moving up or down. Strong momentum suggests continuation is likely.',
        realLifeInsight: 'Nvidia showed incredible momentum in 2024, rising from $500 to $900 in just 3 months. High momentum attracts more buyers, creating feedback loops.',
        category: 'Momentum'
      },
      {
        id: 29,
        question: 'What is the Rate of Change (ROC) indicator?',
        options: [
          'Measures volume changes',
          'Calculates percentage change over time',
          'Shows price range',
          'Tracks company growth'
        ],
        correctAnswer: 1,
        explanation: 'ROC measures the percentage change in price between the current price and the price n periods ago, showing momentum.',
        realLifeInsight: 'Cryptocurrency traders love ROC for its simplicity. A positive ROC shows upward momentum; negative ROC shows downward momentum.',
        category: 'Momentum Indicators'
      },
      {
        id: 30,
        question: 'Can technical analysis predict exact prices?',
        options: [
          'Yes, with enough indicators',
          'No, it shows probabilities and levels, not exact prices',
          'Yes, if you use AI',
          'Yes, professional traders can'
        ],
        correctAnswer: 1,
        explanation: 'Technical analysis identifies probability zones and potential support/resistance levels, not exact future prices. It\'s about probability, not certainty.',
        realLifeInsight: 'No one can predict exact prices. Even the best traders have 55-60% win rates. Success comes from proper risk management, not prediction.',
        category: 'Trading Reality'
      },
      {
        id: 31,
        question: 'What is convergence in technical analysis?',
        options: [
          'Price and indicator moving together',
          'Multiple indicators showing same signal',
          'Stocks meeting at one price',
          'Traders agreeing on direction'
        ],
        correctAnswer: 1,
        explanation: 'Convergence occurs when multiple indicators or timeframes align to give the same signal, increasing probability of the trade working.',
        realLifeInsight: 'When RSI, MACD, and moving averages all give bullish signals simultaneously, the probability of an upward move increases significantly.',
        category: 'Signal Confirmation'
      },
      {
        id: 32,
        question: 'What is the 200-day moving average known as?',
        options: [
          'The danger line',
          'The bull/bear line',
          'The profit line',
          'The resistance line'
        ],
        correctAnswer: 1,
        explanation: 'The 200-day MA is widely considered the "bull/bear line." Price above it suggests bullish conditions; below it suggests bearish.',
        realLifeInsight: 'During 2022 bear market, the S&P 500 stayed below its 200-day MA for months. When it reclaimed it in 2023, it signaled the new bull market.',
        category: 'Key Levels'
      },
      {
        id: 33,
        question: 'What is the significance of the 50-day moving average?',
        options: [
          'No significance, arbitrary number',
          'Intermediate-term trend indicator',
          'Only for day trading',
          'Required by SEC'
        ],
        correctAnswer: 1,
        explanation: 'The 50-day MA represents intermediate-term trend. It\'s faster than 200-day but slower than short-term MAs, useful for swing trading.',
        realLifeInsight: 'Apple bounced off its 50-day MA seven times during 2023\'s uptrend. Many institutional algorithms use the 50-day MA as dynamic support.',
        category: 'Key Levels'
      },
      {
        id: 34,
        question: 'What does it mean when an indicator is "lagging"?',
        options: [
          'The software is slow',
          'It confirms moves after they happen',
          'It needs updating',
          'It\'s broken'
        ],
        correctAnswer: 1,
        explanation: 'Lagging indicators are based on historical data and confirm trends after they\'ve already begun. Moving averages are classic lagging indicators.',
        realLifeInsight: 'Most indicators lag because they use past data. By the time a golden cross forms, the uptrend may already be well underway - but it confirms direction.',
        category: 'Indicator Characteristics'
      },
      {
        id: 35,
        question: 'What is a "leading" indicator?',
        options: [
          'The best indicator',
          'One that signals changes before they occur',
          'Most popular indicator',
          'First indicator you should use'
        ],
        correctAnswer: 1,
        explanation: 'Leading indicators attempt to predict future price movements. RSI and Stochastic are considered leading as they can show momentum shifts early.',
        realLifeInsight: 'No indicator truly "leads" - all use past data. But oscillators can show momentum weakening before price actually reverses, giving earlier warnings.',
        category: 'Indicator Characteristics'
      },
      {
        id: 36,
        question: 'What is the Volume Weighted Average Price (VWAP)?',
        options: [
          'Average volume',
          'Average price weighted by volume at each price level',
          'Highest volume price',
          'Opening price average'
        ],
        correctAnswer: 1,
        explanation: 'VWAP is the average price weighted by volume, showing the average price where most trading occurred. Institutions use it as a benchmark.',
        realLifeInsight: 'Day traders watch VWAP religiously. Price above VWAP is bullish; below is bearish. Many algorithms enter orders to beat VWAP throughout the day.',
        category: 'Volume Indicators'
      },
      {
        id: 37,
        question: 'Why is VWAP important to institutional traders?',
        options: [
          'Required by regulation',
          'Benchmark for execution quality',
          'Shows insider trading',
          'Predicts closing price'
        ],
        correctAnswer: 1,
        explanation: 'Institutions use VWAP as a benchmark. If they buy a large position below VWAP, they got a better-than-average price for the day.',
        realLifeInsight: 'A fund manager who fills 10,000 Tesla shares at $850 when VWAP is $855 saved $50,000. VWAP performance affects trader bonuses at large firms.',
        category: 'Institutional Trading'
      },
      {
        id: 38,
        question: 'What is the best indicator for trending markets?',
        options: [
          'Moving averages and MACD',
          'Stochastic oscillator',
          'Bollinger Bands',
          'Volume only'
        ],
        correctAnswer: 0,
        explanation: 'Trend-following indicators like moving averages and MACD work best in trending markets. Oscillators give false signals in strong trends.',
        realLifeInsight: 'During Nvidia\'s 2024 uptrend, moving average crossovers worked beautifully. But oscillators showed "overbought" constantly - useless in that trend.',
        category: 'Market Conditions'
      },
      {
        id: 39,
        question: 'What is the best indicator for ranging markets?',
        options: [
          'Moving averages',
          'MACD',
          'RSI and Stochastic oscillators',
          'ADX'
        ],
        correctAnswer: 2,
        explanation: 'Oscillators like RSI and Stochastic work well in ranging markets, identifying overbought and oversold levels as price bounces between ranges.',
        realLifeInsight: 'When a stock trades sideways between $90-$110, RSI helps time entries near support ($90/RSI 30) and exits near resistance ($110/RSI 70).',
        category: 'Market Conditions'
      },
      {
        id: 40,
        question: 'What is chart pattern recognition?',
        options: [
          'Memorizing chart shapes',
          'Identifying recurring price formations that suggest future direction',
          'Drawing pretty pictures',
          'AI pattern matching'
        ],
        correctAnswer: 1,
        explanation: 'Chart patterns are recognizable formations (head & shoulders, triangles, etc.) that have historically preceded certain price movements.',
        realLifeInsight: 'The head and shoulders pattern has been recognized since the 1930s. While not perfect, these patterns reflect mass psychology and often repeat.',
        category: 'Pattern Recognition'
      },
      {
        id: 41,
        question: 'What timeframe should beginners focus on?',
        options: [
          '1-minute charts',
          'Daily and 4-hour charts',
          '1-second tick charts',
          'Monthly charts only'
        ],
        correctAnswer: 1,
        explanation: 'Daily and 4-hour charts filter out noise while still showing meaningful trends. Very short timeframes have too much noise for beginners.',
        realLifeInsight: 'Most successful traders started with daily charts. Jesse Livermore, one of history\'s greatest traders, primarily used daily price action.',
        category: 'Timeframes'
      },
      {
        id: 42,
        question: 'What is "indicator stacking"?',
        options: [
          'Using too many indicators',
          'Layering multiple indicators on one chart',
          'Organizing indicator windows',
          'Professional indicator arrangement'
        ],
        correctAnswer: 0,
        explanation: 'Indicator stacking refers to using too many indicators, which often leads to analysis paralysis and conflicting signals.',
        realLifeInsight: 'New traders often add 10+ indicators. Professional traders typically use 2-3 complementary indicators. More indicators doesn\'t mean better analysis.',
        category: 'Common Mistakes'
      },
      {
        id: 43,
        question: 'What is the most important rule about indicators?',
        options: [
          'Use as many as possible',
          'They are tools for probability, not guarantees',
          'Never use them',
          'Only professionals should use them'
        ],
        correctAnswer: 1,
        explanation: 'Indicators are probabilistic tools based on historical patterns. They increase odds but never guarantee outcomes. Risk management is essential.',
        realLifeInsight: 'Even the best indicator setups fail 40-50% of the time. Warren Buffett famously said "I never ask Charlie about oscillators or resistance levels."',
        category: 'Trading Philosophy'
      },
      {
        id: 44,
        question: 'What is a "whipsaw"?',
        options: [
          'Sudden violent price move',
          'Series of false signals in choppy market',
          'Type of indicator',
          'SEC violation'
        ],
        correctAnswer: 1,
        explanation: 'A whipsaw occurs when a trading signal triggers an entry, but price quickly reverses, causing a loss before triggering another false signal.',
        realLifeInsight: 'Whipsaws destroy accounts during choppy, low-volume periods. Many pros reduce position size or stop trading entirely during known choppy conditions.',
        category: 'Market Conditions'
      },
      {
        id: 45,
        question: 'How can you identify a choppy market?',
        options: [
          'High ADX reading',
          'Low ADX reading below 20',
          'RSI above 70',
          'High volume'
        ],
        correctAnswer: 1,
        explanation: 'Low ADX (below 20) indicates weak trend or choppy, ranging conditions. Many trend-following systems turn off below ADX 20.',
        realLifeInsight: 'Professional algorithms monitor ADX. Many momentum strategies automatically reduce position sizes when ADX drops below 20 to avoid whipsaws.',
        category: 'Market Identification'
      },
      {
        id: 46,
        question: 'What is "indicator divergence trading"?',
        options: [
          'Trading opposite to indicators',
          'Trading when price and indicator disagree',
          'Using different indicators than others',
          'Ignoring indicators'
        ],
        correctAnswer: 1,
        explanation: 'Divergence trading looks for disagreement between price and indicator (like RSI), suggesting momentum is shifting and a reversal may occur.',
        realLifeInsight: 'George Soros famously looks for divergences between fundamentals and price action. Technical divergences work on similar logic.',
        category: 'Trading Strategies'
      },
      {
        id: 47,
        question: 'What is the Williams %R indicator?',
        options: [
          'Volume indicator',
          'Momentum indicator similar to Stochastic',
          'Trend indicator',
          'News sentiment indicator'
        ],
        correctAnswer: 1,
        explanation: 'Williams %R is a momentum oscillator that measures overbought/oversold levels, similar to Stochastic but calculated inversely (-100 to 0).',
        realLifeInsight: 'Larry Williams developed this in 1973 and used it to turn $10,000 into $1.1 million in one year. It\'s popular among day traders.',
        category: 'Momentum Indicators'
      },
      {
        id: 48,
        question: 'What does "price action" mean?',
        options: [
          'How fast price moves',
          'Movement and behavior of price itself, without indicators',
          'Price changes during the day',
          'Broker pricing'
        ],
        correctAnswer: 1,
        explanation: 'Price action is the study of price movement itself - patterns, candlesticks, support/resistance - without relying on indicators.',
        realLifeInsight: 'Many professional traders use pure price action. Al Brooks, a famous trader, trades solely off price bars without any indicators on his charts.',
        category: 'Trading Approaches'
      },
      {
        id: 49,
        question: 'What is more important: indicators or price action?',
        options: [
          'Indicators are more important',
          'Price action is primary; indicators confirm',
          'They\'re equally important',
          'Neither matters'
        ],
        correctAnswer: 1,
        explanation: 'Price is king - it\'s the ultimate truth. Indicators are derived from price and lag behind it. Use indicators to confirm what price is showing.',
        realLifeInsight: 'If price breaks strongly higher but indicators say "overbought," follow price. Indicators can stay overbought for weeks in strong trends.',
        category: 'Trading Philosophy'
      },
      {
        id: 50,
        question: 'What is the Commodity Channel Index (CCI)?',
        options: [
          'Commodity prices index',
          'Oscillator measuring deviation from average price',
          'Channel news indicator',
          'Currency correlation index'
        ],
        correctAnswer: 1,
        explanation: 'CCI measures how far price has deviated from its statistical average. Values above +100 or below -100 indicate strong moves.',
        realLifeInsight: 'Originally developed for commodities, CCI works on any market. Day traders use CCI to identify short-term overbought/oversold conditions.',
        category: 'Oscillators'
      },
      {
        id: 51,
        question: 'What is a Fibonacci retracement?',
        options: [
          'Mathematical trading strategy',
          'Tool to identify potential support/resistance at key percentages',
          'Ancient Italian indicator',
          'Broker fee structure'
        ],
        correctAnswer: 1,
        explanation: 'Fibonacci retracement uses ratios (23.6%, 38.2%, 50%, 61.8%) from Fibonacci sequence to identify potential pullback levels in trends.',
        realLifeInsight: 'Bitcoin often respects Fibonacci levels eerily well. The 61.8% retracement is called the "golden ratio" and frequently marks reversal points.',
        category: 'Support/Resistance'
      },
      {
        id: 52,
        question: 'What are the key Fibonacci levels?',
        options: [
          '10%, 50%, 90%',
          '23.6%, 38.2%, 50%, 61.8%',
          '25%, 50%, 75%',
          '20%, 40%, 60%, 80%'
        ],
        correctAnswer: 1,
        explanation: 'The most watched Fibonacci retracement levels are 23.6%, 38.2%, 50%, and 61.8%. The 61.8% "golden ratio" is considered most significant.',
        realLifeInsight: 'During Tesla\'s 2024 pullback from $299 to $138, it found support almost exactly at the 61.8% Fibonacci level. These levels are self-fulfilling.',
        category: 'Key Levels'
      },
      {
        id: 53,
        question: 'What is the On-Balance Volume (OBV) indicator?',
        options: [
          'Opening balance of volume',
          'Cumulative volume indicator showing buying/selling pressure',
          'Options trading volume',
          'Order book volume'
        ],
        correctAnswer: 1,
        explanation: 'OBV adds volume on up days and subtracts volume on down days, creating a cumulative line showing whether volume supports price direction.',
        realLifeInsight: 'When Amazon rallied in 2023 but OBV was flat, it warned of weak buying pressure. The stock eventually pulled back significantly.',
        category: 'Volume Indicators'
      },
      {
        id: 54,
        question: 'What is a bullish OBV divergence?',
        options: [
          'OBV and price both rising',
          'Price making lower lows but OBV rising',
          'OBV above zero',
          'High volume day'
        ],
        correctAnswer: 1,
        explanation: 'Bullish OBV divergence occurs when price makes lower lows but OBV is rising or making higher lows, suggesting accumulation despite falling price.',
        realLifeInsight: 'Before Apple\'s breakout in early 2023, OBV was climbing even as price went sideways, showing institutional accumulation before the rally.',
        category: 'Divergence'
      },
      {
        id: 55,
        question: 'What is the Average True Range (ATR)?',
        options: [
          'Average price range',
          'Volatility indicator measuring average range of price movement',
          'Average trading time',
          'Average transaction rate'
        ],
        correctAnswer: 1,
        explanation: 'ATR measures volatility by calculating the average range between high and low over a period. Higher ATR means more volatility.',
        realLifeInsight: 'Traders use ATR for stop-loss placement. If ATR is $5, placing stops $1 away gets you stopped out by normal noise. Use 1.5-2x ATR.',
        category: 'Volatility Indicators'
      },
      {
        id: 56,
        question: 'How do traders use ATR for position sizing?',
        options: [
          'Higher ATR means larger positions',
          'Higher ATR means smaller positions due to increased risk',
          'ATR doesn\'t affect position size',
          'ATR only for stop-loss placement'
        ],
        correctAnswer: 1,
        explanation: 'Higher ATR means more volatility and risk, so professional traders reduce position size. If ATR doubles, they might halve position size.',
        realLifeInsight: 'When Tesla\'s ATR spiked from $8 to $16 in 2024, pros cut position sizes in half to maintain same dollar risk per trade.',
        category: 'Risk Management'
      },
      {
        id: 57,
        question: 'What is the Ichimoku Cloud?',
        options: [
          'Japanese weather indicator',
          'Comprehensive indicator showing support, resistance, and trend',
          'Cloud computing for trading',
          'Options strategy'
        ],
        correctAnswer: 1,
        explanation: 'Ichimoku Cloud is a Japanese indicator system showing support/resistance (cloud), trend direction, and momentum all in one chart.',
        realLifeInsight: 'Japanese traders developed Ichimoku before WWII. It looks complex but provides complete trend analysis at a glance once understood.',
        category: 'Comprehensive Indicators'
      },
      {
        id: 58,
        question: 'What does it mean when price is above the Ichimoku Cloud?',
        options: [
          'Price is too high',
          'Bullish trend with cloud acting as support',
          'Time to short',
          'Market closing'
        ],
        correctAnswer: 1,
        explanation: 'Price above the cloud is bullish, with the cloud acting as support. Price below the cloud is bearish, with cloud acting as resistance.',
        realLifeInsight: 'During Nvidia\'s 2024 rally, price stayed above the cloud for months. The cloud acted as perfect support on every pullback.',
        category: 'Trend Identification'
      },
      {
        id: 59,
        question: 'What is the Parabolic SAR?',
        options: [
          'Satellite trading system',
          'Stop and Reverse indicator showing trend and stops',
          'Parabola chart pattern',
          'Advanced options indicator'
        ],
        correctAnswer: 1,
        explanation: 'Parabolic SAR (Stop And Reverse) places dots above/below price showing trend direction and potential trailing stop levels.',
        realLifeInsight: 'J. Welles Wilder (who created RSI and ATR) also created Parabolic SAR. It works best in trending markets and poorly in choppy conditions.',
        category: 'Trend Indicators'
      },
      {
        id: 60,
        question: 'What does "indicator correlation" mean?',
        options: [
          'Indicators matching each other',
          'When indicators measure similar things and give redundant signals',
          'Indicators working together',
          'Correlation stocks'
        ],
        correctAnswer: 1,
        explanation: 'Indicator correlation means using multiple indicators that measure the same thing (like RSI and Stochastic), providing no additional information.',
        realLifeInsight: 'Using RSI, Stochastic, and CCI together is redundant - they\'re all momentum oscillators. Better to combine trend, momentum, and volume indicators.',
        category: 'Indicator Selection'
      },
      {
        id: 61,
        question: 'What is the Elder Ray Index?',
        options: [
          'Senior trader indicator',
          'Measures buying and selling pressure',
          'Morning trading indicator',
          'Gamma ray market scanner'
        ],
        correctAnswer: 1,
        explanation: 'Elder Ray uses Bull Power (high minus EMA) and Bear Power (low minus EMA) to measure buying and selling pressure.',
        realLifeInsight: 'Dr. Alexander Elder created this to see if bulls or bears are winning. Growing Bull Power with rising EMA is strongly bullish.',
        category: 'Momentum Indicators'
      },
      {
        id: 62,
        question: 'Should you change indicator parameters frequently?',
        options: [
          'Yes, optimize daily',
          'No, stick with standard settings initially',
          'Yes, for every trade',
          'Parameters don\'t matter'
        ],
        correctAnswer: 1,
        explanation: 'Constantly changing parameters leads to curve-fitting and false confidence. Start with standard settings; change only with extensive testing.',
        realLifeInsight: 'Beginners often "optimize" indicators to fit past price perfectly. This curve-fitting fails in real trading. Standard parameters work across markets.',
        category: 'Common Mistakes'
      },
      {
        id: 63,
        question: 'What is "curve fitting" in technical analysis?',
        options: [
          'Drawing curved trendlines',
          'Over-optimizing indicators to match past data perfectly',
          'Fitting charts to screen',
          'Adjusting price curves'
        ],
        correctAnswer: 1,
        explanation: 'Curve fitting is over-optimizing strategy or indicators to perfectly match historical data, which usually fails in live trading.',
        realLifeInsight: 'A strategy that works perfectly on past data but fails live was curve-fitted. Robust strategies work with slight parameter changes.',
        category: 'Common Mistakes'
      },
      {
        id: 64,
        question: 'What is the best approach to learning indicators?',
        options: [
          'Learn all 100+ indicators',
          'Master 2-3 complementary indicators thoroughly',
          'Use only the newest indicators',
          'Copy what others use'
        ],
        correctAnswer: 1,
        explanation: 'Master a few complementary indicators (trend, momentum, volume) rather than knowing many superficially. Depth beats breadth.',
        realLifeInsight: 'Linda Raschke, a legendary trader, uses primarily RSI and moving averages. She\'s mastered them over 30+ years rather than adding more indicators.',
        category: 'Learning Strategy'
      },
      {
        id: 65,
        question: 'What is the Money Flow Index (MFI)?',
        options: [
          'Interest rate indicator',
          'Volume-weighted RSI showing buying/selling pressure',
          'Money supply indicator',
          'Profit flow meter'
        ],
        correctAnswer: 1,
        explanation: 'MFI is like RSI but incorporates volume, measuring buying and selling pressure based on both price and volume.',
        realLifeInsight: 'MFI divergences are powerful because they combine price and volume. A price high with falling MFI shows big money is exiting.',
        category: 'Volume Indicators'
      },
      {
        id: 66,
        question: 'What is the difference between MFI and RSI?',
        options: [
          'No difference',
          'MFI includes volume, RSI doesn\'t',
          'MFI is for stocks, RSI for forex',
          'MFI is faster'
        ],
        correctAnswer: 1,
        explanation: 'MFI incorporates both price and volume, making it a "volume-weighted RSI." RSI only looks at price changes.',
        realLifeInsight: 'When GameStop rallied in 2021, MFI showed extreme overbought faster than RSI because it captured the massive volume explosion.',
        category: 'Indicator Differences'
      },
      {
        id: 67,
        question: 'What is the Aroon Indicator?',
        options: [
          'Asian market indicator',
          'Indicator measuring time since highs/lows to identify trend',
          'Morning trading indicator',
          'Moon phase indicator'
        ],
        correctAnswer: 1,
        explanation: 'Aroon measures time elapsed since 25-period high/low. Aroon-Up and Aroon-Down lines identify trend strength and potential changes.',
        realLifeInsight: 'When Aroon-Up is high (near 100) and Aroon-Down is low, it indicates a strong uptrend. The indicator helps identify trend exhaustion.',
        category: 'Trend Indicators'
      },
      {
        id: 68,
        question: 'Can indicators work in all market conditions?',
        options: [
          'Yes, all indicators work everywhere',
          'No, different indicators suit different conditions',
          'Only professional-grade indicators work everywhere',
          'Yes, if properly optimized'
        ],
        correctAnswer: 1,
        explanation: 'No indicator works in all conditions. Trend indicators fail in ranges; oscillators fail in trends. Match tool to market condition.',
        realLifeInsight: 'The 2022 choppy market destroyed trend-following systems that worked in 2020-2021. Successful traders adapt tools to current conditions.',
        category: 'Market Conditions'
      },
      {
        id: 69,
        question: 'What is the most important principle of technical analysis?',
        options: [
          'Use complex indicators',
          'Price reflects all available information',
          'Always follow indicators exactly',
          'Never use indicators'
        ],
        correctAnswer: 1,
        explanation: 'The foundation of technical analysis is that price reflects all available information - fundamental, psychological, and supply/demand.',
        realLifeInsight: 'This is why price action is king. By the time news hits, price has often already moved. Price leads, news follows.',
        category: 'Core Principles'
      },
      {
        id: 70,
        question: 'What is the final lesson about indicators?',
        options: [
          'They guarantee profits',
          'They\'re tools for probability, requiring discipline and risk management',
          'They don\'t work',
          'Only professionals should use them'
        ],
        correctAnswer: 1,
        explanation: 'Indicators are probabilistic tools that improve odds, not crystal balls. Success requires discipline, risk management, and emotional control.',
        realLifeInsight: 'Paul Tudor Jones said: "The secret to trading is having really good risk control." Indicators help find setups; risk management keeps you alive.',
        category: 'Trading Philosophy'
      }
    ]
  },
  
  '5': {
    title: 'Risk Management Strategies',
    level: 'Insider',
    totalQuestions: 70,
    passingScore: 70,
    pointsAwarded: 140,
    description: 'Learn professional risk management techniques to protect capital and maximize long-term success.',
    learningObjectives: [
      'Calculate proper position sizes',
      'Set effective stop-losses',
      'Understand risk/reward ratios',
      'Manage portfolio risk and correlation'
    ],
    keyTakeaways: [
      'Risk management is more important than entry technique',
      'Never risk more than 1-2% per trade',
      'Position size determines survival',
      'Protect capital first, profits second'
    ],
    questions: [
      {
        id: 1,
        question: 'What is the most important rule of trading?',
        options: [
          'Always make profits',
          'Protect your capital',
          'Trade frequently',
          'Follow the crowd'
        ],
        correctAnswer: 1,
        explanation: 'Capital preservation is paramount. You can\'t trade without capital. Protecting your account should always be the first priority.',
        realLifeInsight: 'Warren Buffett\'s Rule #1: Never lose money. Rule #2: Never forget Rule #1. Capital preservation enables you to trade another day.',
        category: 'Core Principles'
      },
      {
        id: 2,
        question: 'What is position sizing?',
        options: [
          'How big your screen is',
          'Determining how many shares/contracts to trade',
          'Size of your portfolio',
          'Number of positions you hold'
        ],
        correctAnswer: 1,
        explanation: 'Position sizing is calculating the appropriate number of shares or contracts to trade based on your account size and risk tolerance.',
        realLifeInsight: 'Position sizing is the difference between pros and amateurs. A $100k account might buy 100 shares of a $1000 stock, not the whole account.',
        category: 'Position Sizing'
      },
      {
        id: 3,
        question: 'What percentage of your account should you risk per trade?',
        options: [
          '10-20%',
          '5-10%',
          '1-2%',
          '25-50%'
        ],
        correctAnswer: 2,
        explanation: 'Professional traders typically risk only 1-2% of their account per trade. This allows for many losing trades without destroying the account.',
        realLifeInsight: 'If you risk 10% per trade, 10 consecutive losses wipes out your account. At 1% risk, you can survive 50+ losses and still trade.',
        category: 'Risk Per Trade'
      },
      {
        id: 4,
        question: 'What is a stop-loss order?',
        options: [
          'Order to stop trading',
          'Automatic order to exit at predetermined loss level',
          'Order to buy more',
          'Maximum daily loss'
        ],
        correctAnswer: 1,
        explanation: 'A stop-loss is a predefined exit point that automatically closes your position to limit losses if price moves against you.',
        realLifeInsight: 'The 2010 Flash Crash taught traders the importance of stop-losses. Those without them watched helplessly as positions collapsed.',
        category: 'Stop-Loss'
      },
      {
        id: 5,
        question: 'What is risk/reward ratio?',
        options: [
          'Your risk tolerance',
          'Potential profit compared to potential loss on a trade',
          'Portfolio volatility',
          'Win rate percentage'
        ],
        correctAnswer: 1,
        explanation: 'Risk/reward ratio compares how much you\'re risking (to stop-loss) versus how much you could gain (to target). 1:3 means risking $1 to make $3.',
        realLifeInsight: 'Professional traders demand minimum 1:2 or 1:3 ratios. If you win 40% but average 1:3 R:R, you\'re still profitable.',
        category: 'Risk/Reward'
      },
      {
        id: 6,
        question: 'What is a good minimum risk/reward ratio?',
        options: [
          '1:1',
          '1:2 or better',
          '2:1',
          '1:0.5'
        ],
        correctAnswer: 1,
        explanation: 'Most successful traders require at least 1:2 risk/reward, meaning potential profit should be at least twice the potential loss.',
        realLifeInsight: 'Linda Raschke, a legendary trader, won\'t take trades below 1:3. With a 40% win rate and 1:3 R:R, she\'s consistently profitable.',
        category: 'Risk/Reward Standards'
      },
      {
        id: 7,
        question: 'What is a trailing stop?',
        options: [
          'Stop that follows you',
          'Stop-loss that moves up as price rises, locking in profits',
          'Stop for trend-following',
          'Final stop-loss'
        ],
        correctAnswer: 1,
        explanation: 'A trailing stop automatically adjusts upward as price rises, protecting profits while allowing the trade room to continue working.',
        realLifeInsight: 'During Tesla\'s 2020 rally from $400 to $900, traders using trailing stops captured most of the move without guessing the top.',
        category: 'Stop-Loss Types'
      },
      {
        id: 8,
        question: 'What is the 1% rule?',
        options: [
          'Make 1% per day',
          'Never risk more than 1% of account on any single trade',
          'Keep 1% in cash',
          'Buy stocks under $1'
        ],
        correctAnswer: 1,
        explanation: 'The 1% rule means never risking more than 1% of your total account value on any single trade, providing longevity.',
        realLifeInsight: 'Many professional funds use the 1% rule. A $1 million account risks maximum $10,000 per trade, allowing for many losers.',
        category: 'Risk Rules'
      },
      {
        id: 9,
        question: 'How do you calculate position size with the 1% rule?',
        options: [
          'Buy 1% worth of shares',
          'Account Size × 1% ÷ (Entry Price - Stop Price)',
          'Just buy 100 shares',
          'Use maximum leverage'
        ],
        correctAnswer: 1,
        explanation: 'Position size = (Account × Risk%) ÷ (Entry - Stop). $100k account, 1% risk, $100 entry, $95 stop: ($100k × 0.01) ÷ $5 = 200 shares.',
        realLifeInsight: 'This formula ensures consistent risk. Whether the stop is $1 away or $10 away, you always risk the same dollar amount.',
        category: 'Position Sizing Calculation'
      },
      {
        id: 10,
        question: 'What is portfolio heat?',
        options: [
          'Portfolio temperature',
          'Total risk across all open positions',
          'Market volatility',
          'Trading frequency'
        ],
        correctAnswer: 1,
        explanation: 'Portfolio heat is the sum of risk across all open trades. If you have 5 trades each risking 1%, your portfolio heat is 5%.',
        realLifeInsight: 'Professional traders cap portfolio heat at 5-6%. This prevents catastrophic losses when multiple positions hit stops simultaneously.',
        category: 'Portfolio Risk'
      },
      {
        id: 11,
        question: 'What is the maximum recommended portfolio heat?',
        options: [
          '1-2%',
          '5-6%',
          '10-15%',
          '20-25%'
        ],
        correctAnswer: 1,
        explanation: 'Most professional risk managers cap total portfolio heat at 5-6%, meaning maximum combined risk across all positions.',
        realLifeInsight: 'During the 2022 market crash, traders with 20% portfolio heat saw accounts drop 20%+ in days. Those at 5% survived comfortably.',
        category: 'Portfolio Risk Limits'
      },
      {
        id: 12,
        question: 'What is correlation in portfolio risk?',
        options: [
          'How trades relate to each other',
          'Similar price movements between positions',
          'Trading accuracy',
          'Broker relationships'
        ],
        correctAnswer: 1,
        explanation: 'Correlation measures how positions move together. High correlation means they\'ll likely all win or lose together, concentrating risk.',
        realLifeInsight: 'In March 2020, traders holding "diversified" tech stocks all crashed together. High correlation made diversification an illusion.',
        category: 'Correlation'
      },
      {
        id: 13,
        question: 'Why is high correlation dangerous?',
        options: [
          'It\'s illegal',
          'All positions can hit stop-losses simultaneously',
          'Brokers don\'t allow it',
          'It increases commissions'
        ],
        correctAnswer: 1,
        explanation: 'High correlation means positions move together. If market turns against you, multiple stops can trigger at once, causing large losses.',
        realLifeInsight: 'Hedge funds holding META, GOOGL, AMZN thought they were diversified. In 2022, all tech crashed together, causing massive losses.',
        category: 'Correlation Risk'
      },
      {
        id: 14,
        question: 'What is diversification?',
        options: [
          'Trading many stocks',
          'Spreading risk across uncorrelated assets',
          'Having multiple brokers',
          'Trading different timeframes'
        ],
        correctAnswer: 1,
        explanation: 'True diversification means holding assets that don\'t move together (low correlation), reducing overall portfolio risk.',
        realLifeInsight: 'A portfolio with stocks, bonds, commodities, and currencies survived 2022 better than 100% tech stocks because of low correlation.',
        category: 'Diversification'
      },
      {
        id: 15,
        question: 'What is over-diversification?',
        options: [
          'Too many positions to manage effectively',
          'Investing in everything',
          'Trading too frequently',
          'Using multiple strategies'
        ],
        correctAnswer: 0,
        explanation: 'Over-diversification (diworsification) happens when you hold so many positions that gains are diluted and management becomes impossible.',
        realLifeInsight: 'Warren Buffett says "Diversification is protection against ignorance." He prefers concentrated positions in his best ideas.',
        category: 'Diversification Limits'
      },
      {
        id: 16,
        question: 'What is a drawdown?',
        options: [
          'Withdrawing money',
          'Peak-to-trough decline in account value',
          'Daily loss',
          'Broker fee'
        ],
        correctAnswer: 1,
        explanation: 'Drawdown measures the percentage decline from your account\'s highest point to its lowest point before recovering.',
        realLifeInsight: 'A 50% drawdown requires a 100% gain to recover. Going from $100k to $50k needs $50k profit (100%) to get back to $100k.',
        category: 'Drawdown'
      },
      {
        id: 17,
        question: 'What is the mathematical problem with large drawdowns?',
        options: [
          'They look bad',
          'Recovery requires much larger percentage gain',
          'They trigger taxes',
          'Brokers charge more'
        ],
        correctAnswer: 1,
        explanation: 'A 20% loss requires 25% gain to recover; 50% loss needs 100% gain. Larger drawdowns require exponentially larger returns to break even.',
        realLifeInsight: 'This is why capital preservation matters. The NASDAQ fell 78% in 2000-2002, requiring 357% gain to recover (took 15 years).',
        category: 'Drawdown Mathematics'
      },
      {
        id: 18,
        question: 'What is a maximum drawdown limit?',
        options: [
          'Never take losses',
          'Predetermined stopping point for trading',
          'Broker requirement',
          'Tax threshold'
        ],
        correctAnswer: 1,
        explanation: 'A max drawdown limit is a percentage decline at which you stop trading to reassess strategy, preventing catastrophic losses.',
        realLifeInsight: 'Professional traders often stop at 10-15% drawdown. They review what\'s wrong rather than digging deeper holes.',
        category: 'Risk Controls'
      },
      {
        id: 19,
        question: 'What is position concentration risk?',
        options: [
          'Thinking too hard',
          'Too much capital in one position or sector',
          'Trading too frequently',
          'Multiple brokers'
        ],
        correctAnswer: 1,
        explanation: 'Concentration risk occurs when too much capital is allocated to one position or correlated positions, increasing vulnerability.',
        realLifeInsight: 'Enron employees had 401ks full of company stock. When it collapsed in 2001, they lost jobs AND retirement simultaneously.',
        category: 'Concentration Risk'
      },
      {
        id: 20,
        question: 'What percentage should your largest position be?',
        options: [
          '50-75%',
          '25-35%',
          '10-20%',
          '5-10%'
        ],
        correctAnswer: 2,
        explanation: 'Most risk managers suggest no single position exceed 10-20% of portfolio value to limit concentration risk.',
        realLifeInsight: 'George Soros made his fortune with concentrated bets, but he\'s exceptional. Most traders should limit single positions to 10-15%.',
        category: 'Position Limits'
      },
      {
        id: 21,
        question: 'What is sector concentration risk?',
        options: [
          'Trading in one sector',
          'Too much exposure to one industry sector',
          'Geographic concentration',
          'Time zone concentration'
        ],
        correctAnswer: 1,
        explanation: 'Sector concentration means too much portfolio allocated to one industry. If that sector crashes, your entire portfolio suffers.',
        realLifeInsight: 'In 2022, investors concentrated in tech (META, GOOGL, AMZN, NFLX) lost 50-70% as the entire sector collapsed together.',
        category: 'Sector Risk'
      },
      {
        id: 22,
        question: 'What is leverage?',
        options: [
          'A tool to lift weights',
          'Using borrowed money to increase position size',
          'Trading strategy',
          'Portfolio balance'
        ],
        correctAnswer: 1,
        explanation: 'Leverage allows you to control more capital than you have by borrowing from your broker, amplifying both gains and losses.',
        realLifeInsight: 'Long-Term Capital Management, run by Nobel Prize winners, collapsed in 1998 due to excessive leverage despite brilliant strategies.',
        category: 'Leverage'
      },
      {
        id: 23,
        question: 'What is the danger of high leverage?',
        options: [
          'Higher fees',
          'Magnifies losses and can wipe out account quickly',
          'Slower execution',
          'More paperwork'
        ],
        correctAnswer: 1,
        explanation: 'Leverage amplifies everything. With 10x leverage, a 10% adverse move wipes out your account. Losses exceed deposits quickly.',
        realLifeInsight: 'During the 2015 Swiss Franc shock, traders using high leverage lost more than their deposits, owing brokers money.',
        category: 'Leverage Risk'
      },
      {
        id: 24,
        question: 'What is a margin call?',
        options: [
          'Broker calling to chat',
          'Forced liquidation when account falls below margin requirements',
          'Reminder to trade',
          'Profit notification'
        ],
        correctAnswer: 1,
        explanation: 'A margin call occurs when your account value falls below required minimums, forcing liquidation of positions to meet requirements.',
        realLifeInsight: 'In March 2020, margin calls forced mass selling, accelerating the crash. Traders were liquidated at the worst prices.',
        category: 'Margin'
      },
      {
        id: 25,
        question: 'What is Kelly Criterion?',
        options: [
          'A trader named Kelly',
          'Mathematical formula for optimal position sizing',
          'Risk assessment test',
          'Trading license requirement'
        ],
        correctAnswer: 1,
        explanation: 'Kelly Criterion is a mathematical formula that calculates optimal position size based on win rate and average win/loss to maximize long-term growth.',
        realLifeInsight: 'Ed Thorp used Kelly Criterion to beat casinos and later make millions in markets. But most traders use "fractional Kelly" for safety.',
        category: 'Position Sizing Methods'
      },
      {
        id: 26,
        question: 'Why do most traders use "half Kelly" instead of full Kelly?',
        options: [
          'It\'s easier to calculate',
          'Full Kelly is too aggressive; half Kelly reduces volatility',
          'Brokers require it',
          'It\'s more profitable'
        ],
        correctAnswer: 1,
        explanation: 'Full Kelly maximizes growth but creates wild swings. Half Kelly (using 50% of Kelly size) achieves 75% of growth with much less volatility.',
        realLifeInsight: 'Renaissance Technologies, the most successful hedge fund, reportedly uses fractional Kelly to balance growth and drawdown.',
        category: 'Position Sizing Refinement'
      },
      {
        id: 27,
        question: 'What is the 2% rule?',
        options: [
          'Make 2% per day',
          'Never risk more than 2% total account per trade',
          'Always use 2x leverage',
          'Trade 2 stocks maximum'
        ],
        correctAnswer: 1,
        explanation: 'The 2% rule states you should never risk more than 2% of your account on any single trade, slightly more aggressive than 1%.',
        realLifeInsight: 'More aggressive traders use 2% while conservative traders stick with 1%. Both work if applied consistently.',
        category: 'Risk Rules'
      },
      {
        id: 28,
        question: 'What is account churning?',
        options: [
          'Making butter',
          'Over-trading that generates fees but no profit',
          'Account rotation',
          'Diversification strategy'
        ],
        correctAnswer: 1,
        explanation: 'Churning is excessive trading that generates commissions and fees but doesn\'t produce profits, often destroying accounts.',
        realLifeInsight: 'Studies show overtrading is a leading cause of retail trader failure. Those who trade less frequently often perform better.',
        category: 'Over-Trading'
      },
      {
        id: 29,
        question: 'What is the win rate?',
        options: [
          'How fast you win',
          'Percentage of trades that are profitable',
          'Amount won per trade',
          'Trading frequency'
        ],
        correctAnswer: 1,
        explanation: 'Win rate (or accuracy) is the percentage of your trades that end in profit. 60% win rate means 6 out of 10 trades are winners.',
        realLifeInsight: 'Win rate alone doesn\'t determine success. You can be profitable with 40% win rate if winners are much larger than losers.',
        category: 'Performance Metrics'
      },
      {
        id: 30,
        question: 'Is a high win rate necessary for profitability?',
        options: [
          'Yes, you need 80%+ win rate',
          'No, low win rate with good R:R can be profitable',
          'Yes, you must win every trade',
          'No metric matters'
        ],
        correctAnswer: 1,
        explanation: 'You can be profitable with 40% win rate if average winners are 3x larger than losers. Win rate × avg win must exceed loss rate × avg loss.',
        realLifeInsight: 'Trend followers often have 30-40% win rates but massive winners compensate. Richard Dennis (Turtle Trader) had ~40% accuracy.',
        category: 'Profitability Math'
      },
      {
        id: 31,
        question: 'What is expectancy?',
        options: [
          'What you expect to make',
          'Average amount you expect to win/lose per trade',
          'Trading goals',
          'Market predictions'
        ],
        correctAnswer: 1,
        explanation: 'Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Positive expectancy means you make money on average per trade.',
        realLifeInsight: 'A system with 50% win rate, $300 avg win, $150 avg loss has +$75 expectancy. Every trade is worth $75 on average.',
        category: 'Expectancy'
      },
      {
        id: 32,
        question: 'Can you trade profitably with negative expectancy?',
        options: [
          'Yes, with luck',
          'No, you\'ll lose money over time',
          'Yes, with more trades',
          'Yes, with leverage'
        ],
        correctAnswer: 1,
        explanation: 'Negative expectancy means you lose money on average per trade. Over many trades, you\'re guaranteed to lose. No position sizing helps.',
        realLifeInsight: 'This is why casinos win long-term - games have negative expectancy for players. Trade with positive expectancy only.',
        category: 'Expectancy Reality'
      },
      {
        id: 33,
        question: 'What is a profit factor?',
        options: [
          'How much profit you make',
          'Gross profits divided by gross losses',
          'Number of profitable trades',
          'Portfolio growth rate'
        ],
        correctAnswer: 1,
        explanation: 'Profit factor = Total profits ÷ Total losses. Above 1.0 is profitable; below 1.0 loses money. 2.0 means you make $2 for every $1 lost.',
        realLifeInsight: 'Professional trading systems typically have profit factors of 1.5-2.5. Above 3.0 is exceptional and often unsustainable.',
        category: 'Performance Metrics'
      },
      {
        id: 34,
        question: 'What is slippage?',
        options: [
          'Price difference between expected and actual execution',
          'Account decline',
          'Trading mistakes',
          'Market manipulation'
        ],
        correctAnswer: 0,
        explanation: 'Slippage is the difference between expected price and actual fill price, caused by market movement and liquidity.',
        realLifeInsight: 'During the 2010 Flash Crash, slippage was catastrophic. Market orders filled 20-30% away from expected prices.',
        category: 'Execution Risk'
      },
      {
        id: 35,
        question: 'How does slippage affect risk management?',
        options: [
          'It doesn\'t',
          'Increases actual risk beyond calculated risk',
          'Decreases risk',
          'Only affects profits'
        ],
        correctAnswer: 1,
        explanation: 'Slippage can cause stops to fill worse than set price, increasing losses beyond planned risk. Account for slippage in position sizing.',
        realLifeInsight: 'In illiquid stocks, stops can fill 5-10% worse than set. A $5 planned risk becomes $6-7 actual risk from slippage.',
        category: 'Real-World Risk'
      },
      {
        id: 36,
        question: 'What is gap risk?',
        options: [
          'Risk of market closing',
          'Price opening far from previous close, bypassing stop-loss',
          'Space between trades',
          'Knowledge gaps'
        ],
        correctAnswer: 1,
        explanation: 'Gap risk occurs when price gaps through your stop-loss, causing much larger loss than planned. Common with overnight positions.',
        realLifeInsight: 'Meta gapped down 26% in February 2022 after earnings. Stops at -10% filled at -26%, tripling planned losses.',
        category: 'Gap Risk'
      },
      {
        id: 37,
        question: 'How can you reduce gap risk?',
        options: [
          'Use smaller positions or avoid holding through events',
          'Use more leverage',
          'Ignore it',
          'Set tighter stops'
        ],
        correctAnswer: 0,
        explanation: 'Reduce gap risk by sizing smaller before earnings/news, closing positions before events, or trading only during market hours.',
        realLifeInsight: 'Professional traders often reduce positions by 50% before major events like earnings to reduce gap risk exposure.',
        category: 'Risk Mitigation'
      },
      {
        id: 38,
        question: 'What is black swan risk?',
        options: [
          'Risk from rare birds',
          'Extreme unlikely event with massive impact',
          'Dark pool trading risk',
          'After-hours risk'
        ],
        correctAnswer: 1,
        explanation: 'Black swan events are rare, unpredictable occurrences with extreme consequences (COVID-19, 9/11, 2008 crisis).',
        realLifeInsight: 'Nassim Taleb popularized the term. COVID-19 in March 2020 was a black swan - markets fell 35% in weeks.',
        category: 'Extreme Events'
      },
      {
        id: 39,
        question: 'Can you prevent black swan losses?',
        options: [
          'Yes, with perfect analysis',
          'No, but proper sizing limits damage',
          'Yes, with hedging',
          'Yes, with stop-losses'
        ],
        correctAnswer: 1,
        explanation: 'Black swans are unpredictable, but proper position sizing and diversification limit damage. You can\'t predict, but you can protect.',
        realLifeInsight: 'Traders who used 1-2% risk per trade survived COVID crash. Those using 10%+ per trade were wiped out.',
        category: 'Black Swan Protection'
      },
      {
        id: 40,
        question: 'What is hedging?',
        options: [
          'Gardening technique',
          'Taking offsetting position to reduce risk',
          'Trading strategy',
          'Risk elimination'
        ],
        correctAnswer: 1,
        explanation: 'Hedging involves taking a position that offsets existing risk, like buying puts to protect long stock positions.',
        realLifeInsight: 'Institutions buy S&P puts as "portfolio insurance." During crashes, puts explode in value, offsetting stock losses.',
        category: 'Hedging'
      },
      {
        id: 41,
        question: 'What is the cost of hedging?',
        options: [
          'It\'s free',
          'Reduces maximum profit potential',
          'No cost',
          'Only commission'
        ],
        correctAnswer: 1,
        explanation: 'Hedging costs money (buying puts, shorting offsets) and limits upside. It\'s insurance - you pay premiums for protection.',
        realLifeInsight: 'Portfolio insurance costs 1-3% annually but can save 30-40% during crashes. Like home insurance - expensive until you need it.',
        category: 'Hedging Costs'
      },
      {
        id: 42,
        question: 'What is portfolio insurance?',
        options: [
          'FDIC insurance',
          'Buying puts or using strategies to protect downside',
          'Trading insurance',
          'Broker protection'
        ],
        correctAnswer: 1,
        explanation: 'Portfolio insurance uses options (usually puts) or dynamic hedging to protect portfolio value during market declines.',
        realLifeInsight: 'Portfolio insurance caused the 1987 crash when everyone tried to hedge simultaneously, creating a feedback loop.',
        category: 'Portfolio Protection'
      },
      {
        id: 43,
        question: 'What is dynamic position sizing?',
        options: [
          'Random position sizes',
          'Adjusting size based on market conditions and account performance',
          'Always buying maximum size',
          'Trading different sizes randomly'
        ],
        correctAnswer: 1,
        explanation: 'Dynamic sizing adjusts position size based on volatility, win/loss streaks, and market conditions rather than using fixed sizing.',
        realLifeInsight: 'Paul Tudor Jones increases size during winning streaks and decreases after losses. This compounds winners and limits drawdowns.',
        category: 'Advanced Position Sizing'
      },
      {
        id: 44,
        question: 'Should you increase position size after winning trades?',
        options: [
          'Always increase',
          'Carefully, if following a plan',
          'Never increase',
          'Double it every time'
        ],
        correctAnswer: 1,
        explanation: 'Increasing size after wins can compound gains but must follow rules to avoid recklessness. Many traders scale up slowly.',
        realLifeInsight: 'The Turtle Traders scaled up positions as they worked, pyramiding into winners. But they had strict rules, not emotional decisions.',
        category: 'Position Scaling'
      },
      {
        id: 45,
        question: 'Should you decrease position size after losses?',
        options: [
          'Never decrease',
          'Yes, reduce size during losing periods',
          'Increase to make it back',
          'Stop trading completely'
        ],
        correctAnswer: 1,
        explanation: 'Reducing size after losses prevents digging deeper holes during drawdowns. Trade smaller until you find your rhythm again.',
        realLifeInsight: 'Ray Dalio\'s Bridgewater cuts risk exposure during difficult periods rather than trying to "make it back" quickly.',
        category: 'Drawdown Management'
      },
      {
        id: 46,
        question: 'What is the "martingale" strategy?',
        options: [
          'Winning strategy',
          'Doubling position size after losses (very dangerous)',
          'Hedging method',
          'Stop-loss technique'
        ],
        correctAnswer: 1,
        explanation: 'Martingale doubles position size after each loss to recover. It\'s extremely dangerous and eventually leads to account destruction.',
        realLifeInsight: 'Many blown accounts used martingale. Nick Leeson destroyed Barings Bank in 1995 by doubling down on losses until bankruptcy.',
        category: 'Dangerous Strategies'
      },
      {
        id: 47,
        question: 'Why is revenge trading dangerous?',
        options: [
          'It\'s illegal',
          'Emotional trading to recover losses leads to bigger losses',
          'It takes too long',
          'Brokers don\'t allow it'
        ],
        correctAnswer: 1,
        explanation: 'Revenge trading is emotional trading to quickly recover losses, often with excessive risk and poor decisions, compounding losses.',
        realLifeInsight: 'Victor Niederhoffer, once a successful trader, blew up multiple times from revenge trading after significant losses.',
        category: 'Psychological Risk'
      },
      {
        id: 48,
        question: 'What is the best action after a large loss?',
        options: [
          'Trade immediately to recover',
          'Take a break, review what happened, reduce size',
          'Increase leverage',
          'Blame the market'
        ],
        correctAnswer: 1,
        explanation: 'After major losses, step away, analyze objectively what went wrong, and return with smaller positions until confidence returns.',
        realLifeInsight: 'Jesse Livermore stepped away for months after losses to clear his head. He said "I was never wrong, just early" - admitting mistakes helps.',
        category: 'Loss Recovery'
      },
      {
        id: 49,
        question: 'What is position pyramiding?',
        options: [
          'Illegal scheme',
          'Adding to winning positions as trend continues',
          'Building a pyramid of trades',
          'Averaging down'
        ],
        correctAnswer: 1,
        explanation: 'Pyramiding means adding to profitable positions as they work, scaling into trends with multiple entries at better prices.',
        realLifeInsight: 'Jesse Livermore pyramided into trends, adding at higher prices. But he used profits from first position to fund additional entries.',
        category: 'Position Building'
      },
      {
        id: 50,
        question: 'What is averaging down?',
        options: [
          'Buying more as price falls, lowering average entry',
          'Reducing position size',
          'Taking partial profits',
          'Setting lower targets'
        ],
        correctAnswer: 0,
        explanation: 'Averaging down means buying more shares as price falls to lower your average cost. It\'s dangerous as it adds to losing positions.',
        realLifeInsight: 'Averaging down sounds logical but turns small losses into catastrophic ones. Nick Leeson destroyed Barings Bank averaging down.',
        category: 'Dangerous Practices'
      },
      {
        id: 51,
        question: 'Why is averaging down dangerous?',
        options: [
          'It\'s too complex',
          'Adds money to losing trades, increasing losses',
          'Brokers charge extra',
          'It\'s illegal'
        ],
        correctAnswer: 1,
        explanation: 'Averaging down throws good money after bad. If you\'re wrong, you lose more. It turns manageable losses into account-destroying losses.',
        realLifeInsight: 'Countless traders have blown up averaging down. Better to take the loss and move on than turn a $1k loss into $10k.',
        category: 'Risk Multiplication'
      },
      {
        id: 52,
        question: 'What is scaling out of a position?',
        options: [
          'Selling entire position',
          'Exiting position in multiple parts, taking partial profits',
          'Increasing position size',
          'Measuring position'
        ],
        correctAnswer: 1,
        explanation: 'Scaling out means selling portions at different levels, locking in some profits while leaving some to capture larger moves.',
        realLifeInsight: 'Many pros sell 1/3 at 1R, 1/3 at 2R, trail final 1/3. This locks in gains while leaving room for home runs.',
        category: 'Profit Taking'
      },
      {
        id: 53,
        question: 'What is a common mistake with stop-losses?',
        options: [
          'Setting them too tight',
          'Moving stop-losses further away when approached',
          'Using them',
          'Telling others about them'
        ],
        correctAnswer: 1,
        explanation: 'Moving stops away from price to "give the trade more room" is deadly. Accept the loss or don\'t enter the trade.',
        realLifeInsight: 'Professional traders NEVER move stops further away. If you need more room, your original position size was too large.',
        category: 'Stop-Loss Discipline'
      },
      {
        id: 54,
        question: 'What is mental stop-loss?',
        options: [
          'Remembering your stop',
          'Exit level in your head, not programmed in system',
          'Psychological barrier',
          'Stop that makes you think'
        ],
        correctAnswer: 1,
        explanation: 'Mental stops exist in your mind rather than as actual orders. They\'re dangerous because emotions can override them.',
        realLifeInsight: 'Most traders who use mental stops don\'t honor them under pressure. Use actual stop orders to remove emotion.',
        category: 'Stop-Loss Types'
      },
      {
        id: 55,
        question: 'What percentage of trading success is risk management?',
        options: [
          '10-20%',
          '30-40%',
          '60-80%',
          '100%'
        ],
        correctAnswer: 2,
        explanation: 'Most professional traders attribute 60-80% of success to risk management, only 20-40% to entry/exit signals.',
        realLifeInsight: 'Ed Seykota said "Everybody gets what they want from the markets." Winners want to manage risk; losers want excitement.',
        category: 'Trading Success'
      },
      {
        id: 56,
        question: 'What is the role of luck in trading?',
        options: [
          'Trading is all luck',
          'Short-term luck exists; long-term skill dominates',
          'No luck involved',
          'Only losers are unlucky'
        ],
        correctAnswer: 1,
        explanation: 'Over 10 trades, luck matters. Over 1000 trades, skill and risk management determine results. Variance evens out over time.',
        realLifeInsight: 'A monkey can win 10 coin flips. But over 10,000 flips, results approach 50/50. Same with trading - skill shows over time.',
        category: 'Probability'
      },
      {
        id: 57,
        question: 'What is overconfidence bias in trading?',
        options: [
          'Being too confident',
          'Overestimating abilities, leading to excessive risk-taking',
          'Bragging about trades',
          'Using leverage'
        ],
        correctAnswer: 1,
        explanation: 'Overconfidence causes traders to take excessive risk, overtrade, and ignore risk management after a winning streak.',
        realLifeInsight: 'Long-Term Capital Management had Nobel Prize winners who became overconfident. Their fund collapsed spectacularly in 1998.',
        category: 'Psychological Risk'
      },
      {
        id: 58,
        question: 'What should you do during a winning streak?',
        options: [
          'Increase risk dramatically',
          'Stay disciplined, slightly increase size if planned',
          'Quit trading',
          'Stop using stops'
        ],
        correctAnswer: 1,
        explanation: 'Winning streaks end. Stay disciplined, maybe scale up modestly per your plan, but maintain risk management. Pride before fall.',
        realLifeInsight: 'Many traders blow up during winning streaks by becoming overconfident and abandoning risk rules. Discipline always.',
        category: 'Streak Management'
      },
      {
        id: 59,
        question: 'What is sequence of returns risk?',
        options: [
          'Order doesn\'t matter',
          'Order of wins/losses affects outcome significantly',
          'Trading frequency',
          'Return calculations'
        ],
        correctAnswer: 1,
        explanation: 'Early large losses are harder to recover from than early wins. Sequence matters: losing 50% then gaining 50% leaves you down 25%.',
        realLifeInsight: 'This is why capital preservation early is crucial. Two traders with same trades but different sequence can have vastly different outcomes.',
        category: 'Return Mathematics'
      },
      {
        id: 60,
        question: 'What is time-based stops?',
        options: [
          'Stop-loss that expires',
          'Exiting if trade doesn\'t work within expected timeframe',
          'Trading hours limitation',
          'Stop-loss timing'
        ],
        correctAnswer: 1,
        explanation: 'Time stops exit trades that haven\'t worked within expected period, even if price hasn\'t hit stop-loss, freeing capital.',
        realLifeInsight: 'Some swing traders exit after 5 days if trade hasn\'t worked, even without hitting stops. Dead money is still risk exposure.',
        category: 'Exit Strategies'
      },
      {
        id: 61,
        question: 'What is trade frequency risk?',
        options: [
          'Trading too fast',
          'Over-trading increases fee costs and mistakes',
          'Trading schedule',
          'How often you win'
        ],
        correctAnswer: 1,
        explanation: 'Excessive trading increases transaction costs, creates fatigue, and leads to mistakes. Quality over quantity.',
        realLifeInsight: 'Studies show retail traders who trade less frequently have better returns. Overtrading is a leading cause of failure.',
        category: 'Trading Frequency'
      },
      {
        id: 62,
        question: 'What is R-multiple?',
        options: [
          'Risk rating',
          'Multiple of initial risk (1R = initial risk amount)',
          'Return percentage',
          'Reward ratio'
        ],
        correctAnswer: 1,
        explanation: 'R-multiple expresses profit/loss in multiples of initial risk. If you risk $100 and make $300, that\'s 3R. Lose $50 = -0.5R.',
        realLifeInsight: 'Van Tharp popularized R-multiples. They normalize results: a 3R win on $100 risk or $1000 risk is equally good proportionally.',
        category: 'Performance Measurement'
      },
      {
        id: 63,
        question: 'What is a good average R-multiple per trade?',
        options: [
          '-1R',
          '0.5R or higher',
          'Doesn\'t matter',
          '-0.5R'
        ],
        correctAnswer: 1,
        explanation: 'Average 0.5R+ per trade means you make 50 cents profit for every dollar risked. Over many trades, this compounds significantly.',
        realLifeInsight: 'A trader averaging 0.6R with 100 trades (risking 1% each) turns $100k into ~$182k. Consistency matters more than home runs.',
        category: 'Performance Targets'
      },
      {
        id: 64,
        question: 'What is maximum adverse excursion (MAE)?',
        options: [
          'Biggest loss',
          'Largest drawdown during a trade before final result',
          'Market crash',
          'Stop-loss level'
        ],
        correctAnswer: 1,
        explanation: 'MAE measures the worst point a trade reaches before exit. Analyzing MAE helps optimize stop-loss placement.',
        realLifeInsight: 'If analysis shows trades with MAE of -1.5% that become winners, setting stops at -1% is too tight and causes unnecessary exits.',
        category: 'Trade Analysis'
      },
      {
        id: 65,
        question: 'What is maximum favorable excursion (MFE)?',
        options: [
          'Best profit',
          'Largest profit reached during trade before final result',
          'Profit target',
          'Maximum win'
        ],
        correctAnswer: 1,
        explanation: 'MFE shows the best point reached before exit. If trades often reach +5% then reverse, consider taking profits earlier.',
        realLifeInsight: 'Analyzing MFE shows if you\'re exiting too early or late. If MFE averages +8% but you average +3%, you\'re exiting too early.',
        category: 'Exit Optimization'
      },
      {
        id: 66,
        question: 'What is the Sharpe ratio?',
        options: [
          'Sharp trading',
          'Risk-adjusted return metric (return per unit of volatility)',
          'Profit measurement',
          'Win rate calculation'
        ],
        correctAnswer: 1,
        explanation: 'Sharpe ratio measures return relative to volatility. Higher is better. 1.0 is good, 2.0 is excellent, 3.0+ is exceptional.',
        realLifeInsight: 'Renaissance Technologies reportedly achieves Sharpe ratios above 3.0. Most traders are happy with 1.0-1.5.',
        category: 'Risk-Adjusted Returns'
      },
      {
        id: 67,
        question: 'Why is Sharpe ratio important?',
        options: [
          'Required by SEC',
          'Shows if returns justify the volatility/risk taken',
          'Impresses others',
          'Determines taxes'
        ],
        correctAnswer: 1,
        explanation: 'Sharpe ratio reveals if you\'re being compensated adequately for risk taken. High returns with wild swings = lower Sharpe than smooth returns.',
        realLifeInsight: 'A fund returning 30% with 40% volatility (Sharpe 0.75) is worse than one returning 20% with 10% volatility (Sharpe 2.0).',
        category: 'Risk Assessment'
      },
      {
        id: 68,
        question: 'What is tail risk?',
        options: [
          'Risk at the end',
          'Risk of extreme rare events in distribution tails',
          'Following risk',
          'Trailing stop risk'
        ],
        correctAnswer: 1,
        explanation: 'Tail risk refers to unlikely extreme events in the "tails" of distribution curves - rare but devastating occurrences.',
        realLifeInsight: 'The 2008 crisis was a tail event. Models said it was a "once in 100,000 years" occurrence, yet it happened.',
        category: 'Extreme Risk'
      },
      {
        id: 69,
        question: 'How can you protect against tail risk?',
        options: [
          'You can\'t',
          'Position sizing, diversification, and hedging',
          'Perfect analysis',
          'Avoid trading'
        ],
        correctAnswer: 1,
        explanation: 'No prediction prevents tail events, but proper sizing limits damage, diversification reduces correlation, and hedging provides insurance.',
        realLifeInsight: 'Taleb\'s "Black Swan" strategy: lose small amounts regularly buying far OTM puts, but make fortunes during crashes.',
        category: 'Tail Risk Protection'
      },
      {
        id: 70,
        question: 'What is the most important lesson in risk management?',
        options: [
          'Make money fast',
          'Survival first, profits second',
          'Trade frequently',
          'Follow others'
        ],
        correctAnswer: 1,
        explanation: 'Capital preservation enables you to participate in future opportunities. Dead money can\'t trade. Survive first, thrive second.',
        realLifeInsight: 'Ed Seykota: "Risk management is the most important single aspect of trading. Everyone gets what they want from the markets."',
        category: 'Core Philosophy'
      }
    ]
  },
  
  '6': {
    title: 'Market Psychology',
    level: 'Insider',
    totalQuestions: 70,
    passingScore: 70,
    pointsAwarded: 140,
    description: 'Understand the psychological forces that drive markets and learn to master your emotions for trading success.',
    learningObjectives: [
      'Recognize common psychological biases',
      'Understand fear and greed cycles',
      'Master emotional discipline',
      'Learn to control trading psychology'
    ],
    keyTakeaways: [
      'Markets are driven by collective human psychology',
      'Emotional control separates winners from losers',
      'Recognize and overcome cognitive biases',
      'Trading is 80% psychology, 20% strategy'
    ],
    questions: [
      {
        id: 1,
        question: 'What percentage of trading success is psychological?',
        options: [
          '10-20%',
          '40-50%',
          '70-80%',
          '100%'
        ],
        correctAnswer: 2,
        explanation: 'Most professional traders estimate 70-80% of trading success comes from psychology and discipline, not strategy or analysis.',
        realLifeInsight: 'Van Tharp said "Trading is 100% psychology." Mark Douglas wrote "Trading in the Zone" arguing psychology is everything.',
        category: 'Psychology Importance'
      },
      {
        id: 2,
        question: 'What is loss aversion?',
        options: [
          'Avoiding losses completely',
          'Feeling pain of losses more strongly than pleasure of equal gains',
          'Never taking losses',
          'Fearing the market'
        ],
        correctAnswer: 1,
        explanation: 'Loss aversion is the psychological tendency to feel the pain of losing $100 roughly twice as strongly as the pleasure of gaining $100.',
        realLifeInsight: 'Kahneman and Tversky won Nobel Prize for this discovery. It explains why people hold losers too long and sell winners too early.',
        category: 'Cognitive Biases'
      },
      {
        id: 3,
        question: 'How does loss aversion hurt traders?',
        options: [
          'Makes them risk-averse',
          'Causes them to hold losers hoping to break even',
          'Makes them trade less',
          'It doesn\'t hurt them'
        ],
        correctAnswer: 1,
        explanation: 'Loss aversion causes traders to hold losing positions hoping to avoid realizing the loss, turning small losses into catastrophic ones.',
        realLifeInsight: 'Nick Leeson held losing positions at Barings Bank due to loss aversion, eventually bankrupting the 233-year-old institution in 1995.',
        category: 'Behavioral Finance'
      },
      {
        id: 4,
        question: 'What is confirmation bias?',
        options: [
          'Confirming orders',
          'Seeking information that confirms existing beliefs',
          'Checking confirmations',
          'Verifying trades'
        ],
        correctAnswer: 1,
        explanation: 'Confirmation bias is the tendency to seek, interpret, and remember information that confirms your existing beliefs while ignoring contradicting evidence.',
        realLifeInsight: 'Bulls only read bullish news; bears only see bearish signals. This bias causes traders to ignore warning signs and blow up.',
        category: 'Cognitive Biases'
      },
      {
        id: 5,
        question: 'What is FOMO in trading?',
        options: [
          'Fear of Money Only',
          'Fear of Missing Out',
          'Fear of Market Orders',
          'Finding Optimal Market Opportunities'
        ],
        correctAnswer: 1,
        explanation: 'FOMO (Fear of Missing Out) drives traders to chase moves after they\'ve already happened, often buying tops and selling bottoms.',
        realLifeInsight: 'GameStop in January 2021 caused massive FOMO. Many retail traders bought at $300-400 due to FOMO, then watched it crash to $40.',
        category: 'Emotional Trading'
      },
      {
        id: 6,
        question: 'What is recency bias?',
        options: [
          'Trading recent IPOs',
          'Over-weighting recent events in decision making',
          'Remembering recent trades',
          'Trading recently'
        ],
        correctAnswer: 1,
        explanation: 'Recency bias causes traders to give too much weight to recent events, believing recent trends will continue indefinitely.',
        realLifeInsight: 'After the 2020-2021 bull market, many believed "stocks only go up." The 2022 bear market destroyed accounts built on this recency bias.',
        category: 'Cognitive Biases'
      },
      {
        id: 7,
        question: 'What is anchoring bias?',
        options: [
          'Holding positions too long',
          'Fixating on a specific price or number',
          'Using stop-losses',
          'Following charts'
        ],
        correctAnswer: 1,
        explanation: 'Anchoring bias is fixating on a specific price (like purchase price or old high) and making decisions based on that irrelevant number.',
        realLifeInsight: 'Traders anchor to "I paid $100, so I\'ll wait until it gets back to $100" - but the market doesn\'t care what you paid.',
        category: 'Cognitive Biases'
      },
      {
        id: 8,
        question: 'What is overconfidence bias?',
        options: [
          'Being confident',
          'Overestimating your abilities and knowledge',
          'Trading with confidence',
          'High self-esteem'
        ],
        correctAnswer: 1,
        explanation: 'Overconfidence causes traders to overestimate their abilities, take excessive risks, and ignore risk management after winning streaks.',
        realLifeInsight: 'Long-Term Capital Management, run by Nobel laureates, collapsed from overconfidence. They believed their models were perfect.',
        category: 'Psychological Risks'
      },
      {
        id: 9,
        question: 'What is herd mentality?',
        options: [
          'Trading livestock',
          'Following the crowd without independent analysis',
          'Group trading',
          'Social trading'
        ],
        correctAnswer: 1,
        explanation: 'Herd mentality is following what everyone else is doing without independent thinking, often leading to buying tops and selling bottoms.',
        realLifeInsight: 'The dot-com bubble (2000) and housing bubble (2008) were driven by herd mentality. Everyone bought because "everyone was buying."',
        category: 'Social Psychology'
      },
      {
        id: 10,
        question: 'What emotion drives bubbles?',
        options: [
          'Fear',
          'Greed and FOMO',
          'Happiness',
          'Anger'
        ],
        correctAnswer: 1,
        explanation: 'Bubbles are driven by greed and FOMO. As prices rise, more people jump in fearing they\'ll miss out, pushing prices to unsustainable levels.',
        realLifeInsight: 'Bitcoin 2017 bubble saw taxi drivers and baristas buying at $19k because "everyone was getting rich." It crashed to $3k.',
        category: 'Market Cycles'
      },
      {
        id: 11,
        question: 'What emotion drives crashes?',
        options: [
          'Greed',
          'Fear and panic',
          'Excitement',
          'Boredom'
        ],
        correctAnswer: 1,
        explanation: 'Crashes are driven by fear and panic selling. As prices fall, fear spreads, causing more selling in a self-reinforcing downward spiral.',
        realLifeInsight: 'March 2020 COVID crash saw VIX (fear gauge) spike to 82. Panic selling drove S&P 500 down 35% in weeks.',
        category: 'Market Crashes'
      },
      {
        id: 12,
        question: 'What is the fear and greed cycle?',
        options: [
          'Daily emotions',
          'Markets oscillate between fear (selling) and greed (buying)',
          'Personal feelings',
          'Trading strategy'
        ],
        correctAnswer: 1,
        explanation: 'Markets cycle between fear-driven selloffs and greed-driven rallies. Understanding this cycle helps identify opportunities.',
        realLifeInsight: 'Buffett: "Be fearful when others are greedy, greedy when others are fearful." Buy fear, sell greed.',
        category: 'Market Cycles'
      },
      {
        id: 13,
        question: 'What is panic selling?',
        options: [
          'Selling quickly',
          'Emotional selling driven by fear without rational analysis',
          'Fast execution',
          'Stop-loss triggered'
        ],
        correctAnswer: 1,
        explanation: 'Panic selling is irrational fear-driven selling, often at the worst prices. It locks in losses that might have recovered.',
        realLifeInsight: 'During March 2020, panic sellers locked in 30-40% losses at the bottom. Those who held recovered fully within 5 months.',
        category: 'Emotional Mistakes'
      },
      {
        id: 14,
        question: 'What is revenge trading?',
        options: [
          'Trading against someone',
          'Emotional trading to quickly recover losses',
          'Competitive trading',
          'Aggressive strategy'
        ],
        correctAnswer: 1,
        explanation: 'Revenge trading is attempting to quickly recover losses through emotional, excessive risk-taking, often making losses worse.',
        realLifeInsight: 'Revenge trading has destroyed countless accounts. After a $1k loss, traders risk $5k trying to "get it back fast" and lose more.',
        category: 'Emotional Trading'
      },
      {
        id: 15,
        question: 'What is the best response to a losing trade?',
        options: [
          'Trade immediately to recover',
          'Accept it, analyze it, move on with discipline',
          'Double position size',
          'Blame others'
        ],
        correctAnswer: 1,
        explanation: 'Accept losses as part of trading, analyze what happened objectively, extract lessons, and continue following your plan.',
        realLifeInsight: 'Paul Tudor Jones says "Losers average losers." Accept losses quickly, analyze them, and move forward without revenge trading.',
        category: 'Loss Management'
      },
      {
        id: 16,
        question: 'What is euphoria in markets?',
        options: [
          'Happiness about profits',
          'Extreme optimism often marking tops',
          'Bull market',
          'Good news'
        ],
        correctAnswer: 1,
        explanation: 'Euphoria is excessive optimism and confidence, often appearing near market tops when risk is highest but feels lowest.',
        realLifeInsight: 'In January 2021, Reddit proclaimed "stocks only go up" and "can\'t lose." This euphoria marked the top before 2022\'s decline.',
        category: 'Market Sentiment'
      },
      {
        id: 17,
        question: 'What is capitulation?',
        options: [
          'Giving up',
          'Final panic selling that often marks bottoms',
          'Market closing',
          'Surrender'
        ],
        correctAnswer: 1,
        explanation: 'Capitulation is when final holders give up and panic sell, often marking the bottom. Maximum pessimism creates maximum opportunity.',
        realLifeInsight: 'March 2020 saw capitulation selling on March 23. That exact day marked the bottom, with a 70% rally following over 5 months.',
        category: 'Market Bottoms'
      },
      {
        id: 18,
        question: 'Why do most traders lose money?',
        options: [
          'Bad brokers',
          'Emotional decisions and lack of discipline',
          'Unfair markets',
          'Bad luck'
        ],
        correctAnswer: 1,
        explanation: 'Most traders fail due to emotional decision-making, lack of discipline, poor risk management, and inability to control psychology.',
        realLifeInsight: 'Studies show 90%+ of retail traders lose money. The difference isn\'t intelligence - it\'s emotional control and discipline.',
        category: 'Trading Reality'
      },
      {
        id: 19,
        question: 'What is the disposition effect?',
        options: [
          'Personality in trading',
          'Selling winners too early and holding losers too long',
          'Trading attitude',
          'Risk appetite'
        ],
        correctAnswer: 1,
        explanation: 'The disposition effect causes traders to sell winners quickly (to lock in gains) but hold losers (avoiding realizing losses).',
        realLifeInsight: 'This is why retail accounts show "picked up pennies in front of steamroller" - many small wins but huge occasional losses.',
        category: 'Behavioral Finance'
      },
      {
        id: 20,
        question: 'Why do traders sell winners too early?',
        options: [
          'Smart profit-taking',
          'Fear of giving back gains (loss aversion)',
          'Good strategy',
          'Time management'
        ],
        correctAnswer: 1,
        explanation: 'Traders fear losing unrealized profits more than they desire bigger gains. They lock in small wins, missing larger moves.',
        realLifeInsight: 'Letting winners run is hardest. Traders sell Tesla at +20% fearing reversal, missing the +200% that follows.',
        category: 'Profit Management'
      },
      {
        id: 21,
        question: 'What is hindsight bias?',
        options: [
          'Looking backward',
          'Believing past events were predictable after they occurred',
          'Reviewing trades',
          'Historical analysis'
        ],
        correctAnswer: 1,
        explanation: 'Hindsight bias makes past events seem obvious in retrospect. "I knew that would happen" - but you didn\'t trade it.',
        realLifeInsight: 'After the 2008 crisis, everyone claimed "I saw it coming." But few traded it profitably. Hindsight creates false confidence.',
        category: 'Cognitive Biases'
      },
      {
        id: 22,
        question: 'What is the gambler\'s fallacy?',
        options: [
          'Trading is gambling',
          'Believing past events affect independent future events',
          'Casino trading',
          'Risk-taking'
        ],
        correctAnswer: 1,
        explanation: 'Gambler\'s fallacy is believing "I\'m due for a win" after losses, or "luck must change." Each trade is independent.',
        realLifeInsight: 'Traders think "I\'ve had 5 losses, so next trade is likely a winner." But if your edge is 50%, each trade is still 50/50.',
        category: 'Probability Misunderstanding'
      },
      {
        id: 23,
        question: 'What is analysis paralysis?',
        options: [
          'Too much analysis',
          'Over-analyzing until unable to make decisions',
          'Slow analysis',
          'Complex strategies'
        ],
        correctAnswer: 1,
        explanation: 'Analysis paralysis occurs when traders analyze so much they can\'t decide, missing opportunities or acting too late.',
        realLifeInsight: 'Traders with 20 indicators can\'t pull the trigger because there\'s always one conflicting signal. Simplify to execute.',
        category: 'Decision Making'
      },
      {
        id: 24,
        question: 'What is the sunk cost fallacy?',
        options: [
          'Cost of trading',
          'Continuing losing trades because already invested time/money',
          'Historical costs',
          'Fee structure'
        ],
        correctAnswer: 1,
        explanation: 'Sunk cost fallacy makes traders hold losers because "I\'ve already lost so much, I can\'t sell now." Past costs are irrelevant.',
        realLifeInsight: 'Traders hold PLTR from $30 to $10 thinking "I\'m already down so much, might as well hold." This turns -50% into -75%.',
        category: 'Cognitive Biases'
      },
      {
        id: 25,
        question: 'What is emotional discipline?',
        options: [
          'Being emotional',
          'Controlling emotions to follow trading plan',
          'Punishment for mistakes',
          'Strict rules'
        ],
        correctAnswer: 1,
        explanation: 'Emotional discipline is the ability to control emotions like fear and greed, executing your plan despite how you feel.',
        realLifeInsight: 'Ed Seykota: "Everyone gets what they want from the markets." Winners want discipline; losers want excitement.',
        category: 'Emotional Control'
      },
      {
        id: 26,
        question: 'Why is patience important in trading?',
        options: [
          'Markets move slowly',
          'Best opportunities are rare; patience prevents forcing trades',
          'Reduces stress',
          'Saves time'
        ],
        correctAnswer: 1,
        explanation: 'High-quality setups are rare. Impatient traders force marginal trades, reducing overall profitability. Wait for A+ setups.',
        realLifeInsight: 'Jesse Livermore: "The big money is made sitting, not trading." He waited months for perfect setups then bet big.',
        category: 'Trading Virtues'
      },
      {
        id: 27,
        question: 'What is hope in trading?',
        options: [
          'Positive thinking',
          'A dangerous emotion that keeps you in losing trades',
          'Optimism',
          'Faith in analysis'
        ],
        correctAnswer: 1,
        explanation: 'Hope causes traders to hold losers beyond stops, hoping for recovery. Hope is not a strategy - it\'s a destroyer of accounts.',
        realLifeInsight: '"Hope is not a strategy" is a trading maxim. Traders hoping ARKK recovers from $150 to $30 destroyed accounts.',
        category: 'Dangerous Emotions'
      },
      {
        id: 28,
        question: 'What is regret in trading?',
        options: [
          'Feeling bad',
          'Emotion that causes poor decisions and revenge trading',
          'Reviewing mistakes',
          'Learning process'
        ],
        correctAnswer: 1,
        explanation: 'Regret about missed opportunities or losses causes emotional decisions. "I should have..." thinking leads to revenge trading.',
        realLifeInsight: 'Traders regret missing Bitcoin at $100, then FOMO buy at $60k tops. Regret about past causes future mistakes.',
        category: 'Emotional Traps'
      },
      {
        id: 29,
        question: 'What is the fear of being wrong?',
        options: [
          'Healthy caution',
          'Ego-driven fear that prevents cutting losses',
          'Risk awareness',
          'Uncertainty'
        ],
        correctAnswer: 1,
        explanation: 'Ego makes admitting mistakes painful. Traders hold losers to avoid admitting they were wrong, compounding losses.',
        realLifeInsight: 'Professional traders know being wrong is normal. George Soros: "I\'m rich because I know when I\'m wrong."',
        category: 'Ego in Trading'
      },
      {
        id: 30,
        question: 'What is overtrading?',
        options: [
          'Trading too much size',
          'Excessive trading driven by emotion or boredom',
          'Professional trading',
          'Day trading'
        ],
        correctAnswer: 1,
        explanation: 'Overtrading is taking too many trades, often from boredom or forcing action. It increases costs and reduces selectivity.',
        realLifeInsight: 'Studies show traders who make fewer trades perform better. Quality beats quantity - wait for A+ setups.',
        category: 'Trading Discipline'
      },
      {
        id: 31,
        question: 'What causes overtrading?',
        options: [
          'Good opportunities',
          'Boredom, FOMO, revenge trading, or gambling addiction',
          'Market volatility',
          'Broker recommendations'
        ],
        correctAnswer: 1,
        explanation: 'Overtrading stems from emotional needs - entertainment, recovering losses, or fear of missing out - not actual opportunities.',
        realLifeInsight: 'Many traders treat their accounts as entertainment. They need action daily, destroying profitability through overtrading.',
        category: 'Psychological Root Causes'
      },
      {
        id: 32,
        question: 'What is the best state of mind for trading?',
        options: [
          'Excited and energetic',
          'Calm, detached, and objective',
          'Aggressive and confident',
          'Anxious and alert'
        ],
        correctAnswer: 1,
        explanation: 'The best trading psychology is calm detachment - viewing trades as probabilities without emotional attachment to outcomes.',
        realLifeInsight: 'Mark Douglas taught "probabilistic mindset." Each trade is just one in a series. No single trade matters.',
        category: 'Ideal Psychology'
      },
      {
        id: 33,
        question: 'What is a probabilistic mindset?',
        options: [
          'Using probability theory',
          'Viewing each trade as one outcome in a distribution',
          'Statistical analysis',
          'Math-based trading'
        ],
        correctAnswer: 1,
        explanation: 'Probabilistic mindset means accepting each trade is uncertain, but edge plays out over many trades. Focus on process, not individual outcomes.',
        realLifeInsight: 'Casinos know each spin is random but their edge profits over time. Traders should think the same way.',
        category: 'Mental Framework'
      },
      {
        id: 34,
        question: 'Why do traders need a trading plan?',
        options: [
          'Regulatory requirement',
          'Removes emotion from decision-making',
          'Impresses others',
          'Complicated strategies'
        ],
        correctAnswer: 1,
        explanation: 'A trading plan defines rules before emotions arise. It removes "in the moment" emotional decisions that destroy accounts.',
        realLifeInsight: 'Military adage: "Plans are useless, but planning is essential." The process of planning creates discipline.',
        category: 'Planning'
      },
      {
        id: 35,
        question: 'What is a trading journal?',
        options: [
          'Diary of feelings',
          'Record of trades with analysis for learning',
          'Profit/loss statement',
          'News articles'
        ],
        correctAnswer: 1,
        explanation: 'A trading journal records trades with entry/exit reasons, emotions, and outcomes. Reviewing it reveals patterns and mistakes.',
        realLifeInsight: 'Professional traders journal religiously. Van Tharp says journaling is the difference between mediocre and great traders.',
        category: 'Self-Improvement'
      },
      {
        id: 36,
        question: 'What should you journal about trades?',
        options: [
          'Just profit/loss',
          'Setup, emotions, execution quality, and lessons',
          'Only winners',
          'Only losers'
        ],
        correctAnswer: 1,
        explanation: 'Journal the setup, your emotional state, execution quality, and lessons learned. Review to identify behavioral patterns.',
        realLifeInsight: 'Brett Steenbarger, trading psychologist, found journaling and review dramatically improves trader performance.',
        category: 'Journaling Practice'
      },
      {
        id: 37,
        question: 'What is tilt in trading?',
        options: [
          'Chart angle',
          'Emotional state causing irrational decision-making',
          'Market direction',
          'Trading strategy'
        ],
        correctAnswer: 1,
        explanation: 'Tilt (from poker) is emotional state where frustration or anger causes irrational decisions and abandoning discipline.',
        realLifeInsight: 'Tilt causes revenge trading and account destruction. Recognize it immediately and stop trading until clear-headed.',
        category: 'Emotional States'
      },
      {
        id: 38,
        question: 'What should you do when on tilt?',
        options: [
          'Trade more to recover',
          'Stop trading immediately and take a break',
          'Trade larger size',
          'Switch to different market'
        ],
        correctAnswer: 1,
        explanation: 'When on tilt, stop immediately. Take a break - hours, days, or weeks. Trading while tilted guarantees losses.',
        realLifeInsight: 'Professional poker players and traders know tilt is career-ending. They have rules: lose 3 in a row, take a break.',
        category: 'Tilt Management'
      },
      {
        id: 39,
        question: 'What is impulsive trading?',
        options: [
          'Fast trading',
          'Entering trades without plan or analysis',
          'Day trading',
          'Scalping'
        ],
        correctAnswer: 1,
        explanation: 'Impulsive trading is entering without setup, plan, or edge - pure emotional reaction to price movement or boredom.',
        realLifeInsight: 'Impulsive trades have the highest loss rate. Discipline requires waiting for setup confirmation before entering.',
        category: 'Trading Mistakes'
      },
      {
        id: 40,
        question: 'What is self-sabotage in trading?',
        options: [
          'Bad luck',
          'Unconsciously destroying success due to psychological issues',
          'Market manipulation',
          'Broker problems'
        ],
        correctAnswer: 1,
        explanation: 'Some traders unconsciously sabotage success due to feeling undeserving, fear of responsibility, or comfort in losing.',
        realLifeInsight: 'Trading psychologists find some traders feel uncomfortable with success. They blow up accounts when approaching goals.',
        category: 'Deep Psychology'
      },
      {
        id: 41,
        question: 'What is the role of ego in trading?',
        options: [
          'Helpful confidence',
          'Destructive force preventing learning and cutting losses',
          'Self-esteem',
          'Necessary for success'
        ],
        correctAnswer: 1,
        explanation: 'Ego prevents admitting mistakes, causes holding losers to avoid being "wrong," and blocks learning. Ego kills accounts.',
        realLifeInsight: 'George Soros: "I\'m rich because I know when I\'m wrong." Checking ego is essential for survival.',
        category: 'Ego Management'
      },
      {
        id: 42,
        question: 'What is the difference between confidence and overconfidence?',
        options: [
          'No difference',
          'Confidence follows preparation; overconfidence ignores risk',
          'Confidence is better',
          'Overconfidence wins more'
        ],
        correctAnswer: 1,
        explanation: 'Confidence comes from preparation and respects risk. Overconfidence ignores risk and comes from ego, often after winning streaks.',
        realLifeInsight: 'Confident traders use stops and manage risk. Overconfident traders believe "I can\'t lose" and blow up.',
        category: 'Confidence vs Arrogance'
      },
      {
        id: 43,
        question: 'What is social proof bias?',
        options: [
          'Proof of profits',
          'Believing something is correct because others believe it',
          'Trading verification',
          'Proof of address'
        ],
        correctAnswer: 1,
        explanation: 'Social proof makes traders believe something because "everyone" is doing it. This drives bubbles and herding behavior.',
        realLifeInsight: 'GameStop mania: "Everyone on Reddit is making millions, it must work." Social proof drove FOMO buying at tops.',
        category: 'Social Psychology'
      },
      {
        id: 44,
        question: 'Why is contrarian thinking valuable?',
        options: [
          'To be different',
          'Extreme consensus is often wrong at turning points',
          'To oppose others',
          'To be unique'
        ],
        correctAnswer: 1,
        explanation: 'When everyone is bullish, there\'s no one left to buy. When everyone is bearish, maximum opportunity exists. Extremes mark reversals.',
        realLifeInsight: 'Warren Buffett: "Be fearful when others are greedy, greedy when others are fearful." Contrarianism buys fear, sells greed.',
        category: 'Contrarian Psychology'
      },
      {
        id: 45,
        question: 'What is the endowment effect?',
        options: [
          'Getting endowments',
          'Overvaluing something because you own it',
          'Dividend payments',
          'Portfolio value'
        ],
        correctAnswer: 1,
        explanation: 'Endowment effect causes traders to value positions more highly because they own them, preventing objective analysis.',
        realLifeInsight: 'Traders defend losing positions they own: "This stock is great!" If they didn\'t own it, they wouldn\'t touch it.',
        category: 'Cognitive Biases'
      },
      {
        id: 46,
        question: 'What is cognitive dissonance?',
        options: [
          'Confusion',
          'Mental discomfort from holding contradictory beliefs',
          'Complex thinking',
          'Analysis difficulty'
        ],
        correctAnswer: 1,
        explanation: 'Cognitive dissonance is discomfort from conflicting beliefs. Traders resolve it by ignoring evidence that contradicts their position.',
        realLifeInsight: 'Trader thinks "I\'m smart" but has losing trade. Rather than exit, they ignore evidence to maintain self-image.',
        category: 'Cognitive Biases'
      },
      {
        id: 47,
        question: 'What is normalcy bias?',
        options: [
          'Normal thinking',
          'Believing extreme events won\'t happen',
          'Regular trading',
          'Average performance'
        ],
        correctAnswer: 1,
        explanation: 'Normalcy bias causes people to underestimate likelihood and impact of disasters, failing to prepare for extreme events.',
        realLifeInsight: 'Many ignored COVID crash risks in February 2020 because "it won\'t happen here." Normalcy bias cost fortunes.',
        category: 'Risk Perception'
      },
      {
        id: 48,
        question: 'What is the planning fallacy?',
        options: [
          'Bad planning',
          'Underestimating time and difficulty of tasks',
          'No plan',
          'Over-planning'
        ],
        correctAnswer: 1,
        explanation: 'Planning fallacy makes traders underestimate how long mastery takes and how difficult consistent profitability is.',
        realLifeInsight: 'New traders think "I\'ll be profitable in 3 months." Reality: most need 2-5 years. Planning fallacy creates false expectations.',
        category: 'Expectations'
      },
      {
        id: 49,
        question: 'What is outcome bias?',
        options: [
          'Biased outcomes',
          'Judging decision quality based on outcome, not process',
          'Result-focused',
          'Performance measurement'
        ],
        correctAnswer: 1,
        explanation: 'Outcome bias judges decisions by results, not quality. A good decision can have bad outcome; bad decision can get lucky.',
        realLifeInsight: 'Trader risks 50% account on one trade, wins, thinks "I\'m a genius." That\'s outcome bias - it was a terrible decision.',
        category: 'Decision Quality'
      },
      {
        id: 50,
        question: 'What is status quo bias?',
        options: [
          'Maintaining status',
          'Preferring current state, resisting change',
          'Current market state',
          'Quo vadis'
        ],
        correctAnswer: 1,
        explanation: 'Status quo bias makes people prefer current situation and resist change, even when change is beneficial.',
        realLifeInsight: 'Traders hold losing strategies because changing feels harder than continuing. Status quo bias prevents adaptation.',
        category: 'Cognitive Biases'
      },
      {
        id: 51,
        question: 'What is the illusion of control?',
        options: [
          'Having control',
          'Overestimating your influence over uncontrollable events',
          'Control systems',
          'Risk management'
        ],
        correctAnswer: 1,
        explanation: 'Illusion of control makes traders believe they can control or predict markets. You can only control risk and decisions.',
        realLifeInsight: 'Traders using complex systems believe "I\'ve got this figured out." Market then humbles them with unexpected moves.',
        category: 'Control Issues'
      },
      {
        id: 52,
        question: 'What is attribution bias?',
        options: [
          'Giving credit',
          'Attributing wins to skill, losses to bad luck',
          'Performance attribution',
          'Cause analysis'
        ],
        correctAnswer: 1,
        explanation: 'Attribution bias makes traders credit themselves for wins ("I\'m skilled") but blame external factors for losses ("bad luck").',
        realLifeInsight: 'This prevents learning. "I won because I\'m smart, I lost because market was manipulated" - never improving.',
        category: 'Self-Deception'
      },
      {
        id: 53,
        question: 'What is the false consensus effect?',
        options: [
          'Fake agreement',
          'Overestimating how many people share your views',
          'Market consensus',
          'Opinion polls'
        ],
        correctAnswer: 1,
        explanation: 'False consensus makes traders think "everyone sees this setup" when reality is most don\'t. Creates false confidence.',
        realLifeInsight: 'Trader thinks "Obviously this is a great trade." If it was obvious, it probably wouldn\'t work - edge comes from non-obvious.',
        category: 'Perception Bias'
      },
      {
        id: 54,
        question: 'What is mental accounting?',
        options: [
          'Accounting calculations',
          'Treating money differently based on arbitrary categories',
          'Mental math',
          'Psychology of money'
        ],
        correctAnswer: 1,
        explanation: 'Mental accounting treats "house money" (profits) as less valuable than original capital, causing reckless risk-taking with profits.',
        realLifeInsight: 'Traders risk $10k profit recklessly because "it\'s house money." But $10k is $10k - treat all capital equally.',
        category: 'Money Psychology'
      },
      {
        id: 55,
        question: 'What is the hot hand fallacy?',
        options: [
          'Hot trading',
          'Believing winning/losing streaks will continue',
          'Skill improvement',
          'Market heat'
        ],
        correctAnswer: 1,
        explanation: 'Hot hand fallacy believes "I\'m hot, I can\'t lose" or "I\'m cold, everything I touch fails." Streaks are often random.',
        realLifeInsight: 'Trader on winning streak thinks "I\'ve got the magic touch" and abandons risk management. Next loss is catastrophic.',
        category: 'Streak Psychology'
      },
      {
        id: 56,
        question: 'How long does it take to master trading psychology?',
        options: [
          'A few months',
          'Years of consistent work and self-awareness',
          'Never',
          'One year'
        ],
        correctAnswer: 1,
        explanation: 'Mastering trading psychology takes years of deliberate practice, self-awareness, journaling, and learning from mistakes.',
        realLifeInsight: 'Most successful traders say it took 3-7 years to master emotions. Paul Tudor Jones: "It took me 10 years to learn to take a loss."',
        category: 'Mastery Timeline'
      },
      {
        id: 57,
        question: 'What is the most dangerous emotion in trading?',
        options: [
          'Fear',
          'All emotions are dangerous when they override discipline',
          'Greed',
          'Excitement'
        ],
        correctAnswer: 1,
        explanation: 'All emotions - fear, greed, hope, regret, excitement - are dangerous when they cause deviation from the trading plan.',
        realLifeInsight: 'Mark Douglas: "The four horsemen of trading apocalypse are fear, greed, hope, and regret. Learn to trade without them."',
        category: 'Emotional Management'
      },
      {
        id: 58,
        question: 'What is the value of meditation for traders?',
        options: [
          'Spiritual practice',
          'Develops awareness and emotional control',
          'Relaxation',
          'Waste of time'
        ],
        correctAnswer: 1,
        explanation: 'Meditation builds self-awareness and emotional regulation, helping traders notice and control emotional reactions in real-time.',
        realLifeInsight: 'Ray Dalio practices transcendental meditation. Many top traders meditate to maintain emotional equilibrium.',
        category: 'Psychological Tools'
      },
      {
        id: 59,
        question: 'What is the role of habits in trading?',
        options: [
          'Not important',
          'Good habits automate discipline, removing emotion',
          'Personal preference',
          'Routine only'
        ],
        correctAnswer: 1,
        explanation: 'Good trading habits automate discipline. Following the same process reduces emotional decision-making.',
        realLifeInsight: 'Charles Duhigg\'s "Power of Habit": Habits bypass conscious decision-making. Good trading habits prevent emotional mistakes.',
        category: 'Behavioral Habits'
      },
      {
        id: 60,
        question: 'What is the peak-end rule?',
        options: [
          'Market tops',
          'Remembering experiences by peak and end moments',
          'Closing prices',
          'Highest profits'
        ],
        correctAnswer: 1,
        explanation: 'Peak-end rule means we remember experiences by their most intense moment and ending, distorting perception of overall quality.',
        realLifeInsight: 'Trader has 9 small wins and 1 devastating loss. They remember the pain of the loss more than aggregate profit.',
        category: 'Memory Bias'
      },
      {
        id: 61,
        question: 'What is rational emotive behavior therapy (REBT) for trading?',
        options: [
          'Market therapy',
          'Technique to identify and change irrational beliefs',
          'Trading advice',
          'Emotional support'
        ],
        correctAnswer: 1,
        explanation: 'REBT helps identify irrational beliefs ("I must never lose") and replace them with rational beliefs ("Losses are part of trading").',
        realLifeInsight: 'Dr. Van Tharp applies REBT to trading. Changing beliefs like "I must be right" to "I must follow my plan" transforms performance.',
        category: 'Psychological Techniques'
      },
      {
        id: 62,
        question: 'What is the relationship between stress and performance?',
        options: [
          'More stress = better performance',
          'Inverted U: moderate stress optimizes, too much or too little hurts',
          'Less stress = better performance',
          'No relationship'
        ],
        correctAnswer: 1,
        explanation: 'The Yerkes-Dodson law shows optimal performance at moderate stress. Too little = boredom; too much = anxiety and poor decisions.',
        realLifeInsight: 'Too little at stake and traders don\'t care. Too much (overleveraged) and fear causes paralysis. Find optimal stress level.',
        category: 'Stress Management'
      },
      {
        id: 63,
        question: 'What is the importance of self-awareness?',
        options: [
          'Not important',
          'Essential for recognizing emotional states and biases',
          'Narcissism',
          'Over-thinking'
        ],
        correctAnswer: 1,
        explanation: 'Self-awareness lets you recognize emotions, biases, and patterns in real-time, preventing them from derailing trades.',
        realLifeInsight: 'Brett Steenbarger says the best traders are psychologists of themselves, constantly monitoring their mental state.',
        category: 'Self-Knowledge'
      },
      {
        id: 64,
        question: 'Can personality type predict trading success?',
        options: [
          'Yes, only certain types succeed',
          'No, various types succeed with self-awareness and adaptation',
          'Yes, introverts only',
          'Yes, extroverts only'
        ],
        correctAnswer: 1,
        explanation: 'Various personalities succeed by playing to strengths and managing weaknesses. Self-awareness matters more than personality type.',
        realLifeInsight: 'Introverted systematic traders (Jim Simons) and extroverted intuitive traders (Paul Tudor Jones) both succeed differently.',
        category: 'Individual Differences'
      },
      {
        id: 65,
        question: 'What is the role of visualization?',
        options: [
          'Imagining charts',
          'Mental rehearsal of executing plan builds discipline',
          'Daydreaming',
          'Predicting future'
        ],
        correctAnswer: 1,
        explanation: 'Visualization (mental rehearsal) of following your plan under various scenarios builds neural pathways for disciplined execution.',
        realLifeInsight: 'Athletes visualize performance before competition. Traders can visualize following stops, taking losses, letting winners run.',
        category: 'Mental Preparation'
      },
      {
        id: 66,
        question: 'What percentage of trading success comes from the system vs psychology?',
        options: [
          '90% system, 10% psychology',
          '20% system, 80% psychology',
          '50% each',
          '100% system'
        ],
        correctAnswer: 1,
        explanation: 'Most traders agree ~20% is finding an edge and ~80% is psychological discipline to execute consistently without deviation.',
        realLifeInsight: 'Van Tharp: "You can have a mediocre system and excellent psychology and make money. Excellent system with poor psychology = losses."',
        category: 'Success Components'
      },
      {
        id: 67,
        question: 'What is the best way to develop trading psychology?',
        options: [
          'Just trade more',
          'Journaling, meditation, therapy, mentorship, and deliberate practice',
          'Read books',
          'Copy others'
        ],
        correctAnswer: 1,
        explanation: 'Psychological development requires multiple approaches: journaling for awareness, meditation for control, mentorship for guidance, deliberate practice.',
        realLifeInsight: 'Top traders work with psychologists, meditate, journal extensively, and have mentors. It\'s not accidental - it\'s deliberate.',
        category: 'Development Path'
      },
      {
        id: 68,
        question: 'What is the difference between trading and gambling psychologically?',
        options: [
          'No difference',
          'Trading follows edge with discipline; gambling seeks entertainment',
          'Gambling is more fun',
          'Trading is smarter'
        ],
        correctAnswer: 1,
        explanation: 'Trading is disciplined edge execution with risk management. Gambling is entertainment-seeking without edge. Psychology determines which you do.',
        realLifeInsight: 'Most retail traders gamble rather than trade - they seek excitement over profits. Professional traders find trading boring but profitable.',
        category: 'Trading vs Gambling'
      },
      {
        id: 69,
        question: 'What is the role of acceptance in trading?',
        options: [
          'Accepting losses',
          'Accepting uncertainty, uncontrollability, and that losses are inevitable',
          'Giving up',
          'Being passive'
        ],
        correctAnswer: 1,
        explanation: 'Acceptance means embracing that markets are uncertain, you can\'t control outcomes, and losses are normal. This enables discipline.',
        realLifeInsight: 'Mark Douglas: "Anything can happen, you don\'t need to know what will happen to make money." Acceptance removes fear.',
        category: 'Philosophical Framework'
      },
      {
        id: 70,
        question: 'What is the ultimate lesson of market psychology?',
        options: [
          'Eliminate all emotion',
          'Master yourself to master markets',
          'Psychology doesn\'t matter',
          'Be fearless'
        ],
        correctAnswer: 1,
        explanation: 'The greatest battle is with yourself. Master your psychology - emotions, biases, discipline - and you master trading.',
        realLifeInsight: 'Jesse Livermore: "The game taught me the game. And it didn\'t spare the rod while teaching." Self-mastery is the game.',
        category: 'Ultimate Truth'
      }
    ]
  }
};

export default LESSONS_DATABASE;
