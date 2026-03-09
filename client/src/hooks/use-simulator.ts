import { useState, useEffect, useCallback, useRef } from 'react';
import { subscribeSimTicker, getSimTickerSnapshot } from '@/lib/sim-ticker';

// ─── Asset Definitions (all fictional — educational analogues only) ───────────

export type AssetCategory = 'Stocks' | 'Crypto' | 'Forex' | 'Indices';

export interface Asset {
  symbol: string;
  name: string;
  category: AssetCategory;
  sector: string;
  basePrice: number;
  volatility: number;   // fractional daily vol (e.g. 0.02 = 2%)
  tickSize: number;
  desc: string;         // short educational description
  realWorldAnalogue?: string; // e.g. "Similar to Apple Inc."
}

export const ASSETS: Asset[] = [
  // ── Stocks ──────────────────────────────────────────────────────────────
  { symbol: 'AXPC',  name: 'Apex Corp',       category: 'Stocks',  sector: 'Consumer Electronics', basePrice: 194.80, volatility: 0.018, tickSize: 0.01, desc: 'Consumer electronics giant with global brand loyalty',    realWorldAnalogue: 'Similar to Apple Inc.' },
  { symbol: 'VLTR',  name: 'Volta Motors',    category: 'Stocks',  sector: 'Electric Vehicles',    basePrice: 248.30, volatility: 0.040, tickSize: 0.01, desc: 'EV disruptor redefining the auto industry',               realWorldAnalogue: 'Similar to Tesla Inc.' },
  { symbol: 'NRVA',  name: 'Nerva Chips',     category: 'Stocks',  sector: 'AI / Semiconductors',  basePrice: 875.20, volatility: 0.035, tickSize: 0.01, desc: 'Dominant AI accelerator and GPU manufacturer',           realWorldAnalogue: 'Similar to NVIDIA Corp.' },
  { symbol: 'MXST',  name: 'Maxisoft Corp',   category: 'Stocks',  sector: 'Enterprise Software',  basePrice: 416.50, volatility: 0.016, tickSize: 0.01, desc: 'Global cloud and enterprise software leader',            realWorldAnalogue: 'Similar to Microsoft Corp.' },
  { symbol: 'RIVX',  name: 'Rivex Commerce',  category: 'Stocks',  sector: 'E-Commerce',           basePrice: 188.40, volatility: 0.020, tickSize: 0.01, desc: 'Everything-store with cloud services arm',               realWorldAnalogue: 'Similar to Amazon.com Inc.' },
  { symbol: 'MTRX',  name: 'Metrix Social',   category: 'Stocks',  sector: 'Social Media',         basePrice: 506.60, volatility: 0.025, tickSize: 0.01, desc: 'Social and AR platform built on advertising revenue',    realWorldAnalogue: 'Similar to Meta Platforms.' },
  { symbol: 'ALPH',  name: 'Alphex Systems',  category: 'Stocks',  sector: 'Search / Cloud',       basePrice: 174.80, volatility: 0.017, tickSize: 0.01, desc: 'Search monopoly with dominant cloud division',          realWorldAnalogue: 'Similar to Alphabet Inc.' },
  { symbol: 'STRX',  name: 'StreamVault',     category: 'Stocks',  sector: 'Streaming',            basePrice: 631.50, volatility: 0.028, tickSize: 0.01, desc: 'Subscription streaming leader across 190+ countries',   realWorldAnalogue: 'Similar to Netflix Inc.' },
  { symbol: 'XCEL',  name: 'XcelAMD',         category: 'Stocks',  sector: 'Processors',           basePrice: 165.40, volatility: 0.038, tickSize: 0.01, desc: 'Advanced CPU/GPU design for gaming and data centers',   realWorldAnalogue: 'Similar to AMD.' },
  { symbol: 'URBN',  name: 'UrbanRide',       category: 'Stocks',  sector: 'Rideshare',            basePrice: 78.90,  volatility: 0.030, tickSize: 0.01, desc: 'Rideshare marketplace and delivery platform',           realWorldAnalogue: 'Similar to Uber Technologies.' },
  // ── Crypto ──────────────────────────────────────────────────────────────
  { symbol: 'ZYNC',  name: 'ZynCoin',         category: 'Crypto',  sector: 'Store of Value',       basePrice: 68500.00,  volatility: 0.045, tickSize: 1.00,    desc: 'Scarce digital store of value; 21M max supply',       realWorldAnalogue: 'Similar to Bitcoin (BTC).' },
  { symbol: 'AETR',  name: 'Aether',          category: 'Crypto',  sector: 'Smart Contracts',      basePrice: 3840.00,   volatility: 0.050, tickSize: 0.10,    desc: 'Programmable blockchain powering DeFi and NFTs',     realWorldAnalogue: 'Similar to Ethereum (ETH).' },
  { symbol: 'SLIX',  name: 'Slix',            category: 'Crypto',  sector: 'High-Speed L1',        basePrice: 168.20,    volatility: 0.060, tickSize: 0.01,    desc: 'Sub-second finality, 65k TPS capacity',              realWorldAnalogue: 'Similar to Solana (SOL).' },
  { symbol: 'BRIX',  name: 'BrixChain',       category: 'Crypto',  sector: 'Exchange Token',       basePrice: 598.40,    volatility: 0.040, tickSize: 0.01,    desc: 'Native token of the world\'s largest crypto exchange', realWorldAnalogue: 'Similar to BNB.' },
  { symbol: 'RIPX',  name: 'RipEx',           category: 'Crypto',  sector: 'Cross-Border Payments',basePrice: 0.58,      volatility: 0.055, tickSize: 0.0001,  desc: 'Instant cross-border settlement protocol',           realWorldAnalogue: 'Similar to XRP.' },
  { symbol: 'DOGG',  name: 'DogePound',       category: 'Crypto',  sector: 'Meme Coin',            basePrice: 0.142,     volatility: 0.070, tickSize: 0.00001, desc: 'Community meme coin with massive retail following',   realWorldAnalogue: 'Similar to Dogecoin (DOGE).' },
  { symbol: 'AVLX',  name: 'Avalix',          category: 'Crypto',  sector: 'DeFi / Subnets',       basePrice: 38.60,     volatility: 0.058, tickSize: 0.001,   desc: 'Multi-chain platform built for DeFi applications',   realWorldAnalogue: 'Similar to Avalanche (AVAX).' },
  { symbol: 'LNKX',  name: 'LinkEx',          category: 'Crypto',  sector: 'Oracle Network',       basePrice: 14.80,     volatility: 0.052, tickSize: 0.001,   desc: 'Decentralized data feeds connecting blockchains',    realWorldAnalogue: 'Similar to Chainlink (LINK).' },
  // ── Forex ────────────────────────────────────────────────────────────────
  { symbol: 'EURO/UDC', name: 'Euro / Uni-Dollar',    category: 'Forex', sector: 'Major Pair',     basePrice: 1.0842, volatility: 0.005, tickSize: 0.00001, desc: 'Most traded currency pair in the world',              realWorldAnalogue: 'EUR/USD' },
  { symbol: 'BRTX/UDC', name: 'Britex / Uni-Dollar',  category: 'Forex', sector: 'Major Pair',     basePrice: 1.2658, volatility: 0.006, tickSize: 0.00001, desc: '"The Cable" — high-liquidity major pair',             realWorldAnalogue: 'GBP/USD' },
  { symbol: 'UDC/YNEX', name: 'Uni-Dollar / Yanese',  category: 'Forex', sector: 'Safe-Haven',     basePrice: 149.82, volatility: 0.005, tickSize: 0.001,   desc: 'Classic carry trade and safe-haven pair',             realWorldAnalogue: 'USD/JPY' },
  { symbol: 'ASDC/UDC', name: 'Aussie / Uni-Dollar',  category: 'Forex', sector: 'Commodity FX',   basePrice: 0.6521, volatility: 0.006, tickSize: 0.00001, desc: 'Commodity-linked currency sensitive to iron ore',     realWorldAnalogue: 'AUD/USD' },
  // ── Indices ──────────────────────────────────────────────────────────────
  { symbol: 'TITAN500',  name: 'Titan 500',    category: 'Indices', sector: 'Large-Cap Index',   basePrice: 5218.40,  volatility: 0.012, tickSize: 0.01, desc: 'Basket of the 500 largest companies by market cap',   realWorldAnalogue: 'S&P 500' },
  { symbol: 'VEGA100',   name: 'Vega 100',     category: 'Indices', sector: 'Tech Index',        basePrice: 18240.60, volatility: 0.015, tickSize: 0.01, desc: 'Top 100 technology & innovation companies',           realWorldAnalogue: 'NASDAQ 100' },
  { symbol: 'ATLAS30',   name: 'Atlas 30',     category: 'Indices', sector: 'Blue-Chip Index',   basePrice: 39184.20, volatility: 0.010, tickSize: 0.01, desc: '30 iconic industrial blue-chip companies',            realWorldAnalogue: 'Dow Jones 30' },
  { symbol: 'VOLVIX',    name: 'Volvix',       category: 'Indices', sector: 'Volatility Index',  basePrice: 18.40,    volatility: 0.080, tickSize: 0.01, desc: 'Fear gauge — spikes when markets are uncertain',      realWorldAnalogue: 'VIX' },
];

