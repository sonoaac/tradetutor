/**
 * MarketPage — educational trading encyclopedia.
 * Fully self-contained: no external price hooks, no lightweight-charts.
 * Uses the same PRNG price engine as SimulatorPage.
 */
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Search, TrendingUp, TrendingDown, BookOpen, Activity,
  Info, ArrowRight, Zap, Globe, BarChart2, Cpu,
} from 'lucide-react';
import { CanvasChart, type ChartCandle } from '@/components/CanvasChart';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'Stocks' | 'Crypto' | 'Forex' | 'Indices';

interface Asset {
  symbol: string; name: string; category: Category; sector: string;
  basePrice: number; vol: number; tick: number; desc: string; analogue: string;
}

// ─── Assets (same fictional names as simulator) ───────────────────────────────

const ASSETS: Asset[] = [
  { symbol: 'AXPC',    name: 'Apex Corp',       category: 'Stocks',  sector: 'Consumer Electronics', basePrice: 194.80,   vol: 0.018, tick: 0.01,    desc: 'Consumer-electronics giant with global brand loyalty',   analogue: '≈ Apple' },
  { symbol: 'VLTR',    name: 'Volta Motors',    category: 'Stocks',  sector: 'Electric Vehicles',    basePrice: 248.30,   vol: 0.040, tick: 0.01,    desc: 'EV disruptor redefining the auto industry',             analogue: '≈ Tesla' },
  { symbol: 'NRVA',    name: 'Nerva Chips',     category: 'Stocks',  sector: 'AI / Semiconductors',  basePrice: 875.20,   vol: 0.035, tick: 0.01,    desc: 'Dominant AI accelerator and GPU manufacturer',          analogue: '≈ NVIDIA' },
  { symbol: 'MXST',    name: 'Maxisoft Corp',   category: 'Stocks',  sector: 'Enterprise Software',  basePrice: 416.50,   vol: 0.016, tick: 0.01,    desc: 'Global cloud and enterprise software leader',           analogue: '≈ Microsoft' },
  { symbol: 'RIVX',    name: 'Rivex Commerce',  category: 'Stocks',  sector: 'E-Commerce',           basePrice: 188.40,   vol: 0.020, tick: 0.01,    desc: 'Everything-store with cloud services arm',              analogue: '≈ Amazon' },
  { symbol: 'MTRX',    name: 'Metrix Social',   category: 'Stocks',  sector: 'Social Media',         basePrice: 506.60,   vol: 0.025, tick: 0.01,    desc: 'Social and AR platform built on advertising revenue',   analogue: '≈ Meta' },
  { symbol: 'ALPH',    name: 'Alphex Systems',  category: 'Stocks',  sector: 'Search / Cloud',       basePrice: 174.80,   vol: 0.017, tick: 0.01,    desc: 'Search monopoly with dominant cloud division',          analogue: '≈ Alphabet' },
  { symbol: 'STRX',    name: 'StreamVault',     category: 'Stocks',  sector: 'Streaming',            basePrice: 631.50,   vol: 0.028, tick: 0.01,    desc: 'Subscription streaming leader across 190+ countries',   analogue: '≈ Netflix' },
  { symbol: 'XCEL',    name: 'XcelAMD',         category: 'Stocks',  sector: 'Processors',           basePrice: 165.40,   vol: 0.038, tick: 0.01,    desc: 'Advanced CPU/GPU design for gaming and data centers',   analogue: '≈ AMD' },
  { symbol: 'URBN',    name: 'UrbanRide',       category: 'Stocks',  sector: 'Rideshare',            basePrice: 78.90,    vol: 0.030, tick: 0.01,    desc: 'Rideshare marketplace and delivery platform',           analogue: '≈ Uber' },
  { symbol: 'ZYNC',    name: 'ZynCoin',         category: 'Crypto',  sector: 'Store of Value',       basePrice: 68500.00, vol: 0.045, tick: 1.00,    desc: 'Scarce digital store of value; 21M max supply',         analogue: '≈ Bitcoin' },
  { symbol: 'AETR',    name: 'Aether',          category: 'Crypto',  sector: 'Smart Contracts',      basePrice: 3840.00,  vol: 0.050, tick: 0.10,    desc: 'Programmable blockchain powering DeFi and NFTs',        analogue: '≈ Ethereum' },
  { symbol: 'SLIX',    name: 'Slix',            category: 'Crypto',  sector: 'High-Speed L1',        basePrice: 168.20,   vol: 0.060, tick: 0.01,    desc: 'Sub-second finality, 65k TPS capacity',                 analogue: '≈ Solana' },
  { symbol: 'BRIX',    name: 'BrixChain',       category: 'Crypto',  sector: 'Exchange Token',       basePrice: 598.40,   vol: 0.040, tick: 0.01,    desc: "Native token of the world's largest crypto exchange",   analogue: '≈ BNB' },
  { symbol: 'RIPX',    name: 'RipEx',           category: 'Crypto',  sector: 'Cross-Border Payments',basePrice: 0.58,     vol: 0.055, tick: 0.0001,  desc: 'Instant cross-border settlement protocol',              analogue: '≈ XRP' },
  { symbol: 'DOGG',    name: 'DogePound',       category: 'Crypto',  sector: 'Meme Coin',            basePrice: 0.142,    vol: 0.070, tick: 0.00001, desc: 'Community meme coin with massive retail following',      analogue: '≈ Dogecoin' },
  { symbol: 'AVLX',    name: 'Avalix',          category: 'Crypto',  sector: 'DeFi / Subnets',       basePrice: 38.60,    vol: 0.058, tick: 0.001,   desc: 'Multi-chain platform built for DeFi applications',       analogue: '≈ Avalanche' },
  { symbol: 'LNKX',    name: 'LinkEx',          category: 'Crypto',  sector: 'Oracle Network',       basePrice: 14.80,    vol: 0.052, tick: 0.001,   desc: 'Decentralised data feeds connecting blockchains',        analogue: '≈ Chainlink' },
  { symbol: 'EUR/UDC', name: 'Euro / UniDollar',   category: 'Forex', sector: 'Major Pair',    basePrice: 1.0842, vol: 0.005, tick: 0.00001, desc: 'Most-traded currency pair in the world', analogue: '≈ EUR/USD' },
  { symbol: 'BRX/UDC', name: 'Britex / UniDollar', category: 'Forex', sector: 'Major Pair',    basePrice: 1.2658, vol: 0.006, tick: 0.00001, desc: '"The Cable" — high-liquidity major pair',analogue: '≈ GBP/USD' },
  { symbol: 'UDC/YNX', name: 'UniDollar / Yanese', category: 'Forex', sector: 'Safe-Haven',   basePrice: 149.82, vol: 0.005, tick: 0.001,   desc: 'Classic carry-trade pair',               analogue: '≈ USD/JPY' },
  { symbol: 'ASD/UDC', name: 'Aussie / UniDollar', category: 'Forex', sector: 'Commodity FX', basePrice: 0.6521, vol: 0.006, tick: 0.00001, desc: 'Commodity-linked currency pair',          analogue: '≈ AUD/USD' },
  { symbol: 'TITAN500', name: 'Titan 500',  category: 'Indices', sector: 'Large-Cap Index',  basePrice: 5218.40,  vol: 0.012, tick: 0.01, desc: '500 largest companies by market cap',  analogue: '≈ S&P 500' },
  { symbol: 'VEGA100',  name: 'Vega 100',   category: 'Indices', sector: 'Tech Index',       basePrice: 18240.60, vol: 0.015, tick: 0.01, desc: 'Top 100 technology companies',          analogue: '≈ NASDAQ 100' },
  { symbol: 'ATLAS30',  name: 'Atlas 30',   category: 'Indices', sector: 'Blue-Chip Index',  basePrice: 39184.20, vol: 0.010, tick: 0.01, desc: '30 iconic blue-chip companies',         analogue: '≈ Dow Jones 30' },
  { symbol: 'VOLVIX',   name: 'Volvix',     category: 'Indices', sector: 'Volatility Index', basePrice: 18.40,    vol: 0.080, tick: 0.01, desc: 'Fear gauge — spikes on uncertainty',    analogue: '≈ VIX' },
];

