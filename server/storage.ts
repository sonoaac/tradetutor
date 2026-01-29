import { db } from "./db";
import { 
  users, trades, portfolios, lessons, lessonProgress,
  type User, type InsertUser,
  type Trade, type CreateTradeRequest, type UpdateTradeRequest,
  type Portfolio,
  type Lesson,
  type LessonProgress
} from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Auth (extended)
  getUser(id: string): Promise<User | undefined>;
  
  // Portfolio
  getPortfolio(userId: string): Promise<Portfolio | undefined>;
  createPortfolio(userId: string): Promise<Portfolio>;
  resetPortfolio(userId: string): Promise<Portfolio>;
  updatePortfolioBalance(userId: string, amount: number): Promise<Portfolio>; // amount can be negative
  
  // Trades
  createTrade(userId: string, trade: CreateTradeRequest): Promise<Trade>;
  getTrades(userId: string): Promise<Trade[]>;
  getTrade(id: number): Promise<Trade | undefined>;
  updateTrade(id: number, updates: UpdateTradeRequest): Promise<Trade>;
  
  // Lessons
  getLessons(): Promise<Lesson[]>;
  getLessonBySlug(slug: string): Promise<Lesson | undefined>;
  getLessonProgress(userId: string): Promise<LessonProgress[]>;
  updateLessonProgress(userId: string, lessonId: number, score?: number): Promise<LessonProgress>;
  
  // Seed
  seedLessons(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getPortfolio(userId: string): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return portfolio;
  }

  async createPortfolio(userId: string, data?: { track?: string, experienceLevel?: string, balance?: string }): Promise<Portfolio> {
    const [portfolio] = await db.insert(portfolios).values({
      userId,
      balance: data?.balance || "10000.00",
      totalProfitLoss: "0.00",
      track: data?.track || "stocks",
      experienceLevel: data?.experienceLevel || "beginner"
    }).returning();
    return portfolio;
  }

  async resetPortfolio(userId: string): Promise<Portfolio> {
    const existing = await this.getPortfolio(userId);
    const [portfolio] = await db.update(portfolios)
      .set({ 
        balance: "10000.00", 
        totalProfitLoss: "0.00",
        lastResetAt: new Date(),
        resetCount: (existing?.resetCount || 0) + 1
      })
      .where(eq(portfolios.userId, userId))
      .returning();
      
    await db.delete(trades).where(eq(trades.userId, userId));
    return portfolio;
  }

  async updatePortfolioBalance(userId: string, amount: number): Promise<Portfolio> {
    // This is a naive implementation. In a real app, use transactions and SQL math.
    const portfolio = await this.getPortfolio(userId);
    if (!portfolio) throw new Error("Portfolio not found");
    
    const newBalance = Number(portfolio.balance) + amount;
    const [updated] = await db.update(portfolios)
      .set({ balance: newBalance.toFixed(2) })
      .where(eq(portfolios.userId, userId))
      .returning();
    return updated;
  }

  async createTrade(userId: string, trade: CreateTradeRequest): Promise<Trade> {
    const [newTrade] = await db.insert(trades).values({
      ...trade,
      userId,
      entryTime: new Date(),
    }).returning();
    return newTrade;
  }

  async getTrades(userId: string): Promise<Trade[]> {
    return await db.select().from(trades)
      .where(eq(trades.userId, userId))
      .orderBy(desc(trades.entryTime));
  }

  async getTrade(id: number): Promise<Trade | undefined> {
    const [trade] = await db.select().from(trades).where(eq(trades.id, id));
    return trade;
  }

  async updateTrade(id: number, updates: UpdateTradeRequest): Promise<Trade> {
    const [updated] = await db.update(trades)
      .set(updates)
      .where(eq(trades.id, id))
      .returning();
    return updated;
  }

  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLessonBySlug(slug: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.slug, slug));
    return lesson;
  }

  async getLessonProgress(userId: string): Promise<LessonProgress[]> {
    return await db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId));
  }

  async updateLessonProgress(userId: string, lessonId: number, score?: number): Promise<LessonProgress> {
    const [existing] = await db.select().from(lessonProgress)
      .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId)));
      
    if (existing) {
      const [updated] = await db.update(lessonProgress)
        .set({ 
          completed: true, 
          score: score ?? existing.score, 
          completedAt: new Date() 
        })
        .where(eq(lessonProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newItem] = await db.insert(lessonProgress).values({
        userId,
        lessonId,
        completed: true,
        score,
        completedAt: new Date()
      }).returning();
      return newItem;
    }
  }

  async seedLessons(): Promise<void> {
    const count = await db.select({ count: lessons.id }).from(lessons);
    if (count.length > 0) return;

    const initialLessons = [
      {
        title: "Trading 101: The Basics",
        slug: "trading-101",
        category: "basics",
        difficulty: "beginner",
        order: 1,
        content: `
# Welcome to Trading
Trading is the act of buying and selling financial assets...

## Key Concepts
- **Bid**: The highest price a buyer is willing to pay.
- **Ask**: The lowest price a seller is willing to accept.
- **Spread**: The difference between the Bid and Ask.

## Your First Goal
Learn to identify a trend. Is the price going up (Bullish) or down (Bearish)?
        `
      },
      {
        title: "Risk Management",
        slug: "risk-management",
        category: "basics",
        difficulty: "beginner",
        order: 2,
        content: `
# Protecting Your Capital
The #1 rule of trading is: **Don't lose money**.

## Stop Loss
Always set a stop loss. This is your safety net.

## Position Sizing
Never risk more than 1-2% of your account on a single trade.
        `
      },
      {
        title: "Candlestick Patterns",
        slug: "candlestick-patterns",
        category: "technical",
        difficulty: "intermediate",
        order: 3,
        content: `
# Reading the Charts
Candlesticks tell a story about price action.

## Bullish Engulfing
A large green candle that completely consumes the previous red candle.

## Doji
A candle with a very small body, indicating indecision.
        `
      }
    ];

    for (const lesson of initialLessons) {
      await db.insert(lessons).values(lesson);
    }
  }
}

export const storage = new DatabaseStorage();
