import { pgTable, text, serial, integer, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

// Export Auth Models
export * from "./models/auth";
export * from "./models/chat";

// === TABLE DEFINITIONS ===

// User Profile / Settings (Extends the basic auth user)
// We'll keep it simple and just use the auth users table for basic info, 
// but we might need a separate table for game-specific state if we don't want to modify the auth schema too much.
// However, for this app, let's create a "portfolios" table that acts as the game state.

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("100000.00"),
  totalProfitLoss: numeric("total_profit_loss", { precision: 12, scale: 2 }).notNull().default("0.00"),
  resetCount: integer("reset_count").default(0),
  lastResetAt: timestamp("last_reset_at").defaultNow(),
});

export const portfoliosRelations = relations(portfolios, ({ one }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
}));

export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  symbol: text("symbol").notNull(), // e.g., AAPL, BTC-USD
  side: text("side").notNull(), // 'buy' or 'sell'
  entryPrice: numeric("entry_price", { precision: 12, scale: 2 }).notNull(),
  exitPrice: numeric("exit_price", { precision: 12, scale: 2 }), // Null if open
  size: numeric("size", { precision: 12, scale: 2 }).notNull(), // Number of shares/units
  stopLoss: numeric("stop_loss", { precision: 12, scale: 2 }),
  takeProfit: numeric("take_profit", { precision: 12, scale: 2 }),
  status: text("status").notNull().default("open"), // 'open', 'closed'
  pnl: numeric("pnl", { precision: 12, scale: 2 }),
  entryTime: timestamp("entry_time").notNull().defaultNow(),
  exitTime: timestamp("exit_time"),
  notes: text("notes"),
  aiFeedback: text("ai_feedback"), // The "Coach" feedback
  scoreRisk: integer("score_risk"), // 0-100
  scoreExecution: integer("score_execution"), // 0-100
});

export const tradesRelations = relations(trades, ({ one }) => ({
  user: one(users, {
    fields: [trades.userId],
    references: [users.id],
  }),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(), // e.g., 'stocks-101'
  category: text("category").notNull(), // 'basics', 'crypto', 'technical', 'psychology'
  difficulty: text("difficulty").notNull(), // 'beginner', 'intermediate', 'advanced'
  content: text("content").notNull(), // Markdown content
  order: integer("order").notNull(),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id),
  completed: boolean("completed").default(false),
  score: integer("score"), // Quiz score
  completedAt: timestamp("completed_at"),
});

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

// === BASE SCHEMAS ===
export const insertPortfolioSchema = createInsertSchema(portfolios).omit({ id: true, lastResetAt: true });
export const insertTradeSchema = createInsertSchema(trades).omit({ id: true, entryTime: true, exitTime: true, pnl: true, aiFeedback: true, scoreRisk: true, scoreExecution: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertLessonProgressSchema = createInsertSchema(lessonProgress).omit({ id: true, completedAt: true });

// === EXPLICIT API CONTRACT TYPES ===

export type Portfolio = typeof portfolios.$inferSelect;
export type Trade = typeof trades.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;

export type CreateTradeRequest = z.infer<typeof insertTradeSchema>;
export type CloseTradeRequest = {
  exitPrice: number;
};
export type UpdateTradeRequest = Partial<CreateTradeRequest>;

export type LessonResponse = Lesson & {
  isCompleted?: boolean;
  score?: number;
};

export type PortfolioResponse = Portfolio;

export type TradeResponse = Trade;

// Market Data Types (Not stored in DB, but used in API)
export interface Candle {
  time: number; // Unix timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketDataResponse {
  symbol: string;
  candles: Candle[];
}
