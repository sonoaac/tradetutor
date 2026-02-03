import { z } from "zod";

const numberLike = z.union([z.number(), z.string()]);

const tradeSchema = z
  .object({
    id: z.coerce.number(),
    userId: z.string().optional(),
    symbol: z.string(),
    side: z.enum(["buy", "sell"]).or(z.string()),
    entryPrice: numberLike,
    exitPrice: numberLike.optional().nullable(),
    size: numberLike,
    stopLoss: numberLike.optional().nullable(),
    takeProfit: numberLike.optional().nullable(),
    status: z.string().optional(),
    pnl: numberLike.optional().nullable(),
    entryTime: z.string().optional().nullable(),
    exitTime: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    aiFeedback: z.string().optional().nullable(),
    scoreRisk: z.number().optional().nullable(),
    scoreExecution: z.number().optional().nullable(),
    riskAmount: numberLike.optional().nullable(),
    rewardAmount: numberLike.optional().nullable(),
    rrRatio: numberLike.optional().nullable(),
  })
  .passthrough();

const portfolioSchema = z
  .object({
    id: z.coerce.number(),
    userId: z.string().optional(),
    balance: numberLike,
    totalProfitLoss: numberLike.optional().nullable(),
    track: z.string().optional().nullable(),
    experienceLevel: z.string().optional().nullable(),
    resetCount: z.coerce.number().optional().nullable(),
    lastResetAt: z.string().optional().nullable(),
  })
  .passthrough();

const lessonProgressSchema = z
  .object({
    id: z.coerce.number(),
    userId: z.string().optional(),
    lessonId: z.coerce.number().optional(),
    completed: z.boolean().optional(),
    score: z.coerce.number().optional().nullable(),
    completedAt: z.string().optional().nullable(),
  })
  .passthrough();

export const insertTradeSchema = z
  .object({
    symbol: z.string(),
    side: z.enum(["buy", "sell"]).or(z.string()),
    entryPrice: z.coerce.number(),
    size: z.coerce.number(),
    stopLoss: z.coerce.number().optional(),
    takeProfit: z.coerce.number().optional(),
  })
  .passthrough();

// Quiz question schema
export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correct: z.number(),
  explanation: z.string(),
});

export const quizDataSchema = z.object({
  questions: z.array(quizQuestionSchema),
});

// Lesson response with quiz data
export const lessonResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  content: z.string().optional(),
  track: z.string().optional(),
  difficulty: z.string().optional(),
  order: z.number().optional(),
  quizData: quizDataSchema.optional(),
  createdAt: z.string(),
  isCompleted: z.boolean().optional(),
  score: z.number().optional(),
});

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
      method: "GET" as const,
      path: "/api/trades",
      responses: {
        200: z.array(tradeSchema),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/trades",
      input: insertTradeSchema,
      responses: {
        201: tradeSchema,
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    close: {
      method: "POST" as const,
      path: "/api/trades/:id/close",
      input: z.object({
        exitPrice: z.number(),
      }),
      responses: {
        200: tradeSchema,
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/trades/:id",
      responses: {
        200: tradeSchema,
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
  portfolio: {
    get: {
      method: "GET" as const,
      path: "/api/portfolio",
      responses: {
        200: portfolioSchema,
        401: errorSchemas.unauthorized,
      },
    },
    onboard: {
      method: "POST" as const,
      path: "/api/portfolio/onboard",
      input: z.object({
        track: z.string(),
        experienceLevel: z.string(),
        balance: z.string().optional(),
      }),
      responses: {
        200: portfolioSchema,
        401: errorSchemas.unauthorized,
      },
    },
    reset: {
      method: "POST" as const,
      path: "/api/portfolio/reset",
      responses: {
        200: portfolioSchema,
        401: errorSchemas.unauthorized,
      },
    },
  },
  lessons: {
    list: {
      method: "GET" as const,
      path: "/api/lessons",
      responses: {
        200: z.array(lessonResponseSchema),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/lessons/:slug",
      responses: {
        200: lessonResponseSchema,
        404: errorSchemas.notFound,
      },
    },
    complete: {
      method: "POST" as const,
      path: "/api/lessons/:id/complete",
      input: z.object({
        score: z.number().optional(),
      }),
      responses: {
        200: lessonProgressSchema,
        401: errorSchemas.unauthorized,
      },
    },
  },
  market: {
    candles: {
      method: "GET" as const,
      path: "/api/market/candles/:symbol",
      input: z
        .object({
          interval: z.enum(["1m", "5m", "15m", "1h", "1d"]).optional(),
        })
        .optional(),
      responses: {
        200: z.object({
          symbol: z.string(),
          candles: z.array(
            z.object({
              time: z.coerce.number(),
              open: z.coerce.number(),
              high: z.coerce.number(),
              low: z.coerce.number(),
              close: z.coerce.number(),
              volume: z.coerce.number(),
            })
          ),
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
export type Trade = z.infer<typeof tradeSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type LessonProgress = z.infer<typeof lessonProgressSchema>;
