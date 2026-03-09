import { useEffect, useRef } from 'react';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickSeriesOptions,
  type HistogramSeriesOptions,
  type LineSeriesOptions,
  ColorType,
  CrosshairMode,
} from 'lightweight-charts';
import type { Candle, Asset } from '@/hooks/use-simulator';
import { formatPrice } from '@/hooks/use-simulator';

interface Props {
  candles: Candle[];
  asset: Asset;
  entryPrice?: number | null;
  stopLoss?: number | null;
  takeProfit?: number | null;
  height?: number;
}

// ─── Indicator math ───────────────────────────────────────────────────────────

function sma(closes: number[], period: number): (number | null)[] {
  return closes.map((_, i) => {
    if (i < period - 1) return null;
    return closes.slice(i - period + 1, i + 1).reduce((s, v) => s + v, 0) / period;
  });
}

function bollingerBands(closes: number[], period = 20, stdDev = 2) {
  const mid = sma(closes, period);
  const upper: (number | null)[] = [];
  const lower: (number | null)[] = [];

  closes.forEach((_, i) => {
    if (mid[i] == null) { upper.push(null); lower.push(null); return; }
    const slice = closes.slice(i - period + 1, i + 1);
    const mean = mid[i]!;
    const variance = slice.reduce((s, v) => s + (v - mean) ** 2, 0) / period;
    const sd = Math.sqrt(variance) * stdDev;
    upper.push(mean + sd);
    lower.push(mean - sd);
  });
  return { mid, upper, lower };
}

