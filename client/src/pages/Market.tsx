import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'wouter';
import { Sidebar, MobileNav } from '@/components/Sidebar';
import { TradingChart } from '@/components/TradingChart';
import { useMarketCandles } from '@/hooks/use-market';
import { Search, TrendingUp, TrendingDown, Activity, BarChart3, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { apiUrl } from '@/lib/api';

interface Asset {
  symbol: string;
  name: string;
  sector: string;
  class: string;
  volatility: string;
    tier: 'free' | 'starter' | 'pro';
}

interface Quote {
  price: number;
  bid: number;
  ask: number;
  change?: number;
  changePercent?: number;
}

const FALLBACK_ASSETS: Asset[] = [
  { symbol: 'SMBY', name: 'SmartBuy', sector: 'Retail Electronics', class: 'stock', volatility: 'medium', tier: 'free' },
  { symbol: 'BTN', name: 'BitNova', sector: 'Store of Value', class: 'crypto', volatility: 'high', tier: 'free' },
    { symbol: 'PRTC', name: 'PearTech', sector: 'Consumer Tech', class: 'stock', volatility: 'medium', tier: 'pro' },
    { symbol: 'ETHA', name: 'Ethera', sector: 'Smart Contracts', class: 'crypto', volatility: 'high', tier: 'starter' },
    { symbol: 'VLTR', name: 'Voltra Motors', sector: 'EV / Auto', class: 'stock', volatility: 'high', tier: 'pro' },
    { symbol: 'SOLR', name: 'Solari', sector: 'Fast L1', class: 'crypto', volatility: 'very-high', tier: 'pro' },
    { symbol: 'TOP500', name: 'Top500', sector: 'Index', class: 'index', volatility: 'low', tier: 'starter' },
    { symbol: 'TCH100', name: 'Tech100', sector: 'Index', class: 'index', volatility: 'medium', tier: 'pro' },
    { symbol: 'USXEUR', name: 'USX/EURX', sector: 'FX Major', class: 'forex', volatility: 'low', tier: 'pro' },
    { symbol: 'USXYNK', name: 'USX/YENK', sector: 'FX Major', class: 'forex', volatility: 'low', tier: 'pro' },
];

function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const resolvedUrl = apiUrl(url);
  return fetch(resolvedUrl, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

export default function Market() {
  const [, navigate] = useLocation();
  
  const [allAssets, setAllAssets] = useState<Asset[]>(FALLBACK_ASSETS); // Start with fallback data
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('BTN');
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices'>('all');
  const [loading, setLoading] = useState(false);

  const { data: chartData, isLoading: chartLoading } = useMarketCandles(selectedSymbol);
  const currentPrice = chartData?.candles?.[chartData.candles.length - 1]?.close ?? 0;
  const firstPrice = chartData?.candles?.[0]?.close ?? 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? ((priceChange / firstPrice) * 100) : 0;

  // Prevent double-fetch in React StrictMode
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;

    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await fetchWithTimeout(`/api/assets/search?class=all&q=`, {}, 5000);
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        if (mounted && list.length > 0) {
          setAllAssets(list);
        }
      } catch (e) {
        if (mounted) {
          setAllAssets(FALLBACK_ASSETS);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    load();

    return () => {
      mounted = false;
    };
  }, []);

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

  useEffect(() => {
    if (filteredAssets.length === 0) return;
    const timer = setTimeout(() => {
      filteredAssets.slice(0, 30).forEach(asset => fetchQuote(asset.symbol));
    }, 250);
    return () => clearTimeout(timer);
  }, [filteredAssets]);

  const fetchQuote = async (symbol: string) => {
    try {
      const res = await fetchWithTimeout(`/api/market/quote/${symbol}`, {}, 3000);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const change = (Math.random() - 0.5) * data.price * 0.05;
      setQuotes(prev => ({ ...prev, [symbol]: { ...data, change, changePercent: (change / data.price) * 100 } }));
    } catch {
      generateFallbackQuote(symbol);
    }
  };

  const generateFallbackQuote = (symbol: string) => {
    const asset = allAssets.find(a => a.symbol === symbol);
    if (!asset) return;
    let price = 100;
    if (asset.class === 'crypto') price = Math.random() * 20000 + 1000;
    else if (asset.class === 'forex') price = Math.random() * 1.5 + 0.5;
    else if (asset.class === 'index') price = Math.random() * 3000 + 1000;
    const change = (Math.random() - 0.5) * price * 0.05;
    setQuotes(prev => ({ ...prev, [symbol]: { price, bid: price * 0.999, ask: price * 1.001, change, changePercent: (change / price) * 100 } }));
  };

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
        <div className="flex">
          {/* Left Sidebar - Asset List */}
          <div className="w-80 border-r-2 border-gray-200 bg-white h-[calc(100vh-140px)] overflow-y-auto">
            {/* Search & Filters */}
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
              
              {/* Tab Filters */}
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

            {/* Asset List */}
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading markets...</div>
              ) : filteredAssets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No assets found</div>
              ) : (
                filteredAssets.map(asset => {
                  const quote = quotes[asset.symbol];
                  const isPositive = (quote?.change ?? 0) >= 0;
                  const isSelected = selectedSymbol === asset.symbol;
                  
                  return (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      className={`w-full p-3 hover:bg-blue-50 transition-colors text-left ${
                        isSelected ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="font-bold text-black text-sm">{asset.symbol}</div>
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
            {/* Chart Header */}
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
                
                {selectedQuote && currentPrice > 0 && (
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Price</div>
                      <div className="text-3xl font-mono font-bold text-black">${currentPrice.toFixed(2)}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      priceChange >= 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div className={`flex items-center gap-2 text-lg font-bold ${
                        priceChange >= 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {priceChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/simulator')}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-lg"
                    >
                      Trade Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Chart Tabs */}
            <div className="bg-white border-b border-gray-200 px-6">
              <div className="flex gap-6 text-sm">
                {['Chart', 'Order Book', 'Trades', 'Info'].map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
                      tab === 'Chart'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-black'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="p-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
                <TradingChart 
                  data={chartData?.candles || []} 
                  symbol={selectedSymbol} 
                  isLoading={chartLoading}
                />
              </div>
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tier</span>
                        <span className="font-semibold text-black capitalize">{selectedAsset?.tier}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Top Movers */}
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
      
      <MobileNav />
    </div>
  );
}
