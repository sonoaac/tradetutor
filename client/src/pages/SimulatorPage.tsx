/**
 * SimulatorPage — fully self-contained trading simulator.
 * Zero API calls. Zero WebSockets. Zero real-world data.
 *
 * Price engine:
 *   • Seeded mulberry32 PRNG → deterministic 7-second candles
 *   • 600 ms Brownian-motion micro-tick for smooth live price display
 *   • Mean-reversion toward the current candle anchor
 *   • 26 fictional assets across Stocks / Crypto / Forex / Indices
 *
 * Trading:
 *   • Long / Short positions with optional SL & TP
 *   • SL / TP auto-executed on every 7-second candle tick
 *   • SimCash and trade history persisted in localStorage
 */
import {
  useState, useEffect, useRef, useCallback, useMemo,
  type CSSProperties,
} from 'react';
import { createChart, CrosshairMode, ColorType } from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';
import {
  TrendingUp, TrendingDown, X, RefreshCw,
  BarChart2, Target, Activity, DollarSign, Flame,
  ChevronRight, AlertTriangle,
} from 'lucide-react';

// ─── Theme ──────────────────────────────────────────────────────────────────

const C = {
  bg:     '#131722',
  panel:  '#1e2230',
  border: '#2a2e3e',
  text:   '#d1d4dc',
  muted:  '#6b7280',
  green:  '#26a69a',
  red:    '#ef5350',
  blue:   '#2196f3',
  yellow: '#f5c842',
  orange: '#ff9800',
} as const;

// ─── Assets ─────────────────────────────────────────────────────────────────

type Category = 'Stocks' | 'Crypto' | 'Forex' | 'Indices';

interface Asset {
  symbol: string;
  name: string;
  category: Category;
  basePrice: number;
  vol: number;      // daily volatility fraction (0.02 = 2 %)
  tick: number;     // minimum price increment
  desc: string;
  analogue: string;
}

