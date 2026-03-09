/**
 * CanvasChart — pure-canvas candlestick chart.
 * Zero external dependencies. Zero watermarks.
 *
 * Features:
 *   • OHLC candles with body + wick
 *   • MA9 (cyan) and MA21 (orange) overlay lines
 *   • Volume histogram (bottom 18 % of chart)
 *   • Horizontal price lines for Entry / SL / TP
 *   • Live price update of last candle (no full redraw needed)
 *   • Price scale (right), time scale (bottom)
 *   • Responsive via ResizeObserver
 */
import { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChartCandle {
  time: number;   // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceLine {
  price: number;
  color: string;
  label: string;
  dash?: boolean;
}

interface Props {
  candles: ChartCandle[];
  livePrice?: number;         // updates last candle's close in real-time
  priceLines?: PriceLine[];   // SL / TP / Entry lines
  /** Number of candles to show in the viewport (default: 80) */
  visibleCount?: number;
  theme?: 'dark' | 'light';
}

// ─── Theme palettes ───────────────────────────────────────────────────────────

const DARK = {
  bg:      '#131722',
  grid:    '#1e2530',
  text:    '#9ca3af',
  upBody:  '#26a69a',
  dnBody:  '#ef5350',
  upWick:  '#26a69a',
  dnWick:  '#ef5350',
  ma9:     '#00bcd4',
  ma21:    '#ff9800',
  volUp:   '#26a69a55',
  volDn:   '#ef535055',
};

const LIGHT = {
  bg:      '#ffffff',
  grid:    '#f0f0f0',
  text:    '#6b7280',
  upBody:  '#26a69a',
  dnBody:  '#ef5350',
  upWick:  '#26a69a',
  dnWick:  '#ef5350',
  ma9:     '#0288d1',
  ma21:    '#e65100',
  volUp:   '#26a69a33',
  volDn:   '#ef535033',
};

// ─── Maths ────────────────────────────────────────────────────────────────────

function sma(values: number[], period: number): (number | null)[] {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    return values.slice(i - period + 1, i + 1).reduce((s, v) => s + v, 0) / period;
  });
}

