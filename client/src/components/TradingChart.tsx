import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData } from "lightweight-charts";
import { Loader2 } from "lucide-react";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TradingChartProps {
  data: Candle[];
  symbol: string;
  isLoading: boolean;
}

export function TradingChart({ data, symbol, isLoading }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0 || isLoading) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9CA3AF",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.05)" },
        horzLines: { color: "rgba(255, 255, 255, 0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#2B2B43",
      },
      rightPriceScale: {
        borderColor: "#2B2B43",
      },
    });

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22C55E", // Green
      downColor: "#EF4444", // Red
      borderUpColor: "#22C55E",
      borderDownColor: "#EF4444",
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Transform data for lightweight-charts (needs seconds, not milliseconds)
    const candleData: CandlestickData[] = data.map((candle) => ({
      time: Math.floor(candle.time / 1000) as any, // Convert ms to seconds
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    const volumeData = data.map((candle) => ({
      time: Math.floor(candle.time / 1000) as any,
      value: candle.volume,
      color: candle.close >= candle.open ? "rgba(34, 197, 94, 0.5)" : "rgba(239, 68, 68, 0.5)",
    }));

    candleSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    // Fit content
    chart.timeScale().fitContent();

    // Store refs
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-card/50 rounded-2xl border border-border">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-card/50 rounded-2xl border border-border">
        <p className="text-muted-foreground">No chart data available for {symbol}</p>
      </div>
    );
  }

  return (
    <div className="bg-card/50 rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg">{symbol} Chart</h3>
        <div className="flex gap-2">
          <span className="text-xs text-success flex items-center gap-1">
            <span className="w-3 h-3 bg-success rounded"></span> Up
          </span>
          <span className="text-xs text-destructive flex items-center gap-1">
            <span className="w-3 h-3 bg-destructive rounded"></span> Down
          </span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}