const ASSET_MAP = new Map(ASSETS.map(a => [a.symbol, a]));

// ─── Price engine (same PRNG as SimulatorPage) ────────────────────────────────

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
function genCandle(asset: Asset, tickId: number, prevClose: number): ChartCandle {
  const seed = (hashStr(asset.symbol) ^ (tickId * 1_000_003)) >>> 0;
  const rand = mulberry32(seed);
  const u1 = rand() || 1e-9, u2 = rand();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const move = z * asset.vol * 0.015 * prevClose + (asset.basePrice - prevClose) * 0.001;
  const close = Math.max(prevClose * 0.001, prevClose + move);
  const wick1 = rand() * asset.vol * 0.008 * prevClose;
  const wick2 = rand() * asset.vol * 0.008 * prevClose;
  return {
    time: 1_700_000_000 + tickId * 7,
    open: prevClose, high: Math.max(prevClose, close) + wick1,
    low: Math.min(prevClose, close) - wick2, close,
    volume: 500 + rand() * 4500,
  };
}
function buildHistory(asset: Asset, startTick: number, count: number): ChartCandle[] {
  const result: ChartCandle[] = [];
  let prev = asset.basePrice;
  for (let i = 0; i < count; i++) {
    const c = genCandle(asset, startTick + i, prev);
    result.push(c); prev = c.close;
  }
  return result;
}

