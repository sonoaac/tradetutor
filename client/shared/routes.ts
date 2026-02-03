export * from "./client/routes";
export type MarketDataResponse = z.infer<typeof api.market.candles.responses[200]>;