function rsi(closes: number[], period = 14): (number | null)[] {
  const result: (number | null)[] = new Array(period).fill(null);
  if (closes.length <= period) return result;

  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1];
    if (d > 0) avgGain += d; else avgLoss -= d;
  }
  avgGain /= period; avgLoss /= period;
  result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));

  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    avgGain = (avgGain * (period - 1) + (d > 0 ? d : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (d < 0 ? -d : 0)) / period;
    result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LiveCandleChart({ candles, asset, entryPrice, stopLoss, takeProfit, height = 380 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<IChartApi | null>(null);
  const candleRef    = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volRef       = useRef<ISeriesApi<'Histogram'> | null>(null);
  const ma9Ref       = useRef<ISeriesApi<'Line'> | null>(null);
  const ma21Ref      = useRef<ISeriesApi<'Line'> | null>(null);
  const ma50Ref      = useRef<ISeriesApi<'Line'> | null>(null);
  const bbUpperRef   = useRef<ISeriesApi<'Line'> | null>(null);
  const bbMidRef     = useRef<ISeriesApi<'Line'> | null>(null);
  const bbLowerRef   = useRef<ISeriesApi<'Line'> | null>(null);
  const entryRef     = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  const slRef        = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  const tpRef        = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);

  // ─── Mount: create chart ────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#131722' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#1e2230' },
        horzLines: { color: '#1e2230' },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: '#2a2e3e' },
      timeScale: {
        borderColor: '#2a2e3e',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor:          '#26a69a',
      downColor:        '#ef5350',
      borderUpColor:    '#26a69a',
      borderDownColor:  '#ef5350',
      wickUpColor:      '#26a69a',
      wickDownColor:    '#ef5350',
    } as Partial<CandlestickSeriesOptions>);
    candleRef.current = candleSeries;

    // Volume histogram
    const volSeries = chart.addHistogramSeries({
      color:       '#384050',
      priceFormat: { type: 'volume' },
      priceScaleId: 'vol',
    } as Partial<HistogramSeriesOptions>);
    chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
    volRef.current = volSeries;

    // MA lines
    const maOpts = (color: string): Partial<LineSeriesOptions> => ({
      color, lineWidth: 1, priceLineVisible: false, lastValueVisible: false,
    });
    ma9Ref.current   = chart.addLineSeries({ ...maOpts('#00bcd4'), title: 'MA9'  });
    ma21Ref.current  = chart.addLineSeries({ ...maOpts('#ff9800'), title: 'MA21' });
    ma50Ref.current  = chart.addLineSeries({ ...maOpts('#9c27b0'), title: 'MA50' });

    // Bollinger Bands
    const bbOpts = (color: string): Partial<LineSeriesOptions> => ({
      color, lineWidth: 1, lineStyle: 2, priceLineVisible: false, lastValueVisible: false,
    });
    bbUpperRef.current = chart.addLineSeries({ ...bbOpts('#546e7a'), title: 'BB+' });
    bbMidRef.current   = chart.addLineSeries({ ...bbOpts('#607d8b'), title: 'BBM' });
    bbLowerRef.current = chart.addLineSeries({ ...bbOpts('#546e7a'), title: 'BB-' });

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [height]);

  // ─── Update candle data ────────────────────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current || !volRef.current) return;
    if (candles.length === 0) return;

    const closes = candles.map(c => c.close);

    // Candles
    candleRef.current.setData(candles.map(c => ({
      time: c.time as unknown as import('lightweight-charts').UTCTimestamp,
      open: c.open, high: c.high, low: c.low, close: c.close,
    })));

    // Volume
    volRef.current.setData(candles.map(c => ({
      time: c.time as unknown as import('lightweight-charts').UTCTimestamp,
      value: c.volume,
      color: c.close >= c.open ? '#26a69a44' : '#ef535044',
    })));

    // MA9
    const ma9v = sma(closes, 9);
    ma9Ref.current?.setData(candles
      .map((c, i) => ma9v[i] != null ? { time: c.time as unknown as import('lightweight-charts').UTCTimestamp, value: ma9v[i]! } : null)
      .filter(Boolean) as { time: import('lightweight-charts').UTCTimestamp; value: number }[]);

    // MA21
    const ma21v = sma(closes, 21);
    ma21Ref.current?.setData(candles
      .map((c, i) => ma21v[i] != null ? { time: c.time as unknown as import('lightweight-charts').UTCTimestamp, value: ma21v[i]! } : null)
      .filter(Boolean) as { time: import('lightweight-charts').UTCTimestamp; value: number }[]);

    // MA50
    const ma50v = sma(closes, 50);
    ma50Ref.current?.setData(candles
      .map((c, i) => ma50v[i] != null ? { time: c.time as unknown as import('lightweight-charts').UTCTimestamp, value: ma50v[i]! } : null)
      .filter(Boolean) as { time: import('lightweight-charts').UTCTimestamp; value: number }[]);

    // Bollinger Bands
    const bb = bollingerBands(closes, 20, 2);
    const toLine = (vals: (number | null)[]) =>
      candles
        .map((c, i) => vals[i] != null ? { time: c.time as unknown as import('lightweight-charts').UTCTimestamp, value: vals[i]! } : null)
        .filter(Boolean) as { time: import('lightweight-charts').UTCTimestamp; value: number }[];

    bbUpperRef.current?.setData(toLine(bb.upper));
    bbMidRef.current?.setData(toLine(bb.mid));
    bbLowerRef.current?.setData(toLine(bb.lower));

    // Scroll to latest
    chartRef.current?.timeScale().scrollToRealTime();
  }, [candles]);

  // ─── Price lines (entry / SL / TP) ────────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current) return;
    const series = candleRef.current;

    // Remove old lines
    if (entryRef.current) { try { series.removePriceLine(entryRef.current); } catch { /* */ } entryRef.current = null; }
    if (slRef.current)    { try { series.removePriceLine(slRef.current);    } catch { /* */ } slRef.current = null; }
    if (tpRef.current)    { try { series.removePriceLine(tpRef.current);    } catch { /* */ } tpRef.current = null; }

    if (entryPrice) {
      entryRef.current = series.createPriceLine({ price: entryPrice, color: '#2196f3', lineWidth: 1, lineStyle: 0, axisLabelVisible: true, title: 'Entry' });
    }
    if (stopLoss) {
      slRef.current = series.createPriceLine({ price: stopLoss, color: '#ef5350', lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'SL' });
    }
    if (takeProfit) {
      tpRef.current = series.createPriceLine({ price: takeProfit, color: '#26a69a', lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'TP' });
    }
  }, [entryPrice, stopLoss, takeProfit]);

  // ─── RSI badge (computed, rendered in DOM not chart) ──────────────────────
  const closes = candles.map(c => c.close);
  const rsiValues = rsi(closes, 14);
  const latestRsi = rsiValues[rsiValues.length - 1];
  const rsiColor = latestRsi == null ? '#888'
    : latestRsi >= 70 ? '#ef5350'
    : latestRsi <= 30 ? '#26a69a'
    : '#d1d4dc';

  const latestClose = candles[candles.length - 1]?.close;

  return (
    <div className="relative w-full" style={{ background: '#131722' }}>
      {/* Chart header */}
      <div className="flex items-center gap-4 px-3 py-1.5 border-b border-[#1e2230] text-xs font-mono">
        <span className="text-white font-bold text-sm">{asset.symbol}</span>
        {latestClose != null && (
          <span className="text-[#d1d4dc]">{formatPrice(latestClose, asset)}</span>
        )}
        <span className="text-[#00bcd4]">MA9</span>
        <span className="text-[#ff9800]">MA21</span>
        <span className="text-[#9c27b0]">MA50</span>
        <span className="text-[#546e7a]">BB</span>
        {latestRsi != null && (
          <span style={{ color: rsiColor }}>RSI {latestRsi.toFixed(0)}</span>
        )}
      </div>
      <div ref={containerRef} style={{ height }} />
    </div>
  );
}
