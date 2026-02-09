import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { SimpleTradingChart } from '@/components/SimpleTradingChart';
import { DollarSign, TrendingUp, TrendingDown, Activity, Wallet, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useSimTicker } from '@/hooks/use-sim-ticker';

interface Position {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
  status: 'executed' | 'pending' | 'cancelled';
}

const MOCK_POSITIONS: Position[] = [
  { id: '1', symbol: 'SMBY', type: 'long', quantity: 10, entryPrice: 145.30, currentPrice: 152.45, profitLoss: 71.50, profitLossPercent: 4.92 },
  { id: '2', symbol: 'BTN', type: 'long', quantity: 0.5, entryPrice: 42350.00, currentPrice: 43120.00, profitLoss: 385.00, profitLossPercent: 1.82 },
];

const MOCK_ORDERS: Order[] = [
  { id: '1', symbol: 'SMBY', side: 'buy', quantity: 10, price: 145.30, timestamp: '2026-02-02 14:32:15', status: 'executed' },
  { id: '2', symbol: 'BTN', side: 'buy', quantity: 0.5, price: 42350.00, timestamp: '2026-02-02 13:18:42', status: 'executed' },
  { id: '3', symbol: 'PRTC', side: 'buy', quantity: 5, price: 189.50, timestamp: '2026-02-02 12:05:33', status: 'pending' },
];

