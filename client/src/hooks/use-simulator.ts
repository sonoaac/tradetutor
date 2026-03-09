import { useState, useEffect, useCallback, useRef } from 'react';
import { subscribeSimTicker, getSimTickerSnapshot } from '@/lib/sim-ticker';

// ─── Asset Definitions ────────────────────────────────────────────────────────

export type AssetCategory = 'Stocks' | 'Crypto' | 'Forex' | 'Indices';

export interface Asset {
  symbol: string;
  name: string;
  category: AssetCategory;
  basePrice: number;
  volatility: number; // fractional daily vol (e.g. 0.02 = 2%)
  tickSize: number;
}

export const ASSETS: Asset[] = [
  // Stocks
  { symbol: 'AAPL',    name: 'Apple Inc.',         category: 'Stocks',  basePrice: 195.50,    volatility: 0.018, tickSize: 0.01 },
  { symbol: 'TSLA',    name: 'Tesla Inc.',          category: 'Stocks',  basePrice: 248.30,    volatility: 0.040, tickSize: 0.01 },
  { symbol: 'NVDA',    name: 'NVIDIA Corp.',        category: 'Stocks',  basePrice: 875.20,    volatility: 0.035, tickSize: 0.01 },
  { symbol: 'MSFT',    name: 'Microsoft Corp.',     category: 'Stocks',  basePrice: 415.80,    volatility: 0.016, tickSize: 0.01 },
  { symbol: 'AMZN',    name: 'Amazon.com Inc.',     category: 'Stocks',  basePrice: 188.40,    volatility: 0.020, tickSize: 0.01 },
  { symbol: 'META',    name: 'Meta Platforms',      category: 'Stocks',  basePrice: 505.60,    volatility: 0.025, tickSize: 0.01 },
  { symbol: 'GOOGL',   name: 'Alphabet Inc.',       category: 'Stocks',  basePrice: 174.30,    volatility: 0.017, tickSize: 0.01 },
  { symbol: 'NFLX',    name: 'Netflix Inc.',        category: 'Stocks',  basePrice: 632.50,    volatility: 0.028, tickSize: 0.01 },
  { symbol: 'AMD',     name: 'Adv. Micro Devices',  category: 'Stocks',  basePrice: 165.40,    volatility: 0.038, tickSize: 0.01 },
  { symbol: 'UBER',    name: 'Uber Technologies',   category: 'Stocks',  basePrice: 78.90,     volatility: 0.030, tickSize: 0.01 },
  // Crypto
  { symbol: 'BTC',     name: 'Bitcoin',             category: 'Crypto',  basePrice: 68500.00,  volatility: 0.045, tickSize: 1.00 },
  { symbol: 'ETH',     name: 'Ethereum',            category: 'Crypto',  basePrice: 3840.00,   volatility: 0.050, tickSize: 0.10 },
  { symbol: 'SOL',     name: 'Solana',              category: 'Crypto',  basePrice: 168.20,    volatility: 0.060, tickSize: 0.01 },
  { symbol: 'BNB',     name: 'BNB',                 category: 'Crypto',  basePrice: 598.40,    volatility: 0.040, tickSize: 0.01 },
  { symbol: 'XRP',     name: 'Ripple',              category: 'Crypto',  basePrice: 0.58,      volatility: 0.055, tickSize: 0.0001 },
  { symbol: 'DOGE',    name: 'Dogecoin',            category: 'Crypto',  basePrice: 0.142,     volatility: 0.070, tickSize: 0.00001 },
  { symbol: 'AVAX',    name: 'Avalanche',           category: 'Crypto',  basePrice: 38.60,     volatility: 0.058, tickSize: 0.001 },
  { symbol: 'LINK',    name: 'Chainlink',           category: 'Crypto',  basePrice: 14.80,     volatility: 0.052, tickSize: 0.001 },
  // Forex
  { symbol: 'EURUSD',  name: 'EUR / USD',           category: 'Forex',   basePrice: 1.0842,    volatility: 0.005, tickSize: 0.00001 },
  { symbol: 'GBPUSD',  name: 'GBP / USD',           category: 'Forex',   basePrice: 1.2658,    volatility: 0.006, tickSize: 0.00001 },
  { symbol: 'USDJPY',  name: 'USD / JPY',           category: 'Forex',   basePrice: 149.82,    volatility: 0.005, tickSize: 0.001 },
  { symbol: 'AUDUSD',  name: 'AUD / USD',           category: 'Forex',   basePrice: 0.6521,    volatility: 0.006, tickSize: 0.00001 },
  // Indices
  { symbol: 'SPX500',  name: 'S&P 500',             category: 'Indices', basePrice: 5218.40,   volatility: 0.012, tickSize: 0.01 },
  { symbol: 'NDX100',  name: 'NASDAQ 100',          category: 'Indices', basePrice: 18240.60,  volatility: 0.015, tickSize: 0.01 },
  { symbol: 'DJI30',   name: 'Dow Jones 30',        category: 'Indices', basePrice: 39184.20,  volatility: 0.010, tickSize: 0.01 },
  { symbol: 'VIX',     name: 'Volatility Index',    category: 'Indices', basePrice: 18.40,     volatility: 0.080, tickSize: 0.01 },
];

