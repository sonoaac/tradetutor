/**
 * Market Page — Educational trading market encyclopedia.
 * Shows all fake sim assets with live moving prices and teaches
 * users what each asset class is and how it trades.
 */
import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, BookOpen, Activity, Info, ArrowRight, Zap, Globe, BarChart2, Cpu, DollarSign } from 'lucide-react';
import { ASSETS, ASSET_MAP, formatPrice, type Asset, type AssetCategory } from '@/hooks/use-simulator';
import { useLivePrices } from '@/hooks/use-live-prices';
import { LiveCandleChart } from '@/components/simulator/LiveCandleChart';
import { useSimulator } from '@/hooks/use-simulator';
import { Link } from 'wouter';

// ─── Educational content by category ─────────────────────────────────────────

const CATEGORY_EDUCATION: Record<AssetCategory, {
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  summary: string;
  howItWorks: string;
  keyFacts: string[];
  tradingTip: string;
}> = {
  Stocks: {
    title: 'What is a Stock?',
    icon: BarChart2,
    color: '#2196f3',
    bg: '#2196f315',
    summary: 'A stock (or share) represents partial ownership of a company. When you buy a stock, you become a shareholder and may benefit if the company\'s value grows.',
    howItWorks: 'Companies list shares on exchanges so investors can buy and sell ownership slices. Price is driven by earnings, growth expectations, and market sentiment. Stocks trade Monday–Friday during market hours.',
    keyFacts: [
      'Prices move based on earnings reports, news, and sentiment',
      'Higher-growth stocks tend to be more volatile',
      'Dividends = a portion of profits paid to shareholders',
      'Market cap = share price × total shares outstanding',
    ],
    tradingTip: 'Watch for earnings season — stocks can move 10–20% on a single report.',
  },
  Crypto: {
    title: 'What is Cryptocurrency?',
    icon: Cpu,
    color: '#ff9800',
    bg: '#ff980015',
    summary: 'Cryptocurrencies are decentralized digital assets secured by cryptography and recorded on a blockchain — a distributed public ledger no single party controls.',
    howItWorks: 'Supply and demand drive crypto prices 24/7, every day of the year. There are no market hours. Some cryptos have fixed supply caps (like ZynCoin\'s 21M) while others are inflationary.',
    keyFacts: [
      'Crypto trades 24/7 — no market hours',
      'Extremely volatile — can move 10–20% in a single day',
      'On-chain data (wallet flows, active addresses) is public',
      'DeFi allows trading without traditional intermediaries',
    ],
    tradingTip: 'Crypto volatility cuts both ways — use stop-losses religiously.',
  },
  Forex: {
    title: 'What is Forex?',
    icon: Globe,
    color: '#26a69a',
    bg: '#26a69a15',
    summary: 'Forex (Foreign Exchange) is the global marketplace for trading currency pairs. With $7.5 trillion traded daily, it\'s the world\'s largest and most liquid financial market.',
    howItWorks: 'You always trade one currency against another (e.g. EURO/UDC means you buy Euros while selling Uni-Dollars). Prices move in "pips" (0.0001) and are influenced by interest rates, GDP, and geopolitics.',
    keyFacts: [
      'Pairs quote as BASE/QUOTE — buy base, sell quote',
      '"Major" pairs include UDC (Uni-Dollar) on one side',
      'Interest rate decisions move forex the most',
      'Leverage is common but amplifies losses too',
    ],
    tradingTip: 'Forex moves in pips. Even 0.0001 changes matter — size positions carefully.',
  },
  Indices: {
    title: 'What is a Market Index?',
    icon: Activity,
    color: '#9c27b0',
    bg: '#9c27b015',
    summary: 'An index measures the performance of a basket of assets — like the top 500 companies. Trading indices lets you bet on the whole market rather than individual stocks.',
    howItWorks: 'Index prices reflect the weighted average of all components. They\'re used as benchmarks. You can\'t buy an index directly — you trade index funds, ETFs, or futures.',
    keyFacts: [
      'TITAN500 is weighted by market cap — bigger companies count more',
      'Index moves reflect broad economic sentiment',
      'Lower volatility than individual stocks generally',
      'VIX (Volvix) = the "fear gauge" — rises when markets panic',
    ],
    tradingTip: 'Indices are great for learning market trends before diving into individual stocks.',
  },
};

// ─── Volatility label ─────────────────────────────────────────────────────────

