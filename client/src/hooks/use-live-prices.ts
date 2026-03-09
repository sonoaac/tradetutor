/**
 * Standalone live-price hook — generates constantly-moving fake prices for all
 * sim assets without needing the full simulator state (positions/balance).
 * Updates every 600 ms with a micro Brownian-motion walk that mean-reverts
 * toward the last 7-second candle close.
 */

import { useState, useEffect, useRef } from 'react';
import { ASSETS, genCandle, type Asset } from './use-simulator';
import { subscribeSimTicker, getSimTickerSnapshot } from '@/lib/sim-ticker';

const MICRO_TICK_MS = 600;

// ── shared singleton so multiple components share one timer ───────────────────
let microTimerId: number | undefined;
let anchorPrices: Record<string, number> = {};
let livePriceState: Record<string, number> = {};
const liveListeners = new Set<() => void>();

function initAnchors() {
  if (Object.keys(anchorPrices).length > 0) return;
  ASSETS.forEach(a => {
    anchorPrices[a.symbol] = a.basePrice;
    livePriceState[a.symbol] = a.basePrice;
  });
}

function startMicro() {
  initAnchors();
  if (microTimerId != null) return;

  microTimerId = window.setInterval(() => {
    const next: Record<string, number> = {};
    ASSETS.forEach(a => {
      const anchor = anchorPrices[a.symbol] ?? a.basePrice;
      const live   = livePriceState[a.symbol] ?? anchor;
      const step   = a.volatility * 0.003 * live;
      const r      = (Math.random() - 0.49); // slight upward bias
      const revert = (anchor - live) * 0.25;
      next[a.symbol] = Math.max(a.basePrice * 0.01, live + r * step + revert);
    });
    livePriceState = next;
    liveListeners.forEach(fn => fn());
  }, MICRO_TICK_MS);
}

function stopMicro() {
  if (liveListeners.size > 0) return;
  if (microTimerId == null) return;
  window.clearInterval(microTimerId);
  microTimerId = undefined;
}

// Update anchors whenever the 7-second candle ticks
let candleSubUnsub: (() => void) | null = null;
function ensureCandleSub() {
  if (candleSubUnsub) return;
  let candleTickRef = -1;
  candleSubUnsub = subscribeSimTicker(() => {
    const { tickId } = getSimTickerSnapshot();
    if (candleTickRef === tickId) return;
    candleTickRef = tickId;
    ASSETS.forEach(a => {
      const prev = anchorPrices[a.symbol] ?? a.basePrice;
      const c = genCandle(a, tickId, prev);
      anchorPrices[a.symbol] = c.close;
    });
  });
}

export function useLivePrices(): Record<string, number> {
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    initAnchors();
    return { ...livePriceState };
  });

  useEffect(() => {
    ensureCandleSub();
    startMicro();

    const listener = () => setPrices({ ...livePriceState });
    liveListeners.add(listener);

    return () => {
      liveListeners.delete(listener);
      stopMicro();
    };
  }, []);

  return prices;
}

/** Return the 24h-equivalent % change (last candle close vs base price) */
export function usePriceChanges(): Record<string, number> {
  const prices = useLivePrices();
  const changes: Record<string, number> = {};
  ASSETS.forEach(a => {
    const anchor = anchorPrices[a.symbol] ?? a.basePrice;
    changes[a.symbol] = ((prices[a.symbol] ?? anchor) - a.basePrice) / a.basePrice * 100;
  });
  return changes;
}
