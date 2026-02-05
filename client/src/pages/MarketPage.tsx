import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'wouter';
import { Sidebar } from '@/components/Sidebar';
import { MobileMenu } from '@/components/MobileMenu';
import { SimpleTradingChart } from '@/components/SimpleTradingChart';
import { Search, TrendingUp, TrendingDown, BarChart3, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  sector: string;
  class: string;
  volatility: string;
  tier: string;
}

interface Quote {
  price: number;
  bid: number;
  ask: number;
  change?: number;
  changePercent?: number;
}

const FALLBACK_ASSETS: Asset[] = [
  // Tech Stocks
  { symbol: 'SMBY', name: 'SmartBuy', sector: 'Retail Electronics', class: 'stock', volatility: 'medium', tier: 'free' },
  { symbol: 'PRTC', name: 'PearTech', sector: 'Consumer Tech', class: 'stock', volatility: 'medium', tier: 'gold' },
  { symbol: 'VLTR', name: 'Voltra Motors', sector: 'EV / Auto', class: 'stock', volatility: 'high', tier: 'gold' },
  { symbol: 'NXTG', name: 'NextGen AI', sector: 'Artificial Intelligence', class: 'stock', volatility: 'very-high', tier: 'gold' },
  { symbol: 'STRM', name: 'StreamFlix', sector: 'Entertainment', class: 'stock', volatility: 'medium', tier: 'free' },
  { symbol: 'CYPH', name: 'CypherSec', sector: 'Cybersecurity', class: 'stock', volatility: 'high', tier: 'gold' },
  
  // Financial & Energy
  { symbol: 'GLBL', name: 'GlobalBank', sector: 'Banking', class: 'stock', volatility: 'low', tier: 'free' },
  { symbol: 'FNXT', name: 'FinNext', sector: 'Fintech', class: 'stock', volatility: 'medium', tier: 'gold' },
  { symbol: 'SOLX', name: 'SolarMax', sector: 'Clean Energy', class: 'stock', volatility: 'high', tier: 'gold' },
  { symbol: 'OILX', name: 'OilCorp', sector: 'Energy', class: 'stock', volatility: 'medium', tier: 'free' },
  
  // Consumer & Healthcare
  { symbol: 'BITE', name: 'BiteFood', sector: 'Food Delivery', class: 'stock', volatility: 'high', tier: 'gold' },
  { symbol: 'HLTH', name: 'HealthPlus', sector: 'Healthcare', class: 'stock', volatility: 'low', tier: 'free' },
  { symbol: 'GENO', name: 'GenoBio', sector: 'Biotech', class: 'stock', volatility: 'very-high', tier: 'gold' },
  
  // Crypto
  { symbol: 'BTN', name: 'Bitcoin', sector: 'Store of Value', class: 'crypto', volatility: 'very-high', tier: 'free' },
  { symbol: 'ETHA', name: 'Ethereum', sector: 'Smart Contracts', class: 'crypto', volatility: 'very-high', tier: 'free' },
  { symbol: 'SOLR', name: 'Solana', sector: 'Fast L1 Blockchain', class: 'crypto', volatility: 'very-high', tier: 'gold' },
  { symbol: 'ADA', name: 'Cardano', sector: 'Proof of Stake', class: 'crypto', volatility: 'very-high', tier: 'gold' },
  { symbol: 'MATIC', name: 'Polygon', sector: 'L2 Scaling', class: 'crypto', volatility: 'very-high', tier: 'gold' },
  
  // Indices
  { symbol: 'TOP500', name: 'S&P 500', sector: 'Large Cap Index', class: 'index', volatility: 'low', tier: 'free' },
  { symbol: 'TCH100', name: 'NASDAQ 100', sector: 'Tech Index', class: 'index', volatility: 'medium', tier: 'gold' },
];