function volLabel(v: number): { label: string; color: string } {
  if (v >= 0.06) return { label: 'Very High', color: '#ef5350' };
  if (v >= 0.04) return { label: 'High',      color: '#ff9800' };
  if (v >= 0.02) return { label: 'Medium',    color: '#f5c842' };
  return              { label: 'Low',         color: '#26a69a' };
}

// ─── TV colours ────────────────────────────────────────────────────────────────

const TV = {
  bg: '#131722', panel: '#1e2230', border: '#2a2e3e',
  text: '#d1d4dc', muted: '#6b7280', green: '#26a69a', red: '#ef5350',
};

const fmt$ = (n: number, decimals = 2) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// ─── Asset row ────────────────────────────────────────────────────────────────

function AssetRow({ asset, price, prevPrice, selected, onClick }: {
  asset: Asset; price: number; prevPrice: number; selected: boolean; onClick: () => void;
}) {
  const change = prevPrice > 0 ? ((price - prevPrice) / prevPrice) * 100 : 0;
  const up = change >= 0;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 border-b transition-colors text-left"
      style={{
        borderColor: TV.border,
        background: selected ? TV.border : 'transparent',
        borderLeft: selected ? `2px solid #2196f3` : '2px solid transparent',
      }}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-white leading-tight">{asset.symbol}</span>
        <span className="text-[10px] truncate" style={{ color: TV.muted }}>{asset.name}</span>
      </div>
      <div className="flex flex-col items-end ml-2">
        <span className="text-xs font-mono text-white">{formatPrice(price, asset)}</span>
        <span className="text-[10px] font-mono" style={{ color: up ? TV.green : TV.red }}>
          {up ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
    </button>
  );
}

// ─── Ticker bar ────────────────────────────────────────────────────────────────