export const ASSET_MAP = new Map(ASSETS.map(a => [a.symbol, a]));

// ─── Price Engine ─────────────────────────────────────────────────────────────

// Seeded pseudo-random (deterministic per tickId + symbol)
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
  for (let i = 0; i < s.length; i++) { h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; }
  return h;
}

/** Generate a single candle for a given asset + tickId */
export function genCandle(asset: Asset, tickId: number, prevClose: number): Candle {
  const seed = (hashStr(asset.symbol) ^ (tickId * 1_000_003)) >>> 0;
  const rand = mulberry32(seed);

  // Box-Muller normal approximation
  const u1 = rand() || 1e-9;
  const u2 = rand();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

  // Per-tick move (7s tick = very small fraction of daily vol)
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
  time: number;   // tickId (integer — lightweight-charts UTCTimestamp)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Position {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  openedAt: number; // tickId
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

export interface SimulatorState {
  balance: SimCashAccount;
  prices: Record<string, number>;
  candles: Record<string, Candle[]>;
  positions: Position[];
  history: ClosedTrade[];
  winStreak: number;
  totalTrades: number;
  winRate: number;
}

export interface SimCashAccount {
  available: number;
  locked: number;
  total: number;
}

// ─── SimCash by tier ──────────────────────────────────────────────────────────

export const TIER_BALANCE: Record<string, number> = {
  free:     5_000,
  starter:  25_000,
  pro:      100_000,
  lifetime: 250_000,
};

export const TIER_MAX_POSITIONS: Record<string, number> = {
  free:     5,
  starter:  15,
  pro:      50,
  lifetime: 100,
};

// ─── Price decimals helper ────────────────────────────────────────────────────

export function formatPrice(price: number, asset: Asset): string {
  if (asset.tickSize < 0.001)  return price.toFixed(5);
  if (asset.tickSize < 0.01)   return price.toFixed(4);
  if (asset.tickSize < 0.1)    return price.toFixed(3);
  if (asset.tickSize < 1)      return price.toFixed(2);
  return price.toFixed(2);
}

// ─── CANDLE HISTORY length ────────────────────────────────────────────────────
const HISTORY_TICKS = 200;

// ─── Main Hook ────────────────────────────────────────────────────────────────

export function useSimulator(tier: string = 'free') {
  const startingBalance = TIER_BALANCE[tier] ?? TIER_BALANCE.free;
  const maxPositions    = TIER_MAX_POSITIONS[tier] ?? TIER_MAX_POSITIONS.free;

  // prices keyed by symbol
  const pricesRef = useRef<Record<string, number>>({});
  const [prices, setPrices] = useState<Record<string, number>>({});

  // candle history per symbol
  const candlesRef = useRef<Record<string, Candle[]>>({});
  const [candles, setCandles] = useState<Record<string, Candle[]>>({});

  // account
  const [available, setAvailable] = useState(startingBalance);
  const [locked, setLocked] = useState(0);

  // positions + history
  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<ClosedTrade[]>([]);

  // stats
  const [winStreak, setWinStreak] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [wins, setWins] = useState(0);

  // seed initial candle history
  useEffect(() => {
    const initPrices: Record<string, number> = {};
    const initCandles: Record<string, Candle[]> = {};

    ASSETS.forEach(asset => {
      let price = asset.basePrice;
      const hist: Candle[] = [];

      // generate HISTORY_TICKS candles starting from tick -HISTORY_TICKS
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
    setPrices({ ...initPrices });
    setCandles({ ...initCandles });
  }, []);

  // on each tick: generate new candle + check SL/TP
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

        const history = [...(candlesRef.current[asset.symbol] ?? []), c];
        // trim to HISTORY_TICKS
        if (history.length > HISTORY_TICKS) history.shift();
        newCandles[asset.symbol] = history;
      });

      pricesRef.current = newPrices;
      candlesRef.current = newCandles;
      setPrices({ ...newPrices });
      setCandles({ ...newCandles });

      // Check SL / TP
      setPositions(prev => {
        if (prev.length === 0) return prev;
        const toClose: string[] = [];
        const updated = prev.map(pos => {
          const price = newPrices[pos.symbol] ?? pos.entryPrice;
          const pnl = calcPnl(pos, price);
          const pnlPct = (pnl / (pos.entryPrice * pos.quantity)) * 100;

          // SL hit
          if (pos.stopLoss !== null) {
            if (pos.direction === 'long'  && price <= pos.stopLoss) { toClose.push(pos.id); }
            if (pos.direction === 'short' && price >= pos.stopLoss) { toClose.push(pos.id); }
          }
          // TP hit
          if (pos.takeProfit !== null) {
            if (pos.direction === 'long'  && price >= pos.takeProfit) { toClose.push(pos.id); }
            if (pos.direction === 'short' && price <= pos.takeProfit) { toClose.push(pos.id); }
          }

          return { ...pos, pnl, pnlPct };
        });

        if (toClose.length === 0) return updated;

        // close the flagged positions
        const remaining: Position[] = [];
        const closed: ClosedTrade[] = [];

        updated.forEach(pos => {
          if (toClose.includes(pos.id)) {
            const price = newPrices[pos.symbol] ?? pos.entryPrice;
            closed.push({
              id: pos.id,
              symbol: pos.symbol,
              direction: pos.direction,
              quantity: pos.quantity,
              entryPrice: pos.entryPrice,
              exitPrice: price,
              pnl: pos.pnl,
              pnlPct: pos.pnlPct,
              closedAt: tickId,
            });
            setAvailable(a => a + pos.entryPrice * pos.quantity + pos.pnl);
            setLocked(l => Math.max(0, l - pos.entryPrice * pos.quantity));
          } else {
            remaining.push(pos);
          }
        });

        setHistory(h => [...closed, ...h]);
        setTotalTrades(t => t + closed.length);
        setWins(w => w + closed.filter(c => c.pnl > 0).length);
        setWinStreak(streak => {
          // simple: consecutive wins from most recent
          const allWin = closed.every(c => c.pnl > 0);
          if (allWin) return streak + closed.length;
          return 0;
        });

        return remaining;
      });
    });
    return unsub;
  }, []);

  // ─── Actions ───────────────────────────────────────────────────────────────

  const openPosition = useCallback((
    symbol: string,
    direction: 'long' | 'short',
    quantity: number,
    stopLoss: number | null,
    takeProfit: number | null,
  ): { ok: boolean; error?: string } => {
    const price = pricesRef.current[symbol];
    if (!price) return { ok: false, error: 'Price unavailable' };

    const cost = price * quantity;
    if (cost > available) return { ok: false, error: 'Insufficient SimCash' };
    if (positions.length >= maxPositions) {
      return { ok: false, error: `Max ${maxPositions} open positions for your tier` };
    }

    const pos: Position = {
      id: `${symbol}-${Date.now()}`,
      symbol,
      direction,
      quantity,
      entryPrice: price,
      stopLoss,
      takeProfit,
      openedAt: tickRef.current,
      pnl: 0,
      pnlPct: 0,
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
        id: pos.id,
        symbol: pos.symbol,
        direction: pos.direction,
        quantity: pos.quantity,
        entryPrice: pos.entryPrice,
        exitPrice: price,
        pnl,
        pnlPct,
        closedAt: tickRef.current,
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
    setAvailable(startingBalance);
    setLocked(0);
    setPositions([]);
    setHistory([]);
    setWinStreak(0);
    setTotalTrades(0);
    setWins(0);
  }, [startingBalance]);

  // ─── Derived ────────────────────────────────────────────────────────────────

  const totalBalance = available + locked + positions.reduce((s, p) => s + p.pnl, 0);
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;

  return {
    prices,
    candles,
    available,
    locked,
    totalBalance,
    positions,
    history,
    winStreak,
    totalTrades,
    wins,
    winRate,
    maxPositions,
    openPosition,
    closePosition,
    resetAccount,
  };
}

// ─── Helper ────────────────────────────────────────────────────────────────────

function calcPnl(pos: Position, currentPrice: number): number {
  const mult = pos.direction === 'long' ? 1 : -1;
  return (currentPrice - pos.entryPrice) * pos.quantity * mult;
}
