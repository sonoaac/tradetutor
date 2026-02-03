import { useState } from "react";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { TradingChart } from "@/components/TradingChart";
import { OrderForm } from "@/components/OrderForm";
import { TradeList } from "@/components/TradeList";
import { RTTCoach } from "@/components/RTTCoach";
import { useMarketCandles } from "@/hooks/use-market";
import { DollarSign, TrendingUp, TrendingDown, Activity, Wallet } from "lucide-react";

export default function Simulator() {
  const [symbol, setSymbol] = useState('BTN');
  const [rttEnabled, setRttEnabled] = useState(false);
  
  const { data: marketData, isLoading, error } = useMarketCandles(symbol);
  
  // Get latest close price as "current price"
  const currentPrice = marketData?.candles?.[marketData.candles.length - 1]?.close ?? 0;
  
  // Calculate price change
  const firstPrice = marketData?.candles?.[0]?.close ?? 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? ((priceChange / firstPrice) * 100) : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        {/* Professional Header */}
        <header className="bg-white border-b-2 border-gray-200 px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Trading Simulator</h1>
                <p className="text-sm text-gray-600">Practice trading with live market data</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Symbol Selector */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                  Select Asset
                </label>
                <select 
                  value={symbol} 
                  onChange={(e) => setSymbol(e.target.value)}
                  className="bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-300 hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                >
                  <option value="BTN">BTN - BitNova</option>
                  <option value="SMBY">SMBY - SmartBuy</option>
                  <option value="ETHA">ETHA - Ethera</option>
                  <option value="PRTC">PRTC - PearTech</option>
                  <option value="VLTR">VLTR - Voltra</option>
                  <option value="SOLR">SOLR - Solari</option>
                </select>
              </div>
              
              {/* Current Price Display */}
              {currentPrice > 0 && (
                <div className="flex items-center gap-4 px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Current Price
                      </div>
                      <div className="text-2xl font-bold text-black font-mono">
                        ${currentPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Change */}
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
                    isPositive ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-700" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-700" />
                    )}
                    <span className={`text-sm font-bold ${
                      isPositive ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6 bg-gray-50">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-100 rounded-full">
                  <Activity className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-bold text-red-900">Failed to load market data</p>
                  <p className="text-sm text-red-700 mt-1">Please check your connection and try again.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Trading Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Chart & Coach */}
            <div className="xl:col-span-2 space-y-6">
              {/* Trading Chart */}
              <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 border-b-2 border-blue-800">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Price Chart - {symbol}
                  </h2>
                </div>
                <div className="p-4">
                  <TradingChart 
                    data={marketData?.candles || []} 
                    symbol={symbol} 
                    isLoading={isLoading} 
                  />
                </div>
              </div>
              
              {/* RTT Coach */}
              <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <RTTCoach 
                  symbol={symbol} 
                  enabled={rttEnabled}
                  onToggle={setRttEnabled}
                />
              </div>
            </div>
            
            {/* Right Column - Order Form */}
            <div className="xl:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm overflow-hidden sticky top-6">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-3 border-b-2 border-green-800">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Place Order
                  </h2>
                </div>
                <div className="p-4">
                  <OrderForm symbol={symbol} currentPrice={currentPrice} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Trade List */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-3 border-b-2 border-gray-900">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Trades
              </h2>
            </div>
            <div className="p-4">
              <TradeList currentPrice={currentPrice} />
            </div>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