export default function MarketPage() {
  const [, navigate] = useLocation();
  const [allAssets, setAllAssets] = useState<Asset[]>(FALLBACK_ASSETS);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('BTN');
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices'>('all');

  const filteredAssets = useMemo(() => {
    const classMap = { all: "all", stocks: "stock", crypto: "crypto", forex: "forex", indices: "index" };
    const wantedClass = classMap[activeTab] ?? "all";
    const q = searchQuery.trim().toLowerCase();

    return allAssets.filter(asset => {
      const matchesTab = wantedClass === "all" || asset.class === wantedClass;
      const matchesSearch = !q || asset.name.toLowerCase().includes(q) || asset.symbol.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [allAssets, activeTab, searchQuery]);

  // Initialize prices once
  useEffect(() => {
    const initialPrices: Record<string, Quote> = {};
    allAssets.forEach(asset => {
      let basePrice = 100;
      if (asset.class === 'crypto') basePrice = Math.random() * 20000 + 10000;
      else if (asset.class === 'forex') basePrice = Math.random() * 0.5 + 1.0;
      else if (asset.class === 'index') basePrice = Math.random() * 2000 + 2000;
      else basePrice = Math.random() * 200 + 50;
      
      const change = (Math.random() - 0.5) * basePrice * 0.02;
      initialPrices[asset.symbol] = { 
        price: basePrice, 
        bid: basePrice * 0.9995, 
        ask: basePrice * 1.0005, 
        change, 
        changePercent: (change / basePrice) * 100 
      };
    });
    setQuotes(initialPrices);
  }, []);

  // Live price updates - realistic simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(prev => {
        const updated = { ...prev };
        
        // Update prices for visible assets
        filteredAssets.slice(0, 30).forEach(asset => {
          if (updated[asset.symbol]) {
            const current = updated[asset.symbol];
            const volatilityMap: Record<string, number> = {
              'low': 0.0002,
              'medium': 0.0005,
              'high': 0.001,
              'very-high': 0.002
            };
            const volatility = volatilityMap[asset.volatility] || 0.0005;
            
            // Random walk with slight upward drift
            const priceChange = (Math.random() - 0.48) * current.price * volatility;
            const newPrice = Math.max(current.price + priceChange, 0.01);
            const newChange = newPrice - (current.price - (current.change || 0));
            
            updated[asset.symbol] = {
              price: newPrice,
              bid: newPrice * 0.9995,
              ask: newPrice * 1.0005,
              change: newChange,
              changePercent: (newChange / (newPrice - newChange)) * 100
            };
          }
        });
        
        return updated;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [filteredAssets]);

  const selectedAsset = allAssets.find(a => a.symbol === selectedSymbol);
  const selectedQuote = quotes[selectedSymbol];

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        {/* Top Ticker Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-700 px-6 py-2 overflow-x-auto">
          <div className="flex items-center gap-8 text-sm whitespace-nowrap">
            {allAssets.slice(0, 8).map(asset => {
              const quote = quotes[asset.symbol];
              const isPositive = (quote?.change ?? 0) >= 0;
              return (
                <div key={asset.symbol} className="flex items-center gap-2">
                  <span className="text-gray-400 font-semibold">{asset.symbol}</span>
                  {quote && (
                    <>
                      <span className="text-white font-mono font-bold">${quote.price.toFixed(2)}</span>
                      <span className={`font-mono text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? '+' : ''}{quote.changePercent?.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar - Asset List - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block w-80 border-r-2 border-gray-200 bg-white h-[calc(100vh-140px)] overflow-y-auto">
            <div className="p-4 border-b-2 border-gray-200 sticky top-0 bg-white z-10">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              
              <div className="flex gap-1">
                {(['all', 'stocks', 'crypto', 'forex', 'indices'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredAssets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No assets found</div>
              ) : (
                filteredAssets.map(asset => {
                  const quote = quotes[asset.symbol];
                  const isPositive = (quote?.change ?? 0) >= 0;
                  const isSelected = selectedSymbol === asset.symbol;
                  
                  // Asset category icons
                  const getAssetIcon = (assetClass: string) => {
                    switch (assetClass) {
                      case 'stock': return '📈';
                      case 'crypto': return '₿';
                      case 'forex': return '💱';
                      case 'index': return '🌍';
                      default: return '💼';
                    }
                  };
                  
                  return (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      className={`w-full p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all text-left group ${
                        isSelected ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 shadow-md' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="font-bold text-black text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span className="text-base">{getAssetIcon(asset.class)}</span>
                            {asset.symbol}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{asset.name}</div>
                        </div>
                        {quote && (
                          <div className="text-right">
                            <div className="font-mono font-bold text-sm text-black">${quote.price.toFixed(2)}</div>
                            <div className={`flex items-center gap-1 text-xs font-semibold ${
                              isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {isPositive ? '+' : ''}{quote.changePercent?.toFixed(2)}%
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{asset.sector}</div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Center - Chart Area */}
          <div className="flex-1 bg-gray-50">
            <div className="bg-white border-b-2 border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                      {selectedSymbol}
                      {selectedAsset && (
                        <span className="text-lg text-gray-500 font-normal">{selectedAsset.name}</span>
                      )}
                    </h2>
                    {selectedAsset && (
                      <p className="text-sm text-gray-600">{selectedAsset.sector}</p>
                    )}
                  </div>
                </div>
                
                {selectedQuote && (
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Price</div>
                      <div className="text-3xl font-mono font-bold text-black">${selectedQuote.price.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => navigate('/simulator')}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-105"
                    >
                      Trade Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <SimpleTradingChart
                symbol={selectedSymbol}
                currentPrice={selectedQuote?.price || 100}
              />
            </div>
          </div>

          {/* Right Sidebar - Market Stats */}
          <div className="w-80 border-l-2 border-gray-200 bg-white h-[calc(100vh-140px)] overflow-y-auto">
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <h3 className="font-bold text-black flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Market Overview
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {selectedQuote && (
                <>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 uppercase font-semibold mb-2">Quote Details</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bid</span>
                        <span className="font-mono font-bold text-black">${selectedQuote.bid.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ask</span>
                        <span className="font-mono font-bold text-black">${selectedQuote.ask.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spread</span>
                        <span className="font-mono font-bold text-black">${(selectedQuote.ask - selectedQuote.bid).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 uppercase font-semibold mb-2">Asset Info</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-semibold text-black capitalize">{selectedAsset?.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volatility</span>
                        <span className={`font-semibold capitalize ${
                          selectedAsset?.volatility === 'low' ? 'text-green-600' :
                          selectedAsset?.volatility === 'medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {selectedAsset?.volatility}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t-2 border-gray-200 pt-4">
                <h4 className="text-xs text-gray-600 uppercase font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Top Movers
                </h4>
                <div className="space-y-2">
                  {allAssets.slice(0, 5).map(asset => {
                    const quote = quotes[asset.symbol];
                    if (!quote) return null;
                    const isPositive = (quote.change ?? 0) >= 0;
                    return (
                      <button
                        key={asset.symbol}
                        onClick={() => setSelectedSymbol(asset.symbol)}
                        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <div>
                          <div className="font-semibold text-sm text-black">{asset.symbol}</div>
                          <div className="text-xs text-gray-500">${quote.price.toFixed(2)}</div>
                        </div>
                        <div className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{quote.changePercent?.toFixed(2)}%
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileMenu />
}