const ASSETS: Asset[] = [
  // Stocks
  { symbol: 'AXPC',  name: 'Apex Corp',      category: 'Stocks',  basePrice: 194.80,   vol: 0.018, tick: 0.01,    desc: 'Consumer-electronics giant',          analogue: '≈ Apple' },
  { symbol: 'VLTR',  name: 'Volta Motors',   category: 'Stocks',  basePrice: 248.30,   vol: 0.040, tick: 0.01,    desc: 'EV disruptor',                        analogue: '≈ Tesla' },
  { symbol: 'NRVA',  name: 'Nerva Chips',    category: 'Stocks',  basePrice: 875.20,   vol: 0.035, tick: 0.01,    desc: 'AI-chip & GPU leader',                analogue: '≈ NVIDIA' },
  { symbol: 'MXST',  name: 'Maxisoft Corp',  category: 'Stocks',  basePrice: 416.50,   vol: 0.016, tick: 0.01,    desc: 'Cloud & enterprise software',         analogue: '≈ Microsoft' },
  { symbol: 'RIVX',  name: 'Rivex Commerce', category: 'Stocks',  basePrice: 188.40,   vol: 0.020, tick: 0.01,    desc: 'E-commerce & cloud giant',            analogue: '≈ Amazon' },
  { symbol: 'MTRX',  name: 'Metrix Social',  category: 'Stocks',  basePrice: 506.60,   vol: 0.025, tick: 0.01,    desc: 'Social-media & AR platform',          analogue: '≈ Meta' },
  { symbol: 'ALPH',  name: 'Alphex Systems', category: 'Stocks',  basePrice: 174.80,   vol: 0.017, tick: 0.01,    desc: 'Search & cloud division',             analogue: '≈ Alphabet' },
  { symbol: 'STRX',  name: 'StreamVault',    category: 'Stocks',  basePrice: 631.50,   vol: 0.028, tick: 0.01,    desc: 'Subscription streaming leader',       analogue: '≈ Netflix' },
  { symbol: 'XCEL',  name: 'XcelAMD',        category: 'Stocks',  basePrice: 165.40,   vol: 0.038, tick: 0.01,    desc: 'CPU/GPU for gaming & data centers',   analogue: '≈ AMD' },
  { symbol: 'URBN',  name: 'UrbanRide',      category: 'Stocks',  basePrice: 78.90,    vol: 0.030, tick: 0.01,    desc: 'Rideshare & delivery platform',       analogue: '≈ Uber' },
  // Crypto
  { symbol: 'ZYNC',  name: 'ZynCoin',        category: 'Crypto',  basePrice: 68500.00, vol: 0.045, tick: 1.00,    desc: 'Scarce digital store-of-value',       analogue: '≈ Bitcoin' },
  { symbol: 'AETR',  name: 'Aether',         category: 'Crypto',  basePrice: 3840.00,  vol: 0.050, tick: 0.10,    desc: 'Smart-contract blockchain',           analogue: '≈ Ethereum' },
  { symbol: 'SLIX',  name: 'Slix',           category: 'Crypto',  basePrice: 168.20,   vol: 0.060, tick: 0.01,    desc: '65 k TPS high-speed L1',              analogue: '≈ Solana' },
  { symbol: 'BRIX',  name: 'BrixChain',      category: 'Crypto',  basePrice: 598.40,   vol: 0.040, tick: 0.01,    desc: 'Exchange native token',               analogue: '≈ BNB' },
  { symbol: 'RIPX',  name: 'RipEx',          category: 'Crypto',  basePrice: 0.58,     vol: 0.055, tick: 0.0001,  desc: 'Cross-border settlement',             analogue: '≈ XRP' },
  { symbol: 'DOGG',  name: 'DogePound',      category: 'Crypto',  basePrice: 0.142,    vol: 0.070, tick: 0.00001, desc: 'Community meme coin',                 analogue: '≈ Dogecoin' },
  { symbol: 'AVLX',  name: 'Avalix',         category: 'Crypto',  basePrice: 38.60,    vol: 0.058, tick: 0.001,   desc: 'Multi-chain DeFi platform',           analogue: '≈ Avalanche' },
  { symbol: 'LNKX',  name: 'LinkEx',         category: 'Crypto',  basePrice: 14.80,    vol: 0.052, tick: 0.001,   desc: 'Decentralised oracle network',        analogue: '≈ Chainlink' },
  // Forex
  { symbol: 'EUR/UDC', name: 'Euro / UniDollar',   category: 'Forex', basePrice: 1.0842, vol: 0.005, tick: 0.00001, desc: 'Most-traded currency pair', analogue: '≈ EUR/USD' },
  { symbol: 'BRX/UDC', name: 'Britex / UniDollar', category: 'Forex', basePrice: 1.2658, vol: 0.006, tick: 0.00001, desc: '"The Cable"',                analogue: '≈ GBP/USD' },
  { symbol: 'UDC/YNX', name: 'UniDollar / Yanese', category: 'Forex', basePrice: 149.82, vol: 0.005, tick: 0.001,   desc: 'Classic carry-trade pair',  analogue: '≈ USD/JPY' },
  { symbol: 'ASD/UDC', name: 'Aussie / UniDollar', category: 'Forex', basePrice: 0.6521, vol: 0.006, tick: 0.00001, desc: 'Commodity-linked FX',        analogue: '≈ AUD/USD' },
  // Indices
  { symbol: 'TITAN500', name: 'Titan 500',  category: 'Indices', basePrice: 5218.40,  vol: 0.012, tick: 0.01, desc: '500 largest companies',     analogue: '≈ S&P 500' },
  { symbol: 'VEGA100',  name: 'Vega 100',   category: 'Indices', basePrice: 18240.60, vol: 0.015, tick: 0.01, desc: 'Top 100 tech companies',    analogue: '≈ NASDAQ 100' },
  { symbol: 'ATLAS30',  name: 'Atlas 30',   category: 'Indices', basePrice: 39184.20, vol: 0.010, tick: 0.01, desc: '30 blue-chip industrials', analogue: '≈ Dow Jones 30' },
  { symbol: 'VOLVIX',   name: 'Volvix',     category: 'Indices', basePrice: 18.40,    vol: 0.080, tick: 0.01, desc: 'Fear gauge — spikes on uncertainty', analogue: '≈ VIX' },
];

const ASSET_MAP = new Map(ASSETS.map(a => [a.symbol, a]));
const FIRST_SYM = ASSETS[0].symbol; // 'AXPC'

// ─── Price formatting ────────────────────────────────────────────────────────

function fmtPrice(price: number, asset: Asset): string {
  const decimals = asset.tick < 0.001 ? 5 : asset.tick < 0.01 ? 4 : asset.tick < 0.1 ? 2 : asset.tick < 1 ? 2 : 2;
  return price.toFixed(decimals);
}