function nicePrice(p: number): string {
  if (p >= 10000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (p >= 100)   return p.toFixed(2);
  if (p >= 1)     return p.toFixed(3);
  if (p >= 0.01)  return p.toFixed(4);
  return p.toFixed(6);
}

function niceTime(unix: number): string {
  const d = new Date(unix * 1000);
  return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CanvasChart({
  candles,
  livePrice,
  priceLines = [],
  visibleCount = 80,
  theme = 'dark',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.clientWidth;
    const H   = canvas.clientHeight;

    // Sync backing store size
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pal = theme === 'dark' ? DARK : LIGHT;

    // Layout constants
    const PRICE_W  = 70;   // right price scale width
    const TIME_H   = 22;   // bottom time scale height
    const VOL_FRAC = 0.18; // fraction of chart area used for volume

    const chartW = W - PRICE_W;
    const chartH = H - TIME_H;
    const volH   = chartH * VOL_FRAC;
    const cndlH  = chartH * (1 - VOL_FRAC);

    // ── Background ──────────────────────────────────────────────────────────
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, W, H);

    // ── Visible slice ───────────────────────────────────────────────────────
    const visible = candles.slice(-visibleCount);
    if (visible.length === 0) return;

    // Patch last candle with livePrice if provided
    const patched = visible.map((c, i) =>
      i === visible.length - 1 && livePrice != null
        ? { ...c, close: livePrice, high: Math.max(c.high, livePrice), low: Math.min(c.low, livePrice) }
        : c
    );

    // ── Price range ─────────────────────────────────────────────────────────
    const allHigh = Math.max(...patched.map(c => c.high), ...priceLines.map(l => l.price));
    const allLow  = Math.min(...patched.map(c => c.low),  ...priceLines.map(l => l.price));
    const spread  = allHigh - allLow || allLow * 0.01;
    const pad     = spread * 0.08;
    const pHigh   = allHigh + pad;
    const pLow    = allLow  - pad;
    const pRange  = pHigh   - pLow;

    function py(price: number) { return cndlH * (1 - (price - pLow) / pRange); }

    // ── Volume range ────────────────────────────────────────────────────────
    const maxVol = Math.max(...patched.map(c => c.volume), 1);
    function vy(vol: number) { return chartH - (volH * (vol / maxVol)); }

    // ── Candle width ────────────────────────────────────────────────────────
    const n        = patched.length;
    const slotW    = chartW / n;
    const bodyW    = Math.max(1, slotW * 0.6);

    // ── Grid lines ──────────────────────────────────────────────────────────
    ctx.strokeStyle = pal.grid;
    ctx.lineWidth   = 1;
    const GRID_ROWS = 5;
    for (let i = 0; i <= GRID_ROWS; i++) {
      const y = Math.round(cndlH * (i / GRID_ROWS)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();
    }

    // ── Volume bars ─────────────────────────────────────────────────────────
    patched.forEach((c, i) => {
      const x   = i * slotW + slotW / 2;
      const top = vy(c.volume);
      ctx.fillStyle = c.close >= c.open ? pal.volUp : pal.volDn;
      ctx.fillRect(x - bodyW / 2, top, bodyW, chartH - top);
    });

    // ── MA9 & MA21 ───────────────────────────────────────────────────────────
    const closes = patched.map(c => c.close);
    const ma9v   = sma(closes, 9);
    const ma21v  = sma(closes, 21);

    for (const [maValues, color] of [[ma9v, pal.ma9], [ma21v, pal.ma21]] as const) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      let started = false;
      maValues.forEach((v, i) => {
        if (v == null) return;
        const x = i * slotW + slotW / 2;
        const y = py(v);
        if (!started) { ctx.moveTo(x, y); started = true; }
        else          { ctx.lineTo(x, y); }
      });
      ctx.stroke();
    }

    // ── Candles ──────────────────────────────────────────────────────────────
    patched.forEach((c, i) => {
      const x    = i * slotW + slotW / 2;
      const up   = c.close >= c.open;
      const bodyTop = py(Math.max(c.open, c.close));
      const bodyBot = py(Math.min(c.open, c.close));
      const bodyH_  = Math.max(1, bodyBot - bodyTop);

      // Wick
      ctx.strokeStyle = up ? pal.upWick : pal.dnWick;
      ctx.lineWidth   = Math.max(1, slotW * 0.08);
      ctx.beginPath();
      ctx.moveTo(x, py(c.high));
      ctx.lineTo(x, py(c.low));
      ctx.stroke();

      // Body
      ctx.fillStyle = up ? pal.upBody : pal.dnBody;
      ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH_);
    });

    // ── Price lines (SL / TP / Entry) ────────────────────────────────────────
    priceLines.forEach(line => {
      const y = py(line.price);
      if (y < 0 || y > cndlH) return;
      ctx.save();
      ctx.strokeStyle = line.color;
      ctx.lineWidth   = 1;
      if (line.dash) ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();
      ctx.setLineDash([]);
      // Label
      ctx.fillStyle    = line.color;
      ctx.font         = '10px monospace';
      ctx.textAlign    = 'left';
      ctx.fillText(line.label, 4, y - 3);
      ctx.restore();
    });

    // ── Price scale ──────────────────────────────────────────────────────────
    ctx.fillStyle = pal.bg;
    ctx.fillRect(chartW, 0, PRICE_W, H);
    ctx.fillStyle   = pal.text;
    ctx.font        = '10px monospace';
    ctx.textAlign   = 'left';

    for (let i = 0; i <= GRID_ROWS; i++) {
      const price = pHigh - (pRange * i) / GRID_ROWS;
      const y     = Math.round(cndlH * (i / GRID_ROWS));
      ctx.fillText(nicePrice(price), chartW + 4, y + 4);
    }

    // Live price label on right axis
    if (livePrice != null) {
      const y = py(livePrice);
      if (y >= 0 && y <= cndlH) {
        ctx.fillStyle = patched[patched.length - 1]?.close >= patched[patched.length - 1]?.open ? DARK.upBody : DARK.dnBody;
        ctx.fillRect(chartW, y - 9, PRICE_W, 18);
        ctx.fillStyle = '#fff';
        ctx.font      = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(nicePrice(livePrice), chartW + 4, y + 4);
      }
    }

    // ── Time scale ───────────────────────────────────────────────────────────
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, chartH, W, TIME_H);
    ctx.fillStyle = pal.text;
    ctx.font      = '9px monospace';
    ctx.textAlign = 'center';

    const labelEvery = Math.max(1, Math.floor(n / 6));
    patched.forEach((c, i) => {
      if (i % labelEvery !== 0) return;
      const x = i * slotW + slotW / 2;
      ctx.fillText(niceTime(c.time), x, chartH + 15);
    });

    // ── Separator lines ──────────────────────────────────────────────────────
    ctx.strokeStyle = pal.grid;
    ctx.lineWidth   = 1;
    // vertical separator price scale
    ctx.beginPath(); ctx.moveTo(chartW + 0.5, 0); ctx.lineTo(chartW + 0.5, chartH); ctx.stroke();
    // horizontal separator time scale
    ctx.beginPath(); ctx.moveTo(0, chartH + 0.5); ctx.lineTo(chartW, chartH + 0.5); ctx.stroke();
    // volume / candle separator
    ctx.strokeStyle = pal.grid;
    ctx.beginPath(); ctx.moveTo(0, cndlH + 0.5); ctx.lineTo(chartW, cndlH + 0.5); ctx.stroke();

  }, [candles, livePrice, priceLines, visibleCount, theme]);

  // ── Redraw whenever inputs change ─────────────────────────────────────────
  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);
  }, [draw]);

  // ── Resize observer ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(draw);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