function TickerBar({ prices, basePrices }: { prices: Record<string, number>; basePrices: Record<string, number> }) {
  const featured = ['ZYNC', 'AXPC', 'NRVA', 'AETR', 'TITAN500', 'VLTR', 'SLIX', 'MXST', 'VEGA100'];
  return (
    <div
      className="flex items-center gap-6 px-4 py-2 overflow-x-auto border-b scrollbar-hide"
      style={{ borderColor: TV.border, background: TV.panel }}
    >
      {featured.map(sym => {
        const asset = ASSET_MAP.get(sym);
        if (!asset) return null;
        const price = prices[sym] ?? asset.basePrice;
        const base  = basePrices[sym] ?? asset.basePrice;
        const chg   = ((price - base) / base) * 100;
        const up    = chg >= 0;
        return (
          <div key={sym} className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-white">{sym}</span>
            <span className="text-xs font-mono text-white">{formatPrice(price, asset)}</span>
            <span className="text-[10px] font-mono" style={{ color: up ? TV.green : TV.red }}>
              {up ? '+' : ''}{chg.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MarketPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ZYNC');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<AssetCategory | 'All'>('All');
  const [mobileTab, setMobileTab] = useState<'list' | 'chart' | 'learn'>('list');

  const livePrices = useLivePrices();

  // Use simulator just for candle data (no positions/balance needed here)
  const sim = useSimulator('free');

  const selectedAsset = ASSET_MAP.get(selectedSymbol)!;
  const edu = CATEGORY_EDUCATION[selectedAsset.category];
  const EduIcon = edu.icon;
  const vol = volLabel(selectedAsset.volatility);
  const livePrice = livePrices[selectedSymbol] ?? selectedAsset.basePrice;
  const basePrice = selectedAsset.basePrice;
  const change = ((livePrice - basePrice) / basePrice) * 100;
  const up = change >= 0;

  // Prev price = anchor from sim candles (last vs second-to-last)
  const basePrices = useMemo(() => {
    const bp: Record<string, number> = {};
    ASSETS.forEach(a => { bp[a.symbol] = a.basePrice; });
    return bp;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ASSETS.filter(a => {
      const matchCat = catFilter === 'All' || a.category === catFilter;
      const matchQ   = !q || a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, catFilter]);

  const categories: (AssetCategory | 'All')[] = ['All', 'Stocks', 'Crypto', 'Forex', 'Indices'];

  // ── Left panel: asset list ─────────────────────────────────────────────────
  const AssetList = (
    <div className="flex flex-col h-full" style={{ background: TV.bg }}>
      {/* Search */}
      <div className="p-2 border-b" style={{ borderColor: TV.border }}>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ background: TV.panel }}>
          <Search size={12} style={{ color: TV.muted }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: TV.text }}
          />
        </div>
      </div>
      {/* Category tabs */}
      <div className="flex gap-1 p-2 border-b flex-wrap" style={{ borderColor: TV.border }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            className="text-[10px] px-2 py-0.5 rounded transition-colors"
            style={{
              background: catFilter === cat ? '#2196f3' : TV.panel,
              color: catFilter === cat ? '#fff' : TV.muted,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map(asset => (
          <AssetRow
            key={asset.symbol}
            asset={asset}
            price={livePrices[asset.symbol] ?? asset.basePrice}
            prevPrice={basePrices[asset.symbol] ?? asset.basePrice}
            selected={asset.symbol === selectedSymbol}
            onClick={() => { setSelectedSymbol(asset.symbol); setMobileTab('chart'); }}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[11px] py-6" style={{ color: TV.muted }}>No assets found</p>
        )}
      </div>
    </div>
  );

  // ── Center panel: chart + educational info ─────────────────────────────────
  const ChartPanel = (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Symbol header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: TV.border, background: TV.panel }}>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-white text-lg">{selectedSymbol}</h2>
            <span className="text-sm" style={{ color: TV.muted }}>{selectedAsset.name}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="font-mono font-bold text-white text-xl">
              {formatPrice(livePrice, selectedAsset)}
            </span>
            <span className="text-sm font-mono" style={{ color: up ? TV.green : TV.red }}>
              {up ? '+' : ''}{change.toFixed(2)}%
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded font-medium"
              style={{ background: vol.color + '22', color: vol.color }}
            >
              {vol.label} Volatility
            </span>
          </div>
        </div>
        <Link href="/simulator">
          <a
            className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-bold transition-colors"
            style={{ background: '#2196f3', color: '#fff' }}
          >
            Practice Trade <ArrowRight size={14} />
          </a>
        </Link>
      </div>

      {/* Live chart */}
      <LiveCandleChart
        candles={sim.candles[selectedSymbol] ?? []}
        asset={selectedAsset}
        height={320}
      />

      {/* Educational content */}
      <div className="p-4 space-y-4">
        {/* About this asset */}
        <div className="rounded-xl p-4" style={{ background: edu.bg, border: `1px solid ${edu.color}22` }}>
          <div className="flex items-center gap-2 mb-2">
            <EduIcon size={16} style={{ color: edu.color }} />
            <h3 className="font-bold text-white">{edu.title}</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: TV.text }}>{edu.summary}</p>
        </div>

        {/* Asset-specific info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: TV.muted }}>Sector</p>
            <p className="text-sm font-bold text-white">{selectedAsset.sector}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: TV.muted }}>Category</p>
            <p className="text-sm font-bold" style={{ color: edu.color }}>{selectedAsset.category}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: TV.muted }}>Volatility</p>
            <p className="text-sm font-bold" style={{ color: vol.color }}>{vol.label}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: TV.muted }}>Tick Size</p>
            <p className="text-sm font-bold text-white">{selectedAsset.tickSize}</p>
          </div>
        </div>

        {/* About this symbol */}
        <div className="p-4 rounded-lg" style={{ background: TV.panel }}>
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} style={{ color: TV.muted }} />
            <h4 className="text-sm font-bold text-white">About {selectedAsset.name}</h4>
          </div>
          <p className="text-sm mb-2" style={{ color: TV.text }}>{selectedAsset.desc}</p>
          {selectedAsset.realWorldAnalogue && (
            <p className="text-xs" style={{ color: TV.muted }}>
              <span className="font-medium" style={{ color: '#f5c842' }}>Educational analogue: </span>
              {selectedAsset.realWorldAnalogue}
            </p>
          )}
        </div>

        {/* How this asset class works */}
        <div className="p-4 rounded-lg" style={{ background: TV.panel }}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} style={{ color: TV.muted }} />
            <h4 className="text-sm font-bold text-white">How {selectedAsset.category} Trading Works</h4>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: TV.text }}>{edu.howItWorks}</p>
          <ul className="space-y-1.5">
            {edu.keyFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: TV.text }}>
                <span style={{ color: edu.color }} className="mt-0.5">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tip */}
        <div
          className="flex items-start gap-3 p-3 rounded-lg"
          style={{ background: '#f5c84215', border: '1px solid #f5c84230' }}
        >
          <Zap size={14} style={{ color: '#f5c842', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: '#f5c842' }}>Pro Trading Tip</p>
            <p className="text-xs leading-relaxed" style={{ color: TV.text }}>{edu.tradingTip}</p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="p-4 rounded-xl text-center"
          style={{ background: '#2196f315', border: '1px solid #2196f330' }}
        >
          <p className="text-sm font-bold text-white mb-1">Ready to practice?</p>
          <p className="text-xs mb-3" style={{ color: TV.muted }}>
            Open a simulated {selectedAsset.category === 'Forex' ? 'currency pair' : selectedAsset.category.toLowerCase().slice(0, -1)} position with fake SimCash — zero real risk.
          </p>
          <Link href="/simulator">
            <a
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#2196f3', color: '#fff' }}
            >
              Open Simulator <ArrowRight size={14} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );

  // ── Right panel: top movers ────────────────────────────────────────────────
  const TopMovers = (
    <div className="p-3" style={{ background: TV.bg }}>
      <h4 className="text-xs font-bold text-white mb-2 px-1">Top Movers</h4>
      {ASSETS
        .map(a => ({
          asset: a,
          chg: ((livePrices[a.symbol] ?? a.basePrice) - a.basePrice) / a.basePrice * 100,
        }))
        .sort((a, b) => Math.abs(b.chg) - Math.abs(a.chg))
        .slice(0, 8)
        .map(({ asset, chg }) => {
          const up = chg >= 0;
          const Icon = up ? TrendingUp : TrendingDown;
          return (
            <button
              key={asset.symbol}
              onClick={() => setSelectedSymbol(asset.symbol)}
              className="w-full flex items-center justify-between px-2 py-2 rounded mb-1 transition-colors"
              style={{ background: asset.symbol === selectedSymbol ? TV.panel : 'transparent' }}
            >
              <div className="flex items-center gap-2">
                <Icon size={12} style={{ color: up ? TV.green : TV.red }} />
                <span className="text-xs font-bold text-white">{asset.symbol}</span>
              </div>
              <span className="text-xs font-mono" style={{ color: up ? TV.green : TV.red }}>
                {up ? '+' : ''}{chg.toFixed(2)}%
              </span>
            </button>
          );
        })}

      {/* Market insight cards */}
      <div className="mt-4 space-y-3">
        <h4 className="text-xs font-bold text-white px-1">Market Concepts</h4>
        {[
          { term: 'Bull Market', def: 'A market rising 20%+ from recent lows. Optimism drives buying.', color: '#26a69a' },
          { term: 'Bear Market', def: 'A market falling 20%+ from recent highs. Fear dominates.', color: '#ef5350' },
          { term: 'Liquidity',   def: 'How easy it is to buy/sell an asset without moving its price.', color: '#2196f3' },
          { term: 'Spread',      def: 'Difference between the bid (sell) and ask (buy) price.', color: '#ff9800' },
        ].map(({ term, def, color }) => (
          <div key={term} className="p-2.5 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-xs font-bold mb-0.5" style={{ color }}>{term}</p>
            <p className="text-[10px] leading-relaxed" style={{ color: TV.muted }}>{def}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Layout ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full" style={{ background: TV.bg, color: TV.text }}>
      {/* Ticker bar */}
      <TickerBar prices={livePrices} basePrices={basePrices} />

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b" style={{ borderColor: TV.border }}>
        {(['list', 'chart', 'learn'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className="flex-1 py-2 text-[11px] font-medium capitalize"
            style={{
              color: mobileTab === tab ? '#2196f3' : TV.muted,
              borderBottom: mobileTab === tab ? '2px solid #2196f3' : '2px solid transparent',
            }}
          >
            {tab === 'list' ? 'Markets' : tab === 'chart' ? 'Chart' : 'Learn'}
          </button>
        ))}
      </div>

      {/* Mobile panels */}
      <div className="flex md:hidden flex-1 overflow-hidden">
        {mobileTab === 'list'  && <div className="flex-1 overflow-y-auto">{AssetList}</div>}
        {mobileTab === 'chart' && <div className="flex-1 overflow-y-auto">{ChartPanel}</div>}
        {mobileTab === 'learn' && <div className="flex-1 overflow-y-auto">{TopMovers}</div>}
      </div>

      {/* Desktop 3-column */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Col 1: asset list (220px) */}
        <div className="w-[220px] flex-shrink-0 border-r overflow-hidden flex flex-col" style={{ borderColor: TV.border }}>
          {AssetList}
        </div>
        {/* Col 2: chart + edu (flex-1) */}
        <div className="flex-1 overflow-y-auto">
          {ChartPanel}
        </div>
        {/* Col 3: movers + concepts (220px) */}
        <div className="w-[220px] flex-shrink-0 border-l overflow-y-auto" style={{ borderColor: TV.border }}>
          {TopMovers}
        </div>
      </div>
    </div>
  );
}
