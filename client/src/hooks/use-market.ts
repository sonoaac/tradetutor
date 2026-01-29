import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMarketCandles(symbol: string, interval: '1m' | '5m' | '1h' = '1h') {
  return useQuery({
    queryKey: [api.market.candles.path, symbol, interval],
    queryFn: async () => {
      // Build base URL with symbol param
      const urlBase = buildUrl(api.market.candles.path, { symbol });
      // Add query params
      const url = `${urlBase}?interval=${interval}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch market data");
      return api.market.candles.responses[200].parse(await res.json());
    },
    refetchInterval: 5000, // Live updates every 5s
  });
}