// ─── Format price ─────────────────────────────────────────────────────────────

function fmtPrice(price: number, asset: Asset): string {
  const d = asset.tick < 0.001 ? 5 : asset.tick < 0.1 ? 4 : 2;
  return price.toFixed(d);
}

// ─── Education content ────────────────────────────────────────────────────────

const EDU: Record<Category, { title: string; icon: React.ElementType; color: string; bg: string; summary: string; howItWorks: string; keyFacts: string[]; tip: string }> = {
  Stocks: {
    title: 'What is a Stock?', icon: BarChart2, color: '#2196f3', bg: '#2196f315',
    summary: 'A stock represents partial ownership of a company. Shareholders benefit when the company grows in value or pays dividends.',
    howItWorks: 'Companies list shares on exchanges so investors can buy and sell slices of ownership. Price is driven by earnings, growth expectations, and market sentiment. Stocks trade Monday–Friday during market hours.',
    keyFacts: ['Prices move on earnings reports, news & sentiment', 'Higher-growth stocks tend to be more volatile', 'Dividends = portion of profits paid to shareholders', 'Market cap = share price × total shares outstanding'],
    tip: 'Watch for earnings season — stocks can move 10–20% on a single report.',
  },
  Crypto: {
    title: 'What is Cryptocurrency?', icon: Cpu, color: '#ff9800', bg: '#ff980015',
    summary: 'Cryptocurrencies are decentralised digital assets secured by cryptography and recorded on a blockchain — a distributed public ledger no single party controls.',
    howItWorks: 'Supply and demand drive crypto prices 24/7, every day of the year. Some cryptos have fixed supply caps (like ZynCoin\'s 21M) while others are inflationary.',
    keyFacts: ['Crypto trades 24/7 — no market hours', 'Can move 10–20% in a single day', 'On-chain data is publicly verifiable', 'DeFi allows trading without intermediaries'],
    tip: 'Crypto volatility cuts both ways — use stop-losses religiously.',
  },
  Forex: {
    title: 'What is Forex?', icon: Globe, color: '#26a69a', bg: '#26a69a15',
    summary: 'Forex (Foreign Exchange) is the global marketplace for trading currency pairs — the largest financial market in the world with $7.5T traded daily.',
    howItWorks: 'You always trade one currency against another. Prices move in "pips" (0.0001) and are influenced by interest rates, GDP data, and geopolitics.',
    keyFacts: ['Pairs quote as BASE/QUOTE', '"Major" pairs always include USD (or equivalent)', 'Interest rate decisions are the biggest price driver', 'Leverage is common but amplifies losses too'],
    tip: 'Forex moves in pips. Even 0.0001 changes matter — size positions carefully.',
  },
  Indices: {
    title: 'What is a Market Index?', icon: Activity, color: '#9c27b0', bg: '#9c27b015',
    summary: 'An index measures the performance of a basket of assets — like the top 500 companies. Trading indices lets you bet on the broad market rather than individual stocks.',
    howItWorks: 'Index prices reflect a weighted average of all components. They\'re used as benchmarks for economic health. You trade index funds, ETFs, or futures based on the index.',
    keyFacts: ['Weighted by market cap — bigger companies count more', 'Moves reflect broad economic sentiment', 'Generally lower volatility than individual stocks', 'VIX (Volvix) = the "fear gauge" — spikes in panic'],
    tip: 'Indices are great for learning macro trends before diving into individual stocks.',
  },
};

