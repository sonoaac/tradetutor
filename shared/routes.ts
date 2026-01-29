import { z } from 'zod';
import { insertTradeSchema, trades, lessons, lessonProgress, portfolios } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  trades: {
    list: {
      method: 'GET' as const,
      path: '/api/trades',
      responses: {
        200: z.array(z.custom<typeof trades.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/trades',
      input: insertTradeSchema,
      responses: {
        201: z.custom<typeof trades.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    close: {
      method: 'POST' as const,
      path: '/api/trades/:id/close',
      input: z.object({
        exitPrice: z.number(),
      }),
      responses: {
        200: z.custom<typeof trades.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/trades/:id',
      responses: {
        200: z.custom<typeof trades.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
  portfolio: {
    get: {
      method: 'GET' as const,
      path: '/api/portfolio',
      responses: {
        200: z.custom<typeof portfolios.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    onboard: {
      method: 'POST' as const,
      path: '/api/portfolio/onboard',
      input: z.object({
        track: z.string(),
        experienceLevel: z.string(),
        balance: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof portfolios.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    reset: {
      method: 'POST' as const,
      path: '/api/portfolio/reset',
      responses: {
        200: z.custom<typeof portfolios.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  lessons: {
    list: {
      method: 'GET' as const,
      path: '/api/lessons',
      responses: {
        200: z.array(z.custom<typeof lessons.$inferSelect & { isCompleted?: boolean; score?: number }>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/lessons/:slug',
      responses: {
        200: z.custom<typeof lessons.$inferSelect & { isCompleted?: boolean; score?: number }>(),
        404: errorSchemas.notFound,
      },
    },
    complete: {
      method: 'POST' as const,
      path: '/api/lessons/:id/complete',
      input: z.object({
        score: z.number().optional(),
      }),
      responses: {
        200: z.custom<typeof lessonProgress.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  market: {
    candles: {
      method: 'GET' as const,
      path: '/api/market/candles/:symbol',
      input: z.object({
        interval: z.enum(['1m', '5m', '15m', '1h', '1d']).optional(),
      }).optional(),
      responses: {
        200: z.object({
          symbol: z.string(),
          candles: z.array(z.object({
            time: z.number(),
            open: z.number(),
            high: z.number(),
            low: z.number(),
            close: z.number(),
            volume: z.number(),
          })),
        }),
      },
    },
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPES
// ============================================
export type TradeInput = z.infer<typeof api.trades.create.input>;
export type TradeResponse = z.infer<typeof api.trades.create.responses[201]>;
export type PortfolioResponse = z.infer<typeof api.portfolio.get.responses[200]>;
export type LessonResponse = z.infer<typeof api.lessons.get.responses[200]>;
export type MarketDataResponse = z.infer<typeof api.market.candles.responses[200]>;
