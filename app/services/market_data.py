"""Market data service - mock data generation"""
import time
import random
import math
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo


class MarketDataService:
    """Generate realistic mock market data for trading simulator"""
    
    # Market hours (simulated US stock market times)
    MARKET_OPEN_HOUR = 9  # 9:30 AM EST
    MARKET_OPEN_MINUTE = 30
    MARKET_CLOSE_HOUR = 16  # 4:00 PM EST
    MARKET_CLOSE_MINUTE = 0
    
    # Volatility patterns by time of day (simulated)
    
    # 50 Fake Training Assets (legal-safe, parody names)
    SYMBOLS = {
        'stocks': [
            {'symbol': 'SMBY', 'name': 'SmartBuy', 'sector': 'Retail Electronics', 'class': 'stock', 'volatility': 'medium', 'tier': 'free'},
            {'symbol': 'PRTC', 'name': 'PearTech', 'sector': 'Consumer Tech', 'class': 'stock', 'volatility': 'medium', 'tier': 'free'},
            {'symbol': 'VLTR', 'name': 'Voltra Motors', 'sector': 'EV / Auto', 'class': 'stock', 'volatility': 'high', 'tier': 'gold'},
            {'symbol': 'RNBX', 'name': 'RainBox', 'sector': 'E-comm / Cloud', 'class': 'stock', 'volatility': 'medium', 'tier': 'gold'},
            {'symbol': 'STRM', 'name': 'Streamly', 'sector': 'Streaming', 'class': 'stock', 'volatility': 'medium', 'tier': 'gold'},
            {'symbol': 'NRCP', 'name': 'NeuroChip', 'sector': 'Semiconductors', 'class': 'stock', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'FNDT', 'name': 'FindIt', 'sector': 'Search / Ads', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'FNLK', 'name': 'FaceLink', 'sector': 'Social', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'CLND', 'name': 'CloudNest', 'sector': 'Cloud', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'PYWV', 'name': 'PayWave', 'sector': 'Fintech', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'MDCR', 'name': 'MediCore', 'sector': 'Healthcare', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'ARLF', 'name': 'AeroLift', 'sector': 'Logistics', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'BLDF', 'name': 'BuildForge', 'sector': 'Industrial', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'FRCT', 'name': 'FreshCart', 'sector': 'Delivery', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'HMHV', 'name': 'HomeHaven', 'sector': 'Home Goods', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'BYTS', 'name': 'ByteShield', 'sector': 'Cybersecurity', 'class': 'stock', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'SLRG', 'name': 'Solaris Grid', 'sector': 'Clean Energy', 'class': 'stock', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'NVBK', 'name': 'NovaBank', 'sector': 'Banking', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'MTRL', 'name': 'MetroRail', 'sector': 'Transport', 'class': 'stock', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'CPOP', 'name': 'CinePop', 'sector': 'Entertainment', 'class': 'stock', 'volatility': 'medium', 'tier': 'premium'},
        ],
        'crypto': [
            {'symbol': 'BTN', 'name': 'BitNova', 'sector': 'Store of Value', 'class': 'crypto', 'volatility': 'high', 'tier': 'free'},
            {'symbol': 'ETHA', 'name': 'Ethera', 'sector': 'Smart Contracts', 'class': 'crypto', 'volatility': 'high', 'tier': 'gold'},
            {'symbol': 'SOLR', 'name': 'Solari', 'sector': 'Fast L1', 'class': 'crypto', 'volatility': 'very-high', 'tier': 'gold'},
            {'symbol': 'LUMT', 'name': 'LunaMint', 'sector': 'Payments', 'class': 'crypto', 'volatility': 'high', 'tier': 'gold'},
            {'symbol': 'RPLX', 'name': 'RippleX', 'sector': 'Transfers', 'class': 'crypto', 'volatility': 'medium', 'tier': 'gold'},
            {'symbol': 'PUPC', 'name': 'PupCoin', 'sector': 'Meme', 'class': 'crypto', 'volatility': 'very-high', 'tier': 'premium'},
            {'symbol': 'CLAF', 'name': 'ChainLeaf', 'sector': 'Green Chain', 'class': 'crypto', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'VLT', 'name': 'VoltToken', 'sector': 'Utility', 'class': 'crypto', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'ASTR', 'name': 'AstraCoin', 'sector': 'L2', 'class': 'crypto', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'NBYT', 'name': 'NeoByte', 'sector': 'Compute', 'class': 'crypto', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'ORBT', 'name': 'Orbit', 'sector': 'Interop', 'class': 'crypto', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'GLCR', 'name': 'Glacier', 'sector': 'Privacy', 'class': 'crypto', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'KOI', 'name': 'Koi', 'sector': 'Community', 'class': 'crypto', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'SAFF', 'name': 'Saffron', 'sector': 'DeFi', 'class': 'crypto', 'volatility': 'high', 'tier': 'premium'},
            {'symbol': 'COBL', 'name': 'Cobalt', 'sector': 'Gaming', 'class': 'crypto', 'volatility': 'high', 'tier': 'premium'},
        ],
        'forex': [
            {'symbol': 'USXEUR', 'name': 'USX / EURX', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'gold'},
            {'symbol': 'USXYNK', 'name': 'USX / YENK', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'gold'},
            {'symbol': 'GBPZUSX', 'name': 'GBPZ / USX', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'gold'},
            {'symbol': 'CADYUSX', 'name': 'CADY / USX', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'AUSYUSX', 'name': 'AUSY / USX', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'EURXYNK', 'name': 'EURX / YENK', 'sector': 'FX Cross', 'class': 'forex', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'CHFQUSX', 'name': 'CHFQ / USX', 'sector': 'FX Major', 'class': 'forex', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'USXNGNX', 'name': 'USX / NGNX', 'sector': 'FX Exotic', 'class': 'forex', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'USXBRLX', 'name': 'USX / BRLX', 'sector': 'FX Exotic', 'class': 'forex', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'USXINRX', 'name': 'USX / INRX', 'sector': 'FX Exotic', 'class': 'forex', 'volatility': 'medium', 'tier': 'premium'},
        ],
        'indices': [
            {'symbol': 'TOP500', 'name': 'Top500', 'sector': 'Index', 'class': 'index', 'volatility': 'low', 'tier': 'gold'},
            {'symbol': 'TCH100', 'name': 'Tech100', 'sector': 'Index', 'class': 'index', 'volatility': 'medium', 'tier': 'gold'},
            {'symbol': 'MEGA30', 'name': 'Mega30', 'sector': 'Index', 'class': 'index', 'volatility': 'low', 'tier': 'premium'},
            {'symbol': 'GE20', 'name': 'GreenEnergy20', 'sector': 'Index', 'class': 'index', 'volatility': 'medium', 'tier': 'premium'},
            {'symbol': 'GLB40', 'name': 'Global40', 'sector': 'Index', 'class': 'index', 'volatility': 'low', 'tier': 'premium'},
        ]
    }
    
    def _get_asset_info(self, symbol):
        """Find asset info by symbol"""
        for category in self.SYMBOLS.values():
            for asset in category:
                if asset['symbol'].upper() == symbol.upper():
                    return asset
        return None
    
    def _get_base_price(self, asset_class):
        """Get starting price based on asset class"""
        if asset_class == 'crypto':
            return random.uniform(400, 32000)
        elif asset_class == 'forex':
            return random.uniform(0.5, 2.2)
        elif asset_class == 'index':
            return random.uniform(800, 5200)
        else:  # stocks
            return random.uniform(12, 420)
    
    def _get_volatility_multiplier(self, volatility_label):
        """Get volatility multiplier based on asset volatility"""
        # Realistic daily volatility ranges:
        # Low vol stocks: 0.5-1% per day
        # Medium stocks: 1-2% per day  
        # High vol stocks: 2-4% per day
        # Crypto: 3-8% per day
        multipliers = {
            'low': 0.008,       # 0.8% (indices, forex majors, blue chips)
            'medium': 0.015,    # 1.5% (most stocks)
            'high': 0.025,      # 2.5% (growth stocks, some crypto)
            'very-high': 0.045  # 4.5% (meme coins, volatile crypto)
        }
        return multipliers.get(volatility_label, 0.015)
    
    def is_market_open(self, asset_class='stock'):
        """Check if market is currently open for given asset class"""
        now = datetime.now(ZoneInfo('America/New_York'))
        
        # Crypto trades 24/7
        if asset_class == 'crypto':
            return True, "Crypto markets are open 24/7"
        
        # Forex closes only on weekends
        if asset_class == 'forex':
            if now.weekday() >= 5:  # Saturday or Sunday
                return False, "Forex market closed on weekends"
            return True, "Forex market open"
        
        # Stocks have specific hours
        if asset_class in ['stock', 'index']:
            # Check if weekend
            if now.weekday() >= 5:
                return False, "Stock market closed on weekends"
            
            # Check trading hours (9:30 AM - 4:00 PM EST)
            market_open = now.replace(hour=self.MARKET_OPEN_HOUR, minute=self.MARKET_OPEN_MINUTE, second=0)
            market_close = now.replace(hour=self.MARKET_CLOSE_HOUR, minute=self.MARKET_CLOSE_MINUTE, second=0)
            
            if now < market_open:
                mins_until = int((market_open - now).total_seconds() / 60)
                return False, f"Market opens in {mins_until} minutes"
            elif now > market_close:
                tomorrow = now + timedelta(days=1)
                market_open_tmr = tomorrow.replace(hour=self.MARKET_OPEN_HOUR, minute=self.MARKET_OPEN_MINUTE)
                hours_until = int((market_open_tmr - now).total_seconds() / 3600)
                return False, f"Market closed. Opens in {hours_until} hours"
            else:
                mins_left = int((market_close - now).total_seconds() / 60)
                return True, f"Market open ({mins_left} minutes remaining)"
        
        return True, "Market status unknown"
    
    def _get_time_of_day_volatility(self, timestamp):
        """Return volatility multiplier based on time of day (higher at open/close)"""
        try:
            dt = datetime.fromtimestamp(timestamp / 1000, tz=ZoneInfo('America/New_York'))
            hour = dt.hour
            
            # Market open (9:30-10:30): High volatility
            if 9 <= hour < 11:
                return 1.5
            # Lunch (11:30-13:00): Low volatility
            elif 11 <= hour < 13:
                return 0.7
            # Market close (15:00-16:00): High volatility
            elif 15 <= hour < 17:
                return 1.4
            # Otherwise normal
            else:
                return 1.0
        except:
            return 1.0
    
    def _add_trend_bias(self, current_price, candle_index, total_candles, asset_class):
        """Add realistic trend patterns (not purely random walk)"""
        # Create trending patterns over time
        cycle_length = 40  # Trend changes every ~40 candles (more gradual)
        cycle_position = (candle_index % cycle_length) / cycle_length
        
        # Sine wave creates natural-looking trends
        # Reduced from 0.3 to 0.05 (5% instead of 30%!)
        trend_strength = math.sin(cycle_position * 2 * math.pi) * 0.05
        
        # Crypto has more dramatic trends (but still reasonable)
        if asset_class == 'crypto':
            trend_strength *= 2.0  # 10% max trend
        
        return trend_strength
    
    def get_candles(self, symbol, timeframe='1d', limit=120):
        """Generate realistic mock candlestick data with market patterns"""
        candles = []
        
        # Get asset info
        asset_info = self._get_asset_info(symbol)
        if not asset_info:
            # Fallback for unknown symbols
            asset_info = {'class': 'stock', 'volatility': 'medium'}
        
        # Starting price based on asset class
        base_price = self._get_base_price(asset_info['class'])
        volatility_mult = self._get_volatility_multiplier(asset_info.get('volatility', 'medium'))
        
        # Time interval
        if timeframe == '1m':
            interval = timedelta(minutes=1)
        elif timeframe == '5m':
            interval = timedelta(minutes=5)
        elif timeframe == '15m':
            interval = timedelta(minutes=15)
        elif timeframe == '1h':
            interval = timedelta(hours=1)
        elif timeframe == '4h':
            interval = timedelta(hours=4)
        elif timeframe == '1d':
            interval = timedelta(days=1)
        elif timeframe == '1w':
            interval = timedelta(weeks=1)
        else:
            interval = timedelta(days=1)
        
        now = datetime.utcnow()
        current_price = base_price
        
        for i in range(limit, 0, -1):
            timestamp = now - (interval * i)
            timestamp_ms = int(timestamp.timestamp() * 1000)
            
            # Add trend bias for realistic patterns
            trend_bias = self._add_trend_bias(current_price, i, limit, asset_info['class'])
            
            # Get time-of-day volatility (for intraday timeframes)
            tod_volatility = 1.0
            if timeframe in ['1m', '5m', '15m', '1h']:
                tod_volatility = self._get_time_of_day_volatility(timestamp_ms)
            
            # Generate realistic price movement with small steps
            base_volatility = current_price * volatility_mult
            adjusted_volatility = base_volatility * tod_volatility
            
            # Use Gaussian (normal) distribution for realistic small moves
            # Most moves will be near 0, rare moves will be large
            # random.gauss creates bell curve: 68% within 1 std dev, 95% within 2 std dev
            gaussian_change = random.gauss(0, adjusted_volatility * 0.3)  # 30% of volatility as std dev
            
            # Occasional spike events (5% chance of 2-3x larger move)
            if random.random() < 0.05:  # 5% chance
                spike_multiplier = random.uniform(2.0, 3.0)
                gaussian_change *= spike_multiplier
            
            # Add trend bias for gradual direction
            trend_change = adjusted_volatility * trend_bias
            total_change = gaussian_change + trend_change
            
            # Trend persistence: if price moved up last candle, more likely to continue
            # This creates realistic inertia
            if i < limit and i > 0:
                momentum_factor = 0.3  # 30% of last move carries forward
                total_change += total_change * momentum_factor * random.uniform(0, 1)
            
            open_price = current_price
            close_price = max(0.01, current_price + total_change)  # Prevent negative prices
            
            # Generate high/low with realistic wicks
            # Most candles have small wicks, rare candles have large wicks
            price_range = abs(close_price - open_price)
            
            # Base wick is small (5-15% of body)
            base_wick_ratio = random.uniform(0.05, 0.15)
            
            # Rare large wicks (10% chance of 2-4x larger wick)
            if random.random() < 0.1:  # 10% chance of spike wick
                base_wick_ratio *= random.uniform(2.0, 4.0)
            
            wick_size = price_range * base_wick_ratio if price_range > 0 else current_price * 0.001
            
            high_price = max(open_price, close_price) + wick_size
            low_price = min(open_price, close_price) - wick_size
            
            # Ensure low doesn't go negative
            low_price = max(0.01, low_price)
            
            # Volume varies with volatility (more volume = more movement)
            base_volume = random.randint(500000, 2000000)
            volume = int(base_volume * (1 + tod_volatility))
            
            # Decimal precision based on asset class
            decimals = 4 if asset_info['class'] == 'forex' else 2
            
            candles.append({
                'time': timestamp_ms,
                'open': round(open_price, decimals),
                'high': round(high_price, decimals),
                'low': round(low_price, decimals),
                'close': round(close_price, decimals),
                'volume': volume
            })
            
            current_price = close_price
        
        return candles
    
    def get_quote(self, symbol):
        """Get current price quote"""
        # Get the last candle
        candles = self.get_candles(symbol, timeframe='1d', limit=1)
        
        if not candles:
            return {'error': 'Symbol not found'}
        
        last_candle = candles[0]
        price = last_candle['close']
        
        # Add bid/ask spread (0.1% typical)
        spread = price * 0.001
        
        return {
            'symbol': symbol.upper(),
            'price': price,
            'bid': round(price - spread/2, 2),
            'ask': round(price + spread/2, 2),
            'timestamp': last_candle['time']
        }
    
    def search_assets(self, query='', asset_class='all'):
        """Search for tradeable assets"""
        results = []
        
        # Search in relevant asset classes
        if asset_class == 'all':
            search_lists = list(self.SYMBOLS.values())
        else:
            search_lists = [self.SYMBOLS.get(asset_class, [])]
        
        query_lower = query.lower() if query else ''
        
        for symbol_list in search_lists:
            for asset in symbol_list:
                if not query_lower or query_lower in asset['symbol'].lower() or query_lower in asset['name'].lower():
                    results.append(asset)
        
        return results if not query else results[:10]
    
    def get_rtt_coaching(self, symbol, side='buy', free_mode=False):
        """
        Generate RTT (RealTimeTutor) coaching signal
        Returns trade recommendation with reasoning and point bias
        If free_mode=True, provides analysis without restrictive warnings
        """
        # Get historical data for indicators
        candles = self.get_candles(symbol, timeframe='1d', limit=30)
        
        if len(candles) < 15:
            return {
                'action': 'HOLD',
                'tag': 'insufficient-data',
                'reason': 'Not enough historical data to analyze. Wait for more price history.',
                'score_bias': 0,
                'rsi': None,
                'ma9': None,
                'ma21': None,
                'coaching_tips': []
            }
        
        # Calculate RSI(14)
        rsi = self._calculate_rsi([c['close'] for c in candles], 14)
        
        # Calculate moving averages
        closes = [c['close'] for c in candles]
        ma9 = self._calculate_sma(closes, 9)
        ma21 = self._calculate_sma(closes, 21)
        
        current_price = closes[-1]
        prev_price = closes[-2] if len(closes) >= 2 else current_price
        
        # Calculate range position (stretched)
        lookback = min(20, len(closes))
        recent = closes[-lookback:]
        hi = max(recent)
        lo = min(recent)
        range_size = hi - lo if hi > lo else 1
        stretched = (current_price - lo) / range_size  # 0..1
        
        # Get asset info for market hours check
        asset_info = self._get_asset_info(symbol)
        asset_class = asset_info.get('class', 'stock') if asset_info else 'stock'
        is_open, market_msg = self.is_market_open(asset_class)
        
        # Check time of day for stock/index trading
        coaching_tips = []
        now = datetime.now(ZoneInfo('America/New_York'))
        hour = now.hour
        
        # Time-of-day warnings (only if not free mode)
        if not free_mode and asset_class in ['stock', 'index']:
            if not is_open:
                coaching_tips.append(f"⏰ {market_msg}")
            elif 9 <= hour < 10:
                coaching_tips.append("🌅 Market just opened - High volatility! Use smaller position sizes.")
            elif 15 <= hour <= 16:
                coaching_tips.append("🌆 Market closing soon - Volatility spikes. Consider waiting for next session.")
        
        # RTT Decision Logic (with wider thresholds to avoid flip-flopping)
        action = 'HOLD'
        tag = 'neutral'
        reason = 'No strong signal. Focus on risk management and patience.'
        score_bias = 0
        
        # Overbought warning (75+ RSI - raised from 72 for more stability)
        if rsi >= 75:
            action = "DON'T BUY" if side == 'buy' else "CONSIDER SELL"
            tag = 'overbought'
            reason = f'RSI is high ({rsi:.0f}). Buying now often means you\'re late; wait for a pullback or cleaner entry.'
            score_bias = -2 if side == 'buy' else 2
            if not free_mode:
                coaching_tips.append("📈 Overbought: Most beginners buy here and lose. Wait for a dip.")
        
        # Oversold opportunity (25- RSI - lowered from 28 for more stability)
        elif rsi <= 25:
            action = 'CAUTIOUS BUY' if side == 'buy' else "DON'T SELL"
            tag = 'oversold'
            reason = f'RSI is low ({rsi:.0f}). Could bounce, but use small size + a stop-loss.'
            score_bias = 1 if side == 'buy' else -1
            if not free_mode:
                coaching_tips.append("📉 Oversold: Could bounce, but set a STOP LOSS below recent low!")
        
        # Trend up + price above MA9 (requires clearer confirmation)
        elif ma9 and ma21 and ma9 > ma21 * 1.02 and current_price >= ma9 * 1.005 and stretched > 0.60:
            action = 'BUY (trend)' if side == 'buy' else 'HOLD'
            tag = 'uptrend'
            reason = 'Trend looks up (MA9 > MA21). Price is above MA9 — better odds than random entries. Still size small.'
            score_bias = 3 if side == 'buy' else 0
            if not free_mode:
                coaching_tips.append("✅ Uptrend confirmed. Use 1-2% position size. Set stop below MA9.")
        
        # Trend down warning (requires clearer confirmation)
        elif ma9 and ma21 and ma9 < ma21 * 0.98 and current_price < ma9 * 0.995:
            action = "DON'T BUY" if side == 'buy' else 'CONSIDER SELL'
            tag = 'downtrend'
            reason = 'Trend looks down (MA9 < MA21). Better to wait — most beginners lose trying to catch falling moves.'
            score_bias = -2 if side == 'buy' else 1
            if not free_mode:
                coaching_tips.append("⚠️ Downtrend: Don't try to catch a falling knife!")
        
        # Near resistance (raised threshold from 0.90)
        elif stretched > 0.92:
            action = 'WAIT'
            tag = 'near-resistance'
            reason = 'Price is near recent highs. If it fails here, it can drop fast. Wait for breakout confirmation (and then a retest).'
            score_bias = -1
            if not free_mode:
                coaching_tips.append("🚧 Near resistance: Wait for clear breakout + retest.")
        
        # Strong momentum check (raised threshold from 3% to 5% to catch only significant moves)
        if abs(current_price - prev_price) / prev_price > 0.05:  # 5%+ move (not 3%)
            if current_price > prev_price:
                coaching_tips.append("🚀 Strong upward momentum - but don't chase! Wait for pullback.")
            else:
                coaching_tips.append("💥 Strong downward move - let it settle before entering.")
        
        # Position sizing advice (always show)
        if side == 'buy' and not free_mode:
            if rsi < 40:
                coaching_tips.append("💰 Position size: Max 2-3% of portfolio on this setup.")
            else:
                coaching_tips.append("💰 Position size: Max 1-2% of portfolio. Stay disciplined!")
        
        return {
            'action': action,
            'tag': tag,
            'reason': reason,
            'score_bias': score_bias,
            'rsi': round(rsi, 1) if rsi else None,
            'ma9': round(ma9, 2) if ma9 else None,
            'ma21': round(ma21, 2) if ma21 else None,
            'current_price': round(current_price, 2),
            'coaching_tips': coaching_tips,
            'market_open': is_open,
            'market_status': market_msg
        }
    
    def _calculate_rsi(self, prices, period=14):
        """Calculate RSI indicator"""
        if len(prices) < period + 1:
            return 50  # Neutral if not enough data
        
        gains = []
        losses = []
        
        for i in range(1, len(prices)):
            change = prices[i] - prices[i-1]
            if change >= 0:
                gains.append(change)
                losses.append(0)
            else:
                gains.append(0)
                losses.append(abs(change))
        
        if len(gains) < period:
            return 50
        
        avg_gain = sum(gains[-period:]) / period
        avg_loss = sum(losses[-period:]) / period
        
        if avg_loss == 0:
            return 100
        
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        
        return rsi
    
    def _calculate_sma(self, prices, period):
        """Calculate Simple Moving Average"""
        if len(prices) < period:
            return None
        return sum(prices[-period:]) / period