export const ASSET_MAP = new Map(ASSETS.map(a => [a.symbol, a]));

// ─── Price Engine (deterministic seeded PRNG) ─────────────────────────────────

function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

/** Generate a 7-second candle for a given asset + tickId */
export function genCandle(asset: Asset, tickId: number, prevClose: number): Candle {
  const seed = (hashStr(asset.symbol) ^ (tickId * 1_000_003)) >>> 0;
  const rand = mulberry32(seed);
  const u1 = rand() || 1e-9;
  const u2 = rand();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const tickVol = asset.volatility * 0.015;
  const move = z * tickVol * prevClose;
  const open = prevClose;
  const close = Math.max(asset.basePrice * 0.01, open + move);
  const rangeFactor = asset.volatility * 0.01 * prevClose;
  const high = Math.max(open, close) + Math.abs(rand() * rangeFactor);
  const low  = Math.min(open, close) - Math.abs(rand() * rangeFactor);
  const volume = Math.round((rand() * 0.8 + 0.2) * 1000 * (asset.basePrice > 1000 ? 0.1 : 1));
  return { time: tickId, open, high, low, close, volume };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Candle {
  time: number;
  open: number; high: number; low: number; close: number; volume: number;
}

export interface Position {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  openedAt: number;
  pnl: number;
  pnlPct: number;
}

export interface ClosedTrade {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPct: number;
  closedAt: number;
}

// ─── Tier limits ──────────────────────────────────────────────────────────────

export const TIER_BALANCE: Record<string, number> = {
  free: 5_000, starter: 25_000, pro: 100_000, lifetime: 250_000,
};
export const TIER_MAX_POSITIONS: Record<string, number> = {
  free: 5, starter: 15, pro: 50, lifetime: 100,
};

// ─── Price formatting ─────────────────────────────────────────────────────────

export function formatPrice(price: number, asset: Asset): string {
  if (asset.tickSize < 0.001)  return price.toFixed(5);
  if (asset.tickSize < 0.01)   return price.toFixed(4);
  if (asset.tickSize < 0.1)    return price.toFixed(3);
  if (asset.tickSize < 1)      return price.toFixed(2);
  return price.toFixed(2);
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HISTORY_TICKS = 200;
const MICRO_TICK_MS = 600; // smooth price display update

// ─── Main Hook ────────────────────────────────────────────────────────────────

export function useSimulator(tier: string = 'free') {
  const startingBalance = TIER_BALANCE[tier] ?? TIER_BALANCE.free;
  const maxPositions    = TIER_MAX_POSITIONS[tier] ?? TIER_MAX_POSITIONS.free;

  const pricesRef     = useRef<Record<string, number>>({});
  const [prices, setPrices] = useState<Record<string, number>>({});

  // Live prices (micro-tick for smooth UI)
  const livePricesRef = useRef<Record<string, number>>({});
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  const candlesRef = useRef<Record<string, Candle[]>>({});
  const [candles, setCandles] = useState<Record<string, Candle[]>>({});

  const [available, setAvailable] = useState(startingBalance);
  const [locked, setLocked] = useState(0);
  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<ClosedTrade[]>([]);
  const [winStreak, setWinStreak] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [wins, setWins] = useState(0);

  // ── Seed initial candle history ────────────────────────────────────────────
  useEffect(() => {
    const initPrices: Record<string, number> = {};
    const initCandles: Record<string, Candle[]> = {};
    ASSETS.forEach(asset => {
      let price = asset.basePrice;
      const hist: Candle[] = [];
      for (let i = -HISTORY_TICKS; i < 0; i++) {
        const c = genCandle(asset, i, price);
        hist.push(c);
        price = c.close;
      }
      initCandles[asset.symbol] = hist;
      initPrices[asset.symbol] = price;
    });
    pricesRef.current = initPrices;
    candlesRef.current = initCandles;
    livePricesRef.current = { ...initPrices };
    setPrices({ ...initPrices });
    setCandles({ ...initCandles });
    setLivePrices({ ...initPrices });
  }, []);

  // ── 7s candle tick + SL/TP check ──────────────────────────────────────────
  const tickRef = useRef(-1);
  useEffect(() => {
    const unsub = subscribeSimTicker(() => {
      const { tickId } = getSimTickerSnapshot();
      if (tickRef.current === tickId) return;
      tickRef.current = tickId;

      const newPrices: Record<string, number> = {};
      const newCandles: Record<string, Candle[]> = {};
      ASSETS.forEach(asset => {
        const prev = pricesRef.current[asset.symbol] ?? asset.basePrice;
        const c = genCandle(asset, tickId, prev);
        newPrices[asset.symbol] = c.close;
        const hist = [...(candlesRef.current[asset.symbol] ?? []), c];
        if (hist.length > HISTORY_TICKS) hist.shift();
        newCandles[asset.symbol] = hist;
      });
      pricesRef.current = newPrices;
      candlesRef.current = newCandles;
      setPrices({ ...newPrices });
      setCandles({ ...newCandles });

      // SL/TP check
      setPositions(prev => {
        if (prev.length === 0) return prev;
        const toClose: string[] = [];
        const updated = prev.map(pos => {
          const price = newPrices[pos.symbol] ?? pos.entryPrice;
          const pnl = calcPnl(pos, price);
          const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;
          if (pos.stopLoss != null) {
            if (pos.direction === 'long'  && price <= pos.stopLoss) toClose.push(pos.id);
            if (pos.direction === 'short' && price >= pos.stopLoss) toClose.push(pos.id);
          }
          if (pos.takeProfit != null) {
            if (pos.direction === 'long'  && price >= pos.takeProfit) toClose.push(pos.id);
            if (pos.direction === 'short' && price <= pos.takeProfit) toClose.push(pos.id);
          }
          return { ...pos, pnl, pnlPct };
        });
        if (toClose.length === 0) return updated;
        const remaining: Position[] = [];
        const closed: ClosedTrade[] = [];
        updated.forEach(pos => {
          if (toClose.includes(pos.id)) {
            const price = newPrices[pos.symbol] ?? pos.entryPrice;
            closed.push({ id: pos.id, symbol: pos.symbol, direction: pos.direction, quantity: pos.quantity, entryPrice: pos.entryPrice, exitPrice: price, pnl: pos.pnl, pnlPct: pos.pnlPct, closedAt: tickId });
            setAvailable(a => a + pos.entryPrice * pos.quantity + pos.pnl);
            setLocked(l => Math.max(0, l - pos.entryPrice * pos.quantity));
          } else {
            remaining.push(pos);
          }
        });
        setHistory(h => [...closed, ...h]);
        setTotalTrades(t => t + closed.length);
        setWins(w => w + closed.filter(c => c.pnl > 0).length);
        setWinStreak(streak => closed.every(c => c.pnl > 0) ? streak + closed.length : 0);
        return remaining;
      });
    });
    return unsub;
  }, []);

  // ── 600ms live price micro-tick (smooth UI) ────────────────────────────────
  useEffect(() => {
    const id = window.setInterval(() => {
      const next: Record<string, number> = {};
      ASSETS.forEach(a => {
        const anchor = pricesRef.current[a.symbol] ?? a.basePrice;
        const live   = livePricesRef.current[a.symbol] ?? anchor;
        const step   = a.volatility * 0.003 * live;
        const r      = (Math.random() - 0.49);
        const revert = (anchor - live) * 0.25;
        next[a.symbol] = Math.max(a.basePrice * 0.01, live + r * step + revert);
      });
      livePricesRef.current = next;
      setLivePrices({ ...next });
    }, MICRO_TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────

  const openPosition = useCallback((
    symbol: string, direction: 'long' | 'short', quantity: number,
    stopLoss: number | null, takeProfit: number | null,
  ): { ok: boolean; error?: string } => {
    const price = pricesRef.current[symbol];
    if (!price) return { ok: false, error: 'Price unavailable' };
    const cost = price * quantity;
    if (cost > available) return { ok: false, error: 'Insufficient SimCash' };
    if (positions.length >= maxPositions)
      return { ok: false, error: `Max ${maxPositions} open positions for your tier` };
    const pos: Position = {
      id: `${symbol}-${Date.now()}`, symbol, direction, quantity,
      entryPrice: price, stopLoss, takeProfit, openedAt: tickRef.current, pnl: 0, pnlPct: 0,
    };
    setPositions(p => [pos, ...p]);
    setAvailable(a => a - cost);
    setLocked(l => l + cost);
    return { ok: true };
  }, [available, positions.length, maxPositions]);

  const closePosition = useCallback((posId: string): void => {
    setPositions(prev => {
      const pos = prev.find(p => p.id === posId);
      if (!pos) return prev;
      const price = pricesRef.current[pos.symbol] ?? pos.entryPrice;
      const pnl = calcPnl(pos, price);
      const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;
      const trade: ClosedTrade = {
        id: pos.id, symbol: pos.symbol, direction: pos.direction, quantity: pos.quantity,
        entryPrice: pos.entryPrice, exitPrice: price, pnl, pnlPct, closedAt: tickRef.current,
      };
      setHistory(h => [trade, ...h]);
      setAvailable(a => a + pos.entryPrice * pos.quantity + pnl);
      setLocked(l => Math.max(0, l - pos.entryPrice * pos.quantity));
      setTotalTrades(t => t + 1);
      setWins(w => pnl > 0 ? w + 1 : w);
      setWinStreak(streak => pnl > 0 ? streak + 1 : 0);
      return prev.filter(p => p.id !== posId);
    });
  }, []);

  const resetAccount = useCallback(() => {
    setAvailable(startingBalance); setLocked(0);
    setPositions([]); setHistory([]);
    setWinStreak(0); setTotalTrades(0); setWins(0);
  }, [startingBalance]);

  const totalBalance = available + locked + positions.reduce((s, p) => s + p.pnl, 0);
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;

  return {
    prices, livePrices, candles,
    available, locked, totalBalance,
    positions, history,
    winStreak, totalTrades, wins, winRate,
    maxPositions,
    openPosition, closePosition, resetAccount,
  };
}

function calcPnl(pos: Position, currentPrice: number): number {
  return (currentPrice - pos.entryPrice) * pos.quantity * (pos.direction === 'long' ? 1 : -1);
}