export default function SimulatorPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { tickId, simNowMs } = useSimTicker();
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedSymbol, setSelectedSymbol] = useState('SMBY');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('1');
  const [limitPrice, setLimitPrice] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [mobileTab, setMobileTab] = useState<'chart' | 'trade' | 'positions' | 'history'>('trade');
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({
    'SMBY': 152.45,
    'BTN': 43120.00,
    'PRTC': 189.50,
    'ETHA': 2840.30,
    'VLTR': 256.80,
    'SOLR': 125.40
  });

  const [balance, setBalance] = useState(50000);
  const lastAppliedTickRef = useRef<number | null>(null);
  
  // Calculate real-time portfolio values
  const totalPositionValue = positions.reduce((sum, pos) => {
    const currentPrice = currentPrices[pos.symbol] || pos.currentPrice;
    return sum + (currentPrice * pos.quantity);
  }, 0);
  
  const totalValue = balance + totalPositionValue;
  
  const profitLoss = positions.reduce((sum, pos) => {
    const currentPrice = currentPrices[pos.symbol] || pos.currentPrice;
    return sum + ((currentPrice - pos.entryPrice) * pos.quantity * (pos.type === 'short' ? -1 : 1));
  }, 0);
  
  const profitLossPercent = totalPositionValue > 0 ? (profitLoss / totalPositionValue) * 100 : 0;

  const profitLossPercentText = `${profitLossPercent > 0 ? '+' : ''}${profitLossPercent.toLocaleString(undefined, {
    maximumFractionDigits: 3,
  })}%`;

  const currentPrice = currentPrices[selectedSymbol] || 100;

  // Live price simulation (synchronized 7s ticker)
  useEffect(() => {
    if (!isAuthenticated) return;
    if (lastAppliedTickRef.current === tickId) return;
    if (lastAppliedTickRef.current == null) {
      lastAppliedTickRef.current = tickId;
      return;
    }
    lastAppliedTickRef.current = tickId;

    setCurrentPrices(prev => {
      const updated = { ...prev };
      const MIN_MOVE = 0.01;

      Object.keys(updated).forEach(symbol => {
        const isCrypto = symbol.includes('BT') || symbol.includes('ETH') || symbol.includes('SOL') || symbol === 'BTN';
        const maxMove = isCrypto ? 3 : 1.5;
        const clampedMax = Math.max(MIN_MOVE, Math.min(3, maxMove));
        const absDelta = MIN_MOVE + Math.random() * (clampedMax - MIN_MOVE);
        const direction = Math.random() > 0.5 ? 1 : -1;

        updated[symbol] = Math.max(updated[symbol] + direction * absDelta, 0.01);
      });

      return updated;
    });
  }, [tickId, isAuthenticated]);

  // Update position P&L in real-time
  useEffect(() => {
    if (!isAuthenticated) return;
    setPositions(prev => prev.map(pos => {
      const currentPrice = currentPrices[pos.symbol] || pos.currentPrice;
      const profitLoss = (currentPrice - pos.entryPrice) * pos.quantity * (pos.type === 'short' ? -1 : 1);
      const profitLossPercent = ((currentPrice - pos.entryPrice) / pos.entryPrice) * 100 * (pos.type === 'short' ? -1 : 1);
      
      return {
        ...pos,
        currentPrice,
        profitLoss,
        profitLossPercent
      };
    }));
  }, [currentPrices, isAuthenticated]);

  const handlePlaceOrder = () => {
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const price = orderType === 'market' ? currentPrice : parseFloat(limitPrice);
    const qty = parseFloat(quantity);
    const totalCost = price * qty;

    // Execute trade
    if (orderSide === 'buy') {
      if (totalCost > balance) {
        alert('Insufficient cash balance. You can reset your practice cash from the Portfolio page, or upgrade your plan for a higher starting SimCash amount.');
        return;
      }
      
      setBalance(prev => prev - totalCost);
      
      // Add to positions
      const existingPos = positions.find(p => p.symbol === selectedSymbol && p.type === 'long');
      if (existingPos) {
        setPositions(prev => prev.map(p => 
          p.id === existingPos.id 
            ? { ...p, quantity: p.quantity + qty, entryPrice: ((p.entryPrice * p.quantity) + (price * qty)) / (p.quantity + qty) }
            : p
        ));
      } else {
        const newPosition: Position = {
          id: Date.now().toString(),
          symbol: selectedSymbol,
          type: 'long',
          quantity: qty,
          entryPrice: price,
          currentPrice: price,
          profitLoss: 0,
          profitLossPercent: 0
        };
        setPositions(prev => [...prev, newPosition]);
      }
    } else {
      // Sell/Short
      const existingPos = positions.find(p => p.symbol === selectedSymbol && p.type === 'long');
      
      if (existingPos && existingPos.quantity >= qty) {
        // Close long position
        setBalance(prev => prev + totalCost);
        setPositions(prev => prev.map(p => 
          p.id === existingPos.id 
            ? { ...p, quantity: p.quantity - qty }
            : p
        ).filter(p => p.quantity > 0));
      } else if (!existingPos) {
        // Open short position
        const newPosition: Position = {
          id: Date.now().toString(),
          symbol: selectedSymbol,
          type: 'short',
          quantity: qty,
          entryPrice: price,
          currentPrice: price,
          profitLoss: 0,
          profitLossPercent: 0
        };
        setPositions(prev => [...prev, newPosition]);
        setBalance(prev => prev + totalCost);
      }
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      symbol: selectedSymbol,
      side: orderSide,
      quantity: qty,
      price: price,
      timestamp: new Date().toLocaleString(),
      status: orderType === 'market' ? 'executed' : 'pending',
    };
    setOrders([newOrder, ...orders]);
    setShowConfirmation(false);
    setQuantity('1');
    setLimitPrice('');
  };

  return (
    !isAuthenticated ? (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-xl w-full bg-card border border-border rounded-2xl p-6 text-center">
          <h1 className="text-2xl font-bold font-display mb-2">Simulator</h1>
          <p className="text-sm text-muted-foreground mb-6">
            You need an account to place simulated trades and track performance.
          </p>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Checking your session…</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth">
                <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-6 text-sm font-medium">
                  Log in / Create account
                </a>
              </Link>
              <Link href="/pricing">
                <a className="inline-flex items-center justify-center rounded-md border border-border bg-background h-11 px-6 text-sm font-medium">
                  View plans
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="space-y-6">
        {/* Portfolio Stats Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-700 px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div title="Available cash for trading">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-semibold tracking-wide mb-1">
                <Wallet className="w-4 h-4" />
                Cash Balance
              </div>
              <div className="text-white text-2xl font-mono font-bold">${balance.toLocaleString()}</div>
            </div>
            <div title="Total portfolio value (cash + positions)">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-semibold tracking-wide mb-1">
                <Activity className="w-4 h-4" />
                Total Value
              </div>
              <div className="text-white text-2xl font-mono font-bold">${totalValue.toLocaleString()}</div>
            </div>
            <div title="Unrealized profit or loss">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-semibold tracking-wide mb-1">
                <DollarSign className="w-4 h-4" />
                P&L
              </div>
              <div className={`text-2xl font-mono font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}
              </div>
            </div>
            <div title="Return on investment percentage">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-semibold tracking-wide mb-1">
                <TrendingUp className="w-4 h-4" />
                Return
              </div>
              <div className={`text-2xl font-mono font-bold ${profitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLossPercentText}
              </div>
            </div>
          </div>
        </div>

        {/* Main Trading Layout: Desktop = 2-col (form + chart) | Mobile = tabs */}
        <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] min-h-[100dvh] overflow-hidden">
          
          {/* LEFT PANEL - Trading Form (Hidden on mobile, shown lg+) */}
          <div className="hidden lg:flex flex-col border-r border-gray-200 bg-white overflow-hidden">
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <h3 className="font-bold text-black text-lg">Place Order</h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Symbol Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Symbol</label>
                <input
                  type="text"
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono font-bold text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="SMBY"
                />
              </div>

              {/* Buy/Sell Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderSide('buy')}
                    className={`py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                      orderSide === 'buy'
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderSide('sell')}
                    className={`py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                      orderSide === 'sell'
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              {/* Order Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Order Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType('market')}
                    className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                      orderType === 'market'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setOrderType('limit')}
                    className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                      orderType === 'limit'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="1"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Limit Price (if limit order) */}
              {orderType === 'limit' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Limit Price</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Current Price Display */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-xs text-gray-600 uppercase font-semibold mb-1">Current Price</div>
                <div className="text-2xl font-mono font-bold text-blue-600">${currentPrice.toFixed(2)}</div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-105 ${
                  orderSide === 'buy'
                    ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-green-500/50'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-red-500/50'
                }`}
              >
                {orderSide === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
              </button>
            </div>
          </div>

          {/* CENTER - Chart & Mobile Tabs (Responsive Layout) */}
          <div className="flex flex-col bg-gray-50 overflow-hidden">
            
            {/* Header - Symbol & Chart Title */}
            <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-20">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">{selectedSymbol} Trading Chart</h2>
            </div>

            {/* Mobile Tab Switcher (hidden on lg+) */}
            <div className="lg:hidden flex gap-2 px-4 py-2 border-b border-gray-200 bg-white sticky top-14 z-20 overflow-x-auto">
              {(['trade', 'positions', 'history'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    mobileTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Chart Content (desktop only - always shown on lg+) */}
            <div className="hidden lg:block flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6">
                <SimpleTradingChart
                  symbol={selectedSymbol}
                  currentPrice={currentPrice}
                  simNowMs={simNowMs}
                />
              </div>
            </div>

            {/* Trade Panel (Mobile Only) */}
            {mobileTab === 'trade' && (
              <div className="lg:hidden flex-1 overflow-y-auto pb-24">
                <div className="p-4 space-y-4 bg-white border-b border-gray-200">
                  <h3 className="font-bold text-black text-lg">Place Order</h3>
                  
                  {/* Symbol Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Symbol</label>
                    <input
                      type="text"
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono font-bold text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      placeholder="SMBY"
                    />
                  </div>

                  {/* Buy/Sell Toggle */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Side</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderSide('buy')}
                        className={`py-3 rounded-lg font-bold transition-all ${
                          orderSide === 'buy'
                            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => setOrderSide('sell')}
                        className={`py-3 rounded-lg font-bold transition-all ${
                          orderSide === 'sell'
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Sell
                      </button>
                    </div>
                  </div>

                  {/* Order Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Order Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderType('market')}
                        className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                          orderType === 'market'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Market
                      </button>
                      <button
                        onClick={() => setOrderType('limit')}
                        className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                          orderType === 'limit'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Limit
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      placeholder="1"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Limit Price (if limit order) */}
                  {orderType === 'limit' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Limit Price</label>
                      <input
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}

                  {/* Current Price Display */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="text-xs text-gray-600 uppercase font-semibold mb-1">Current Price</div>
                    <div className="text-2xl font-mono font-bold text-blue-600">${currentPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Positions Panel (Mobile Only) */}
            {mobileTab === 'positions' && (
              <div className="lg:hidden flex-1 overflow-y-auto pb-24">
                <div className="bg-white border-b border-gray-200 p-4">
                  <h3 className="font-bold text-black flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Open Positions ({positions.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {positions.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-3">📊</div>
                      <div className="text-gray-500 font-semibold mb-1">No open positions</div>
                      <div className="text-sm text-gray-400">Place your first order to start trading</div>
                    </div>
                  ) : (
                    positions.map(position => (
                      <div 
                        key={position.id} 
                        className={`p-4 hover:bg-gray-50 transition-all border-l-4 ${
                          position.profitLoss >= 0 
                            ? 'border-green-500 bg-green-50/30' 
                            : 'border-red-500 bg-red-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-black">{position.symbol}</div>
                            {position.profitLoss >= 0 && position.profitLossPercent > 5 && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                                🔥 Hot
                              </span>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 capitalize mb-2">{position.type} • {position.quantity} shares</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-xs text-gray-500">Entry</div>
                            <div className="font-mono text-black">${position.entryPrice.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Current</div>
                            <div className="font-mono text-black">${position.currentPrice.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">P&L</span>
                            <div className="text-right">
                              <div className={`font-mono font-bold text-sm ${position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)}
                              </div>
                              <div className={`text-xs font-semibold ${position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {position.profitLossPercent >= 0 ? '+' : ''}{position.profitLossPercent.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* History Panel (Mobile Only) */}
            {mobileTab === 'history' && (
              <div className="lg:hidden flex-1 overflow-y-auto pb-24">
                <div className="bg-white border-b border-gray-200 p-4">
                  <h3 className="font-bold text-black flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Recent Orders
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 10).map(order => (
                    <div key={order.id} className="p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-black">{order.symbol}</div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded shadow-sm ${
                            order.side === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {order.side.toUpperCase()}
                          </span>
                        </div>
                        <span className={`text-xs font-semibold ${
                          order.status === 'executed' ? 'text-green-600' :
                          order.status === 'pending' ? 'text-yellow-600' :
                          'text-gray-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.quantity} @ ${order.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{order.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Positions & Orders (Desktop Only, hidden on mobile) */}
          <div className="hidden lg:flex flex-col border-l border-gray-200 bg-white overflow-hidden">
            {/* Positions */}
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <h3 className="font-bold text-black flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Open Positions ({positions.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {positions.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <div className="text-gray-500 font-semibold mb-1">No open positions</div>
                  <div className="text-sm text-gray-400">Place your first order to start trading</div>
                </div>
              ) : (
                positions.map(position => (
                  <div 
                    key={position.id} 
                    className={`p-4 hover:bg-gray-50 transition-all border-l-4 ${
                      position.profitLoss >= 0 
                        ? 'border-green-500 bg-green-50/30' 
                        : 'border-red-500 bg-red-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-black">{position.symbol}</div>
                        {position.profitLoss >= 0 && position.profitLossPercent > 5 && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                            🔥 Hot
                          </span>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 capitalize mb-2">{position.type} • {position.quantity} shares</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs text-gray-500">Entry</div>
                        <div className="font-mono text-black">${position.entryPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Current</div>
                        <div className="font-mono text-black">${position.currentPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">P&L</span>
                        <div className="text-right">
                          <div className={`font-mono font-bold ${position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)}
                          </div>
                          <div className={`text-xs font-semibold ${position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {position.profitLossPercent >= 0 ? '+' : ''}{position.profitLossPercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Orders */}
            <div className="p-4 border-b-2 border-t-2 border-gray-200 bg-gray-50 mt-4">
              <h3 className="font-bold text-black flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Recent Orders
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {orders.slice(0, 10).map(order => (
                <div key={order.id} className="p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-black">{order.symbol}</div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded shadow-sm ${
                        order.side === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {order.side.toUpperCase()}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${
                      order.status === 'executed' ? 'text-green-600' :
                      order.status === 'pending' ? 'text-yellow-600' :
                      'text-gray-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.quantity} @ ${order.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{order.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Action Button */}
        {mobileTab === 'trade' && (
          <button
            onClick={handlePlaceOrder}
            className={`lg:hidden fixed bottom-16 left-0 right-0 py-4 px-4 font-bold text-white shadow-2xl transition-all z-40 ${
              orderSide === 'buy'
                ? 'bg-gradient-to-r from-green-600 to-green-500'
                : 'bg-gradient-to-r from-red-600 to-red-500'
            }`}
          >
            {orderSide === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
          </button>
        )}
        
        {/* Mobile Floating Chart Button */}
        <button
          onClick={() => setShowChartModal(true)}
          className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-all hover:scale-110"
          title="View Chart"
        >
          <Activity className="w-6 h-6" />
        </button>

      {/* Chart Modal (Mobile Only) */}
      {showChartModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-black">{selectedSymbol} Chart</h3>
              <button
                onClick={() => setShowChartModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SimpleTradingChart
                symbol={selectedSymbol}
                currentPrice={currentPrice}
                simNowMs={simNowMs}
              />
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-black mb-4">Confirm Order</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Symbol</span>
                <span className="font-bold text-black">{selectedSymbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Side</span>
                <span className={`font-bold ${orderSide === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {orderSide.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-bold text-black capitalize">{orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-mono font-bold text-black">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-mono font-bold text-black">
                  ${orderType === 'market' ? currentPrice.toFixed(2) : limitPrice}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className={`flex-1 py-3 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                  orderSide === 'buy' 
                    ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-green-500/50' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-red-500/50'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  );
}