function fmt$(n: number): string {
  return `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}

// ─── Seeded PRNG (mulberry32) ─────────────────────────────────────────────────

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

// ─── Candle type ─────────────────────────────────────────────────────────────

interface Candle {
  time: number;   // unix seconds (used by lightweight-charts)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ─── Deterministic candle generation ─────────────────────────────────────────

function genCandle(asset: Asset, tickId: number, prevClose: number): Candle {
  const seed = (hashStr(asset.symbol) ^ (tickId * 1_000_003)) >>> 0;
  const rand = mulberry32(seed);
  // Box-Muller for normal distribution
  const u1 = rand() || 1e-9;
  const u2 = rand();
  const z  = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const tickVol = asset.vol * 0.015;
  const move    = z * tickVol * prevClose;
  // Add slight trend + mean-reversion toward basePrice
  const drift = (asset.basePrice - prevClose) * 0.001;
  const close  = Math.max(prevClose * 0.001, prevClose + move + drift);
  // High / low wickS
  const wick1 = rand() * asset.vol * 0.008 * prevClose;
  const wick2 = rand() * asset.vol * 0.008 * prevClose;
  const high   = Math.max(prevClose, close) + wick1;
  const low    = Math.min(prevClose, close) - wick2;
  const volume = 500 + rand() * 4500;

  return {
    time: 1_700_000_000 + tickId * 7, // fake epoch; advances 7s per tick
    open: prevClose,
    high,
    low,
    close,
    volume,
  };
}

// Build N historical candles starting from an asset's base price
function buildHistory(asset: Asset, startTickId: number, count: number): Candle[] {
  const result: Candle[] = [];
  let prev = asset.basePrice;
  for (let i = 0; i < count; i++) {
    const c = genCandle(asset, startTickId + i, prev);
    result.push(c);
    prev = c.close;
  }
  return result;
}

// ─── Position & trade types ───────────────────────────────────────────────────

type Direction = 'long' | 'short';

interface Position {
  id: string;
  symbol: string;
  direction: Direction;
  quantity: number;
  entryPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  openedAt: number;
  // computed on render:
  pnl: number;
  pnlPct: number;
}

interface ClosedTrade {
  id: string;
  symbol: string;
  direction: Direction;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPct: number;
  closedAt: number;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS_CASH    = 'tt_sim_cash_v1';
const LS_HISTORY = 'tt_sim_history_v1';
const START_CASH = 100_000; // $100 000 SimCash

function loadCash(): number {
  try { const v = localStorage.getItem(LS_CASH); return v ? parseFloat(v) : START_CASH; } catch { return START_CASH; }
}
function saveCash(n: number) { try { localStorage.setItem(LS_CASH, String(n)); } catch { /* */ } }
function loadHistory(): ClosedTrade[] {
  try { const v = localStorage.getItem(LS_HISTORY); return v ? JSON.parse(v) : []; } catch { return []; }
}
function saveHistory(h: ClosedTrade[]) { try { localStorage.setItem(LS_HISTORY, JSON.stringify(h.slice(0, 200))); } catch { /* */ } }

// ─── Indicator math ───────────────────────────────────────────────────────────

function sma(closes: number[], period: number): (number | null)[] {
  return closes.map((_, i) => {
    if (i < period - 1) return null;
    return closes.slice(i - period + 1, i + 1).reduce((s, v) => s + v, 0) / period;
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryChip({ cat }: { cat: Category }) {
  const bg: Record<Category, string> = { Stocks: '#2196f333', Crypto: '#ff980033', Forex: '#26a69a33', Indices: '#9c27b033' };
  const fg: Record<Category, string> = { Stocks: '#2196f3',   Crypto: '#ff9800',   Forex: '#26a69a',   Indices: '#9c27b0'   };
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: bg[cat], color: fg[cat] }}>
      {cat}
    </span>
  );
}

function PnlBadge({ value, pct }: { value: number; pct: number }) {
  const color = value >= 0 ? C.green : C.red;
  const Icon  = value >= 0 ? TrendingUp : TrendingDown;
  return (
    <span style={{ color }} className="flex items-center gap-1 text-xs font-mono font-bold">
      <Icon size={12} />
      {fmt$(value)} ({fmtPct(pct)})
    </span>
  );
}

// ─── Candle chart using lightweight-charts ────────────────────────────────────

interface ChartProps {
  candles: Candle[];
  asset: Asset;
  livePrice: number;
  entryPrice?: number | null;
  stopLoss?: number | null;
  takeProfit?: number | null;
}

function CandleChart({ candles, asset, livePrice, entryPrice, stopLoss, takeProfit }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<IChartApi | null>(null);
  const candleRef    = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const ma9Ref       = useRef<ISeriesApi<'Line'> | null>(null);
  const ma21Ref      = useRef<ISeriesApi<'Line'> | null>(null);
  const volRef       = useRef<ISeriesApi<'Histogram'> | null>(null);

  // Build chart once
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: C.bg }, textColor: C.text },
      grid:   { vertLines: { color: C.border }, horzLines: { color: C.border } },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: C.border },
      timeScale: { borderColor: C.border, timeVisible: true, secondsVisible: false },
      width:  containerRef.current.clientWidth,
      height: containerRef.current.clientHeight || 380,
    });

    const cs = chart.addCandlestickSeries({
      upColor: C.green, downColor: C.red,
      borderUpColor: C.green, borderDownColor: C.red,
      wickUpColor: C.green, wickDownColor: C.red,
    });

    const ma9  = chart.addLineSeries({ color: '#00bcd4', lineWidth: 1, priceLineVisible: false });
    const ma21 = chart.addLineSeries({ color: '#ff9800', lineWidth: 1, priceLineVisible: false });

    // Volume on separate scale
    const vol = chart.addHistogramSeries({
      color: C.border, priceFormat: { type: 'volume' },
      priceScaleId: 'vol',
    });
    chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.80, bottom: 0 } });

    chartRef.current  = chart;
    candleRef.current = cs;
    ma9Ref.current    = ma9;
    ma21Ref.current   = ma21;
    volRef.current    = vol;

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width:  containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 380,
        });
      }
    });
    ro.observe(containerRef.current);

    return () => { ro.disconnect(); chart.remove(); chartRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update data when candles change
  useEffect(() => {
    if (!candleRef.current || !ma9Ref.current || !ma21Ref.current || !volRef.current) return;
    if (candles.length === 0) return;

    // Append live price to last candle for display
    const withLive = candles.map((c, i) =>
      i === candles.length - 1
        ? { ...c, close: livePrice, high: Math.max(c.high, livePrice), low: Math.min(c.low, livePrice) }
        : c
    );

    candleRef.current.setData(withLive.map(c => ({ time: c.time as any, open: c.open, high: c.high, low: c.low, close: c.close })));

    const closes = withLive.map(c => c.close);
    const times  = withLive.map(c => c.time as any);

    const ma9v  = sma(closes, 9);
    const ma21v = sma(closes, 21);

    ma9Ref.current.setData(
      ma9v.map((v, i) => v != null ? { time: times[i], value: v } : null).filter(Boolean) as any[]
    );
    ma21Ref.current.setData(
      ma21v.map((v, i) => v != null ? { time: times[i], value: v } : null).filter(Boolean) as any[]
    );
    volRef.current.setData(
      withLive.map(c => ({ time: c.time as any, value: c.volume, color: c.close >= c.open ? C.green + '66' : C.red + '66' }))
    );

    // Price lines: remove & re-add
    try { candleRef.current.setMarkers([]); } catch { /* */ }

    if (entryPrice) {
      candleRef.current.createPriceLine({ price: entryPrice, color: '#2196f3', lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'Entry' });
    }
    if (stopLoss) {
      candleRef.current.createPriceLine({ price: stopLoss, color: C.red, lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'SL' });
    }
    if (takeProfit) {
      candleRef.current.createPriceLine({ price: takeProfit, color: C.green, lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'TP' });
    }

    chartRef.current?.timeScale().scrollToRealTime();
  }, [candles, livePrice, entryPrice, stopLoss, takeProfit]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

// ─── Main Simulator ───────────────────────────────────────────────────────────

// Interval constants
const CANDLE_MS = 7_000;   // new candle every 7 s
const MICRO_MS  = 600;     // live price micro-tick every 600 ms
const HISTORY_N = 120;     // candles to seed on mount

export default function SimulatorPage() {
  // ── Asset selection
  const [selectedSym, setSelectedSym] = useState<string>(FIRST_SYM);
  const [catFilter, setCatFilter]     = useState<Category | null>(null);

  const asset = ASSET_MAP.get(selectedSym)!; // always valid

  // ── Price state (entire universe)
  const [prices,     setPrices]     = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map(a => [a.symbol, a.basePrice]))
  );
  const [livePrices, setLivePrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map(a => [a.symbol, a.basePrice]))
  );
  const [candles,    setCandles]    = useState<Record<string, Candle[]>>(() => {
    const startTick = 1000;
    return Object.fromEntries(ASSETS.map(a => [a.symbol, buildHistory(a, startTick, HISTORY_N)]));
  });

  // Track current tick id in a ref (shared across timers)
  const tickIdRef = useRef<number>(1000 + HISTORY_N);

  // ── Trading state
  const [simCash,    setSimCash]    = useState<number>(loadCash);
  const [positions,  setPositions]  = useState<Position[]>([]);
  const [history,    setHistory]    = useState<ClosedTrade[]>(loadHistory);
  const [wins,       setWins]       = useState(0);
  const [losses,     setLosses]     = useState(0);
  const [streak,     setStreak]     = useState(0);

  // ── UI state
  const [direction,  setDirection]  = useState<Direction>('long');
  const [qty,        setQty]        = useState('1');
  const [slInput,    setSlInput]    = useState('');
  const [tpInput,    setTpInput]    = useState('');
  const [activeTab,  setActiveTab]  = useState<'positions' | 'history'>('positions');
  const [mobileTab,  setMobileTab]  = useState<'chart' | 'order' | 'markets'>('chart');
  const [error,      setError]      = useState<string | null>(null);

  // Persist cash whenever it changes
  useEffect(() => { saveCash(simCash); }, [simCash]);
  useEffect(() => { saveHistory(history); }, [history]);

  // ── 7-second candle tick ──────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      tickIdRef.current += 1;
      const tid = tickIdRef.current;

      setCandles(prev => {
        const next = { ...prev };
        const newPrices: Record<string, number> = {};

        ASSETS.forEach(a => {
          const hist    = prev[a.symbol] ?? [];
          const prevC   = hist.length > 0 ? hist[hist.length - 1].close : a.basePrice;
          const candle  = genCandle(a, tid, prevC);
          newPrices[a.symbol] = candle.close;
          next[a.symbol] = [...hist.slice(-199), candle]; // keep last 200
        });

        // Update prices (done inside setCandles to share the same tick)
        setPrices(p => ({ ...p, ...newPrices }));

        // SL / TP auto-execution — must run after candle generated
        // We'll handle it in a separate effect via prices dependency
        return next;
      });
    }, CANDLE_MS);

    return () => clearInterval(id);
  }, []);

  // ── 600 ms micro-tick for smooth live prices ──────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setLivePrices(prev => {
        const next: Record<string, number> = {};
        ASSETS.forEach(a => {
          const anchor = prices[a.symbol] ?? a.basePrice;
          const prev_  = prev[a.symbol] ?? anchor;
          // Brownian motion toward anchor
          const noise  = (Math.random() - 0.5) * a.vol * 0.004 * anchor;
          const pull   = (anchor - prev_) * 0.3;
          const raw    = prev_ + noise + pull;
          next[a.symbol] = Math.max(anchor * 0.5, raw);
        });
        return next;
      });
    }, MICRO_MS);
    return () => clearInterval(id);
  }, [prices]);

  // ── SL / TP auto-execution on new candle ─────────────────────────────────
  useEffect(() => {
    if (positions.length === 0) return;

    setPositions(prev => {
      const remaining: Position[] = [];
      const closed:    ClosedTrade[] = [];
      let cashDelta = 0;

      prev.forEach(pos => {
        const p    = prices[pos.symbol] ?? pos.entryPrice;
        const hit  = checkSlTp(pos, p);

        if (hit) {
          const pnl    = calcPnl(pos, p);
          const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;
          closed.push({ id: pos.id, symbol: pos.symbol, direction: pos.direction, quantity: pos.quantity, entryPrice: pos.entryPrice, exitPrice: p, pnl, pnlPct, closedAt: Date.now() });
          cashDelta += pos.entryPrice * pos.quantity + pnl;
          if (pnl > 0) { setWins(w => w + 1); setStreak(s => s + 1); }
          else         { setLosses(l => l + 1); setStreak(_ => 0); }
        } else {
          remaining.push({ ...pos, pnl: calcPnl(pos, p), pnlPct: (calcPnl(pos, p) / (pos.entryPrice * pos.quantity)) * 100 });
        }
      });

      if (closed.length > 0) {
        setHistory(h => [...closed, ...h]);
        setSimCash(c => c + cashDelta);
      }
      return remaining;
    });
  }, [prices]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ───────────────────────────────────────────────────────────────
  function calcPnl(pos: Position, price: number): number {
    const diff = price - pos.entryPrice;
    return pos.direction === 'long' ? diff * pos.quantity : -diff * pos.quantity;
  }

  function checkSlTp(pos: Position, price: number): boolean {
    if (pos.stopLoss != null) {
      if (pos.direction === 'long'  && price <= pos.stopLoss)  return true;
      if (pos.direction === 'short' && price >= pos.stopLoss) return true;
    }
    if (pos.takeProfit != null) {
      if (pos.direction === 'long'  && price >= pos.takeProfit) return true;
      if (pos.direction === 'short' && price <= pos.takeProfit) return true;
    }
    return false;
  }

  // ── Trade actions ─────────────────────────────────────────────────────────
  const livePrice     = livePrices[selectedSym] ?? asset.basePrice;
  const qtyNum        = parseFloat(qty) || 0;
  const slNum         = parseFloat(slInput)  || null;
  const tpNum         = parseFloat(tpInput)  || null;
  const cost          = qtyNum * livePrice;
  const openPnl       = positions.reduce((s, p) => s + p.pnl, 0);
  const totalBalance  = simCash + positions.reduce((s, p) => s + p.entryPrice * p.quantity, 0) + openPnl;
  const winRate       = (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  const rrRatio = useMemo(() => {
    if (!slNum || !tpNum || !livePrice || !qtyNum) return null;
    const risk   = Math.abs(livePrice - slNum)  * qtyNum;
    const reward = Math.abs(livePrice - tpNum) * qtyNum;
    if (risk === 0) return null;
    return (reward / risk).toFixed(2);
  }, [slNum, tpNum, livePrice, qtyNum]);

  const handleBuy = useCallback(() => {
    setError(null);
    if (!qtyNum || qtyNum <= 0) { setError('Enter a valid quantity'); return; }
    if (cost > simCash)         { setError('Insufficient SimCash'); return; }
    if (positions.length >= 20) { setError('Max 20 open positions'); return; }

    const newPos: Position = {
      id: crypto.randomUUID(),
      symbol: selectedSym,
      direction,
      quantity: qtyNum,
      entryPrice: livePrice,
      stopLoss: slNum,
      takeProfit: tpNum,
      openedAt: Date.now(),
      pnl: 0,
      pnlPct: 0,
    };
    setPositions(p => [...p, newPos]);
    setSimCash(c => c - cost);
    setQty('1');
    setSlInput('');
    setTpInput('');
  }, [qtyNum, cost, simCash, positions.length, selectedSym, direction, livePrice, slNum, tpNum]);

  const closePos = useCallback((pos: Position) => {
    const price  = livePrices[pos.symbol] ?? pos.entryPrice;
    const pnl    = calcPnl(pos, price);
    const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;
    const closed: ClosedTrade = { id: pos.id, symbol: pos.symbol, direction: pos.direction, quantity: pos.quantity, entryPrice: pos.entryPrice, exitPrice: price, pnl, pnlPct, closedAt: Date.now() };
    setPositions(p => p.filter(x => x.id !== pos.id));
    setHistory(h => [closed, ...h]);
    setSimCash(c => c + pos.entryPrice * pos.quantity + pnl);
    if (pnl > 0) { setWins(w => w + 1); setStreak(s => s + 1); }
    else         { setLosses(l => l + 1); setStreak(_ => 0); }
  }, [livePrices]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetAccount = useCallback(() => {
    if (!confirm('Reset your SimCash account back to $100,000?')) return;
    setSimCash(START_CASH);
    setPositions([]);
    setHistory([]);
    setWins(0); setLosses(0); setStreak(0);
    saveCash(START_CASH);
    saveHistory([]);
  }, []);

  // ── Watchlist ─────────────────────────────────────────────────────────────
  const watchlist = catFilter ? ASSETS.filter(a => a.category === catFilter) : ASSETS;

  const activePos = positions.find(p => p.symbol === selectedSym) ?? null;
  const selectedCandles = candles[selectedSym] ?? [];

  // ─────────────────────────────────────────────────────────────────────────
  // Panels
  // ─────────────────────────────────────────────────────────────────────────

  const WatchlistPanel = (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: C.bg }}>
      {/* Header */}
      <div className="px-3 py-2 border-b flex-shrink-0" style={{ borderColor: C.border }}>
        <p className="text-xs font-bold text-white mb-2">Markets</p>
        <div className="flex gap-1 flex-wrap">
          {(['All', 'Stocks', 'Crypto', 'Forex', 'Indices'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c === 'All' ? null : c as Category)}
              className="text-[10px] px-2 py-0.5 rounded transition-colors"
              style={{
                background: (catFilter ?? 'All') === c ? C.blue : C.border,
                color:      (catFilter ?? 'All') === c ? '#fff'  : C.muted,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {watchlist.map(a => {
          const lp   = livePrices[a.symbol] ?? a.basePrice;
          const base = a.basePrice;
          const chg  = ((lp - base) / base) * 100;
          const up   = chg >= 0;
          return (
            <button
              key={a.symbol}
              onClick={() => setSelectedSym(a.symbol)}
              className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors"
              style={{
                background:  a.symbol === selectedSym ? C.border : 'transparent',
                borderLeft:  a.symbol === selectedSym ? `2px solid ${C.blue}` : '2px solid transparent',
              }}
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-none">{a.symbol}</p>
                <p className="text-[10px] truncate" style={{ color: C.muted }}>{a.name}</p>
              </div>
              <div className="flex flex-col items-end ml-2">
                <p className="text-xs font-mono text-white">{fmtPrice(lp, a)}</p>
                <p className="text-[10px] font-mono" style={{ color: up ? C.green : C.red }}>{fmtPct(chg)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const OrderPanel = (
    <div className="flex flex-col overflow-y-auto h-full" style={{ background: C.panel }}>
      {/* Account */}
      <div className="px-3 py-2.5 border-b space-y-1" style={{ borderColor: C.border }}>
        <Row label="SimCash"   value={fmt$(simCash)}       color="white" />
        <Row label="Equity"    value={fmt$(totalBalance)}  color="white" />
        <Row label="Open P&L"  value={fmt$(openPnl)}       color={openPnl >= 0 ? C.green : C.red} />
      </div>
      {/* Stats */}
      <div className="px-3 py-2 border-b" style={{ borderColor: C.border }}>
        <div className="flex gap-4 text-[10px]" style={{ color: C.muted }}>
          <span>Win Rate <b className="text-white">{winRate}%</b></span>
          <span>Streak   <b style={{ color: C.yellow }}>{streak}</b></span>
          <span>Trades   <b className="text-white">{wins + losses}</b></span>
        </div>
      </div>
      {/* Symbol */}
      <div className="px-3 py-2 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-bold text-white">{asset.symbol}</span>
          <CategoryChip cat={asset.category} />
        </div>
        <p className="text-[10px]" style={{ color: C.muted }}>{asset.name} · {asset.analogue}</p>
        <p className="text-xl font-mono font-bold text-white mt-1">{fmtPrice(livePrice, asset)}</p>
      </div>
      {/* Direction */}
      <div className="px-3 py-2 border-b" style={{ borderColor: C.border }}>
        <div className="flex rounded overflow-hidden border" style={{ borderColor: C.border }}>
          <button
            onClick={() => setDirection('long')}
            className="flex-1 py-1.5 text-xs font-bold"
            style={{ background: direction === 'long' ? C.green : 'transparent', color: direction === 'long' ? '#fff' : C.muted }}
          >LONG</button>
          <button
            onClick={() => setDirection('short')}
            className="flex-1 py-1.5 text-xs font-bold"
            style={{ background: direction === 'short' ? C.red : 'transparent', color: direction === 'short' ? '#fff' : C.muted }}
          >SHORT</button>
        </div>
      </div>
      {/* Inputs */}
      <div className="px-3 py-2 space-y-2 border-b" style={{ borderColor: C.border }}>
        <InputField label="Quantity"    value={qty}     onChange={setQty}     placeholder="e.g. 1" />
        <InputField label="Stop Loss"   value={slInput} onChange={setSlInput} placeholder={`e.g. ${fmtPrice(livePrice * (direction === 'long' ? 0.97 : 1.03), asset)}`} highlight={slInput ? C.red : undefined} />
        <InputField label="Take Profit" value={tpInput} onChange={setTpInput} placeholder={`e.g. ${fmtPrice(livePrice * (direction === 'long' ? 1.03 : 0.97), asset)}`} highlight={tpInput ? C.green : undefined} />
        {rrRatio && (
          <Row label="Risk : Reward" value={`1 : ${rrRatio}`} color={parseFloat(rrRatio) >= 2 ? C.green : C.yellow} />
        )}
        <Row label="Cost" value={fmt$(cost)} color={cost <= simCash ? C.text : C.red} />
      </div>
      {/* Error */}
      {error && (
        <div className="mx-3 mt-2 flex items-center gap-1.5 text-[11px] px-2 py-1.5 rounded" style={{ background: C.red + '22', color: C.red }}>
          <AlertTriangle size={12} /> {error}
        </div>
      )}
      {/* Buy/Sell button */}
      <div className="px-3 py-2">
        <button
          onClick={handleBuy}
          className="w-full py-2.5 text-sm font-bold rounded transition-opacity"
          style={{ background: direction === 'long' ? C.green : C.red, color: '#fff', opacity: (!qtyNum || cost > simCash) ? 0.4 : 1 }}
        >
          {direction === 'long' ? 'BUY' : 'SELL'} {asset.symbol}
        </button>
        <p className="text-[10px] text-center mt-1" style={{ color: C.muted }}>
          {positions.length}/20 positions open
        </p>
      </div>
      {/* Reset */}
      <div className="px-3 pb-4 mt-auto">
        <button onClick={resetAccount} className="w-full py-1.5 text-[10px] rounded flex items-center justify-center gap-1" style={{ background: C.border, color: C.muted }}>
          <RefreshCw size={10} /> Reset Account
        </button>
      </div>
    </div>
  );

  const BottomTabs = (
    <div style={{ background: C.panel, borderTop: `1px solid ${C.border}` }}>
      <div className="flex border-b" style={{ borderColor: C.border }}>
        {(['positions', 'history'] as const).map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="flex-1 py-2 text-[11px] font-medium capitalize"
            style={{
              color:        activeTab === t ? C.blue : C.muted,
              borderBottom: activeTab === t ? `2px solid ${C.blue}` : '2px solid transparent',
            }}
          >
            {t === 'positions' ? `Positions (${positions.length})` : 'History'}
          </button>
        ))}
      </div>
      <div className="max-h-48 overflow-y-auto">
        {activeTab === 'positions' && (
          positions.length === 0
            ? <p className="text-[11px] text-center py-4" style={{ color: C.muted }}>No open positions — place a trade above</p>
            : positions.map(pos => {
                const p = livePrices[pos.symbol] ?? pos.entryPrice;
                const pnl    = calcPnl(pos, p);
                const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;
                return (
                  <div key={pos.id} className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: C.border }}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: pos.direction === 'long' ? C.green + '33' : C.red + '33', color: pos.direction === 'long' ? C.green : C.red }}>
                        {pos.direction.toUpperCase()}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">{pos.symbol}</p>
                        <p className="text-[10px]" style={{ color: C.muted }}>{pos.quantity} @ {fmtPrice(pos.entryPrice, ASSET_MAP.get(pos.symbol)!)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PnlBadge value={pnl} pct={pnlPct} />
                      <button onClick={() => setSelectedSym(pos.symbol)} title="View chart">
                        <ChevronRight size={14} style={{ color: C.muted }} />
                      </button>
                      <button onClick={() => closePos({ ...pos, pnl, pnlPct })} title="Close position">
                        <X size={14} style={{ color: C.red }} />
                      </button>
                    </div>
                  </div>
                );
              })
        )}
        {activeTab === 'history' && (
          history.length === 0
            ? <p className="text-[11px] text-center py-4" style={{ color: C.muted }}>No closed trades yet</p>
            : history.slice(0, 50).map(t => (
              <div key={t.id} className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: t.direction === 'long' ? C.green + '33' : C.red + '33', color: t.direction === 'long' ? C.green : C.red }}>
                    {t.direction.toUpperCase()}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white">{t.symbol}</p>
                    <p className="text-[10px]" style={{ color: C.muted }}>
                      {t.quantity} · {fmtPrice(t.entryPrice, ASSET_MAP.get(t.symbol)!)} → {fmtPrice(t.exitPrice, ASSET_MAP.get(t.symbol)!)}
                    </p>
                  </div>
                </div>
                <PnlBadge value={t.pnl} pct={t.pnlPct} />
              </div>
            ))
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, color: C.text }}>

      {/* ── Mobile tab bar ─────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-shrink-0 border-b" style={{ borderColor: C.border }}>
        {(['chart', 'order', 'markets'] as const).map(t => (
          <button
            key={t}
            onClick={() => setMobileTab(t)}
            className="flex-1 py-2 text-[11px] font-medium capitalize"
            style={{
              color:        mobileTab === t ? C.blue : C.muted,
              borderBottom: mobileTab === t ? `2px solid ${C.blue}` : '2px solid transparent',
            }}
          >
            {t === 'markets' ? 'Markets' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Mobile content ─────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-1 flex-col overflow-hidden">
        {mobileTab === 'chart' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
              <CandleChart
                candles={selectedCandles}
                asset={asset}
                livePrice={livePrice}
                entryPrice={activePos?.entryPrice}
                stopLoss={activePos?.stopLoss}
                takeProfit={activePos?.takeProfit}
              />
            </div>
            {BottomTabs}
          </div>
        )}
        {mobileTab === 'order'   && <div className="flex-1 overflow-y-auto">{OrderPanel}</div>}
        {mobileTab === 'markets' && <div className="flex-1 overflow-y-auto">{WatchlistPanel}</div>}
      </div>

      {/* ── Desktop 3-column ───────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Col 1 — Watchlist */}
        <div className="w-[200px] flex-shrink-0 border-r flex flex-col overflow-hidden" style={{ borderColor: C.border }}>
          {WatchlistPanel}
        </div>

        {/* Col 2 — Chart + bottom tabs */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Chart header */}
          <div className="flex items-center gap-3 px-3 py-1.5 flex-shrink-0 border-b" style={{ borderColor: C.border }}>
            <span className="font-bold text-white text-sm">{asset.symbol}</span>
            <CategoryChip cat={asset.category} />
            <span className="font-mono text-sm text-white">{fmtPrice(livePrice, asset)}</span>
            <span className="text-xs font-mono" style={{ color: ((livePrice - asset.basePrice) / asset.basePrice) >= 0 ? C.green : C.red }}>
              {fmtPct(((livePrice - asset.basePrice) / asset.basePrice) * 100)}
            </span>
            <span className="text-[10px] ml-2" style={{ color: C.muted }}>{asset.desc}</span>
            <span className="text-[10px] ml-auto" style={{ color: C.muted }}>{asset.analogue}</span>
          </div>
          {/* Chart fills remaining space */}
          <div className="flex-1 min-h-0">
            <CandleChart
              candles={selectedCandles}
              asset={asset}
              livePrice={livePrice}
              entryPrice={activePos?.entryPrice}
              stopLoss={activePos?.stopLoss}
              takeProfit={activePos?.takeProfit}
            />
          </div>
          {BottomTabs}
        </div>

        {/* Col 3 — Order panel */}
        <div className="w-[260px] flex-shrink-0 border-l flex flex-col overflow-hidden" style={{ borderColor: C.border }}>
          {OrderPanel}
        </div>
      </div>
    </div>
  );
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: C.muted }}>{label}</span>
      <span className="font-mono font-bold" style={{ color: color || C.text }}>{value}</span>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, highlight }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; highlight?: string;
}) {
  return (
    <div>
      <label className="text-[10px] mb-1 block" style={{ color: C.muted }}>{label}</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2 py-1.5 text-xs rounded font-mono outline-none"
        style={{ background: C.bg, border: `1px solid ${highlight ?? C.border}`, color: C.text }}
      />
    </div>
  );
}
