import { useState, useEffect } from 'react';
import { Sidebar, MobileNav } from '@/components/Sidebar';
import { SimpleTradingChart } from '@/components/SimpleTradingChart';
import { DollarSign, TrendingUp, TrendingDown, Activity, Wallet, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';

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
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedSymbol, setSelectedSymbol] = useState('SMBY');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('1');
  const [limitPrice, setLimitPrice] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({
    'SMBY': 152.45,
    'BTN': 43120.00,
    'PRTC': 189.50,
    'ETHA': 2840.30,
    'VLTR': 256.80,
    'SOLR': 125.40
  });

  const [balance, setBalance] = useState(50000);
  
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

  const currentPrice = currentPrices[selectedSymbol] || 100;

  // Live price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const volatility = symbol.includes('BT') || symbol.includes('ETH') || symbol.includes('SOL') ? 0.001 : 0.0003;
          const change = (Math.random() - 0.48) * updated[symbol] * volatility;
          updated[symbol] = Math.max(updated[symbol] + change, 0.01);
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update position P&L in real-time
  useEffect(() => {
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
  }, [currentPrices]);

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
        alert('Insufficient balance');
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
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
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
                {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Main Trading Layout */}
        <div className="flex">
          {/* Left Panel - Order Form */}
          <div className="w-96 border-r-2 border-gray-200 bg-white h-[calc(100vh-180px)] overflow-y-auto">
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

          {/* Center - Chart */}
          <div className="flex-1 bg-gray-50">
            <div className="bg-gradient-to-r from-white to-gray-50 border-b-2 border-gray-200 px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-black">{selectedSymbol} Trading Chart</h2>
            </div>

            <div className="p-6">
              <SimpleTradingChart
                symbol={selectedSymbol}
                currentPrice={currentPrice}
              />
            </div>
          </div>

          {/* Right Panel - Positions & Orders */}
          <div className="w-96 border-l-2 border-gray-200 bg-white h-[calc(100vh-180px)] overflow-y-auto">
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
      </main>
      
      <MobileNav />

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
  );
}
