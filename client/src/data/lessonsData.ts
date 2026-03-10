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

export interface Section {
  title: string;
  body: string;
  bullets: string[];
  tip?: string;
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
  sections?: Section[];
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

,
  'f1': {
    title: 'What is Trading?',
    level: 'Beginner',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 50,
    description: 'Understand the core concept of trading — buying and selling assets to generate profit.',
    learningObjectives: ['Define trading vs investing','Identify main asset classes','Understand how profit is made','Recognize the role of buyers and sellers'],
    keyTakeaways: ['Trading profits from price changes','Assets: stocks, crypto, forex, indices','Both rising and falling markets can profit','Every trade has a buyer and a seller'],
    sections: [
      { title: 'Trading vs Investing', body: 'Trading means actively buying and selling assets over short timeframes to profit from price movements. Investing means holding long-term. Traders react to price action; investors react to fundamentals. Both can be profitable with the right approach.', bullets: ['Traders hold positions seconds to weeks','Investors hold months to years','Trading requires active monitoring','Both need discipline and risk management'], tip: 'Most successful traders started by understanding the difference between speculation and investment.' },
      { title: 'What Can You Trade?', body: 'Stocks are company shares. Crypto are digital currencies. Forex is currency pairs. Indices track groups of stocks. Commodities are physical goods like oil or gold. Each market has unique hours, volatility, and characteristics.', bullets: ['Stocks: Apple, Tesla — company ownership','Crypto: Bitcoin, Ethereum — digital assets','Forex: EUR/USD — global currency pairs','Indices: S&P 500 — baskets of stocks'], tip: 'Beginners often start with stocks — heavily regulated with abundant information available.' },
      { title: 'How Traders Make Money', body: 'Profit comes from price differences. Buy low, sell high (Long). Sell high, buy back lower (Short). The spread between entry and exit price minus fees is your P&L. Short selling lets you profit even when markets fall.', bullets: ['Long trade: profit when price rises','Short trade: profit when price falls','P&L = (Exit - Entry) x Quantity','Fees reduce profit — always factor them in'], tip: 'Short selling lets you profit in bear markets — a powerful tool professional traders use constantly.' }
    ],
    questions: [
      { id: 101, question: 'What is the primary goal of trading?', options: ['Hold assets forever','Profit from price movements','Collect dividends only','Support companies'], correctAnswer: 1, explanation: 'Trading aims to profit from price movements by buying and selling assets at different prices.', realLifeInsight: 'Day traders make or lose money within minutes based purely on price movements, not company fundamentals.', category: 'Basics' },
      { id: 102, question: 'What distinguishes trading from long-term investing?', options: ['Traders never lose','Trading involves shorter timeframes and active management','Investors are always smarter','They are identical'], correctAnswer: 1, explanation: 'Trading focuses on short-term price movements with active management. Investing is passive long-term wealth building.', realLifeInsight: 'Warren Buffett is an investor; Paul Tudor Jones is a trader. Both billionaires, completely different approaches.', category: 'Basics' },
      { id: 103, question: 'Which is NOT a standard tradeable asset class for retail traders?', options: ['Exotic weather derivatives','Stocks','Forex','Cryptocurrency'], correctAnswer: 0, explanation: 'Weather derivatives are exotic instruments. Stocks, forex, and crypto are the main retail-accessible markets.', realLifeInsight: 'Retail traders focus on stocks, crypto, forex, and indices — the most liquid and accessible markets.', category: 'Assets' },
      { id: 104, question: 'A long trade profits when:', options: ['Price stays flat','Price rises after you buy','Price falls','Volume decreases'], correctAnswer: 1, explanation: 'Going long means buying expecting price to rise so you can sell higher later for profit.', realLifeInsight: 'Most new traders start long-only because buy low, sell high is the most intuitive concept.', category: 'Trade Types' },
      { id: 105, question: 'A short trade profits when:', options: ['Price rises strongly','Price falls after you sell borrowed shares','Dividends are paid','Volume spikes up'], correctAnswer: 1, explanation: 'Short selling: borrow asset, sell at current price, buy back cheaper if price falls. Profit from decline.', realLifeInsight: 'During the 2008 crisis, short sellers who shorted bank stocks made billions while markets crashed.', category: 'Trade Types' },
      { id: 106, question: 'P&L formula for a long trade:', options: ['Entry minus exit','Exit minus entry times quantity','Volume times spread','Entry divided by exit'], correctAnswer: 1, explanation: 'Profit = (Exit - Entry) x Quantity. Buy 100 shares at $10, sell at $12 = $200 profit.', realLifeInsight: 'Always subtract trading fees — they significantly reduce returns, especially for small trades.', category: 'Mechanics' },
      { id: 107, question: 'Forex trading primarily involves:', options: ['Trading company shares','Exchanging currency pairs to profit from rate changes','Buying foreign real estate','Trading foreign ETFs only'], correctAnswer: 1, explanation: 'Forex involves trading currency pairs like EUR/USD, profiting from exchange rate fluctuations.', realLifeInsight: 'The forex market trades $6+ trillion daily — larger than all stock markets combined.', category: 'Assets' },
      { id: 108, question: 'The S&P 500 index represents:', options: ['500 US government bonds','500 large US company stocks','Daily oil prices','US national debt level'], correctAnswer: 1, explanation: 'The S&P 500 tracks 500 large US companies, providing a broad measure of the US stock market.', realLifeInsight: 'Most active fund managers fail to beat the S&P 500 over 10 years — it is a tough benchmark.', category: 'Assets' },
      { id: 109, question: 'Cryptocurrency markets operate:', options: ['Mon-Fri 9:30-4 ET only','24 hours a day, 7 days a week','Only during US market hours','Monthly sessions only'], correctAnswer: 1, explanation: 'Crypto markets run 24/7 and can experience extreme price swings compared to traditional assets.', realLifeInsight: 'Bitcoin has dropped 80%+ multiple times and recovered to new highs — volatility cuts both ways.', category: 'Assets' },
      { id: 110, question: 'In every trade, who is on the other side?', options: ['The government','The broker always','Another trader with the opposite position','No one — algorithms set prices'], correctAnswer: 2, explanation: 'Markets require counterparties. When you buy, someone sells. When you sell, someone buys.', realLifeInsight: 'Knowing a smart seller is on the other side of your buy keeps traders humble and encourages careful analysis.', category: 'Market Structure' }
    ]
  },
  'f2': {
    title: 'Markets & Exchanges',
    level: 'Beginner',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 60,
    description: 'Learn how financial markets work, who the players are, and how exchanges match buyers with sellers.',
    learningObjectives: ['Understand how exchanges operate','Identify major market participants','Learn about market hours','Understand bid-ask spread'],
    keyTakeaways: ['Exchanges match buyers and sellers electronically','Bid = buyers max; Ask = sellers min','Market makers provide liquidity','Different markets have different hours'],
    sections: [
      { title: 'How Exchanges Work', body: 'An exchange is a marketplace where buyers and sellers trade assets electronically. Orders are matched by price and time priority in milliseconds. NYSE, Nasdaq, and CME are major US exchanges. Price discovery happens through supply and demand interaction.', bullets: ['Orders matched by price and time priority','Electronic systems handle millions of trades daily','Exchanges ensure fair transparent price discovery','Regulators oversee exchanges to protect investors'], tip: 'Price discovery reflects collective market opinion — the exchange is essentially a giant voting machine.' },
      { title: 'Bid, Ask & Spread', body: 'The bid is the highest price a buyer will pay. The ask is the lowest a seller will accept. The spread is the difference between them — your immediate transaction cost. Tight spreads indicate liquid, efficient markets.', bullets: ['Bid: buyers maximum price','Ask: sellers minimum price','Spread = Ask minus Bid (transaction cost)','Liquid assets like Apple have penny-wide spreads'], tip: 'Check the spread before trading. Wide spreads on illiquid assets eat profits instantly.' },
      { title: 'Market Participants', body: 'Retail traders are individuals. Institutions manage billions for funds. Market makers quote bid/ask continuously and profit from the spread. High-frequency traders use algorithms for microsecond execution. Each player has different goals and advantages.', bullets: ['Retail traders: individuals trading personal capital','Institutions: hedge funds, pension funds, banks','Market makers: provide liquidity by always quoting','Regulators: SEC (US), FCA (UK), ASIC (AU)'], tip: 'Institutions move markets. Watch for unusual volume spikes — they often signal institutional activity.' }
    ],
    questions: [
      { id: 111, question: 'The primary function of a stock exchange is to:', options: ['Store physical certificates','Match buyers and sellers of securities','Loan money to companies','Set company prices'], correctAnswer: 1, explanation: 'Exchanges provide a regulated marketplace for transparent, efficient securities trading.', realLifeInsight: 'Before electronic exchanges, traders gathered on floors shouting orders — now it happens in microseconds.', category: 'Exchanges' },
      { id: 112, question: 'The bid price is:', options: ['The price a seller wants','The highest price a buyer will pay right now','The last traded price','The opening price'], correctAnswer: 1, explanation: 'The bid is the maximum price a buyer is currently willing to pay for an asset.', realLifeInsight: 'Bid $99.95, Ask $100.00 — the 5 cent spread is your immediate cost to enter and exit.', category: 'Bid-Ask' },
      { id: 113, question: 'The spread equals:', options: ['Daily high minus low','Ask price minus Bid price','Volume divided by price','Daily percentage change'], correctAnswer: 1, explanation: 'Spread = Ask - Bid. It is the transaction cost paid when entering a trade at market price.', realLifeInsight: 'Forex brokers make money from spreads. EUR/USD 1 pip spread = $10 per standard lot.', category: 'Bid-Ask' },
      { id: 114, question: 'Nasdaq is best described as:', options: ['A UK stock exchange','A German index','A major US exchange known for tech stocks','An Asian commodity exchange'], correctAnswer: 2, explanation: 'Nasdaq is a major US stock exchange known for technology companies like Apple, Microsoft, and Google.', realLifeInsight: 'Nasdaq is the world\'s second-largest exchange by market cap — home to most big tech companies.', category: 'Exchanges' },
      { id: 115, question: 'A market maker profits by:', options: ['Predicting price direction','Holding stocks long-term','Collecting the bid-ask spread on both sides','Charging subscription fees'], correctAnswer: 2, explanation: 'Market makers profit from the spread by always quoting both bid and ask, capturing the difference at scale.', realLifeInsight: 'Citadel Securities handles a huge portion of US retail stock orders — market making is enormously profitable at scale.', category: 'Participants' },
      { id: 116, question: 'NYSE standard trading hours:', options: ['24 hours, 7 days','9:30 AM to 4:00 PM ET, Mon-Fri','8 AM to 6 PM ET, Mon-Sat','Variable based on volume'], correctAnswer: 1, explanation: 'NYSE and Nasdaq operate 9:30 AM to 4:00 PM Eastern Time, Monday through Friday, excluding holidays.', realLifeInsight: 'After-hours trading exists but with lower liquidity and wider spreads — professionals are cautious in these sessions.', category: 'Market Hours' },
      { id: 117, question: 'Price discovery is:', options: ['Finding hidden stock prices online','The process of determining asset value through supply and demand interaction','A broker pricing algorithm','Finding undervalued stocks manually'], correctAnswer: 1, explanation: 'Price discovery is how markets determine fair value through continuous buyer and seller interaction.', realLifeInsight: 'When earnings beat expectations, the market rapidly reprices the stock — instant price discovery in action.', category: 'Market Mechanics' },
      { id: 118, question: 'A liquid market is characterized by:', options: ['High volatility only','Many buyers/sellers, tight spreads, easy execution','Low trading volume','Government price controls'], correctAnswer: 1, explanation: 'Liquid markets have high volume, many participants, narrow spreads, and easy entry and exit.', realLifeInsight: 'Apple stock is highly liquid — millions of dollars traded instantly. A small-cap might take hours to fill a modest order.', category: 'Liquidity' },
      { id: 119, question: 'Institutional traders are:', options: ['Individual small investors','Large entities like hedge funds managing billions','Government agencies only','Retail brokers'], correctAnswer: 1, explanation: 'Institutional traders manage large capital pools for funds and banks — they move markets with their orders.', realLifeInsight: 'When a large institution buys, it takes days to fill the full order — they trade carefully to avoid moving price against themselves.', category: 'Participants' },
      { id: 120, question: 'The forex market operates:', options: ['NYSE hours only','24 hours a day, 5 days a week','Weekends only','Monthly settlement sessions'], correctAnswer: 1, explanation: 'Forex operates 24/5 because currency trading spans all global time zones, from Sydney to New York.', realLifeInsight: 'The London-New York overlap (1-5 PM GMT) has peak forex volume — the most important daily trading window.', category: 'Market Hours' }
    ]
  },
  'f3': {
    title: 'Reading Prices & Quotes',
    level: 'Beginner',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 70,
    description: 'Master how to read price quotes, OHLC data, pips, ticks, and volume for informed trading decisions.',
    learningObjectives: ['Read and interpret price quotes','Understand OHLC data','Calculate pip values','Use volume to confirm moves'],
    keyTakeaways: ['OHLC: Open High Low Close — four key prices','Pips measure forex changes (0.0001)','Volume confirms price moves','Close is most important price for analysis'],
    sections: [
      { title: 'Price Quote Components', body: 'A price quote shows: Last (most recent trade), Bid/Ask (current market), Change (movement from yesterday\'s close), Volume (units traded today). Each component tells part of the market story.', bullets: ['Last: most recent transaction price','Bid/Ask: current buyers and sellers prices','Change: movement from previous close','Volume: total units traded — confirms strength'], tip: 'High volume on a price move is far more significant than the same move on low volume.' },
      { title: 'OHLC: The Four Price Points', body: 'Every time period has four key prices. Open is the first trade. High is maximum price reached. Low is minimum price reached. Close is the final price — most important for analysis. These summarize all price action for any timeframe.', bullets: ['Open: first price of the period','High: maximum price reached','Low: minimum price reached','Close: final price — most important for analysis'], tip: 'Close > Open = bullish. Close < Open = bearish. Simple but forms the basis of all candlestick analysis.' },
      { title: 'Pips, Ticks & Measurement', body: 'Different markets measure differently. Stocks use dollar increments. Forex uses pips (0.0001 for major pairs). A tick is the minimum price movement for any instrument. Knowing pip/tick value is essential for risk calculation.', bullets: ['Stock tick: typically $0.01','Forex pip: 0.0001 for major pairs','Pip value depends on lot size and currency pair','Know your pip value before every trade'], tip: 'EUR/USD 10-pip move on a standard lot = $100. Always calculate risk in dollar terms, not just pips.' }
    ],
    questions: [
      { id: 121, question: 'OHLC stands for:', options: ['Overall High-Low Chart','Open High Low Close','Order Hold Limit Cancel','Overnight High-Low Close'], correctAnswer: 1, explanation: 'OHLC represents Open (first trade), High (max), Low (min), Close (last trade) for any time period.', realLifeInsight: 'Every candlestick on a chart encodes OHLC data. Mastering candlesticks starts with understanding these four values.', category: 'Price Data' },
      { id: 122, question: 'Volume in trading measures:', options: ['Noise level on the trading floor','Total units traded in a period','The daily price range','Broker commission total'], correctAnswer: 1, explanation: 'Volume is the total number of shares, contracts, or units traded in a given period. High volume confirms moves.', realLifeInsight: 'A breakout on 3x normal volume is far more significant than the same breakout on below-average volume.', category: 'Volume' },
      { id: 123, question: 'A pip in forex equals approximately:', options: ['1 full dollar','0.0001 — one ten-thousandth','0.01 — one cent','1% of price'], correctAnswer: 1, explanation: 'A pip is 0.0001 for major pairs like EUR/USD — the standard unit of forex price movement.', realLifeInsight: 'EUR/USD moving 10 pips on a standard lot = $100 profit or loss. Know this before sizing positions.', category: 'Measurement' },
      { id: 124, question: 'Stock opened $100, closed $95. This session was:', options: ['Bullish','Bearish with a $5 decline','Neutral','A split event'], correctAnswer: 1, explanation: 'Close below open = bearish session. The stock fell $5 (5%) from open to close.', realLifeInsight: 'Closing significantly below the open shows strong selling pressure — important signal for the next session.', category: 'OHLC' },
      { id: 125, question: 'The ask price is:', options: ['Lowest recent trade','The price sellers will accept right now','Yesterday closing price','Average daily price'], correctAnswer: 1, explanation: 'Ask is the minimum price sellers will accept. Market buy orders fill at the ask price.', realLifeInsight: 'Buying at market means you pay the ask — you are slightly negative the instant you enter.', category: 'Quotes' },
      { id: 126, question: 'Stock shows Last $50, Change +$2. Yesterday close was:', options: ['$52','$48','$50','Cannot be determined'], correctAnswer: 1, explanation: 'Yesterday close = today last minus change = $50 - $2 = $48.', realLifeInsight: 'Daily change % is one of the first things traders scan — 3%+ movers on high volume signal potential opportunities.', category: 'Calculation' },
      { id: 127, question: 'A tick is:', options: ['A trading error indicator','The minimum price movement for an instrument','A pip multiplied by 10','A broker charge per trade'], correctAnswer: 1, explanation: 'A tick is the minimum price increment for an instrument. Stocks: typically $0.01. Futures have their own tick sizes.', realLifeInsight: 'HFT algorithms exploit tiny tick movements, trading millions of times per day for accumulated small profits.', category: 'Measurement' },
      { id: 128, question: 'Which OHLC price is most important for technical analysis?', options: ['Open','High','Low','Close'], correctAnswer: 3, explanation: 'The closing price is most important — final consensus of buyers and sellers, used in most indicators.', realLifeInsight: 'Closing near the day\'s high shows strength; near the low shows weakness — the close tells the day\'s story.', category: 'OHLC' },
      { id: 129, question: 'EUR/USD moves from 1.2000 to 1.2050. That is:', options: ['5 pips','50 pips','500 pips','0.5 pips'], correctAnswer: 1, explanation: '1.2050 - 1.2000 = 0.0050. Since 1 pip = 0.0001, that equals 50 pips.', realLifeInsight: 'Major forex pairs often move 50-100 pips per session. Know your pip value to calculate risk precisely.', category: 'Forex' },
      { id: 130, question: 'High volume on a price breakout indicates:', options: ['The breakout will likely fail','Strong conviction — more reliable signal','Overpriced conditions','Broker manipulation'], correctAnswer: 1, explanation: 'High volume on a breakout confirms institutional participation, making the move more likely to sustain.', realLifeInsight: 'IBD requires 40-50%+ above-average volume on breakouts — volume is the ultimate move confirmation tool.', category: 'Volume' }
    ]
  },
  'f4': {
    title: 'Order Types Deep Dive',
    level: 'Beginner',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 60,
    description: 'Master all order types and know when to use each one for optimal execution.',
    learningObjectives: ['Understand market, limit, stop orders','Use stop-loss and take-profit correctly','Know order duration options','Avoid order placement mistakes'],
    keyTakeaways: ['Market orders execute immediately at current price','Limit orders fill at your price or better only','Stop orders trigger when a level is reached','OCO cancels the other order when one fills'],
    sections: [
      { title: 'Market vs Limit Orders', body: 'Market orders execute instantly at best available price — fast but no price guarantee. Limit orders execute only at your specified price or better — price-controlled but may not fill. Choose speed vs precision based on your situation.', bullets: ['Market: instant execution, uncertain price','Limit: exact price, may not fill','Use market in liquid markets when speed matters','Use limit when price precision is critical'], tip: 'During news events, avoid market orders — slippage can be extreme. Limits protect you.' },
      { title: 'Stop Orders', body: 'A stop order becomes a market order when the trigger price is hit. Stop-loss: sells automatically if price reaches your loss limit. Buy-stop: triggers above current price for breakout entries. Trailing stop: follows price, locking in profit as it rises.', bullets: ['Stop-loss: limits maximum loss automatically','Stop-limit: precise but may not fill in fast markets','Buy-stop: breakout entry above current price','Trailing stop: follows price upward locking gains'], tip: 'Always set a stop-loss before entering. It removes emotion and enforces your plan.' },
      { title: 'Order Duration & OCO', body: 'GTC (Good Till Cancelled) stays active until filled or cancelled. DAY orders expire at close. OCO (One Cancels Other) links two orders — filling one cancels the other. This lets you set stop-loss and take-profit simultaneously.', bullets: ['DAY: expires at market close if unfilled','GTC: active across multiple sessions','OCO: links stop and profit target together','Professional traders use OCO on every trade'], tip: 'OCO orders are essential — set your stop AND take-profit simultaneously, then walk away.' }
    ],
    questions: [
      { id: 131, question: 'When is a market order most appropriate?', options: ['When exact price matters','When immediate execution matters more than price','When the market is closed','When you want the lowest possible price'], correctAnswer: 1, explanation: 'Market orders prioritize execution speed over price. Use when you need to enter/exit immediately.', realLifeInsight: 'Exiting a losing position fast? Market order — the cost of slippage beats the cost of further loss.', category: 'Order Types' },
      { id: 132, question: 'A stop-loss order:', options: ['Locks in profit at a target','Automatically closes a position at your specified loss level','Limits how much you can buy','Prevents profits from being taken'], correctAnswer: 1, explanation: 'A stop-loss triggers automatically when price hits your level, limiting your maximum loss on the trade.', realLifeInsight: 'The most common beginner mistake: moving stop-losses further away hoping for reversal. Professionals never do this.', category: 'Stop Orders' },
      { id: 133, question: 'A GTC limit buy at $50 placed Monday will:', options: ['Expire at Monday close','Stay active until $50 is reached or manually cancelled','Execute at any price Monday','Never execute in volatile markets'], correctAnswer: 1, explanation: 'GTC orders persist across trading sessions until your price is reached or you cancel manually.', realLifeInsight: 'Swing traders place GTC limits at support and walk away — the order fills automatically when price returns.', category: 'Order Duration' },
      { id: 134, question: 'A take-profit order:', options: ['Is a tax on trading gains','Automatically closes a position at your profit target','Maximizes broker fees','Prevents stop-loss from triggering'], correctAnswer: 1, explanation: 'Take-profit closes your position automatically when price hits your target, locking in gains without monitoring.', realLifeInsight: 'Setting take-profits removes greed — you stick to the plan rather than hoping for just a bit more.', category: 'Order Types' },
      { id: 135, question: 'With an OCO order, when one side fills:', options: ['Both orders execute','The other order is automatically cancelled','You must cancel the other manually','The broker decides'], correctAnswer: 1, explanation: 'OCO: One Cancels Other — when one fills, the other is automatically cancelled by the system.', realLifeInsight: 'Traders use OCO to set stop-loss below and take-profit above entry simultaneously — protecting both sides.', category: 'Advanced Orders' },
      { id: 136, question: 'Slippage occurs when:', options: ['A trader makes a mistake','An order fills at a different price than expected','A broker charges extra fees','Trading volume is very high'], correctAnswer: 1, explanation: 'Slippage is the gap between expected and actual fill price, usually in fast-moving or illiquid markets.', realLifeInsight: 'During the 2020 COVID crash, traders experienced severe slippage as markets moved faster than orders could execute.', category: 'Execution' },
      { id: 137, question: 'A 5% trailing stop on a stock peaking at $100 triggers at:', options: ['$95','$105','$90','$100'], correctAnswer: 0, explanation: 'Trailing stop at 5% = $100 x (1 - 0.05) = $95. It trails 5% below the highest price reached.', realLifeInsight: 'Trailing stops let winners run while automatically locking in profit as the stock climbs higher.', category: 'Stop Orders' },
      { id: 138, question: 'Which order guarantees execution but NOT price?', options: ['Limit order','Market order','Stop-limit order','GTC limit order'], correctAnswer: 1, explanation: 'Market orders guarantee they will fill, but not at what price — they take the best available current price.', realLifeInsight: 'In thinly traded stocks a market order can move price against you significantly — always check the spread first.', category: 'Order Types' },
      { id: 139, question: 'A buy-stop placed ABOVE current price is used for:', options: ['Buying at a discount','Entering long on a breakout above resistance','Protecting a long position from loss','Averaging down on a falling stock'], correctAnswer: 1, explanation: 'Buy-stops trigger when price rises to your level — used to enter long on breakouts above key resistance.', realLifeInsight: 'Breakout traders set buy-stops above resistance so they are automatically entered when the level breaks.', category: 'Stop Orders' },
      { id: 140, question: 'A limit order\'s main advantage over a market order:', options: ['Guaranteed execution','Price control — fills at your price or better','Faster execution','Lower fees always'], correctAnswer: 1, explanation: 'Limit orders give price control — you specify exactly what price you will accept, preventing bad fills.', realLifeInsight: 'Professionals use limit orders almost exclusively — paying the spread on every trade adds up to thousands annually.', category: 'Order Types' }
    ]
  }


,
  'c1': {
    title: 'Candlestick Basics',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 80,
    description: 'Learn to read candlestick charts — the universal language of price action used by all serious traders.',
    learningObjectives: ['Read individual candlestick anatomy','Identify bullish and bearish candles','Recognize key single-candle patterns','Apply candlesticks to real trading decisions'],
    keyTakeaways: ['Body shows open vs close; wick shows extremes','Doji = indecision; Hammer = potential reversal','Context matters — a candle alone tells half the story','Long wicks show price rejection at that level'],
    sections: [
      { title: 'Anatomy of a Candlestick', body: 'A candlestick has a body and wicks (shadows). The body shows the range between open and close. A bullish (green) candle closes higher than it opens. A bearish (red) candle closes lower. Wicks show the highest and lowest prices reached before reversal.', bullets: ['Body: range between open and close','Upper wick: price reached above body but rejected','Lower wick: price reached below body but rejected','Green body: close above open (bulls won)','Red body: close below open (bears won)'], tip: 'A long wick shows price rejection — sellers pushed back from the high, or buyers defended the low aggressively.' },
      { title: 'Key Candlestick Patterns', body: 'Doji: open and close nearly equal — indecision. Hammer: long lower wick, small body at top — buying after a drop. Shooting Star: long upper wick, small body at bottom — selling after a rise. Marubozu: no wicks — pure directional conviction.', bullets: ['Doji: indecision — potential turning point','Hammer: bullish reversal candidate after downtrend','Shooting Star: bearish reversal candidate after uptrend','Marubozu: strong conviction, no wicks at all'], tip: 'Context is everything — a hammer in a downtrend at support is significant; the same candle mid-uptrend is less meaningful.' },
      { title: 'Applying Candlesticks', body: 'Candlesticks are most powerful when combined with trend, support/resistance levels, and volume. One candle rarely tells the complete story. Look for patterns at key price levels for the highest probability signals.', bullets: ['Always check trend direction before interpreting','Volume confirms candlestick signals strongly','Key levels amplify candlestick significance','Practice reading candles on historical charts first'], tip: 'Japanese traders used candlestick charts in the 1700s for rice futures — one of the oldest active technical tools.' }
    ],
    questions: [
      { id: 141, question: 'A bullish candlestick is one where:', options: ['Price briefly moves up','The close is higher than the open','Volume is above average','The high is at all-time levels'], correctAnswer: 1, explanation: 'A bullish candle has close above open, showing buyers dominated during that period.', realLifeInsight: 'Green bullish candles on high volume show institutional buying — a key signal professional traders look for.', category: 'Basics' },
      { id: 142, question: 'The wick (shadow) of a candle represents:', options: ['The opening range only','Price extremes reached but not sustained during the period','Trading volume levels','After-hours movement'], correctAnswer: 1, explanation: 'Wicks show the highest and lowest prices reached before price reversed back toward the body.', realLifeInsight: 'A long upper wick means sellers aggressively pushed price back down from the high — a clear supply zone.', category: 'Anatomy' },
      { id: 143, question: 'A Doji candlestick signals:', options: ['Strong bullish momentum','Indecision between buyers and sellers','A confirmed trend reversal','High volume activity'], correctAnswer: 1, explanation: 'A Doji has open and close at nearly the same level — neither buyers nor sellers won the session.', realLifeInsight: 'A Doji at the top of a strong uptrend is a major warning sign — sellers matching buyers for the first time.', category: 'Patterns' },
      { id: 144, question: 'A Hammer candlestick has:', options: ['Long upper wick, small body at bottom','No wicks at all','Long lower wick and small body near the top','Equal upper and lower wicks'], correctAnswer: 2, explanation: 'Hammer: long lower wick (buyers pushed back hard from lows), small body near the top.', realLifeInsight: 'A hammer after a prolonged downtrend at key support has an excellent track record as a reversal signal.', category: 'Patterns' },
      { id: 145, question: 'A Shooting Star after an uptrend signals:', options: ['Continued upward momentum','Potential bearish reversal — sellers pushed price back down from highs','A neutral consolidation period','Increased buying volume incoming'], correctAnswer: 1, explanation: 'Shooting Star: long upper wick showing price pushed up but sellers dominated and drove it back down — bearish.', realLifeInsight: 'A Shooting Star at resistance after a strong run is one of the highest-probability short entry signals in trading.', category: 'Patterns' },
      { id: 146, question: 'A Marubozu candle has:', options: ['Very long wicks on both sides','No wicks — strong directional move from open to close extremes','A gap from the previous candle','Only an upper wick'], correctAnswer: 1, explanation: 'Marubozu has no wicks — extreme conviction in one direction with open at one extreme, close at the other.', realLifeInsight: 'A bullish Marubozu on earnings day shows explosive institutional buying — the stock opened and never looked back.', category: 'Patterns' },
      { id: 147, question: 'Why is context critical for hammer candles?', options: ['Context does not matter for hammers','A hammer\'s significance depends on its location in the trend','Hammers always signal reversal regardless of context','Context only matters for doji patterns'], correctAnswer: 1, explanation: 'A hammer at the bottom of a downtrend at support is powerful. The same candle mid-uptrend has little meaning.', realLifeInsight: 'Reading candles without context produces low-probability trades. Location and trend make all the difference.', category: 'Application' },
      { id: 148, question: 'A long lower wick on a bullish candle suggests:', options: ['Sellers controlled the full session','Buyers pushed back strongly after sellers drove price lower','The stock is about to fall further','An insignificant trading day'], correctAnswer: 1, explanation: 'Long lower wick: price dropped significantly but buyers rejected those lows and pushed price back up strongly.', realLifeInsight: 'This pattern often forms at key support levels — the lower wick marks the buyer\'s defense of that price zone.', category: 'Interpretation' },
      { id: 149, question: 'What makes a candlestick pattern most reliable?', options: ['Appearing on any timeframe randomly','High volume confirming the candle at a key support/resistance level','The specific color of the candle','Appearing in complete isolation from context'], correctAnswer: 1, explanation: 'High volume at a key level confirms many participants agree — adding strong reliability to the signal.', realLifeInsight: 'A reversal candle with 3x average volume is a much stronger signal than the same pattern on below-average volume.', category: 'Application' },
      { id: 150, question: 'Candlestick charting originated in:', options: ['Wall Street in the 1900s','Japan in the 1700s for rice futures trading','London in the 1800s for bond trading','Chicago for commodity futures in 1950'], correctAnswer: 1, explanation: 'Japanese rice trader Homma Munehisa developed candlestick charts in the 1700s to track rice futures prices.', realLifeInsight: 'Steve Nison introduced candlestick charts to Western traders in 1991 — one of the most influential trading books ever.', category: 'History' }
    ]
  },
  'c2': {
    title: 'Chart Patterns',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 90,
    description: 'Identify and trade powerful chart patterns that repeat across all markets and timeframes.',
    learningObjectives: ['Recognize continuation and reversal patterns','Identify H&S, triangles, flags','Calculate price targets','Apply patterns with proper risk management'],
    keyTakeaways: ['Patterns repeat because human psychology is constant','Head & Shoulders = classic reversal','Flags and pennants = high-probability continuation','Always wait for confirmation before trading a pattern'],
    sections: [
      { title: 'Reversal Patterns', body: 'Reversal patterns signal the end of a trend. Head and Shoulders: three peaks with middle highest — bearish reversal. Double Top: two equal peaks — resistance holding. Double Bottom: two equal troughs — support holding. Always wait for neckline break as confirmation.', bullets: ['Head & Shoulders: bearish reversal after uptrend','Inverse H&S: bullish reversal after downtrend','Double Top: two failed resistance tests — bearish','Double Bottom: two successful support tests — bullish'], tip: 'The neckline break is the trade trigger — entering before confirmation risks a costly false signal.' },
      { title: 'Continuation Patterns', body: 'Continuation patterns show the trend pausing before resuming. Flags: sharp move followed by tight consolidation. Pennants: symmetrical triangles after strong moves. Ascending triangles: flat top, rising lows — bullish. Descending: flat bottom, falling tops — bearish.', bullets: ['Bull flag: sharp up, brief pullback, continuation higher','Pennant: symmetrical triangle after strong move','Ascending triangle: flat resistance, rising lows — bullish','Descending triangle: flat support, falling highs — bearish'], tip: 'Flags and pennants often appear in the middle of strong trends — ideal for catching the second half of a move.' },
      { title: 'Price Targets from Patterns', body: 'Patterns provide measurable targets. H&S target = neckline minus head-to-neckline height. Flag target = breakout point plus flagpole height. Double top target = neckline minus pattern height. Use targets to set take-profit orders.', bullets: ['H&S target: neckline - (head height above neckline)','Flag target: breakout + flagpole length','Double top: neckline - pattern height','Always confirm with volume on breakout before entering'], tip: 'Price targets are estimates, not guarantees. Use them for take-profit sizing — not crystal ball predictions.' }
    ],
    questions: [
      { id: 151, question: 'A Head and Shoulders pattern signals:', options: ['Trend continuation upward','A potential bearish reversal','Increased volume is coming','A bullish breakout forming'], correctAnswer: 1, explanation: 'Head and Shoulders is a classic bearish reversal — three peaks (middle highest) showing trend exhaustion.', realLifeInsight: 'The H&S pattern on major indices often precedes significant corrections. It was visible before the 2008 crash.', category: 'Reversal Patterns' },
      { id: 152, question: 'A Double Bottom at support suggests:', options: ['Price will continue lower','Bullish reversal — buyers defended support twice successfully','Neutral price action follows','Sellers taking full control'], correctAnswer: 1, explanation: 'Double Bottom shows two failed breakdown attempts — buyers defended strongly both times, signaling reversal.', realLifeInsight: 'Bitcoin formed a classic Double Bottom in late 2018 before a major recovery rally in 2019.', category: 'Reversal Patterns' },
      { id: 153, question: 'A bull flag pattern is:', options: ['A reversal after a downtrend','A sharp up move, tight downward consolidation, then continuation higher','Two equal highs at resistance','A wide sideways range'], correctAnswer: 1, explanation: 'Bull flag: brief downward consolidation after a strong up move, then continuation higher on breakout.', realLifeInsight: 'Momentum stocks often form multiple bull flags during a major run — each flag is a re-entry opportunity.', category: 'Continuation' },
      { id: 154, question: 'An ascending triangle has:', options: ['Falling highs and falling lows','Flat resistance and rising lows — bullish bias','Equal highs and equal lows','Falling resistance and flat support'], correctAnswer: 1, explanation: 'Ascending triangle: flat top resistance, rising lows — buyers getting more aggressive each test. Bullish.', realLifeInsight: 'Ascending triangles often form during consolidation after earnings. Breakout of flat resistance can be explosive.', category: 'Continuation' },
      { id: 155, question: 'When should you enter a H&S trade?', options: ['At the peak of the head','After the neckline breaks with volume confirmation','During formation of the right shoulder','At the first sign of the pattern forming'], correctAnswer: 1, explanation: 'Wait for the neckline break with volume before entering — earlier entry risks pattern failure and being stopped out.', realLifeInsight: 'Many amateurs enter H&S too early and get stopped on the right shoulder — patience is the edge here.', category: 'Trading' },
      { id: 156, question: 'Double Top price target is calculated as:', options: ['Double the pattern height above neckline','Neckline minus the height of the pattern','Average of the two tops','Previous support regardless of size'], correctAnswer: 1, explanation: 'Double Top target = neckline - (top height - neckline). Project the pattern height downward from the break.', realLifeInsight: 'Traders often take partial profits at the target and let the rest run — pattern targets are starting points.', category: 'Price Targets' },
      { id: 157, question: 'A descending triangle has:', options: ['Rising lows and rising highs','Flat support and falling highs — bearish bias','Horizontal support and resistance both','Rising support and falling highs'], correctAnswer: 1, explanation: 'Descending triangle: flat support, falling highs — sellers getting more aggressive. Bearish bias toward breakdown.', realLifeInsight: 'Descending triangles on hourly charts often precede significant breakdowns — watch volume on the support break.', category: 'Continuation' },
      { id: 158, question: 'Why do chart patterns work across different markets?', options: ['Market makers create them deliberately','Human psychology — fear and greed — drives repetitive price behavior','Algorithms are programmed to create them','Regulatory requirements force these formations'], correctAnswer: 1, explanation: 'Patterns repeat because human emotions are constant. Same psychology across markets and time = same price patterns.', realLifeInsight: 'The same H&S appears on Bitcoin charts, crude oil, and 1800s stock markets — human nature is timeless.', category: 'Theory' },
      { id: 159, question: 'A pennant forms after:', options: ['A prolonged sideways period','A sharp directional move then a symmetrical triangle consolidation','Two failed breakout attempts','A gap on heavy volume'], correctAnswer: 1, explanation: 'Pennant: symmetrical triangle consolidation after a sharp move — a brief rest before the trend continues.', realLifeInsight: 'Pennants are shorter-duration than flags, often completing within 1-3 weeks on daily charts.', category: 'Continuation' },
      { id: 160, question: 'Volume on a pattern breakout should ideally be:', options: ['Below average to conserve liquidity','Above average to confirm conviction and participation','Exactly equal to average','Not relevant for chart patterns at all'], correctAnswer: 1, explanation: 'Above-average volume on a breakout confirms institutional participation and gives the move credibility.', realLifeInsight: 'William O\'Neil\'s CANSLIM requires 40-50%+ above-average volume on breakouts — volume is ultimate confirmation.', category: 'Volume' }
    ]
  },
  'c3': {
    title: 'Support & Resistance',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 90,
    description: 'Master support and resistance — the foundation of all price action trading and technical analysis.',
    learningObjectives: ['Draw support and resistance levels accurately','Understand why levels matter psychologically','Trade bounces and breakouts from key levels','Use multiple timeframe confluence'],
    keyTakeaways: ['Support is a floor; resistance is a ceiling','Broken support becomes resistance (role reversal)','More touches = stronger level','Trade the reaction at the level, not blindly at it'],
    sections: [
      { title: 'What Are Support & Resistance?', body: 'Support is where buyers consistently step in, preventing further decline. Resistance is where sellers appear, capping the rally. These levels form through trader memory — people remember where price turned before and act there again.', bullets: ['Support: historical buying zone — acts as floor','Resistance: historical selling zone — acts as ceiling','Levels strengthen with each successful test','Round numbers naturally attract support and resistance'], tip: 'The more times a level is tested and holds, the bigger the move when it finally breaks through.' },
      { title: 'Role Reversal', body: 'When support breaks, it often becomes resistance. When resistance breaks, it often becomes support. Traders who bought at the old support now have losses — when price returns to that level, they sell at breakeven, creating the new resistance.', bullets: ['Broken support becomes new resistance','Broken resistance becomes new support','Retests of broken levels offer entry opportunities','Former levels act as price magnets on retests'], tip: 'Wait for price to retest the broken level before entering — better entry and confirmation in one move.' },
      { title: 'Trading Support & Resistance', body: 'Two main strategies: bounce (buy at support, sell at resistance) and breakout (buy the confirmed break). Combine with candlestick confirmation. Stop-loss just below support for longs, just above resistance for shorts.', bullets: ['Bounce trade: enter near level with tight stop','Breakout trade: enter on confirmed break with volume','Stop for long: just below support level','Stop for short: just above resistance level'], tip: 'Never enter exactly at a level — price often overshoots briefly before reversing. Give yourself a buffer zone.' }
    ],
    questions: [
      { id: 161, question: 'Support is a price level where:', options: ['Sellers always dominate completely','Buyers consistently step in and prevent further decline','Price always bounces immediately and exactly','Volume is always at its lowest'], correctAnswer: 1, explanation: 'Support is where buying interest consistently emerges, preventing price from falling through that level.', realLifeInsight: 'Apple\'s stock has repeatedly bounced from its 200-day moving average support over many years.', category: 'Basics' },
      { id: 162, question: 'When old support breaks and becomes new resistance, this is called:', options: ['Trend reversal signal','Role reversal','Support inversion','Bear trap formation'], correctAnswer: 1, explanation: 'Role reversal: broken support becomes resistance because trapped buyers sell at breakeven on the retest.', realLifeInsight: 'Trading role reversals means you trade against trapped buyers or sellers — a powerful structural edge.', category: 'Role Reversal' },
      { id: 163, question: 'A support level tested 5 times is typically:', options: ['Weaker — overused and likely to break','Stronger — more market memory and participation at that price','Same strength as a 2-touch level','Invalid because it was tested too often'], correctAnswer: 1, explanation: 'More touches mean more traders know the level and act at it — increasing reliability and significance.', realLifeInsight: 'Key round numbers on major indices have been tested dozens of times over decades — institutional memory is long.', category: 'Level Strength' },
      { id: 164, question: 'Stop-loss placement for a support bounce long trade:', options: ['Exactly at the support level','Just below the support level with a small buffer','Far below support to avoid being stopped','No standard exists for support trades'], correctAnswer: 1, explanation: 'Place stop just below support. If support breaks, the trade thesis is wrong — exit quickly with a small loss.', realLifeInsight: 'A well-placed support bounce can yield 3:1 risk-reward with a tight stop just below the level.', category: 'Application' },
      { id: 165, question: 'Round numbers like $100 or $50 often attract support/resistance because:', options: ['Brokers set them as targets','Traders and algorithms cluster orders at psychologically significant levels','They are regulatory price limits','Exchanges cap prices at round numbers'], correctAnswer: 1, explanation: 'Round numbers are psychologically significant — traders, funds, and algorithms all place orders at them.', realLifeInsight: 'Bitcoin at $100k, Apple at $200, S&P 500 at 5,000 — round levels attract enormous attention and order flow.', category: 'Psychology' },
      { id: 166, question: 'Best confirmation for a resistance breakout trade:', options: ['Price barely touching the level','High-volume candle closing clearly above resistance','An analyst upgrade','Price testing resistance for the first time'], correctAnswer: 1, explanation: 'High-volume close above resistance confirms institutional participation and reduces false breakout risk.', realLifeInsight: 'False breakouts trap buyers. Volume confirmation separates real breakouts from bull traps that reverse immediately.', category: 'Breakouts' },
      { id: 167, question: 'A level that appears on both daily and weekly charts is:', options: ['Weaker because it appears on multiple charts','Stronger due to multi-timeframe confluence','The same strength as a single-timeframe level','Invalid because different timeframes conflict'], correctAnswer: 1, explanation: 'Multi-timeframe confluence means more traders across different horizons all watch that level — much stronger.', realLifeInsight: 'Professionals check higher timeframes first, then zoom into lower timeframes for precise entries at those levels.', category: 'Multi-Timeframe' },
      { id: 168, question: 'Best entry strategy for a support bounce trade:', options: ['Buy as soon as price approaches support blindly','Wait for a bullish reversal candle at support before entering','Only enter on breakouts above the level','Short when price reaches support'], correctAnswer: 1, explanation: 'Wait for reversal candlestick confirmation at support before entering — reduces false signals and improves timing.', realLifeInsight: 'A hammer or bullish engulfing at support dramatically increases probability vs a blind buy at the level.', category: 'Application' },
      { id: 169, question: 'Dynamic support/resistance differs from static levels because:', options: ['Only applies to forex markets','It moves with price over time — often represented by moving averages','It is always more reliable than fixed levels','Only works on weekly charts'], correctAnswer: 1, explanation: 'Dynamic levels like moving averages move with price over time, unlike fixed horizontal lines.', realLifeInsight: 'The 200-day moving average is one of the most-watched dynamic support levels — institutions defend it in bull markets.', category: 'Types' },
      { id: 170, question: 'A false breakout (bull trap) is when:', options: ['A breakout continues strongly for weeks','Price briefly breaks a level then quickly reverses, trapping breakout traders','An analyst\'s prediction fails','A pattern only appears in bear markets'], correctAnswer: 1, explanation: 'False breakout: price breaks through a level then immediately reverses, trapping traders who chased the break.', realLifeInsight: 'Smart money sometimes engineers false breakouts to flush retail stops before moving in the real direction.', category: 'Breakouts' }
    ]
  },
  'c4': {
    title: 'Trend Analysis',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 120,
    description: 'Master trend identification and learn to trade with the trend for the highest probability setups.',
    learningObjectives: ['Define and identify market trends','Draw trend lines accurately','Use Dow Theory for confirmation','Trade pullbacks in the trend direction'],
    keyTakeaways: ['Uptrend: higher highs and higher lows','Downtrend: lower highs and lower lows','The trend is your friend until it ends','Trade pullbacks — better entry than chasing breakouts'],
    sections: [
      { title: 'Defining a Trend', body: 'An uptrend makes higher highs (HH) and higher lows (HL). A downtrend makes lower highs (LH) and lower lows (LL). A sideways market has no directional bias. Trends exist on all timeframes simultaneously. Always identify the trend on your entry timeframe.', bullets: ['Uptrend: HH and HL pattern','Downtrend: LH and LL pattern','Sideways: no clear directional pattern','Trends differ across timeframes — know which you are trading'], tip: 'The trend on your trading timeframe is the one that matters for entry. Higher timeframe sets the bigger picture.' },
      { title: 'Trend Lines & Channels', body: 'Uptrend lines connect higher lows — dynamic support. Downtrend lines connect lower highs — dynamic resistance. A channel forms with a parallel line. Price often bounces between channel boundaries. Two points draw the line; three points validate it.', bullets: ['Uptrend line: connect at least 2 higher lows','Downtrend line: connect at least 2 lower highs','Channel: parallel lines containing price action','Trend line breaks signal potential reversal'], tip: 'Need at least two points to draw but three points to validate. Look for that third touch before trading.' },
      { title: 'Trading the Trend', body: 'Dow Theory: trends have three phases — accumulation, public participation, distribution. Trade pullbacks in the trend direction: buy dips in uptrends, sell rallies in downtrends. This gives better entries than chasing breakouts. Stay in until a clear reversal signal.', bullets: ['Buy pullbacks to trendline support in uptrends','Sell rallies to trendline resistance in downtrends','Failed new high/low = first reversal warning','Trendline break + reversal candle = exit signal'], tip: 'The hardest part of trend trading is holding through normal pullbacks without panic selling at the low.' }
    ],
    questions: [
      { id: 171, question: 'An uptrend is defined by:', options: ['Higher prices only','Higher highs AND higher lows','Increasing volume only','Prices above $100 consistently'], correctAnswer: 1, explanation: 'Uptrend = higher highs AND higher lows. Both conditions must be present for a valid uptrend structure.', realLifeInsight: 'The S&P 500 uptrend from 2009-2020 was defined by consistent higher highs and higher lows across multiple years.', category: 'Trend Definition' },
      { id: 172, question: 'A downtrend is defined by:', options: ['Lower prices only','Lower highs AND lower lows','Declining volume only','Prices below $50 consistently'], correctAnswer: 1, explanation: 'Downtrend = lower highs (rallies fail lower) AND lower lows (price reaches new lows). Both required.', realLifeInsight: 'Identifying a downtrend early prevents buying falling stocks. The first lower high after a peak is your warning.', category: 'Trend Definition' },
      { id: 173, question: 'Trading with the trend means:', options: ['Always following what others say','Taking trades in the direction of the prevailing trend for higher probability','Trends never end so always hold','Following social media trading tips'], correctAnswer: 1, explanation: 'Trading with the dominant market force increases probability — the trend is the most powerful market signal.', realLifeInsight: 'Studies show trend-following strategies outperform counter-trend strategies across all asset classes long-term.', category: 'Trend Trading' },
      { id: 174, question: 'An uptrend line is drawn by connecting:', options: ['The higher highs on the chart','The higher lows — acting as dynamic support','The opens of consecutive candles','The highest daily closing prices'], correctAnswer: 1, explanation: 'Uptrend lines connect higher lows. The line acts as dynamic support that price respects during the uptrend.', realLifeInsight: 'When an uptrend line breaks with authority, smart traders begin reducing long exposure immediately.', category: 'Trend Lines' },
      { id: 175, question: 'How many points are needed to validate a trend line?', options: ['One is sufficient','At least two points, validated by a third touch','Five or more touches needed','Any two points work with equal strength'], correctAnswer: 1, explanation: 'Two points draw the line; a third touch validates it. More touches = stronger and more significant line.', realLifeInsight: 'A trendline touched 5 times over months is very significant. When it finally breaks, the move is often powerful.', category: 'Trend Lines' },
      { id: 176, question: 'In Dow Theory, the three phases of a primary uptrend are:', options: ['Open, peak, close','Accumulation, public participation, distribution','Bull, neutral, bear phases','Breakout, continuation, exhaustion'], correctAnswer: 1, explanation: 'Dow Theory: accumulation (smart money buys quietly), public participation (momentum builds), distribution (smart money sells).', realLifeInsight: 'Identifying the accumulation phase early gives the biggest gains. By public participation, the gains are already large.', category: 'Dow Theory' },
      { id: 177, question: 'Trading pullbacks in an uptrend means:', options: ['Buying only at all-time highs','Buying temporary dips back toward trendline support in an uptrend','Selling every short-term bounce aggressively','Waiting for price to fully reverse before buying'], correctAnswer: 1, explanation: 'Pullback trading buys dips to trendline/support in an uptrend — better entry than chasing the high.', realLifeInsight: 'Professional trend traders get 5-10 entries in a single uptrend by buying each pullback to their trendline.', category: 'Trading' },
      { id: 178, question: 'A failed higher high in an uptrend suggests:', options: ['Nothing significant — normal price action','Trend weakening — buying momentum is fading','Time to buy aggressively at the top','Volume will increase immediately afterwards'], correctAnswer: 1, explanation: 'Failure to make a new high shows buying momentum fading — first warning that the uptrend may be ending.', realLifeInsight: 'When the S&P 500 failed to make a new high after the 2000 peak, it was the first major warning of the dot-com bust.', category: 'Reversal' },
      { id: 179, question: 'In a downtrend channel, the best trading strategy is:', options: ['Only buy the lows hoping for reversal','Short rallies to the upper channel resistance with stops above it','Ignore the trend and trade randomly','Only trade breakouts from the channel'], correctAnswer: 1, explanation: 'In a downtrend channel, price rallies to upper resistance are short-selling opportunities with defined stops.', realLifeInsight: 'Bear market channel trading can be extremely profitable — selling into every bounce as price trends lower over months.', category: 'Channels' },
      { id: 180, question: 'Multiple timeframe analysis means:', options: ['Trading all timeframes simultaneously','Using higher timeframe for trend, lower timeframe for precise entry timing','Only using daily charts exclusively','Averaging analysis results across all timeframes'], correctAnswer: 1, explanation: 'Higher timeframe defines trend direction; lower timeframe provides precise entry timing within that trend.',realLifeInsight: 'Long-term bullish trader: weekly for trend, daily for setup, 1-hour for precise entry timing.', category: 'Multi-Timeframe' }
    ]
  }


,
  'i1': {
    title: 'Moving Averages',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 100,
    description: 'Master moving averages — the most widely used indicators in trading for trend identification and signals.',
    learningObjectives: ['Understand SMA and EMA differences','Use MAs for trend identification','Apply golden and death cross signals','Build MA crossover strategies'],
    keyTakeaways: ['SMA smooths price equally; EMA weights recent prices more','Price above MA = bullish; below = bearish','Golden cross (50 above 200) = bullish signal','MAs work best in trending markets, not sideways'],
    sections: [
      { title: 'SMA vs EMA', body: 'Simple Moving Average (SMA) averages closing prices equally over a period. Exponential Moving Average (EMA) weights recent prices more — reacts faster. SMA is smoother and slower. EMA is more sensitive to recent moves. Traders use both for different purposes.', bullets: ['SMA 50: average of last 50 closing prices','EMA 20: recent prices weighted more heavily','EMA reacts faster to price changes','SMA gives clearer trend signal with less noise'], tip: 'Most day traders prefer EMA for entries; swing traders use SMA for longer trend identification.' },
      { title: 'Moving Averages as Trend Tool', body: 'When price is above a moving average, the trend is up. Below = trend is down. The 200-day MA is the most important: above it = bull market; below = bear market. MAs also act as dynamic support and resistance.', bullets: ['Price above 50MA: short-term bullish','Price above 200MA: long-term bullish bias','MA acting as support in uptrend: buy the bounce','MA acting as resistance in downtrend: sell the rally'], tip: 'The 200-day MA is watched by every professional fund. When price tests it, expect high-volume reactions.' },
      { title: 'Crossover Signals', body: 'Golden Cross: 50-day MA crosses above 200-day MA — bullish long-term signal. Death Cross: 50-day MA crosses below 200-day MA — bearish long-term signal. These are widely watched by institutional traders and can trigger large moves.', bullets: ['Golden Cross (50 above 200): long-term buy signal','Death Cross (50 below 200): long-term sell signal','Use with additional confirmation — lagging signals','Shorter MAs for faster signals, more false positives'], tip: 'Golden and Death Cross signals are lagging — price often moves significantly before the cross occurs. Use as confirmation.' }
    ],
    questions: [
      { id: 181, question: 'A Simple Moving Average (SMA) calculates:', options: ['Tomorrow\'s predicted price','The average closing price over a specified period equally weighted','Only the highest prices','Volatility over a period'], correctAnswer: 1, explanation: 'SMA averages closing prices equally over a period. SMA-50 = average of last 50 closes.', realLifeInsight: 'The S&P 500\'s 200-day SMA is watched by every major fund — breaking below it often triggers institutional selling.', category: 'SMA' },
      { id: 182, question: 'Compared to SMA, the EMA:', options: ['Is slower to react to price changes','Weights recent prices more, reacting faster to recent moves','Averages prices over a longer period','Is only used for commodities'], correctAnswer: 1, explanation: 'EMA gives more weight to recent prices, making it more responsive to current market conditions than SMA.', realLifeInsight: 'Day traders prefer the 9-EMA or 20-EMA for quick signals. Swing traders often use the 50-SMA for trend.', category: 'EMA' },
      { id: 183, question: 'When price is trading above the 200-day MA, the general bias is:', options: ['Bearish — sell everything','Bullish — long-term uptrend','Neutral — no information','Overbought — time to sell'], correctAnswer: 1, explanation: 'Price above the 200-day MA signals a long-term uptrend and bullish bias. Institutions use this as a bull/bear dividing line.', realLifeInsight: 'Warren Buffett said Berkshire Hathaway would never short a stock above its 200-day MA — a simple but powerful filter.', category: 'Trend Filter' },
      { id: 184, question: 'A Golden Cross occurs when:', options: ['Price hits an all-time high','The 50-day MA crosses above the 200-day MA','Trading volume triples','Institutional investors buy heavily'], correctAnswer: 1, explanation: 'Golden Cross: 50MA crosses above 200MA — a widely watched long-term bullish signal.', realLifeInsight: 'When Bitcoin formed a Golden Cross in early 2020, it preceded a massive bull run from $8k to $60k+.', category: 'Crossovers' },
      { id: 185, question: 'A Death Cross is:', options: ['A bearish candlestick pattern','The 50-day MA crossing below the 200-day MA','A market crash indicator only','When volume drops to near zero'], correctAnswer: 1, explanation: 'Death Cross: 50MA crosses below 200MA — a long-term bearish signal watched by institutional traders.', realLifeInsight: 'Death Crosses in 2008 and 2020 confirmed the bear market — lagging signals but useful as trend confirmation.', category: 'Crossovers' },
      { id: 186, question: 'Moving averages work best in which market condition?', options: ['Sideways choppy markets','Trending markets with clear direction','High volatility with no trend','Markets about to reverse'], correctAnswer: 1, explanation: 'MAs shine in trending markets. In sideways markets, they whipsaw and produce many false signals.', realLifeInsight: 'Professional MA traders filter trades to only take setups when price is clearly trending in one direction.', category: 'Application' },
      { id: 187, question: 'A moving average acting as support in an uptrend means:', options: ['Price is about to break below it immediately','Price has historically bounced from the MA during the uptrend — buy the touch','The MA is meaningless for trading','Price will gap below the MA next session'], correctAnswer: 1, explanation: 'In uptrends, MAs often act as dynamic support — price pulls back to the MA and bounces. A proven trading setup.', realLifeInsight: 'Tesla repeatedly bounced from its 20-EMA during its massive 2020 uptrend — classic dynamic support trading.', category: 'Application' },
      { id: 188, question: 'What is a MA crossover trading strategy?', options: ['One moving average strategy only','Entering when a faster MA crosses over a slower MA in the signal direction','Only applicable to crypto markets','Using 10 different MAs simultaneously'], correctAnswer: 1, explanation: 'MA crossover: buy when fast MA crosses above slow MA (bullish momentum); sell when fast crosses below slow.', realLifeInsight: 'The 5/10 EMA crossover is popular for day trading; the 50/200 SMA crossover is the gold standard for long-term traders.', category: 'Strategy' },
      { id: 189, question: 'Why are moving average signals considered lagging?', options: ['They predict future prices','They are calculated from past prices, so they react after the move begins','They only work in real-time','They require future data to calculate'], correctAnswer: 1, explanation: 'MAs are based on past closing prices — by definition they react after the price has already moved.', realLifeInsight: 'A Death Cross in 2008 triggered months after the bear market started — great confirmation, poor timing for entries.', category: 'Limitations' },
      { id: 190, question: 'Which moving average is most watched by institutional investors?', options: ['5-day EMA','20-day SMA','200-day SMA','50-minute EMA'], correctAnswer: 2, explanation: 'The 200-day SMA is the most widely watched moving average — used by institutions to define bull vs bear conditions.', realLifeInsight: 'When Apple or the S&P 500 approaches the 200-day MA, trading desks across Wall Street pay close attention.', category: 'Key Levels' }
    ]
  },
  'i2': {
    title: 'RSI & Momentum',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 110,
    description: 'Master the RSI indicator and momentum trading to identify overbought, oversold conditions, and divergences.',
    learningObjectives: ['Understand how RSI is calculated and interpreted','Identify overbought and oversold conditions','Spot bullish and bearish RSI divergence','Use RSI with price action for high-probability setups'],
    keyTakeaways: ['RSI measures momentum strength on a 0-100 scale','Above 70 = overbought; below 30 = oversold','Divergence between price and RSI = powerful reversal signal','RSI centerline (50) defines overall momentum bias'],
    sections: [
      { title: 'Understanding RSI', body: 'The Relative Strength Index (RSI) measures price momentum on a scale of 0-100. Created by J. Welles Wilder. Above 70: overbought (price may be due for pullback). Below 30: oversold (price may be due for bounce). The default period is 14.', bullets: ['RSI 0-100 scale: 50 is the centerline','Above 70: overbought territory','Below 30: oversold territory','14-period is the standard setting'], tip: 'In strong trends, RSI can stay overbought (70+) for extended periods. Do not short just because RSI is above 70.' },
      { title: 'RSI Divergence', body: 'Bullish divergence: price makes lower lows but RSI makes higher lows — momentum improving before price. Bearish divergence: price makes higher highs but RSI makes lower highs — momentum fading before price. Divergence often precedes reversals.', bullets: ['Bullish divergence: lower price lows, higher RSI lows','Bearish divergence: higher price highs, lower RSI highs','Divergence shows momentum not matching price action','Hidden divergence signals trend continuation'], tip: 'Divergence is most powerful at key support/resistance levels — adds significant confirmation to reversal setups.' },
      { title: 'Trading with RSI', body: 'RSI is most effective combined with price action. Oversold RSI at support = high-probability long. Overbought RSI at resistance = high-probability short. RSI crossing back through 50 from below = bullish momentum. From above = bearish.', bullets: ['Oversold at support: consider long entries','Overbought at resistance: consider short entries','RSI 50 cross: bullish or bearish momentum confirmation','Combine with trend direction for best results'], tip: 'Do not trade RSI overbought/oversold in isolation. Always check the trend and key levels first.' }
    ],
    questions: [
      { id: 191, question: 'The RSI indicator measures:', options: ['Absolute price levels','Price momentum strength on a 0-100 scale','Daily trading volume','Company fundamental strength'], correctAnswer: 1, explanation: 'RSI measures price momentum — how strong the current price movement is relative to recent history.', realLifeInsight: 'J. Welles Wilder created RSI in 1978. It remains one of the most popular indicators 40+ years later.', category: 'RSI Basics' },
      { id: 192, question: 'An RSI reading above 70 typically indicates:', options: ['Strong buy signal immediately','Overbought conditions — price may be due for a pullback','Strong trend confirmation to buy more','Price is about to go vertical'], correctAnswer: 1, explanation: 'RSI above 70 suggests overbought conditions — buying momentum may be excessive and a pullback could follow.', realLifeInsight: 'During 2020-2021 tech rally, many stocks had RSI above 80 for months — overbought can stay overbought in strong trends.', category: 'Overbought/Oversold' },
      { id: 193, question: 'RSI below 30 suggests:', options: ['Price is about to crash further','Oversold conditions — potential for a bounce or reversal','A confirmed downtrend continues','Time to add short positions'], correctAnswer: 1, explanation: 'RSI below 30 signals oversold conditions — selling momentum may be excessive and a bounce could occur.', realLifeInsight: 'Many value investors look for RSI below 30 in quality stocks during market corrections as potential buy points.', category: 'Overbought/Oversold' },
      { id: 194, question: 'Bullish RSI divergence occurs when:', options: ['Price makes higher highs and RSI makes higher highs','Price makes lower lows but RSI makes higher lows','Both price and RSI decline together','RSI stays flat while price rises sharply'], correctAnswer: 1, explanation: 'Bullish divergence: price declining to new lows but RSI not following — momentum improving before price turns up.', realLifeInsight: 'Bitcoin showed bullish RSI divergence at major bottoms in 2019 and late 2022 — powerful reversal signal both times.', category: 'Divergence' },
      { id: 195, question: 'Bearish RSI divergence occurs when:', options: ['Price and RSI both rise together','Price makes higher highs but RSI makes lower highs','RSI is above 70 briefly','Price falls while RSI stays at 50'], correctAnswer: 1, explanation: 'Bearish divergence: price reaching new highs but RSI declining — momentum fading before price turns down.', realLifeInsight: 'Bearish RSI divergence appeared at the peak of the 2021 crypto bull run months before the massive crash.', category: 'Divergence' },
      { id: 196, question: 'The RSI 50 level is significant because:', options: ['It always triggers buy orders','It acts as the momentum centerline — above = bullish bias, below = bearish','It marks the exact overbought zone','It is where RSI signals most often appear'], correctAnswer: 1, explanation: 'RSI 50 is the centerline. Above 50 shows bullish momentum; below 50 shows bearish momentum.', realLifeInsight: 'Trend traders wait for RSI to cross and hold above 50 before taking long positions — confirms bullish momentum.', category: 'Centerline' },
      { id: 197, question: 'The default RSI period is:', options: ['7','9','14','21'], correctAnswer: 2, explanation: 'Wilder designed RSI with a 14-period setting, which remains the standard across trading platforms.', realLifeInsight: 'Some traders use RSI-7 for faster signals on lower timeframes; others use RSI-21 for smoother readings on daily charts.', category: 'Settings' },
      { id: 198, question: 'In a strong uptrend, RSI staying above 70 for weeks means:', options: ['The trend is about to reverse immediately','The trend is exceptionally strong — do not short based on RSI alone','RSI is broken and unreliable','Time to sell everything immediately'], correctAnswer: 1, explanation: 'In powerful trends, RSI can remain in overbought territory for extended periods — this shows trend strength.', realLifeInsight: 'Tesla in 2020 had RSI above 70 for nearly the entire multi-month rally — shorting due to high RSI was costly.', category: 'Trend Context' },
      { id: 199, question: 'The most powerful RSI setup combines:', options: ['RSI reading alone without any other context','Oversold/overbought RSI at a key support/resistance level with a confirming candle','Only RSI and volume together','RSI with news events exclusively'], correctAnswer: 1, explanation: 'RSI confluence at key levels with candlestick confirmation creates high-probability, well-defined setups.', realLifeInsight: 'Professional traders never use RSI in isolation — they combine it with price structure for much better win rates.', category: 'Application' },
      { id: 200, question: 'Hidden bullish divergence (lower RSI lows matching higher price lows) signals:', options: ['Trend reversal downward','Trend continuation — the uptrend remains healthy despite brief dip','A new bear market beginning','Neutral — no tradeable information'], correctAnswer: 1, explanation: 'Hidden divergence signals trend continuation. Lower RSI lows during price consolidation = uptrend continuing.', realLifeInsight: 'Hidden divergence helps traders stay in winning positions through normal pullbacks rather than exiting too early.', category: 'Divergence' }
    ]
  },
  'i3': {
    title: 'MACD & Signals',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 120,
    description: 'Learn MACD — one of the most powerful trend and momentum indicators used by professional traders.',
    learningObjectives: ['Understand MACD components and calculation','Read MACD crossovers and histogram','Identify bullish and bearish divergence','Combine MACD with price action'],
    keyTakeaways: ['MACD = 12 EMA minus 26 EMA','Signal line = 9-period EMA of MACD','Histogram shows distance between MACD and signal','MACD crossovers signal momentum shifts'],
    sections: [
      { title: 'MACD Components', body: 'MACD (Moving Average Convergence Divergence) has three parts. MACD Line = 12-period EMA minus 26-period EMA. Signal Line = 9-period EMA of the MACD line. Histogram = difference between MACD and Signal. Gerald Appel created MACD in 1979.', bullets: ['MACD line: 12 EMA - 26 EMA','Signal line: 9-period EMA of MACD line','Histogram: MACD line - Signal line','Standard settings: (12, 26, 9)'], tip: 'The histogram turning from negative to less negative is an early signal of momentum shift — often precedes the actual crossover.' },
      { title: 'MACD Crossover Signals', body: 'Bullish crossover: MACD line crosses above signal line — momentum turning positive. Bearish crossover: MACD crosses below signal line — momentum turning negative. Zero line crossover: MACD crossing zero is a stronger trend change signal.', bullets: ['MACD above signal: bullish momentum shift','MACD below signal: bearish momentum shift','MACD above zero: overall bullish trend','MACD below zero: overall bearish trend'], tip: 'Zero line crossovers are stronger than signal line crossovers — wait for zero line cross for trend confirmation.' },
      { title: 'MACD Divergence & Application', body: 'Divergence between price and MACD is a powerful signal. Bearish divergence: price higher high, MACD lower high. Bullish divergence: price lower low, MACD higher low. Like RSI divergence, it signals momentum change before price reversal.', bullets: ['Bullish MACD divergence: precedes price reversal up','Bearish MACD divergence: precedes price reversal down','MACD works best in trending markets','Use weekly MACD for bigger picture trade confirmation'], tip: 'MACD divergence on weekly charts often precedes multi-week or multi-month reversals — very significant signals.' }
    ],
    questions: [
      { id: 201, question: 'MACD is calculated as:', options: ['Price divided by volume','12-period EMA minus 26-period EMA','The average of multiple moving averages','Price change percentage'], correctAnswer: 1, explanation: 'MACD = 12 EMA - 26 EMA. It measures the relationship between two exponential moving averages.', realLifeInsight: 'Gerald Appel created MACD in 1979. It is still one of the most used indicators across all markets 40+ years later.', category: 'Calculation' },
      { id: 202, question: 'The MACD signal line is:', options: ['The 26-period EMA','A 9-period EMA of the MACD line itself','The 12-period EMA','Yesterday\'s MACD value'], correctAnswer: 1, explanation: 'The signal line is a 9-period EMA of the MACD line — a smoothed version used to generate crossover signals.', realLifeInsight: 'Standard MACD settings (12,26,9) were designed for daily charts. Day traders often use faster settings.', category: 'Components' },
      { id: 203, question: 'The MACD histogram represents:', options: ['Total trading volume','The difference between the MACD line and signal line','Average price movement','Number of trades in a period'], correctAnswer: 1, explanation: 'MACD histogram = MACD line - Signal line. It shows the momentum of the MACD crossover — bigger bars = stronger momentum.', realLifeInsight: 'Histogram bars shrinking before a crossover often warn of the upcoming signal before price gives any clue.', category: 'Components' },
      { id: 204, question: 'A bullish MACD crossover occurs when:', options: ['Price gaps above resistance','The MACD line crosses above the signal line','Volume doubles suddenly','Price forms a doji candle'], correctAnswer: 1, explanation: 'Bullish crossover: MACD line crosses above signal line — momentum shifting from bearish to bullish.', realLifeInsight: 'MACD bullish crossovers on weekly charts of major stocks often mark the beginning of new intermediate uptrends.', category: 'Crossovers' },
      { id: 205, question: 'MACD crossing above the zero line signals:', options: ['Short-term overbought conditions','Stronger bullish momentum — short-term EMA above long-term EMA','Immediate sell signal','Only applicable in bear markets'], correctAnswer: 1, explanation: 'MACD above zero means the 12 EMA is above the 26 EMA — confirming a bullish trend on that timeframe.', realLifeInsight: 'Traders who only buy when MACD is above zero filter out most bear market losing trades automatically.', category: 'Zero Line' },
      { id: 206, question: 'Bearish MACD divergence occurs when:', options: ['Price and MACD both decline together','Price makes higher highs but MACD makes lower highs','MACD stays below zero for weeks','Volume decreases on up days'], correctAnswer: 1, explanation: 'Bearish MACD divergence: price at new highs but MACD declining — momentum weakening before price reversal.', realLifeInsight: 'Bearish MACD divergence appeared on the S&P 500 before both the 2000 and 2007 market tops — a powerful warning.', category: 'Divergence' },
      { id: 207, question: 'MACD works best in:', options: ['Sideways choppy markets','Trending markets with clear directional movement','Only during earnings season','Only on intraday charts'], correctAnswer: 1, explanation: 'Like most momentum indicators, MACD generates quality signals in trending conditions. Choppy markets produce whipsaws.', realLifeInsight: 'Many MACD traders add a trend filter — only taking bullish MACD signals when price is above the 200-day MA.', category: 'Application' },
      { id: 208, question: 'Shrinking MACD histogram bars before a crossover suggest:', options: ['Trend accelerating in current direction','Momentum slowing — potential crossover signal forming soon','Higher volatility incoming','No useful information yet'], correctAnswer: 1, explanation: 'Shrinking histogram shows the MACD and signal lines converging — often the earliest warning of an upcoming crossover.', realLifeInsight: 'Experienced MACD traders watch histogram bar size changes as an early warning system for trade entry preparation.', category: 'Histogram' },
      { id: 209, question: 'MACD divergence on a weekly chart is considered:', options: ['Less significant than daily divergence','More significant — signals larger multi-week or multi-month moves','Equally significant to any timeframe','Only for long-term investors to use'], correctAnswer: 1, explanation: 'Higher timeframe divergences signal larger moves. Weekly MACD divergence often precedes major trend reversals.', realLifeInsight: 'MACD divergence on the monthly Bitcoin chart in 2021 warned of the major bear market months before it fully materialized.', category: 'Timeframes' },
      { id: 210, question: 'Standard MACD settings are:', options: ['5, 10, 3','9, 21, 7','12, 26, 9','20, 50, 14'], correctAnswer: 2, explanation: 'Standard MACD settings are (12, 26, 9): 12-period EMA, 26-period EMA, and 9-period signal line.', realLifeInsight: 'These settings were designed for daily charts in the stock market. Crypto traders sometimes use faster settings for 24/7 markets.', category: 'Settings' }
    ]
  },
  'i4': {
    title: 'Volume Analysis',
    level: 'Intermediate',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 100,
    description: 'Understand volume analysis — the ultimate confirmation tool that reveals institutional activity and true conviction.',
    learningObjectives: ['Understand what volume tells traders','Identify volume patterns that confirm or deny price moves','Use OBV and volume indicators','Spot accumulation and distribution'],
    keyTakeaways: ['Volume confirms price moves — high volume = conviction','Climax volume can mark trend exhaustion','OBV tracks cumulative volume flow direction','Divergence between price and OBV signals reversal'],
    sections: [
      { title: 'Volume as Confirmation', body: 'Volume is the total units traded in a period. High volume confirms a price move — many participants agree. Low volume on a move suggests lack of conviction and potential reversal. Volume should expand in the direction of the trend and contract on pullbacks.', bullets: ['High volume on upside: institutional buying — confirmed move','Low volume on upside: weak rally — suspicious','High volume on downside: institutional selling — confirmed move','Volume expands with trend, contracts on pullbacks'], tip: 'Price moves with high volume are like decisions made by a crowd; moves on low volume are made by a few.' },
      { title: 'Volume Patterns & Climax', body: 'Climax volume is an extreme spike that often marks trend exhaustion. Selling climax: massive volume at a low — panic selling exhausted. Buying climax: massive volume at a high — euphoric buying exhausted. After climax volume, the move often reverses significantly.', bullets: ['Selling climax: exhaustion bottom — watch for reversal','Buying climax: exhaustion top — watch for reversal','Volume drying up: consolidation or lack of interest','Breakouts need high volume — low volume breakouts often fail'], tip: 'When you see the largest volume candle in months and price closes near its extreme, pay very close attention.' },
      { title: 'On Balance Volume (OBV)', body: 'OBV tracks cumulative volume flow. When price closes up, volume adds to OBV. When price closes down, volume subtracts. Rising OBV = more volume on up days (accumulation). Falling OBV = more volume on down days (distribution). Divergence between OBV and price is very significant.', bullets: ['Rising OBV: buyers are more active — accumulation phase','Falling OBV: sellers are more active — distribution phase','OBV making new highs before price: very bullish','OBV making new lows before price: very bearish'], tip: 'OBV divergence from price action is one of the most reliable early warning signals for trend reversals.' }
    ],
    questions: [
      { id: 211, question: 'What does high volume on a price move indicate?', options: ['The move is about to reverse immediately','Strong conviction — many participants agree with the direction','Price is overvalued','Broker manipulation is occurring'], correctAnswer: 1, explanation: 'High volume confirms the price move — many participants are trading, giving the move greater credibility.', realLifeInsight: 'Breakout traders require high volume to validate patterns — without volume, breakouts often fail and reverse quickly.', category: 'Volume Basics' },
      { id: 212, question: 'Low volume on an upward price move suggests:', options: ['The rally is extremely strong','Weak buying conviction — the move may lack sustainability','Institutional accumulation happening','The stock is about to split'], correctAnswer: 1, explanation: 'Low volume on an up move means few participants are driving it — often unsustainable and prone to reversal.', realLifeInsight: 'Many false breakouts occur on low volume — smart traders wait for volume confirmation before chasing moves.', category: 'Volume Analysis' },
      { id: 213, question: 'A selling climax is characterized by:', options: ['Gradually increasing volume over weeks','Massive spike in volume at a market low — panic selling exhausted','Average volume on a down day','Low volume at a bottom'], correctAnswer: 1, explanation: 'Selling climax: extreme volume at a low where panic sellers exhaust themselves — often marks a major bottom.', realLifeInsight: 'The COVID crash bottom in March 2020 featured enormous volume — a textbook selling climax that marked the exact low.', category: 'Climax Volume' },
      { id: 214, question: 'Volume should ideally behave how during a healthy uptrend?', options: ['Stay constant throughout the trend','Expand on up days and contract on pullback days','Decrease as price rises','Only increase near the top'], correctAnswer: 1, explanation: 'Healthy uptrend: volume expands on advancing days (buyers active) and contracts on pullback days (normal consolidation).', realLifeInsight: 'When pullback volume starts matching or exceeding up-day volume in an uptrend, distribution may be beginning.', category: 'Trend Volume' },
      { id: 215, question: 'OBV (On Balance Volume) is calculated by:', options: ['Adding all daily volumes together','Adding volume on up close days, subtracting on down close days cumulatively','Volume times price each day','Average daily volume over 20 periods'], correctAnswer: 1, explanation: 'OBV accumulates volume: add on up days, subtract on down days. Shows whether more volume is on up or down sessions.', realLifeInsight: 'Joseph Granville created OBV in 1963. It remains one of the most insightful volume tools for detecting institutional flow.', category: 'OBV' },
      { id: 216, question: 'Rising OBV while price is falling suggests:', options: ['Confirmed bearish trend — sell immediately','Bullish divergence — buyers absorbing selling, reversal may be near','Neutral market conditions','Volume is broken as an indicator'], correctAnswer: 1, explanation: 'OBV rising while price falls = buyers absorbing sell pressure. More volume on up days even as price declines. Bullish.', realLifeInsight: 'This OBV pattern appeared in Apple stock in early 2019 before a major recovery rally — smart money was accumulating.', category: 'OBV Divergence' },
      { id: 217, question: 'A breakout on low volume typically:', options: ['Signals the strongest breakouts','Often fails — lacks the institutional participation needed for follow-through','Means the move is genuine and sustainable','Is more reliable than high volume breakouts'], correctAnswer: 1, explanation: 'Low volume breakouts often fail because institutions are not participating — insufficient buying power to sustain the move.', realLifeInsight: 'Day traders specifically avoid chasing breakouts on low volume — a high percentage reverse back through the breakout level.', category: 'Breakouts' },
      { id: 218, question: 'Volume drying up during a consolidation typically signals:', options: ['End of the consolidation is near — big move coming','Trend is ending permanently','Volume analysis no longer relevant','Traders are not interested in the asset'], correctAnswer: 0, explanation: 'Low volume during consolidation often precedes a significant move as market participants wait and orders accumulate.', realLifeInsight: 'The tightest consolidations on lowest volume often precede the most explosive breakouts — the calm before the storm.', category: 'Consolidation' },
      { id: 219, question: 'Distribution in volume analysis refers to:', options: ['Spreading trades across many assets','Smart money selling heavily to retail buyers at high prices','Distributing profits among partners','Increasing trading frequency'], correctAnswer: 1, explanation: 'Distribution = institutional selling into retail buying at high prices. High volume at tops = potential distribution.', realLifeInsight: 'During distribution phases, price may not drop immediately — institutions need time to sell without crashing the price.', category: 'Accumulation/Distribution' },
      { id: 220, question: 'What is the "smart money" in volume analysis?', options: ['Retail traders with good luck','Institutional traders — funds, banks, and large operators whose orders move markets','Government trading programs','AI-driven trading systems only'], correctAnswer: 1, explanation: 'Smart money = large institutional traders whose large orders move price. Tracking their volume footprint gives an edge.', realLifeInsight: 'Wyckoff\'s method is entirely built around identifying smart money accumulation and distribution through volume and price.', category: 'Smart Money' }
    ]
  }


,
  'r1': {
    title: 'Risk Basics',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 130,
    description: 'Master the fundamentals of risk management — the difference between professional traders and gamblers.',
    learningObjectives: ['Define risk per trade as percentage of account','Understand risk-reward ratio','Calculate expected value of a trading strategy','Avoid the most common risk management mistakes'],
    keyTakeaways: ['Risk only 1-2% per trade to survive long-term','Risk-reward minimum 1:2 for positive expectancy','Expected value = (Win% x Avg Win) - (Loss% x Avg Loss)','Consistent small losses > one catastrophic loss'],
    sections: [
      { title: 'The 1-2% Rule', body: 'Professional traders risk only 1-2% of their total account on any single trade. This ensures that even a long losing streak cannot wipe out the account. A 10-trade losing streak with 1% risk = only 10% drawdown. The same streak with 10% risk = 65% drawdown.', bullets: ['Risk 1%: 10 consecutive losses = 10% drawdown (recoverable)','Risk 10%: 10 consecutive losses = 65% drawdown (devastating)','Losing streaks of 10+ happen to everyone','Survival enables eventual profitability'], tip: 'The purpose of risk management is not to maximize returns — it is to stay in the game long enough to profit.' },
      { title: 'Risk-Reward Ratio', body: 'Risk-reward ratio compares potential profit to potential loss. 1:2 means risking $1 to potentially gain $2. At 1:2 with only 40% win rate, you are profitable. The ratio forces discipline — only take trades where potential reward justifies the risk.', bullets: ['1:1 ratio: need 50%+ win rate to profit','1:2 ratio: profitable at just 40% win rate','1:3 ratio: profitable at just 30% win rate','Higher R multiple = more forgiving win rate required'], tip: 'A 1:2 risk-reward with 45% win rate is more profitable than a 1:1 with 65% win rate. Math beats intuition.' },
      { title: 'Expected Value', body: 'Expected value (EV) determines if a strategy is profitable over many trades. EV = (Win% x Avg Win) - (Loss% x Avg Loss). Positive EV strategies profit long-term despite individual losses. Professional traders focus on strategy EV, not individual trade outcomes.', bullets: ['Positive EV: profitable over large sample of trades','Negative EV: destined to lose over time regardless of luck','Individual trade outcomes are random within a positive EV system','Large sample size reveals true strategy performance'], tip: 'Think in probabilities across 100 trades, not the outcome of the current trade. This eliminates emotional decision-making.' }
    ],
    questions: [
      { id: 221, question: 'Why do professional traders risk only 1-2% per trade?', options: ['It maximizes returns faster','It ensures losing streaks cannot wipe out the account','Brokers require it','It is the law in most countries'], correctAnswer: 1, explanation: 'Small risk per trade means even 10+ consecutive losses only create manageable drawdowns, preserving capital.', realLifeInsight: 'Paul Tudor Jones said the most important thing is to preserve capital. Without capital, you cannot trade.', category: 'Risk Percentage' },
      { id: 222, question: 'A risk-reward ratio of 1:2 means:', options: ['Win twice as often as you lose','Risking $1 to potentially gain $2 on the trade','The trade has 50% probability of success','Two stop-losses for every take-profit'], correctAnswer: 1, explanation: '1:2 R:R means your take-profit is twice as far as your stop-loss from entry. $50 risk for $100 potential gain.', realLifeInsight: 'At 1:2 R:R with just 40% win rate, you make money. At 1:1 with 50% win rate, you break even minus fees.', category: 'Risk-Reward' },
      { id: 223, question: 'With a 1:2 risk-reward ratio, what minimum win rate is needed for profitability?', options: ['50%','40%','35%','60%'], correctAnswer: 1, explanation: 'At 1:2 R:R: EV = (0.4 x $2) - (0.6 x $1) = $0.80 - $0.60 = +$0.20. Profitable at just 40% wins.', realLifeInsight: 'This math is why professional traders obsess over R:R — it determines the minimum win rate required for profit.', category: 'Math' },
      { id: 224, question: 'Expected value (EV) of a trading strategy is:', options: ['The guaranteed profit per trade','(Win% x Avg Win) - (Loss% x Avg Loss) over many trades','The maximum possible profit','Your broker\'s expected commission income'], correctAnswer: 1, explanation: 'EV measures long-term profitability across many trades. Positive EV = profitable system over time despite losses.', realLifeInsight: 'Casino games have negative EV for players — guaranteed profit for the house over millions of bets.', category: 'Expected Value' },
      { id: 225, question: 'A strategy wins 60% but has 1:0.5 R:R (risk $2 to gain $1). Over 100 trades:', options: ['Profitable — 60% win rate ensures success','Losing — negative EV: (0.6 x $1) - (0.4 x $2) = -$0.20 per trade','Breakeven at 60% win rate','Impossible to determine without more data'], correctAnswer: 1, explanation: 'EV = (0.6 x 1) - (0.4 x 2) = 0.60 - 0.80 = -$0.20. Negative EV = losing strategy despite high win rate.', realLifeInsight: 'Many traders with 70%+ win rates still lose money because they cut profits early and let losses run too long.', category: 'Expected Value' },
      { id: 226, question: 'A 10-trade losing streak with 1% risk per trade causes what drawdown?', options: ['10%','18%','65%','100%'], correctAnswer: 0, explanation: 'Each 1% loss compounds: after 10 losses = 0.99^10 = about 90% of original capital. Approximately 10% drawdown.', realLifeInsight: 'Professional traders accept this as routine. With 10% risk per trade, a 10-trade losing streak destroys most accounts.', category: 'Drawdown Math' },
      { id: 227, question: 'The primary purpose of risk management is:', options: ['Maximizing returns on every trade','Preserving capital to stay in the game long enough to profit','Eliminating all losses','Finding the best entries'], correctAnswer: 1, explanation: 'Risk management\'s core goal is capital preservation — you need capital to trade, so protecting it is paramount.', realLifeInsight: 'Ed Seykota: "The elements of good trading are: cutting losses, cutting losses, and cutting losses."', category: 'Philosophy' },
      { id: 228, question: 'A positive expected value strategy means:', options: ['Every trade is profitable','Over a large sample of trades, the strategy generates profit despite individual losses','The strategy has above 50% win rate','There are no losing trades'], correctAnswer: 1, explanation: 'Positive EV means the math works in your favor over many trades — individual losses are expected and planned for.', realLifeInsight: 'Blackjack card counters have only a tiny positive EV (~1%) but profit consistently over thousands of hands.', category: 'Expected Value' },
      { id: 229, question: 'Which is better: consistent small losses or rare catastrophic losses?', options: ['Rare catastrophic losses — less frequency of pain','Consistent small losses — predictable, manageable, and survivable','Both are equally bad','Catastrophic losses if win rate is high enough'], correctAnswer: 1, explanation: 'Consistent small losses are budgeted and survivable. One catastrophic loss can end a trading account permanently.', realLifeInsight: 'LTCM was one of history\'s most successful hedge funds until one catastrophic bet caused a $4.6 billion loss in 1998.', category: 'Risk Philosophy' },
      { id: 230, question: 'What determines the risk dollar amount per trade?', options: ['Gut feeling about the trade','Account size multiplied by risk percentage (e.g., 1%)','Always $100 per trade regardless','The potential profit target only'], correctAnswer: 1, explanation: 'Risk $ = Account size x Risk%. $10,000 account x 1% = $100 maximum risk per trade. Position size adjusted accordingly.', realLifeInsight: 'This formula scales risk correctly as accounts grow or shrink — risk stays proportional to current capital always.', category: 'Position Sizing' }
    ]
  },
  'r2': {
    title: 'Position Sizing',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 140,
    description: 'Master position sizing — the critical skill that determines exactly how many shares or units to trade.',
    learningObjectives: ['Calculate correct position size from risk parameters','Understand the formula: Risk / (Entry - Stop) = Shares','Avoid oversizing which kills accounts','Scale position sizing with account growth'],
    keyTakeaways: ['Position size = Risk Amount / (Entry - Stop Loss)','Correct sizing keeps risk constant regardless of stop distance','Oversizing is the #1 account-killer for new traders','Kelly Criterion maximizes geometric growth'],
    sections: [
      { title: 'The Position Sizing Formula', body: 'Correct position size ensures your risk stays fixed at your chosen percentage regardless of trade setup. Formula: Position Size = Risk Amount / (Entry Price - Stop Loss Price). Risk Amount = Account x Risk%. This controls exactly how many shares to buy.', bullets: ['Risk Amount = Account size x Risk %','Distance = Entry price - Stop loss price','Position Size = Risk Amount / Distance','Works for any asset: stocks, crypto, forex'], tip: 'Always calculate position size BEFORE entering a trade. Never size based on how the trade feels.' },
      { title: 'Position Sizing Examples', body: 'Example: $10,000 account, 1% risk = $100 risk. Entry $50, Stop $47 (distance $3). Position size = $100 / $3 = 33 shares. Maximum loss = 33 x $3 = $99. If stop was $45 (distance $5): size = $100 / $5 = 20 shares. Wider stop = smaller position.', bullets: ['Wider stop distance = fewer shares','Tighter stop distance = more shares','Risk amount stays constant at $100','The stop placement drives position size'], tip: 'This is why stop placement is critical — a randomly placed stop creates incorrect position sizes.' },
      { title: 'Scaling and Kelly Criterion', body: 'The Kelly Criterion calculates optimal position size based on edge and odds. Full Kelly is too aggressive — most traders use quarter or half Kelly. As your account grows, your risk dollar amount grows proportionally. This is the compounding effect of correct sizing.', bullets: ['Full Kelly: theoretically optimal but volatile','Half Kelly: practical balance of growth and safety','Compounding: $100 risk on $10k, $200 on $20k account','Scale up only after consistent profitability'], tip: 'Start small. Prove your strategy works with minimum position sizes before scaling up risk.' }
    ],
    questions: [
      { id: 231, question: 'Position sizing determines:', options: ['Which asset to trade','How many shares or units to buy or sell on a trade','When to enter the market','What chart pattern to use'], correctAnswer: 1, explanation: 'Position sizing calculates the exact number of units to trade so that your maximum risk equals your planned risk amount.', realLifeInsight: 'Two traders with identical strategies but different position sizing can have dramatically different results.', category: 'Basics' },
      { id: 232, question: 'The position sizing formula is:', options: ['Account size divided by entry price','Risk amount divided by (entry price - stop loss price)','Entry price minus stop price','Risk percentage times entry price'], correctAnswer: 1, explanation: 'Position Size = Risk Amount / (Entry - Stop). Ensures your maximum loss equals your planned risk regardless of stop distance.', realLifeInsight: 'This formula is used by every professional trader — it makes position sizing mechanical and removes guessing.', category: 'Formula' },
      { id: 233, question: '$20,000 account, 1% risk, entry $100, stop $95. Position size is:', options: ['100 shares','40 shares','200 shares','20 shares'], correctAnswer: 1, explanation: 'Risk = $20,000 x 1% = $200. Distance = $100 - $95 = $5. Position = $200 / $5 = 40 shares.', realLifeInsight: 'Max loss = 40 x $5 = $200. If you calculated wrong and bought 100 shares, max loss is $500 — 2.5% of account.', category: 'Calculation' },
      { id: 234, question: 'If you place a wider stop loss, the position size should:', options: ['Stay the same','Decrease — to keep dollar risk constant','Increase — to compensate for the wider stop','Double automatically'], correctAnswer: 1, explanation: 'Wider stop distance = fewer shares. This keeps your maximum dollar loss at the same risk amount.', realLifeInsight: 'A volatile stock requiring a wider stop is not a reason to risk more — just trade fewer shares.', category: 'Stop Distance' },
      { id: 235, question: 'Oversizing positions is dangerous because:', options: ['It reduces potential profits','A small adverse move hits max loss quickly, potentially wiping out accounts','It triggers automatic stop-losses','It is illegal in regulated markets'], correctAnswer: 1, explanation: 'Oversized positions turn normal volatility into catastrophic losses. One bad trade can destroy an account.', realLifeInsight: 'Nick Leeson\'s oversized positions destroyed Barings Bank (founded 1762) with a single bad trade in 1995.', category: 'Risk' },
      { id: 236, question: 'As your account grows from $10k to $20k with 1% risk, your risk per trade:', options: ['Stays at $100 regardless of growth','Doubles from $100 to $200 — scaled to account size','Halves to $50 for safety','Stays at $100 until account reaches $100k'], correctAnswer: 1, explanation: 'Risk amount = % of current account size. As account grows, risk amount grows proportionally — the compounding effect.', realLifeInsight: 'This is how professional traders build wealth: consistent 1% risk, let the account compound over time.', category: 'Scaling' },
      { id: 237, question: 'The Kelly Criterion determines:', options: ['The best trading time of day','The mathematically optimal position size based on edge and win probability','Which markets to trade','How many trades to take per day'], correctAnswer: 1, explanation: 'Kelly Criterion: f = W/L - (1-W)/W. Calculates the fraction of capital to risk based on your strategy\'s win rate and odds.', realLifeInsight: 'Ed Thorp used Kelly Criterion to beat casinos at blackjack, then applied it to markets. Works brilliantly in theory.', category: 'Kelly' },
      { id: 238, question: 'Why do most traders use half or quarter Kelly rather than full Kelly?', options: ['Full Kelly is illegal','Full Kelly creates high volatility — half Kelly balances growth with drawdown control','Kelly is only for casinos','Half Kelly is the only way to get fills'], correctAnswer: 1, explanation: 'Full Kelly is mathematically optimal but creates severe drawdowns. Half or quarter Kelly reduces volatility significantly.', realLifeInsight: 'Most hedge funds use fractional Kelly. Buffett\'s approach is actually closer to quarter Kelly in principle.', category: 'Kelly' },
      { id: 239, question: 'You buy 500 shares at $10 without calculating position size. Stock falls to stop at $9.50. Loss is:', options: ['$50 fixed','$250 (500 x $0.50)','$50 regardless of size','$25 maximum'], correctAnswer: 1, explanation: '500 shares x $0.50 loss = $250. On a $10,000 account, that is 2.5% loss — over the 1% target.', realLifeInsight: 'This is exactly how accounts blow up. Buying round numbers of shares without sizing calculations is gambling.', category: 'Calculation' },
      { id: 240, question: 'When should you start scaling up position sizes?', options: ['Immediately after opening your account','After proving consistent profitability over a statistically significant sample','After your first profitable month','Only after making $100,000 in profit'], correctAnswer: 1, explanation: 'Scale up only after demonstrating consistent profitability with small positions. Prove the edge exists before risking more.', realLifeInsight: 'Most traders start with minimum sizes. When they achieve 100+ trades of consistent profit, they begin to scale up.', category: 'Progression' }
    ]
  },
  'r3': {
    title: 'Stop Loss Strategies',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 150,
    description: 'Master stop loss placement strategies to protect capital while giving trades room to breathe.',
    learningObjectives: ['Place stop losses based on structure not arbitrary levels','Use ATR for volatility-based stops','Implement trailing stops to protect profits','Avoid common stop placement mistakes'],
    keyTakeaways: ['Stops should be at logical invalidation levels, not arbitrary distances','ATR-based stops adapt to market volatility','Never move a stop further from entry to avoid losses','Trailing stops lock in profits as winners develop'],
    sections: [
      { title: 'Structure-Based Stop Placement', body: 'The best stop-loss placement is at a logical level where the trade thesis is invalidated. For a support bounce long: stop just below support. For a breakout long: stop below the breakout level. The level is wrong when your analysis no longer holds.', bullets: ['Long stop: just below the support level traded','Short stop: just above the resistance level traded','Breakout stop: below the breakout base','Pattern stop: below the pattern structure'], tip: 'If you cannot find a logical stop placement, the trade setup is not clear enough to take.' },
      { title: 'ATR-Based Stops', body: 'Average True Range (ATR) measures average daily volatility. ATR-based stops use 1-3x ATR below/above entry. This ensures the stop is beyond normal random market noise. Low ATR stock: tighter stop. High ATR stock: wider stop — but smaller position.', bullets: ['ATR measures average price range per period','Stop at 1.5x ATR below entry for most setups','High volatility asset: wider ATR stop, smaller position','Prevents being stopped by normal price fluctuations'], tip: 'Never fight volatility with a tight stop. Let ATR tell you how much room the market needs.' },
      { title: 'Trailing Stops & Common Mistakes', body: 'Trailing stops follow price as it moves in your favor, locking in profit. Percentage trail: 5% below highest price reached. ATR trail: 2x ATR below price. The biggest mistake is moving stops further away to avoid losses — this turns small losses into account-killers.', bullets: ['Trailing stop: moves up with price, never back','Lock in breakeven: move stop to entry after +1R move','Never widen a stop to avoid taking a loss','Break-even stops remove risk from the trade'], tip: 'Moving a stop further away is the most common and costly mistake in trading. Take the small loss. Move on.' }
    ],
    questions: [
      { id: 241, question: 'The best stop-loss placement is:', options: ['Always $1 below entry price','At a logical level where the trade thesis is invalidated','As tight as possible to minimize loss','Exactly 5% below entry always'], correctAnswer: 1, explanation: 'Stops should be at levels where if reached, the original trade rationale no longer holds — logical invalidation.', realLifeInsight: 'Arbitrary stops (always $1 or 5%) get triggered by normal volatility while structure-based stops stay protected.', category: 'Placement' },
      { id: 242, question: 'For a support bounce long trade, the stop should be placed:', options: ['Just above the support level','Just below the support level with a buffer','At the recent high','At entry price immediately'], correctAnswer: 1, explanation: 'Stop below support: if support breaks, the trade thesis is wrong. Exit immediately with a small, planned loss.', realLifeInsight: 'Placing the stop below support means price has to prove your analysis wrong before you exit — not random noise.', category: 'Placement' },
      { id: 243, question: 'ATR (Average True Range) measures:', options: ['Average trading volume over a period','Average daily price volatility over a specified period','The average of highs and lows only','Relative strength versus the market'], correctAnswer: 1, explanation: 'ATR measures the average range (high-low) over a period, adjusted for gaps. It quantifies typical market volatility.', realLifeInsight: 'A stock with ATR of $5 moves an average of $5 per day. Your stop needs to account for this normal noise.', category: 'ATR' },
      { id: 244, question: 'ATR-based stop losses are useful because:', options: ['They are always very tight','They account for the asset\'s normal volatility — avoiding false triggers from noise','They are identical for all assets','Brokers require them'], correctAnswer: 1, explanation: 'ATR stops adapt to each asset\'s volatility — wider for volatile assets, tighter for stable ones.', realLifeInsight: 'Tesla with ATR of $20 needs a much wider stop than a utility stock with ATR of $0.50. One size does not fit all.', category: 'ATR' },
      { id: 245, question: 'The biggest stop-loss mistake is:', options: ['Setting it too tight on entry','Moving the stop further from entry to avoid taking a loss','Using ATR for placement','Setting stops on both longs and shorts'], correctAnswer: 1, explanation: 'Widening a stop to avoid a loss transforms small planned losses into large damaging ones. Never do this.', realLifeInsight: 'This single mistake — widening stops — causes more account blowups than any other behavior in trading.', category: 'Mistakes' },
      { id: 246, question: 'A trailing stop helps traders by:', options: ['Guaranteeing maximum profit on every trade','Moving with price to lock in profit while allowing the trend to continue','Eliminating all risk from a position','Predicting when the trend will end'], correctAnswer: 1, explanation: 'Trailing stops follow the price as it moves in your favor, locking in progressively more profit over time.', realLifeInsight: 'Trend traders who use trailing stops let big winners run for 20-30%+ gains while capping downside automatically.', category: 'Trailing Stops' },
      { id: 247, question: 'A break-even stop means:', options: ['The stop-loss is at a 50% loss level','Moving the stop to your entry price after a profitable move — eliminating risk','Breaking even on all trades','Setting stops at $0 maximum loss'], correctAnswer: 1, explanation: 'Break-even stop: move stop to entry after price moves in your favor. The trade is now risk-free — worst case is no loss.', realLifeInsight: 'Professional traders move to break-even after a 1:1 R move. This creates risk-free lottery tickets for big gains.', category: 'Break-even' },
      { id: 248, question: 'Why should stops never be placed at obvious round numbers?', options: ['Round numbers are always supports','Many traders place stops there — market makers can easily trigger them','Regulators prohibit round number stops','Round numbers are always highs or lows'], correctAnswer: 1, explanation: 'Round number stops cluster many orders — large players can run stops at obvious levels before reversing.', realLifeInsight: 'Place stops at $49.75 rather than $50 exactly to avoid the crowd of stops sitting at the round number.', category: 'Placement Tips' },
      { id: 249, question: 'In a volatile market, compared to a calm market, stop losses should be:', options: ['Tighter to minimize losses','Wider (more ATR buffer) to avoid being stopped by normal noise','The same distance always','Eliminated entirely'], correctAnswer: 1, explanation: 'Volatile markets have larger normal price swings. Stops need to accommodate this to avoid random triggering.', realLifeInsight: 'During earnings season or major news, professional traders often widen stops by 50%+ to account for increased volatility.', category: 'Volatility' },
      { id: 250, question: 'Stop-loss orders at a support level serve which primary purpose?', options: ['To guarantee profit on the trade','To limit the maximum loss if the support level fails and the thesis is wrong','To lock in maximum gains','To notify you when support holds'], correctAnswer: 1, explanation: 'Stops at support serve one purpose: exit the trade at a small, planned loss if your thesis (support holds) is proven wrong.', realLifeInsight: 'Without stops at support, a "temporary" support break can turn into a 50% loss as you wait for recovery that never comes.', category: 'Purpose' }
    ]
  },
  'r4': {
    title: 'Portfolio Risk',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 160,
    description: 'Master portfolio-level risk management — correlation, diversification, and drawdown management.',
    learningObjectives: ['Understand portfolio-level risk vs single trade risk','Manage correlated positions','Define and manage maximum drawdown','Use portfolio heat to avoid overexposure'],
    keyTakeaways: ['Portfolio heat = total % at risk across all open trades','Correlated positions compound risk unexpectedly','Max drawdown rule: pause trading at 10-15% account loss','Diversification works when positions are truly uncorrelated'],
    sections: [
      { title: 'Portfolio Heat', body: 'Portfolio heat is the total percentage of your account at risk across all open trades. With 5 trades each risking 2%, your heat is 10%. If all go against you simultaneously (correlation risk), you lose 10% at once. Limit total heat to 5-10% maximum.', bullets: ['Portfolio heat: sum of all open risk percentages','5 trades x 2% = 10% total portfolio heat','High correlation between positions amplifies heat','Limit total heat to 5-10% for safety'], tip: 'In a market crash, all correlations go to 1. Diversified portfolios can still lose 10%+ in a single day.' },
      { title: 'Correlation Risk', body: 'If you hold Apple, Microsoft, and Nvidia, they are all tech stocks highly correlated. In a tech selloff, all three fall simultaneously — your "5 positions" act like one. True diversification requires uncorrelated assets (stocks + bonds + commodities + forex).', bullets: ['Correlated positions: all move together in stress','True diversification: uncorrelated asset classes','Tech + tech + tech = one position in risk terms','Stocks + gold + bonds = better diversification'], tip: 'Check correlations during market stress — correlations spike toward 1 when markets panic.' },
      { title: 'Drawdown Management', body: 'Define a maximum drawdown rule before trading: "If I lose 10% of my account, I stop trading for a week and review." This prevents death spirals where losses trigger emotional revenge trading. The best traders have explicit drawdown rules and follow them rigorously.', bullets: ['Define max daily loss (e.g., 3%) and stop trading','Define max monthly loss (e.g., 10%) and pause','Review rules during drawdown — are they still valid?','Revenge trading during drawdown compounds losses'], tip: 'The most dangerous time in trading is right after a loss. That is when most rules get broken.' }
    ],
    questions: [
      { id: 251, question: 'Portfolio heat represents:', options: ['Daily profit target','Total percentage of account at risk across all open positions simultaneously','Number of open trades','Daily trading volume'], correctAnswer: 1, explanation: 'Portfolio heat = sum of risk % across all open trades. 5 trades x 2% each = 10% total heat.', realLifeInsight: 'In March 2020, even "diversified" portfolios with 10-15% heat lost that amount in days as all risk assets sold off.', category: 'Portfolio Heat' },
      { id: 252, question: 'Correlated positions in a portfolio:', options: ['Always reduce overall risk','Can amplify losses — correlated assets fall together in stress events','Are always in different sectors','Never affect each other'], correctAnswer: 1, explanation: 'Correlated positions behave similarly in market stress — your "diversified" portfolio may really be one concentrated bet.', realLifeInsight: 'Holding 5 different tech stocks in 2022 felt diversified but lost 50-80% across the board — all correlated.', category: 'Correlation' },
      { id: 253, question: 'True portfolio diversification requires:', options: ['Many trades in the same sector','Positions in truly uncorrelated asset classes (stocks, bonds, commodities, forex)','More than 20 different stocks','Only trading large-cap companies'], correctAnswer: 1, explanation: 'True diversification uses uncorrelated assets. When tech falls, gold might rise — genuine risk reduction.', realLifeInsight: 'Ray Dalio\'s All Weather Portfolio uses stocks, bonds, gold, and commodities — designed to work in any economic environment.', category: 'Diversification' },
      { id: 254, question: 'A maximum drawdown rule helps traders by:', options: ['Guaranteeing profits after losses','Preventing emotional revenge trading that compounds losses during bad periods','Automatically recovering losses','Eliminating all drawdowns from the equity curve'], correctAnswer: 1, explanation: 'Drawdown rules force a pause after defined losses — preventing emotional decisions that worsen the situation.', realLifeInsight: 'Many professional firms halt a trader who loses 5-10% in a month. It protects both trader and firm capital.', category: 'Drawdown' },
      { id: 255, question: 'The appropriate maximum total portfolio heat is generally:', options: ['50% of the account','5-10% across all open positions','100% if you are confident','No more than 0.5%'], correctAnswer: 1, explanation: 'Keeping total heat at 5-10% ensures even a worst-case correlated selloff produces only manageable losses.', realLifeInsight: 'Professional prop traders are often limited to 5% total heat by firm risk managers — for good reason.', category: 'Portfolio Heat' },
      { id: 256, question: 'During a market crash, asset correlations typically:', options: ['Decrease — assets move independently','Increase toward 1 — previously uncorrelated assets fall together','Stay exactly the same as normal','Only affect bonds and stocks'], correctAnswer: 1, explanation: 'Panic selling drives all risk assets lower simultaneously. Correlations that were 0.3 normal can become 0.9 in crashes.', realLifeInsight: '2008 financial crisis: stocks, real estate, commodities, and credit all collapsed together — correlation went to 1.', category: 'Correlation' },
      { id: 257, question: 'Revenge trading after a loss means:', options: ['Systematically analyzing what went wrong','Taking impulsive, oversized trades trying to quickly recover losses — usually making things worse','Carefully reviewing and reducing position size','Taking the rest of the day off to recover'], correctAnswer: 1, explanation: 'Revenge trading is emotionally driven — increasing risk after losses to recover quickly, typically causing more losses.', realLifeInsight: 'Studies show 70%+ of trading losses occur on "revenge" trades taken to recover previous losses.', category: 'Psychology' },
      { id: 258, question: 'What is a daily loss limit in trading?', options: ['The maximum profit allowed in a day','A pre-defined maximum loss after which you stop trading for the day','The broker\'s fee cap per day','The maximum number of losing trades allowed'], correctAnswer: 1, explanation: 'Daily loss limit: if you lose X% in a day, you stop trading. Prevents one bad day from turning into a catastrophe.', realLifeInsight: 'Professional prop firms enforce daily loss limits of 2-3%. Breaching them results in automatic trading suspension.', category: 'Rules' },
      { id: 259, question: 'If you hold both a stock ETF long and a bond ETF long, this is generally:', options: ['Highly correlated — same as holding two stock positions','Less correlated — stocks and bonds often move inversely','Identical risk to holding two stock positions','Only appropriate for long-term investors'], correctAnswer: 1, explanation: 'Stocks and bonds are often inversely correlated — when stocks sell off, bonds (as safe havens) may rise.', realLifeInsight: 'The traditional 60/40 portfolio (60% stocks, 40% bonds) exploits this inverse correlation for risk reduction.', category: 'Correlation' },
      { id: 260, question: 'Why is drawdown percentage harder to recover from as it increases?', options: ['Brokers charge more after drawdowns','25% loss requires 33% gain to recover; 50% loss requires 100% gain','It is equally hard to recover regardless of size','All drawdowns take exactly the same amount of time to recover'], correctAnswer: 1, explanation: 'Asymmetric math: lose 25%, need 33% to recover. Lose 50%, need 100% to recover. Larger drawdowns need proportionally larger recoveries.', realLifeInsight: 'This math is why professionals obsess over drawdown control. A 50% loss requires doubling your money just to break even.', category: 'Drawdown Math' }
    ]
  }


,
  'a1': {
    title: 'Swing Trading',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 180,
    description: 'Master swing trading — holding positions for days to weeks to capture significant price moves.',
    learningObjectives: ['Define swing trading vs day trading','Identify swing trading setups using patterns and indicators','Manage multi-day positions effectively','Handle overnight and weekend risk'],
    keyTakeaways: ['Swing trades last 2-10 days capturing trend legs','Use daily and 4-hour charts for setups','Overnight holds require wider stops for gap risk','Best setups combine pattern, level, and indicator confluence'],
    sections: [
      { title: 'Swing Trading Fundamentals', body: 'Swing trading captures "swings" within a trend — each leg up or down. Positions held 2-10 days. Unlike day trading (close same day) or investing (hold months), swing trading targets 3-15% moves in individual stocks. Uses daily charts primarily.', bullets: ['Holding period: 2-10 trading days','Target: capturing one complete trend leg (swing)','Primary chart: daily timeframe for setup','Entry refinement: 4-hour chart for timing'], tip: 'Swing trading fits working professionals who cannot monitor screens all day but want active trading returns.' },
      { title: 'Swing Trading Setups', body: 'Best swing setups: bull flag breakouts after strong moves, bounce from key support levels in an uptrend, breakout from consolidation with volume, and momentum continuation after earnings. All confirmed with volume and indicator confluence.', bullets: ['Bull flag breakout: enter on break of flag high','Support bounce: enter on reversal candle at level','Base breakout: enter on high-volume close above resistance','Earnings momentum: enter continuation post-earnings gap'], tip: 'The best swing setups have multiple confirming factors. One signal is rarely enough — stack the odds.' },
      { title: 'Managing Swing Trades', body: 'Entry: limit orders on pullbacks or market on confirmed breakout. Stop: below the setup structure. Target: next resistance level or 2-3x risk. Overnight risk: stocks can gap — use appropriate stop size. Review positions daily at open and close.', bullets: ['Set stop and target before entering','Hold through normal pullbacks if stop not hit','Move stop to break-even after 1:1 move','Trail stop as trade develops into big winner'], tip: 'The money in swing trading is made by letting winners develop. Most traders cut 5% winners too early.' }
    ],
    questions: [
      { id: 261, question: 'Swing trading is best described as:', options: ['Trading within a single day only','Holding positions for days to weeks to capture trend swings','Buy and hold for years','Only trading during market open'], correctAnswer: 1, explanation: 'Swing trading captures directional moves (swings) over multiple days, targeting 3-15% moves on daily charts.', realLifeInsight: 'Mark Minervini, multiple US Investing Champion, primarily uses swing trading — holding days to weeks for big moves.', category: 'Definition' },
      { id: 262, question: 'The primary chart timeframe for swing trading setups is:', options: ['1-minute chart','Daily chart for setup, 4-hour for entry timing','Weekly chart exclusively','Monthly chart'], correctAnswer: 1, explanation: 'Daily charts show the swing trading setup. 4-hour charts refine the entry timing for better risk-reward.', realLifeInsight: 'Daily chart analysis takes 15-30 minutes per evening. Swing traders can work full-time and still trade effectively.', category: 'Timeframes' },
      { id: 263, question: 'A bull flag breakout swing trade entry is:', options: ['Buying at the very beginning of the strong upward move','Entering on the break above the flag\'s resistance after consolidation','Shorting the top of the flagpole','Buying during the consolidation before the breakout'], correctAnswer: 1, explanation: 'Bull flag breakout: wait for the flag to form (consolidation), then buy the break above the flag\'s high with volume.', realLifeInsight: 'The best bull flag entries happen 2-4 days after the initial surge, on a clear, high-volume breakout from tight consolidation.', category: 'Setups' },
      { id: 264, question: 'Overnight risk in swing trading refers to:', options: ['Risk of forgetting to check positions','Stocks can gap significantly at open due to after-hours news — gaps can bypass stops','Being too tired to trade well','Risk of overnight commission charges'], correctAnswer: 1, explanation: 'Overnight gap risk: earnings, news, or macro events can cause stocks to open far from previous close, past your stop.', realLifeInsight: 'A stock at $50 with a $48 stop can open at $44 on bad earnings. Stop only saves you from intraday moves, not gaps.', category: 'Risk' },
      { id: 265, question: 'When should you move a swing trade stop to break-even?', options: ['Immediately after entry','After the trade moves approximately 1:1 in your favor (profit equals initial risk)','Never — keep original stop always','Only if the trade is losing'], correctAnswer: 1, explanation: 'Moving to break-even after a 1:1 move creates a risk-free trade. Worst case: flat. Best case: big winner.', realLifeInsight: 'The risk-free trade concept is powerful — you have nothing to lose by holding longer once at break-even.', category: 'Trade Management' },
      { id: 266, question: 'The best swing trade setups have:', options: ['One single confirming signal','Multiple confirming factors: pattern, level, volume, and indicator alignment','Only price action, no indicators','Only indicator signals, no chart patterns'], correctAnswer: 1, explanation: 'Confluence of multiple confirming signals dramatically increases the probability of a successful swing trade.', realLifeInsight: 'A breakout above resistance on high volume with RSI showing momentum and the 50MA as support is a high-conviction setup.', category: 'Setups' },
      { id: 267, question: 'When should you exit a swing trade early (before target)?', options: ['Never — always hold to target','If the stock shows a clear reversal signal or the original thesis is invalidated', 'When you are up 1%','Only when the next earnings report approaches'], correctAnswer: 1, explanation: 'Exit early if reversal signals appear or the original reason for the trade is no longer valid — despite not hitting target.', realLifeInsight: 'The ability to exit early when wrong preserves capital. Stubborn holding to targets in failing trades kills accounts.', category: 'Exit Rules' },
      { id: 268, question: 'Swing trading after earnings can be effective because:', options: ['Earnings reports always cause 10%+ moves','Post-earnings momentum often continues in the direction of the gap for multiple days','All earnings gaps fill immediately','Earnings always reduce volatility'], correctAnswer: 1, explanation: 'Stocks that gap up on strong earnings often continue higher over the next 1-5 days as institutions add positions.', realLifeInsight: 'IBD studies show stocks breaking out on earnings with strong fundamentals often deliver the best swing returns.', category: 'Catalysts' },
      { id: 269, question: 'A swing trade target is typically set at:', options: ['The entry price plus $1','The next significant resistance level or 2-3x the risk amount','Always exactly 10% above entry','The all-time high regardless of distance'], correctAnswer: 1, explanation: 'Targets at next resistance with minimum 2:1 R:R ensures that even a 40% win rate produces profitable trading.', realLifeInsight: 'Setting targets at logical resistance levels keeps trading mechanical and removes emotional premature profit-taking.', category: 'Targets' },
      { id: 270, question: 'The key advantage of swing trading over day trading is:', options: ['Lower required capital always','Less screen time required — setups analyzed once daily, positions held multiple days','Higher win rates guaranteed','No overnight risk involved'], correctAnswer: 1, explanation: 'Swing traders analyze charts once per evening and let positions run. Day trading requires full-day screen monitoring.', realLifeInsight: 'Many of the top retail traders are swing traders — big accounts, part-time effort, strong returns over time.', category: 'Advantages' }
    ]
  },
  'a2': {
    title: 'Breakout Trading',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 200,
    description: 'Master breakout trading — catching explosive moves as price escapes consolidation or exceeds key levels.',
    learningObjectives: ['Identify high-quality breakout setups','Distinguish real breakouts from false ones','Calculate breakout targets and stops','Manage breakout trades through retests'],
    keyTakeaways: ['Volume is the single most important breakout confirmation','False breakouts trap traders — volume separates real from fake','Enter on close above level, stop below base','Retests of broken resistance are second entry opportunities'],
    sections: [
      { title: 'What Makes a Valid Breakout', body: 'A breakout is when price closes above resistance or below support decisively. Required elements: clear base or consolidation, high-volume close through the level, stock holding above the level on subsequent bars. Volume is the lie detector of breakouts.', bullets: ['Price closes clearly above resistance level','Volume is significantly above average (40%+ higher)','Price holds above the level on subsequent candles','The base before the breakout is clean and tight'], tip: 'A tight, low-volume base before a high-volume breakout is the most explosive setup in trading.' },
      { title: 'False Breakouts & How to Avoid Them', body: 'False breakouts (bull traps) occur when price briefly moves above resistance then immediately reverses. Red flags: low volume on breakout, wide-ranging sloppy base, overall market weakness, breakout late in a long trend. The reversal traps late buyers.', bullets: ['Low volume breakout: high failure rate','Extended uptrend before breakout: late stage, avoid','Sloppy wide base: weak — lacks institutional support','Overall weak market: individual breakouts fail more'], tip: 'When in doubt about volume confirmation, stand aside. There will always be another setup.' },
      { title: 'Trading Breakouts Effectively', body: 'Entry: on the breakout candle close or first pullback to former resistance (now support). Stop: below the breakout base. Target: measured move = base height added to breakout point. Manage with trailing stop after 1:1 achieved.', bullets: ['Breakout entry: close above level on high volume','Retest entry: buy pullback to former resistance','Stop: below the consolidation base','Target: base height added to breakout level'], tip: 'The retest entry is often better than the initial breakout entry — more confirmation, better price.' }
    ],
    questions: [
      { id: 271, question: 'The most important confirmation for a valid breakout is:', options: ['Analyst upgrade on the stock','High-volume close above the resistance level','Stock trending on social media','Price briefly touching the level'], correctAnswer: 1, explanation: 'High volume confirms institutional participation in the breakout — without it, the move likely fails.', realLifeInsight: 'IBD\'s CANSLIM system requires 40-50%+ above-average volume. This single filter eliminates most false breakouts.', category: 'Confirmation' },
      { id: 272, question: 'A false breakout (bull trap) most commonly occurs with:', options: ['High volume above average','Low volume on the initial price push above resistance','Strong market conditions','A tight, flat base pattern'], correctAnswer: 1, explanation: 'Low volume breakouts lack institutional conviction — the breakout fails and reverses, trapping buyers.', realLifeInsight: 'Professional traders specifically look for low-volume breakouts to short against — they know the failure rate is high.', category: 'False Breakouts' },
      { id: 273, question: 'The ideal base before a breakout should be:', options: ['Wide and erratic with high volatility','Tight, orderly consolidation on declining volume','Declining for at least 6 months prior','Formed near all-time lows'], correctAnswer: 1, explanation: 'A tight, orderly base on low volume shows supply absorbed. When price breaks out, there is little overhead resistance.', realLifeInsight: 'The tightest bases (less than 10% range over weeks) on lowest volume produce the most powerful breakouts in history.', category: 'Base Quality' },
      { id: 274, question: 'Where should you place the stop-loss on a breakout trade?', options: ['At the breakout point exactly','Below the consolidation base from which the breakout occurred','At 5% below entry always','Above the breakout point'], correctAnswer: 1, explanation: 'Stop below the base: if price returns into the base, the breakout has failed and the trade thesis is wrong.', realLifeInsight: 'Professional breakout traders accept small losses quickly when stops are hit — the base structure defines the invalidation level.', category: 'Stop Placement' },
      { id: 275, question: 'A retest of the breakout level (former resistance now support) offers:', options: ['A signal to exit the trade immediately','A second entry opportunity with better price and more confirmation','Proof that the breakout has failed','No tradeable information'], correctAnswer: 1, explanation: 'Retest of former resistance as support confirms role reversal and gives late entrants a second chance with defined risk.', realLifeInsight: 'Many professional traders prefer retest entries — they wait for the breakout, miss the first 5%, then enter on the retest.', category: 'Entry Tactics' },
      { id: 276, question: 'The measured move target for a breakout is calculated as:', options: ['The previous all-time high','The height of the base added to the breakout point','Double the breakout candle range','The nearest round number above the breakout'], correctAnswer: 1, explanation: 'Measured move = height of base pattern + breakout level. Projects the expected minimum move post-breakout.', realLifeInsight: 'Stocks often deliver exactly their measured move after a valid breakout. It is a simple but remarkably reliable technique.', category: 'Targets' },
      { id: 277, question: 'Breakouts late in a long uptrend are generally:', options: ['The best setups — momentum is strongest','Higher risk — the trend may be in late stage with large distribution','Safer — trend is confirmed','Only valid if volume is extremely high'], correctAnswer: 1, explanation: 'Late-stage breakouts often fail as smart money distributes to late retail buyers chasing the move.', realLifeInsight: 'Stage 4 breakout failures (late in trend) are common. MSFT\'s 2000 breakout before the dot-com crash is a perfect example.', category: 'Stage Analysis' },
      { id: 278, question: 'Volume on the day after a breakout should ideally:', options: ['Spike even higher than breakout day','Decrease somewhat but price holds above the breakout level','Collapse to below average immediately','Match breakout day volume exactly'], correctAnswer: 1, explanation: 'Confirming day: some volume decrease is normal as the initial surge settles, but price should hold above the level.', realLifeInsight: 'Stocks that hold above breakout levels on declining but still-healthy volume for 2-3 days often deliver the biggest moves.', category: 'Follow-Through' },
      { id: 279, question: 'Sector breakouts (multiple stocks in same sector breaking out) signal:', options: ['Sector is overvalued and about to crash','Strong institutional money rotating into that sector — more reliable individual breakouts','Random coincidence with no meaning','Only that one stock is moving'], correctAnswer: 1, explanation: 'When multiple stocks in a sector break out simultaneously, it confirms institutional sector rotation — very bullish.', realLifeInsight: 'Tech sector breakouts in early 2023 preceded a massive rally. When the leaders broke out together, the move was real.', category: 'Sector Analysis' },
      { id: 280, question: 'After entering a breakout and getting a 2:1 move, you should:', options: ['Exit immediately and take the profit','Consider moving stop to break-even and trailing to let winner run further','Add more to the position aggressively','Do nothing — ignore the position'], correctAnswer: 1, explanation: 'At 2:1, the trade is working. Protect gains by moving stop to break-even and use a trailing stop to catch a bigger move.', realLifeInsight: 'The biggest gains come from breakouts that develop into multi-week or multi-month trends. Trailing stops enable this.', category: 'Management' }
    ]
  },
  'a3': {
    title: 'Mean Reversion',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 170,
    description: 'Master mean reversion trading — profiting from extreme price moves that snap back to average.',
    learningObjectives: ['Understand mean reversion as a statistical concept','Identify overbought/oversold extremes worth trading','Use Bollinger Bands for mean reversion signals','Distinguish tradeable mean reversion from genuine trend changes'],
    keyTakeaways: ['Prices historically revert to their average after extremes','Bollinger Bands measure distance from moving average','RSI below 20 and above 80 = extreme readings to consider','Mean reversion works best in ranging markets, not trends'],
    sections: [
      { title: 'Mean Reversion Concept', body: 'Mean reversion: extreme price moves tend to reverse back toward the average. Based on statistical theory — most price behavior is within normal distribution. Extreme deviations from average are statistically rare and tend to correct. Works best in ranging markets.', bullets: ['Prices oscillate around their moving average','Extreme deviations above/below average tend to revert','Normal distribution: 95% of time within 2 standard deviations','More reliable in sideways ranges than strong trends'], tip: 'Mean reversion and trend following are opposite strategies. Know which market regime you are in before choosing.' },
      { title: 'Bollinger Bands for Mean Reversion', body: 'Bollinger Bands have three lines: middle (20-day SMA), upper band (2 standard deviations above), lower band (2 standard deviations below). Price touching the upper band: extended. Touching the lower band: compressed. Band squeeze precedes big moves.', bullets: ['Upper band touch: potentially overbought in range','Lower band touch: potentially oversold in range','Band width shows volatility — squeeze precedes breakout','In strong trends, price can ride the upper band for weeks'], tip: 'In a strong trend, touching the upper Bollinger Band is a sign of strength, not overbought. Context is everything.' },
      { title: 'Trading Mean Reversion', body: 'Best setups: RSI below 20 in ranging market at support. Price touching lower Bollinger Band with a reversal candle. Use strict stop-loss below recent low. Target: mean (moving average) or upper band. Pair with overall market trend filter.', bullets: ['Enter on reversal candle at extreme level','Target: return to the mean (moving average)','Stop: just below the recent extreme low/high','Combine with at least one other confirming factor'], tip: 'Mean reversion traders accept many small losses for occasional big reversions. Win rate is often lower than breakout trading.' }
    ],
    questions: [
      { id: 281, question: 'Mean reversion trading is based on the idea that:', options: ['Prices always continue in the current direction','Extreme price moves tend to reverse back toward the historical average','Trends never end','Fundamentals always drive short-term prices'], correctAnswer: 1, explanation: 'Mean reversion: statistically, prices that deviate far from their average tend to return toward it over time.', realLifeInsight: 'Studies show stocks that are in the bottom decile of performance often outperform the following year — classic mean reversion.', category: 'Concept' },
      { id: 282, question: 'Bollinger Bands are calculated using:', options: ['Fibonacci levels and volume','A moving average plus/minus a number of standard deviations','RSI and MACD combined','The average of daily highs and lows only'], correctAnswer: 1, explanation: 'Bollinger Bands = 20-day SMA ± 2 standard deviations. They represent the statistical range of normal price movement.', realLifeInsight: 'John Bollinger created these bands in the 1980s. They are one of the few indicators that adapt to market volatility automatically.', category: 'Bollinger Bands' },
      { id: 283, question: 'A Bollinger Band squeeze (bands narrowing) signals:', options: ['Trend ending and market reversal','Decreasing volatility — often preceding a significant directional breakout','Fundamental changes in the company','No useful trading information'], correctAnswer: 1, explanation: 'Band squeeze shows low volatility consolidation. The coiled spring precedes an explosive breakout — direction TBD.', realLifeInsight: 'Bitcoin\'s massive 2020 bull run was preceded by one of the tightest Bollinger Band squeezes in crypto history.', category: 'Bollinger Bands' },
      { id: 284, question: 'Mean reversion works BEST in which market condition?', options: ['Strong trending markets with high momentum','Ranging sideways markets with defined support and resistance','After major economic announcements','Only in bear markets'], correctAnswer: 1, explanation: 'Mean reversion excels in sideways ranges where prices oscillate predictably between support and resistance.', realLifeInsight: 'In trending markets, mean reversion traders get crushed. Identifying market regime is crucial before choosing strategy.', category: 'Market Conditions' },
      { id: 285, question: 'RSI below 20 in a ranging market suggests:', options: ['Strong sell signal — trend continuing lower','Extreme oversold conditions — potential mean reversion bounce candidate','Normal price action with no signal','Time to short more aggressively'], correctAnswer: 1, explanation: 'RSI below 20 indicates extreme selling momentum — in a range, this often precedes a reversal toward the mean.', realLifeInsight: 'RSI below 20 readings are relatively rare. When combined with price at support in a range, hit rate is very high.', category: 'RSI Extreme' },
      { id: 286, question: 'The target for a mean reversion trade is typically:', options: ['The all-time high','Return to the moving average (the mean)','50% of the recent move','Random based on market conditions'], correctAnswer: 1, explanation: 'Mean reversion target = the moving average. The trade profits as price moves from the extreme back to the average.', realLifeInsight: 'A stock hitting its lower Bollinger Band might be 8-12% below the 20-day SMA — that is the mean reversion profit target.', category: 'Targets' },
      { id: 287, question: 'In a strong uptrend, price touching the upper Bollinger Band typically means:', options: ['Sell immediately — overbought','The trend is strong — price can ride the upper band for extended periods','The trend is definitely ending','A guaranteed reversal within 24 hours'], correctAnswer: 1, explanation: 'In strong trends, price can ride the upper Bollinger Band for weeks — it is a sign of strength, not automatic reversal.', realLifeInsight: 'Amazon in 2017 rode its upper Bollinger Band for months during a relentless uptrend. Shorts were destroyed.', category: 'Trend Context' },
      { id: 288, question: 'The stop-loss for a mean reversion long trade should be placed:', options: ['At the moving average','Just below the recent extreme low that triggered the trade','At 10% below entry always','At previous month\'s low'], correctAnswer: 1, explanation: 'Stop below the extreme low: if price makes another new low after your entry, the mean reversion thesis is wrong.', realLifeInsight: 'Mean reversion stops are typically tight — the recent extreme low is a natural and well-defined invalidation level.', category: 'Stops' },
      { id: 289, question: 'Mean reversion and trend following are:', options: ['The same strategy with different names','Opposite strategies that work in different market regimes','Equally effective in all markets','Only different in terms of holding period'], correctAnswer: 1, explanation: 'Mean reversion: fades extremes back to average. Trend following: buys strength expecting continuation. Opposite logic.', realLifeInsight: 'Smart traders keep both strategies ready and apply the right one based on current market conditions.', category: 'Strategy Comparison' },
      { id: 290, question: 'A key risk in mean reversion trading is:', options: ['Entering too late after confirmation','Trading a trending market as if it is ranging — fighting the trend with failed reversions','Having too high a win rate','Using Bollinger Bands at all'], correctAnswer: 1, explanation: 'Mean reversion fails in trends. Buying oversold in a strong downtrend produces large losses as price keeps falling.', realLifeInsight: 'Catching falling knives — buying crashed stocks expecting reversion — is how many traders lose big. Add a trend filter.', category: 'Risks' }
    ]
  },
  'a4': {
    title: 'Advanced Psychology',
    level: 'Advanced',
    totalQuestions: 10,
    passingScore: 87,
    pointsAwarded: 250,
    description: 'Master the mental game of trading — the psychological edge that separates consistent winners from the rest.',
    learningObjectives: ['Overcome fear, greed, and FOMO in live trading','Build a trading process that removes emotional decisions','Recover from losses without revenge trading','Develop the mindset of a professional trader'],
    keyTakeaways: ['Fear causes premature exits; greed causes holding too long','FOMO leads to late, low-quality trade entries','Process over outcome — focus on execution, not results','Journal every trade — self-knowledge is the ultimate edge'],
    sections: [
      { title: 'The Emotional Enemies', body: 'Fear causes premature exits of winners and paralysis during valid setups. Greed causes holding losers hoping they recover and overleveraging on hot streaks. FOMO (fear of missing out) pushes traders into late, high-risk entries. These three emotions cause most trading losses.', bullets: ['Fear: exit winners too early, miss valid setups','Greed: hold losers too long, oversize positions','FOMO: chase parabolic moves, enter low-quality setups','Overconfidence: increase risk after a winning streak'], tip: 'The market does not know or care about your emotions. Your P&L is a direct measure of your emotional control.' },
      { title: 'Building a Process-Driven Approach', body: 'Professional traders follow a written trading plan that defines every decision in advance: what to trade, when, how much to risk, where to stop, and when to exit. Following the process consistently removes emotion from individual trade decisions.', bullets: ['Written trading plan: defines all decisions in advance','Pre-trade checklist: confirm all rules are met before entry','Post-trade review: journal every trade without judgment','Weekly review: assess process adherence, not just P&L'], tip: 'If a trade is not in your plan, do not take it. Every exception teaches your brain that exceptions are acceptable.' },
      { title: 'Loss Recovery & Professional Mindset', body: 'Professional traders expect losses as normal business costs. They analyze each loss for lessons, not regret. After a losing streak, they reduce size and focus on process, not recovering money quickly. Perspective: even the best systems lose 40-60% of trades.', bullets: ['Losses are normal and expected in any strategy','Analyze each loss: what can I learn? not what did I do wrong?','Reduce size during drawdowns — protect remaining capital','Read great traders\' books: Reminiscences, Market Wizards'], tip: 'The traders who last 10+ years are not the most talented — they are the most resilient and self-aware.' }
    ],
    questions: [
      { id: 291, question: 'FOMO in trading causes traders to:', options: ['Exit positions too early in trending moves','Chase parabolic moves and enter late with poor risk-reward','Avoid taking valid setups entirely','Reduce position sizes excessively'], correctAnswer: 1, explanation: 'FOMO drives late entries into already extended moves — buying at highs with tight stops that get immediately triggered.', realLifeInsight: 'Bitcoin retail buyers in late 2017 experienced pure FOMO — buying at $15,000-$19,000 right before the 80% crash.', category: 'FOMO' },
      { id: 292, question: 'Fear in trading most commonly causes:', options: ['Oversized positions on high-conviction trades','Premature exits from winning trades before targets are reached','Perfect trade execution','Not enough trades being taken'], correctAnswer: 1, explanation: 'Fear causes traders to exit winners early to "lock in" profits before they disappear — systematically underperforming the strategy.', realLifeInsight: 'Studies show retail traders cut winners at half the size they let losers run. Fear and hope cause this destructive asymmetry.', category: 'Fear' },
      { id: 293, question: 'Greed in trading most commonly causes:', options: ['Exiting positions too early','Holding losing trades hoping they recover and overleveraging on wins','Strict adherence to risk management','Conservative trade sizing'], correctAnswer: 1, explanation: 'Greed: holding losers past stops hoping for recovery, and sizing up after wins thinking you are on a roll.', realLifeInsight: 'The two worst common trader behaviors: letting losers run and cutting winners short — both driven by greed and fear.', category: 'Greed' },
      { id: 294, question: 'A trading journal is important because:', options: ['Brokers require it for tax purposes','It creates self-awareness — revealing patterns in both successful and unsuccessful decisions','It guarantees better performance automatically','It helps you copy other traders\' setups'], correctAnswer: 1, explanation: 'Journaling reveals your personal patterns: what setups work for you, what emotional triggers hurt you, your real statistics.', realLifeInsight: 'All Market Wizards interviewed by Jack Schwager kept detailed journals. Self-knowledge is an irreplaceable trading edge.', category: 'Journaling' },
      { id: 295, question: 'Revenge trading is triggered by:', options: ['A string of winning trades','The desire to quickly recover a loss by taking more risk immediately','Following your trading plan precisely','Taking a break after a loss'], correctAnswer: 1, explanation: 'Revenge trading: after a loss, taking an immediate impulsive trade to quickly recover — usually increasing risk. Rarely ends well.', realLifeInsight: 'Studies show 70%+ of the largest individual trading losses occur on revenge trades following a previous loss.', category: 'Revenge Trading' },
      { id: 296, question: 'Process over outcome means:', options: ['Only care about P&L results','Focus on consistently executing your plan correctly — good outcomes follow good processes over time','Ignore trading results completely','Care more about the trade setup than position sizing'], correctAnswer: 1, explanation: 'Good processes executed consistently produce good outcomes over large sample sizes. Individual outcomes are random.', realLifeInsight: 'A doctor cannot control individual patient outcomes. They control their process. Same truth applies to trading.', category: 'Process' },
      { id: 297, question: 'After a 5-trade losing streak, the professional response is:', options: ['Double position size to recover faster','Reduce size, review trades for process errors, continue executing the plan','Stop trading permanently','Switch to a completely different strategy immediately'], correctAnswer: 1, explanation: 'Reduce size to protect capital, review objectively for any errors in process, and continue executing the tested strategy.', realLifeInsight: 'All professional traders have losing streaks. The response to them defines who stays and who leaves the market.', category: 'Drawdowns' },
      { id: 298, question: 'Overconfidence after a winning streak causes traders to:', options: ['Follow their risk rules more carefully than usual','Take larger positions or lower-quality setups — increasing risk at exactly the wrong time','Reduce trading frequency for safety','Become better traders permanently'], correctAnswer: 1, explanation: 'After wins, overconfidence leads to rule-breaking: bigger size, worse setups. Markets often punish this with sharp reversals.', realLifeInsight: 'Many professional trading careers ended with one catastrophically overleveraged trade after a run of successes.', category: 'Overconfidence' },
      { id: 299, question: 'The best traders consistently describe their edge as:', options: ['Perfect prediction of market direction','Consistent execution of a well-defined process with strict risk management','High win rates above 80%','Using the most complex indicators available'], correctAnswer: 1, explanation: 'Edge comes from consistent execution with defined risk — not prediction accuracy. Most great traders win only 50-60% of trades.', realLifeInsight: 'Paul Tudor Jones said the most important rule of trading is to play great defense, not great offense.', category: 'Edge' },
      { id: 300, question: 'The primary difference between professional and amateur traders psychologically is:', options: ['Professionals never have losing days','Professionals separate their identity from trade outcomes and execute without emotional attachment','Professionals have access to better data','Professionals trade only certain assets'], correctAnswer: 1, explanation: 'Professionals view trading as running a business — losses are expenses, not failures. Identity is separate from outcomes.', realLifeInsight: 'Mark Douglas\' Trading in the Zone: the greatest trading psychology book ever written. Required reading for serious traders.', category: 'Mindset' }
    ]
  },
  'x1': {
    title: 'Final Mastery Exam',
    level: 'Master',
    totalQuestions: 20,
    passingScore: 87,
    pointsAwarded: 500,
    description: 'The ultimate test of your trading knowledge — covering all modules. Score 87%+ to earn Master Trader status.',
    learningObjectives: ['Demonstrate mastery across all trading modules','Integrate knowledge from fundamentals through advanced psychology','Apply concepts to real scenario questions','Prove readiness for live trading'],
    keyTakeaways: ['Master traders integrate all knowledge seamlessly','Risk management is the foundation of everything else','Psychology separates consistent winners from the rest','There is always more to learn — the market is the greatest teacher'],
    sections: [
      { title: 'Final Exam Overview', body: 'This exam covers all modules: fundamentals, market mechanics, technical analysis, indicators, risk management, trading strategies, and psychology. 20 questions, 87% required to pass. Questions are drawn from across your entire TradeTutor journey.', bullets: ['20 questions covering all modules','87% minimum to pass (18 correct needed)','Questions test application, not just memorization','This certification means you are ready to trade with real knowledge'], tip: 'Take your time. Read each question carefully. Apply what you\'ve learned, not just what you remember.' },
      { title: 'The Trading Principles You Have Mastered', body: 'You have learned: how markets work, how to read charts and candlesticks, how to use technical indicators, how to manage risk precisely, multiple trading strategies, and how to control emotions. These are the foundations of every successful trader.', bullets: ['Markets: price discovery, exchanges, bid-ask','Technical: candles, patterns, support, resistance, trends','Indicators: MA, RSI, MACD, Volume','Risk: position sizing, stop loss, portfolio management','Strategies: swing trading, breakouts, mean reversion','Psychology: fear, greed, FOMO, process over outcome'], tip: 'You know more about trading than 95% of people who try it. Now apply it with discipline and patience.' },
      { title: 'What Comes Next', body: 'You are now ready to trade in the simulator with real strategy and discipline. Apply your knowledge. Keep a trading journal. Review your trades. Refine your approach. The best traders never stop learning — markets evolve and so must you.', bullets: ['Start with small position sizes in the simulator','Track every trade in your journal','Review and analyze — what works for you personally?','Study the markets every day — price charts tell stories'], tip: 'The journey from knowledge to profitability takes time and screen hours. You have the foundation — now build the experience.' }
    ],
    questions: [
      { id: 301, question: 'Which combination creates the highest-probability trade setup?', options: ['RSI overbought alone','Price at support, bullish reversal candle, RSI oversold, above 200MA, high volume','Earnings announcement only','Moving average crossover alone'], correctAnswer: 1, explanation: 'Multiple confluent signals dramatically increase probability. The more factors align, the more reliable the setup.', realLifeInsight: 'Professional traders look for setups where 5+ factors align. When everything agrees, the trade nearly executes itself.', category: 'Confluence' },
      { id: 302, question: 'With a $5,000 account, 1% risk, entry $200, stop $192. Correct position size is:', options: ['25 shares','~6 shares (50 / 8 = 6.25)','50 shares','10 shares'], correctAnswer: 1, explanation: 'Risk = $5,000 x 1% = $50. Distance = $200 - $192 = $8. Position = $50 / $8 = 6.25, round to 6 shares.', realLifeInsight: 'Always round down when sizing — never increase position to reach a round number.', category: 'Position Sizing' },
      { id: 303, question: 'A bearish divergence between price (new high) and RSI (lower high) signals:', options: ['Buy more — the trend is strong','Fading momentum — potential reversal coming despite price at new high','RSI is broken as an indicator','A guaranteed immediate drop'], correctAnswer: 1, explanation: 'Bearish RSI divergence shows momentum fading while price extends — often precedes a reversal.', realLifeInsight: 'This exact pattern appeared on S&P 500 charts before both the 2000 and 2007 market tops. Powerful warning signal.', category: 'Indicators' },
      { id: 304, question: 'You are long with a 2:1 trade, stop at $45 entry, target $55, stop at $40. Price reaches $50 (1:1). You should:', options: ['Exit immediately and take the profit','Move stop to break-even ($45) and let it ride toward $55','Add another position immediately','Do nothing — only exit at $55 or $40'], correctAnswer: 1, explanation: 'At 1:1, move stop to break-even. Now worst case = no loss. Best case = full target or more.', realLifeInsight: 'The risk-free trade at break-even allows holding without anxiety. This psychological benefit leads to better decisions.', category: 'Trade Management' },
      { id: 305, question: 'A Head and Shoulders pattern forms at a high. The best entry is:', options: ['At the peak of the head','After the neckline breaks downward with volume on the confirmed break','During formation of the right shoulder','At the left shoulder only'], correctAnswer: 1, explanation: 'Wait for confirmed neckline break with volume. Entering earlier risks being stopped on the right shoulder.', realLifeInsight: 'Patience at the neckline is what separates profitable pattern traders from those who get trapped in premature entries.', category: 'Chart Patterns' },
      { id: 306, question: 'The 200-day moving average is significant because:', options: ['It is an arbitrary calculation with no special meaning','Institutional investors widely use it as the bull/bear market dividing line','It predicts earnings surprises','Only works on US large-cap stocks'], correctAnswer: 1, explanation: 'The 200MA is watched by virtually every institutional trader globally — price interaction with it triggers massive order flow.', realLifeInsight: 'When the S&P 500 crosses its 200MA, it often triggers algorithmic trading responses from hundreds of large funds simultaneously.', category: 'Moving Averages' },
      { id: 307, question: 'Portfolio heat of 20% means:', options: ['You have 20 open positions','20% of your account is at risk simultaneously across all open positions','You earned 20% return today','Only 20% of trades are currently profitable'], correctAnswer: 1, explanation: 'Portfolio heat = total risk percentage across all positions. At 20%, a correlated selloff could cost 20% of your account.', realLifeInsight: 'Professional risk managers limit traders to 5-10% total heat. 20% is dangerously high for any market condition.', category: 'Risk Management' },
      { id: 308, question: 'MACD golden cross (MACD crosses above signal line) in combination with price above 200MA signals:', options: ['Bearish — too many bullish signals is suspicious','Bullish momentum with long-term trend alignment — high-probability long setup','Only valid for short-term traders','Always leads to immediate large gains'], correctAnswer: 1, explanation: 'MACD bullish cross + price above 200MA = short-term momentum aligning with long-term trend. Strong setup.', realLifeInsight: 'This dual confirmation filters out most false signals. Many systematic traders use exactly this combination.', category: 'Indicators' },
      { id: 309, question: 'You see a stock with RSI at 80 but it is trending strongly above all moving averages. You should:', options: ['Short immediately — overbought is a sell signal','Respect the trend — RSI can stay elevated for extended periods in strong uptrends','Buy more — RSI will go to 100','Exit all positions in the sector'], correctAnswer: 1, explanation: 'In strong trends, RSI stays elevated. Shorting based on high RSI alone in a strong uptrend is a costly mistake.', realLifeInsight: 'Tesla\'s RSI was above 70 for most of its 2020 run from $100 to $800. Every short based on RSI was destroyed.', category: 'Indicators in Context' },
      { id: 310, question: 'What is the most important difference between a professional and amateur trader?', options: ['Professionals have better technology','Professionals manage risk consistently and separate identity from outcomes','Professionals always win more than 60% of trades','Professionals only trade certain hours'], correctAnswer: 1, explanation: 'Professional traders manage risk consistently and view outcomes objectively — without emotional attachment to being right.', realLifeInsight: 'The Market Wizards had wildly different strategies but all shared one trait: extraordinary risk management discipline.', category: 'Psychology' },
      { id: 311, question: 'A bull flag breaks out on extremely high volume. The next 3 days show declining volume but price holds above the breakout. This pattern is:', options: ['Bearish — volume should stay high','Bullish — normal healthy follow-through after a volume surge','Neutral — no information in the follow-through','A sign the breakout will immediately reverse'], correctAnswer: 1, explanation: 'Volume surge on breakout + declining but stable volume holding above the level = clean, institutional breakout.', realLifeInsight: 'IBD (Investor\'s Business Daily) specifically looks for this follow-through pattern to confirm breakout validity.', category: 'Volume' },
      { id: 312, question: 'Which stop loss placement is most logical for a support bounce long trade?', options: ['5% below entry always','Just below the support level the trade is based on','At the 50-day moving average','1 ATR above entry'], correctAnswer: 1, explanation: 'Stop just below support: if this level fails, the trade thesis (support holds) is invalid. Exit with a small loss.', realLifeInsight: 'Structure-based stops allow proper position sizing AND define when you are wrong. Arbitrary stops do neither.', category: 'Stop Loss' },
      { id: 313, question: 'Expected value of a strategy: 55% win rate, average win $200, average loss $100. EV per trade is:', options: ['$55','$65','$45','$110'], correctAnswer: 1, explanation: 'EV = (0.55 x $200) - (0.45 x $100) = $110 - $45 = $65 positive expected value per trade.', realLifeInsight: 'Even with a $65 average edge per trade, you can have long losing streaks. Think in sample sizes, not individual trades.', category: 'Math' },
      { id: 314, question: 'An ascending triangle with flat resistance and rising lows breaks above resistance with volume. This signals:', options: ['Bearish reversal incoming','High-probability continuation of the uptrend — buyers winning with increasing aggression','No tradeable information','Only valid in trending markets'], correctAnswer: 1, explanation: 'Rising lows showed buyers bidding higher each time. Volume breakout above flat resistance confirms their victory.', realLifeInsight: 'This is one of the cleanest setups in technical analysis. William O\'Neil called it a cup and handle variant when properly formed.', category: 'Chart Patterns' },
      { id: 315, question: 'You are in a profitable swing trade. The stock gaps up 8% on news before market open, hitting your target. You should:', options: ['Add to the position immediately on the gap up','Consider taking profits at the open — you hit your target with a bonus gap','Hold forever because it is running','Cancel your take-profit immediately'], correctAnswer: 1, explanation: 'When a gap hits your target or beyond, consider booking profit. The trade delivered the expected move plus bonus — take it.', realLifeInsight: 'Gaps often fill or reverse intraday. Locking in gains on gap-up opens that hit targets is disciplined, not timid.', category: 'Trade Management' },
      { id: 316, question: 'Diversification is truly effective when portfolio positions are:', options: ['In many stocks within the same sector','In uncorrelated assets — they do not all fall together in stress events','Held for different durations','All different sizes'], correctAnswer: 1, explanation: 'True diversification requires assets that move independently — uncorrelated positions provide genuine risk reduction.', realLifeInsight: '2008 showed that correlations spike to 1 in crises. True diversification (stocks + bonds + gold + cash) helped.', category: 'Portfolio Management' },
      { id: 317, question: 'OBV making new highs while price is still below recent highs is:', options: ['Bearish — OBV and price diverging','Very bullish — volume accumulation is leading price higher','Meaningless — OBV is rarely useful','Only significant for large-cap stocks'], correctAnswer: 1, explanation: 'OBV leading price higher shows institutional accumulation. Smart money buying before the price confirms the move.', realLifeInsight: 'This OBV pattern preceded breakouts in many major stocks. When volume confirms before price, the breakout is more reliable.', category: 'Volume Analysis' },
      { id: 318, question: 'A Doji at the top of a strong uptrend at key resistance with high volume is:', options: ['A buy signal — momentum is clearly strong','A significant warning — indecision after a strong move at a key level deserves respect','Normal price action with no signal','Only relevant for day traders'], correctAnswer: 1, explanation: 'Doji at resistance after a strong trend on high volume: buyers and sellers matched perfectly. Classic reversal warning.', realLifeInsight: 'This exact pattern appeared at Bitcoin\'s $69,000 top in November 2021 — followed by an 80% decline.', category: 'Candlesticks' },
      { id: 319, question: 'The concept of "trading like a business" means:', options: ['Opening a trading firm with employees','Managing risk, tracking expenses (losses), focusing on process, and thinking long-term','Trading 8 hours per day like a job','Only trading the most profitable strategies'], correctAnswer: 1, explanation: 'Treating trading as a business means systematic risk management, cost control (stop losses), and long-term process focus.', realLifeInsight: 'Every successful full-time trader has a business plan. They track all metrics, manage costs, and focus on sustainable edge.', category: 'Professional Mindset' },
      { id: 320, question: 'You have studied all modules and scored 87%+ on every test. You are now ready to:', options: ['Trade your entire life savings immediately','Begin simulator trading with discipline, journal every trade, and build experience systematically','Quit your job and become a full-time trader tomorrow','Guarantee profits from the market'], correctAnswer: 1, explanation: 'Knowledge is the foundation. The next step is disciplined application in the simulator to build real experience and find your personal edge.', realLifeInsight: 'Every expert trader started with paper/demo trading. The simulator is where knowledge becomes skill. Start there.', category: 'Next Steps' }
    ]
  }

};

export default LESSONS_DATABASE;
