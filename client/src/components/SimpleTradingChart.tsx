import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock, BarChart3, TrendingUpIcon } from 'lucide-react';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

type TimePeriod = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
type ChartType = 'line' | 'candlestick';

interface SimpleTradingChartProps {
  symbol: string;
  currentPrice: number;
  timeframe?: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
}

export function SimpleTradingChart({ symbol, currentPrice, timeframe = '1m' }: SimpleTradingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [high24h, setHigh24h] = useState(0);
  const [low24h, setLow24h] = useState(0);
  const [change24h, setChange24h] = useState(0);

  // Get point count based on time period
  const getPointCount = (period: TimePeriod): number => {
    switch (period) {
      case '1D': return 100;
      case '1W': return 168;
      case '1M': return 240;
      case '3M': return 300;
      case '1Y': return 365;
      case 'ALL': return 500;
      default: return 100;
    }
  };

  // Initialize candle data
  useEffect(() => {
    const candles: Candle[] = [];
    const now = Date.now();
    const pointCount = getPointCount(selectedPeriod);
    
    // Generate historical data with realistic OHLC movement
    let basePrice = currentPrice * (0.95 + Math.random() * 0.1);
    
    // Calculate time interval based on period
    const getTimeInterval = (period: TimePeriod): number => {
      switch (period) {
        case '1D': return 1000 * 60 * 14.4; // ~14 minutes per candle (100 candles in 24h)
        case '1W': return 1000 * 60 * 60; // 1 hour per candle
        case '1M': return 1000 * 60 * 60 * 3; // 3 hours per candle
        case '3M': return 1000 * 60 * 60 * 6; // 6 hours per candle
        case '1Y': return 1000 * 60 * 60 * 24; // 1 day per candle
        case 'ALL': return 1000 * 60 * 60 * 24 * 2; // 2 days per candle
        default: return 1000;
      }
    };
    
    const interval = getTimeInterval(selectedPeriod);
    
    for (let i = 0; i < pointCount; i++) {
      const time = now - (pointCount - i) * interval;
      
      // Generate realistic OHLC data
      const volatility = currentPrice * 0.003;
      const open = basePrice;
      const direction = Math.random() > 0.48 ? 1 : -1; // Slight upward bias
      const change = (Math.random() * volatility * direction);
      const close = open + change;
      
      // High and low based on the open and close
      const maxPrice = Math.max(open, close);
      const minPrice = Math.min(open, close);
      const high = maxPrice + (Math.random() * volatility * 0.5);
      const low = minPrice - (Math.random() * volatility * 0.5);
      
      candles.push({ time, open, high, low, close });
      basePrice = close; // Next candle starts where this one closed
    }
    
    setCandleData(candles);
    
    // Calculate 24h stats from all highs/lows
    const allHighs = candles.map(c => c.high);
    const allLows = candles.map(c => c.low);
    setHigh24h(Math.max(...allHighs));
    setLow24h(Math.min(...allLows));
    setChange24h(((currentPrice - candles[0].close) / candles[0].close) * 100);
  }, [symbol, selectedPeriod]);

  // Update with new price data (create new candle)
  useEffect(() => {
    if (candleData.length === 0) return;

    const now = Date.now();
    const lastCandle = candleData[candleData.length - 1];
    
    // Create a new candle with the current price
    const volatility = currentPrice * 0.002;
    const newCandle: Candle = {
      time: now,
      open: lastCandle.close,
      high: Math.max(lastCandle.close, currentPrice) + (Math.random() * volatility * 0.3),
      low: Math.min(lastCandle.close, currentPrice) - (Math.random() * volatility * 0.3),
      close: currentPrice
    };
    
    setCandleData(prev => {
      const updated = [...prev.slice(1), newCandle];
      
      // Update stats
      const allHighs = updated.map(c => c.high);
      const allLows = updated.map(c => c.low);
      setHigh24h(Math.max(...allHighs));
      setLow24h(Math.min(...allLows));
      setChange24h(((currentPrice - updated[0].close) / updated[0].close) * 100);
      
      return updated;
    });
  }, [currentPrice]);

  // Draw chart (supports both line and candlestick)
  useEffect(() => {
    if (!canvasRef.current || candleData.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate price range
    const allPrices = candleData.flatMap(c => [c.high, c.low]);
    const maxPrice = Math.max(...allPrices);
    const minPrice = Math.min(...allPrices);
    const priceRange = maxPrice - minPrice || 1;
    const padding = 40;

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
      const y = padding + (height - padding * 2) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Price labels
      const price = maxPrice - (priceRange * (i / 4));
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('$' + price.toFixed(2), padding - 5, y + 4);
    }

    const isPositive = change24h >= 0;

    if (chartType === 'candlestick') {
      // Draw candlesticks
      const candleWidth = Math.max(2, (width - padding * 2) / candleData.length * 0.7);
      
      candleData.forEach((candle, i) => {
        const x = padding + (width - padding * 2) * (i / (candleData.length - 1));
        const openY = padding + (height - padding * 2) * (1 - (candle.open - minPrice) / priceRange);
        const closeY = padding + (height - padding * 2) * (1 - (candle.close - minPrice) / priceRange);
        const highY = padding + (height - padding * 2) * (1 - (candle.high - minPrice) / priceRange);
        const lowY = padding + (height - padding * 2) * (1 - (candle.low - minPrice) / priceRange);
        
        const isBullish = candle.close >= candle.open;
        const bodyColor = isBullish ? '#22c55e' : '#ef4444';
        const wickColor = isBullish ? '#16a34a' : '#dc2626';
        
        // Draw wick (high-low line)
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw body (open-close rectangle)
        const bodyHeight = Math.abs(closeY - openY);
        const bodyY = Math.min(openY, closeY);
        
        ctx.fillStyle = bodyColor;
        ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, Math.max(bodyHeight, 1));
        
        // Add border to body
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - candleWidth / 2, bodyY, candleWidth, Math.max(bodyHeight, 1));
      });
    } else {
      // Draw line chart (existing logic)
      // Draw area under line
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
      gradient.addColorStop(0, isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)');
      gradient.addColorStop(1, isPositive ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)');
      
      ctx.beginPath();
      candleData.forEach((candle, i) => {
        const x = padding + (width - padding * 2) * (i / (candleData.length - 1));
        const y = padding + (height - padding * 2) * (1 - (candle.close - minPrice) / priceRange);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      const lastX = padding + (width - padding * 2);
      const lastY = padding + (height - padding * 2) * (1 - (candleData[candleData.length - 1].close - minPrice) / priceRange);
      ctx.lineTo(lastX, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw price line
      ctx.strokeStyle = isPositive ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      
      candleData.forEach((candle, i) => {
        const x = padding + (width - padding * 2) * (i / (candleData.length - 1));
        const y = padding + (height - padding * 2) * (1 - (candle.close - minPrice) / priceRange);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }

    // Draw current price line
    const currentY = padding + (height - padding * 2) * (1 - (currentPrice - minPrice) / priceRange);
    ctx.strokeStyle = isPositive ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, currentY);
    ctx.lineTo(width - padding, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw current price label
    ctx.fillStyle = isPositive ? '#22c55e' : '#ef4444';
    ctx.fillRect(width - padding - 70, currentY - 12, 70, 24);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('$' + currentPrice.toFixed(2), width - padding - 35, currentY + 4);

    // Draw time labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    
    const timePoints = [0, candleData.length - 1];
    timePoints.forEach(i => {
      const candle = candleData[i];
      const x = padding + (width - padding * 2) * (i / (candleData.length - 1));
      const date = new Date(candle.time);
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      ctx.fillText(timeStr, x, height - padding + 20);
    });
  }, [candleData, currentPrice, change24h, chartType]);

  const isPositive = change24h >= 0;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Chart Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-black">{symbol}</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-lg font-mono font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                ${currentPrice.toFixed(2)}
              </span>
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change24h.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-600">24h High: </span>
              <span className="font-mono font-bold text-black">${high24h.toFixed(2)}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">24h Low: </span>
              <span className="font-mono font-bold text-black">${low24h.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Chart Type Selector */}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all transform hover:scale-105 ${
                  chartType === 'line'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('candlestick')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all transform hover:scale-105 ${
                  chartType === 'candlestick'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Candlestick
              </button>
            </div>
          </div>
          
          {/* Time Period */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1 flex-wrap">
              {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimePeriod[]).map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all transform hover:scale-105 ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="p-4 bg-white relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96"
          style={{ display: 'block' }}
        />
        
        {/* Simulated Volume Bars */}
        <div className="mt-4 flex items-end gap-1 h-16 px-4">
          {Array.from({ length: 50 }).map((_, i) => {
            const height = Math.random() * 60 + 20;
            const isHigh = height > 60;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all hover:opacity-80 ${
                  isHigh ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                style={{ height: `${height}%` }}
                title={`Volume: ${(Math.random() * 1000000).toFixed(0)}`}
              />
            );
          })}
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">Trading Volume</div>
      </div>

      {/* Chart Footer */}
      <div className="bg-gray-50 border-t-2 border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Activity className="w-4 h-4" />
            <span>Live Market Data</span>
          </div>
          <div className="text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