// ─── Theme ────────────────────────────────────────────────────────────────────

const TV = { bg: '#131722', panel: '#1e2230', border: '#2a2e3e', text: '#d1d4dc', muted: '#6b7280', green: '#26a69a', red: '#ef5350' };

function volLabel(v: number) {
  if (v >= 0.06) return { label: 'Very High', color: '#ef5350' };
  if (v >= 0.04) return { label: 'High',      color: '#ff9800' };
  if (v >= 0.02) return { label: 'Medium',    color: '#f5c842' };
  return              { label: 'Low',         color: '#26a69a' };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const HISTORY_N = 100;
const START_TICK = 2000;

export default function MarketPage() {
  const [selectedSym, setSelectedSym] = useState('ZYNC');
  const [search,      setSearch]      = useState('');
  const [catFilter,   setCatFilter]   = useState<Category | 'All'>('All');
  const [mobileTab,   setMobileTab]   = useState<'list' | 'chart' | 'learn'>('list');

  // ── Price engine (same algorithm as SimulatorPage) ─────────────────────────
  const [prices,     setPrices]     = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map(a => [a.symbol, a.basePrice]))
  );
  const [livePrices, setLivePrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map(a => [a.symbol, a.basePrice]))
  );
  const [candles,    setCandles]    = useState<Record<string, ChartCandle[]>>(() =>
    Object.fromEntries(ASSETS.map(a => [a.symbol, buildHistory(a, START_TICK, HISTORY_N)]))
  );
  const tickIdRef = useRef(START_TICK + HISTORY_N);

  // 7-second candle tick
  useEffect(() => {
    const id = setInterval(() => {
      tickIdRef.current += 1;
      const tid = tickIdRef.current;
      setCandles(prev => {
        const next = { ...prev };
        const newP: Record<string, number> = {};
        ASSETS.forEach(a => {
          const hist  = prev[a.symbol] ?? [];
          const prevC = hist.length > 0 ? hist[hist.length - 1].close : a.basePrice;
          const c     = genCandle(a, tid, prevC);
          newP[a.symbol] = c.close;
          next[a.symbol] = [...hist.slice(-199), c];
        });
        setPrices(p => ({ ...p, ...newP }));
        return next;
      });
    }, 7000);
    return () => clearInterval(id);
  }, []);

  // 600ms micro-tick for smooth prices
  useEffect(() => {
    const id = setInterval(() => {
      setLivePrices(prev => {
        const next: Record<string, number> = {};
        ASSETS.forEach(a => {
          const anchor = prices[a.symbol] ?? a.basePrice;
          const p      = prev[a.symbol] ?? anchor;
          const noise  = (Math.random() - 0.5) * a.vol * 0.004 * anchor;
          const pull   = (anchor - p) * 0.3;
          next[a.symbol] = Math.max(anchor * 0.5, p + noise + pull);
        });
        return next;
      });
    }, 600);
    return () => clearInterval(id);
  }, [prices]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const asset      = ASSET_MAP.get(selectedSym)!;
  const edu        = EDU[asset.category];
  const EduIcon    = edu.icon;
  const vol        = volLabel(asset.vol);
  const livePrice  = livePrices[selectedSym] ?? asset.basePrice;
  const change     = ((livePrice - asset.basePrice) / asset.basePrice) * 100;
  const up         = change >= 0;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ASSETS.filter(a => {
      const matchCat = catFilter === 'All' || a.category === catFilter;
      const matchQ   = !q || a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, catFilter]);

  const topMovers = useMemo(() =>
    ASSETS.map(a => ({ a, chg: ((livePrices[a.symbol] ?? a.basePrice) - a.basePrice) / a.basePrice * 100 }))
      .sort((x, y) => Math.abs(y.chg) - Math.abs(x.chg))
      .slice(0, 8),
    [livePrices]
  );

  // ── Panels ────────────────────────────────────────────────────────────────

  const AssetList = (
    <div className="flex flex-col h-full" style={{ background: TV.bg }}>
      <div className="p-2 border-b" style={{ borderColor: TV.border }}>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ background: TV.panel }}>
          <Search size={12} style={{ color: TV.muted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent text-xs outline-none" style={{ color: TV.text }} />
        </div>
      </div>
      <div className="flex gap-1 p-2 border-b flex-wrap" style={{ borderColor: TV.border }}>
        {(['All', 'Stocks', 'Crypto', 'Forex', 'Indices'] as const).map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)}
            className="text-[10px] px-2 py-0.5 rounded transition-colors"
            style={{ background: catFilter === cat ? '#2196f3' : TV.panel, color: catFilter === cat ? '#fff' : TV.muted }}
          >{cat}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map(a => {
          const lp  = livePrices[a.symbol] ?? a.basePrice;
          const chg = ((lp - a.basePrice) / a.basePrice) * 100;
          return (
            <button key={a.symbol} onClick={() => { setSelectedSym(a.symbol); setMobileTab('chart'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 border-b transition-colors text-left"
              style={{ borderColor: TV.border, background: a.symbol === selectedSym ? TV.border : 'transparent', borderLeft: a.symbol === selectedSym ? '2px solid #2196f3' : '2px solid transparent' }}
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-none">{a.symbol}</p>
                <p className="text-[10px] truncate" style={{ color: TV.muted }}>{a.name}</p>
              </div>
              <div className="flex flex-col items-end ml-2">
                <p className="text-xs font-mono text-white">{fmtPrice(lp, a)}</p>
                <p className="text-[10px] font-mono" style={{ color: chg >= 0 ? TV.green : TV.red }}>{chg >= 0 ? '+' : ''}{chg.toFixed(2)}%</p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && <p className="text-center text-[11px] py-6" style={{ color: TV.muted }}>No assets found</p>}
      </div>
    </div>
  );

  const ChartPanel = (
    <div className="flex flex-col h-full" style={{ background: TV.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: TV.border, background: TV.panel }}>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-white text-lg">{selectedSym}</h2>
            <span className="text-sm" style={{ color: TV.muted }}>{asset.name}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="font-mono font-bold text-white text-xl">{fmtPrice(livePrice, asset)}</span>
            <span className="text-sm font-mono" style={{ color: up ? TV.green : TV.red }}>{up ? '+' : ''}{change.toFixed(2)}%</span>
            <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: vol.color + '22', color: vol.color }}>{vol.label} Vol</span>
            <span className="text-[10px] hidden sm:inline" style={{ color: TV.muted }}>{asset.analogue}</span>
          </div>
        </div>
        <Link href="/simulator">
          <a className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-bold" style={{ background: '#2196f3', color: '#fff' }}>
            Trade <ArrowRight size={14} />
          </a>
        </Link>
      </div>

      {/* Canvas chart — no watermark */}
      <div style={{ height: 300, flexShrink: 0 }}>
        <CanvasChart candles={candles[selectedSym] ?? []} livePrice={livePrice} />
      </div>

      {/* Educational content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-xl p-4" style={{ background: edu.bg, border: `1px solid ${edu.color}22` }}>
          <div className="flex items-center gap-2 mb-2">
            <EduIcon size={16} style={{ color: edu.color }} />
            <h3 className="font-bold text-white">{edu.title}</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: TV.text }}>{edu.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Sector',     value: asset.sector,       color: undefined },
            { label: 'Category',   value: asset.category,     color: edu.color },
            { label: 'Volatility', value: vol.label,          color: vol.color },
            { label: 'Tick Size',  value: String(asset.tick),  color: undefined },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 rounded-lg" style={{ background: TV.panel }}>
              <p className="text-[10px] font-medium mb-1" style={{ color: TV.muted }}>{label}</p>
              <p className="text-sm font-bold" style={{ color: color ?? '#fff' }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg" style={{ background: TV.panel }}>
          <div className="flex items-center gap-2 mb-2"><Info size={14} style={{ color: TV.muted }} /><h4 className="text-sm font-bold text-white">About {asset.name}</h4></div>
          <p className="text-sm mb-2" style={{ color: TV.text }}>{asset.desc}</p>
          <p className="text-xs" style={{ color: TV.muted }}><span className="font-medium" style={{ color: '#f5c842' }}>Educational analogue: </span>{asset.analogue}</p>
        </div>

        <div className="p-4 rounded-lg" style={{ background: TV.panel }}>
          <div className="flex items-center gap-2 mb-2"><BookOpen size={14} style={{ color: TV.muted }} /><h4 className="text-sm font-bold text-white">How {asset.category} Trading Works</h4></div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: TV.text }}>{edu.howItWorks}</p>
          <ul className="space-y-1.5">
            {edu.keyFacts.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: TV.text }}>
                <span style={{ color: edu.color }} className="mt-0.5">•</span>{f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: '#f5c84215', border: '1px solid #f5c84230' }}>
          <Zap size={14} style={{ color: '#f5c842', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: '#f5c842' }}>Pro Tip</p>
            <p className="text-xs leading-relaxed" style={{ color: TV.text }}>{edu.tip}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl text-center" style={{ background: '#2196f315', border: '1px solid #2196f330' }}>
          <p className="text-sm font-bold text-white mb-1">Ready to practice?</p>
          <p className="text-xs mb-3" style={{ color: TV.muted }}>
            Open a simulated position with $100k SimCash — zero real risk.
          </p>
          <Link href="/simulator">
            <a className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold" style={{ background: '#2196f3', color: '#fff' }}>
              Open Simulator <ArrowRight size={14} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <div className="p-3 overflow-y-auto h-full" style={{ background: TV.bg }}>
      <h4 className="text-xs font-bold text-white mb-2 px-1">Top Movers</h4>
      {topMovers.map(({ a, chg }) => {
        const Icon = chg >= 0 ? TrendingUp : TrendingDown;
        return (
          <button key={a.symbol} onClick={() => setSelectedSym(a.symbol)}
            className="w-full flex items-center justify-between px-2 py-2 rounded mb-1 transition-colors"
            style={{ background: a.symbol === selectedSym ? TV.panel : 'transparent' }}
          >
            <div className="flex items-center gap-2">
              <Icon size={12} style={{ color: chg >= 0 ? TV.green : TV.red }} />
              <span className="text-xs font-bold text-white">{a.symbol}</span>
            </div>
            <span className="text-xs font-mono" style={{ color: chg >= 0 ? TV.green : TV.red }}>
              {chg >= 0 ? '+' : ''}{chg.toFixed(2)}%
            </span>
          </button>
        );
      })}

      <div className="mt-4 space-y-3">
        <h4 className="text-xs font-bold text-white px-1">Market Concepts</h4>
        {[
          { term: 'Bull Market', def: 'A market rising 20%+ from recent lows. Optimism drives buying.', color: '#26a69a' },
          { term: 'Bear Market', def: 'A market falling 20%+ from recent highs. Fear dominates.',       color: '#ef5350' },
          { term: 'Liquidity',   def: 'How easily you can buy/sell without moving the price.',           color: '#2196f3' },
          { term: 'Spread',      def: 'Difference between the bid (sell) and ask (buy) price.',          color: '#ff9800' },
        ].map(({ term, def, color }) => (
          <div key={term} className="p-2.5 rounded-lg" style={{ background: TV.panel }}>
            <p className="text-xs font-bold mb-0.5" style={{ color }}>{term}</p>
            <p className="text-[10px] leading-relaxed" style={{ color: TV.muted }}>{def}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Ticker strip ───────────────────────────────────────────────────────────
  const TICKER = ['ZYNC','AXPC','NRVA','AETR','TITAN500','VLTR','SLIX','MXST','VEGA100'];

  return (
    <div className="flex flex-col h-full" style={{ background: TV.bg, color: TV.text }}>
      {/* Ticker */}
      <div className="flex items-center gap-6 px-4 py-2 overflow-x-auto border-b scrollbar-hide flex-shrink-0" style={{ borderColor: TV.border, background: TV.panel }}>
        {TICKER.map(sym => {
          const a  = ASSET_MAP.get(sym); if (!a) return null;
          const lp = livePrices[sym] ?? a.basePrice;
          const chg = ((lp - a.basePrice) / a.basePrice) * 100;
          return (
            <div key={sym} className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-white">{sym}</span>
              <span className="text-xs font-mono text-white">{fmtPrice(lp, a)}</span>
              <span className="text-[10px] font-mono" style={{ color: chg >= 0 ? TV.green : TV.red }}>{chg >= 0 ? '+' : ''}{chg.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b flex-shrink-0" style={{ borderColor: TV.border }}>
        {(['list', 'chart', 'learn'] as const).map(tab => (
          <button key={tab} onClick={() => setMobileTab(tab)}
            className="flex-1 py-2 text-[11px] font-medium"
            style={{ color: mobileTab === tab ? '#2196f3' : TV.muted, borderBottom: mobileTab === tab ? '2px solid #2196f3' : '2px solid transparent' }}
          >{tab === 'list' ? 'Markets' : tab === 'chart' ? 'Chart' : 'Learn'}</button>
        ))}
      </div>

      {/* Mobile panels */}
      <div className="flex md:hidden flex-1 overflow-hidden">
        {mobileTab === 'list'  && <div className="flex-1 overflow-hidden">{AssetList}</div>}
        {mobileTab === 'chart' && <div className="flex-1 overflow-hidden">{ChartPanel}</div>}
        {mobileTab === 'learn' && <div className="flex-1 overflow-y-auto">{RightPanel}</div>}
      </div>

      {/* Desktop 3-column */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <div className="w-[220px] flex-shrink-0 border-r overflow-hidden" style={{ borderColor: TV.border }}>{AssetList}</div>
        <div className="flex-1 overflow-hidden">{ChartPanel}</div>
        <div className="w-[220px] flex-shrink-0 border-l overflow-hidden" style={{ borderColor: TV.border }}>{RightPanel}</div>
      </div>
    </div>
  );
}
