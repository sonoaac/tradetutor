import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./auth";
import { insertTradeSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Middleware to ensure portfolio exists for logged in users
  // We remove auto-creation to allow for the onboarding flow
  app.use(async (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
      const userId = (req.user as any).id;
      const portfolio = await storage.getPortfolio(userId);
      // Portfolio is now created via /api/portfolio/onboard
    }
    next();
  });

  // === TRADES ===

  app.get(api.trades.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    const trades = await storage.getTrades(userId);
    res.json(trades);
  });

  app.post(api.trades.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    
    try {
      const input = api.trades.create.input.parse(req.body);
      
      // Basic validation: Check balance for buy orders
      if (input.side === 'buy') {
        const cost = Number(input.entryPrice) * Number(input.size);
        const portfolio = await storage.getPortfolio(userId);
        if (portfolio && Number(portfolio.balance) < cost) {
          return res.status(400).json({ message: "Insufficient funds" });
        }
        // Deduct balance
        await storage.updatePortfolioBalance(userId, -cost);
      }

      // Calculate Risk/Reward
      let riskAmount = null;
      let rewardAmount = null;
      let rrRatio = null;

      if (input.stopLoss) {
        riskAmount = Math.abs(Number(input.entryPrice) - Number(input.stopLoss)) * Number(input.size);
      }
      if (input.takeProfit) {
        rewardAmount = Math.abs(Number(input.takeProfit) - Number(input.entryPrice)) * Number(input.size);
      }
      if (riskAmount && rewardAmount && riskAmount > 0) {
        rrRatio = rewardAmount / riskAmount;
      }

      const trade = await storage.createTrade(userId, {
        ...input,
        riskAmount: riskAmount?.toFixed(2),
        rewardAmount: rewardAmount?.toFixed(2),
        rrRatio: rrRatio?.toFixed(2),
      });
      res.status(201).json(trade);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.trades.close.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    const tradeId = Number(req.params.id);
    
    const trade = await storage.getTrade(tradeId);
    if (!trade || trade.userId !== userId) {
      return res.status(404).json({ message: "Trade not found" });
    }
    
    if (trade.status === 'closed') {
      return res.status(400).json({ message: "Trade already closed" });
    }

    const exitPrice = Number(req.body.exitPrice);
    let pnl = 0;
    
    if (trade.side === 'buy') {
      pnl = (exitPrice - Number(trade.entryPrice)) * Number(trade.size);
      // Return principal + pnl
      const proceeds = (Number(trade.entryPrice) * Number(trade.size)) + pnl;
      await storage.updatePortfolioBalance(userId, proceeds);
    } else {
      // Short selling logic (simplified)
      pnl = (Number(trade.entryPrice) - exitPrice) * Number(trade.size);
      // Return margin + pnl (simplified)
      // For now, assume simple cash account model for MVP, even though shorting is complex
      await storage.updatePortfolioBalance(userId, pnl); 
    }

    const updatedTrade = await storage.updateTrade(tradeId, {
      status: 'closed',
      exitPrice: exitPrice.toString(),
      exitTime: new Date(),
      pnl: pnl.toString(),
    });

    res.json(updatedTrade);
  });

  // === PORTFOLIO ===

  app.get(api.portfolio.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    const portfolio = await storage.getPortfolio(userId);
    res.json(portfolio);
  });

  app.post(api.portfolio.onboard.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    
    try {
      const input = api.portfolio.onboard.input.parse(req.body);
      const portfolio = await storage.createPortfolio(userId, input);
      res.json(portfolio);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      throw err;
    }
  });

  app.post(api.portfolio.reset.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    const portfolio = await storage.resetPortfolio(userId);
    res.json(portfolio);
  });

  // === LESSONS ===

  app.get(api.lessons.list.path, async (req, res) => {
    const lessons = await storage.getLessons();
    
    // If logged in, attach progress
    if (req.isAuthenticated()) {
      const userId = (req.user as any).id;
      const progress = await storage.getLessonProgress(userId);
      const lessonsWithProgress = lessons.map(l => {
        const p = progress.find(p => p.lessonId === l.id);
        return {
          ...l,
          isCompleted: p?.completed || false,
          score: p?.score || undefined
        };
      });
      return res.json(lessonsWithProgress);
    }
    
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLessonBySlug(req.params.slug);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    
    if (req.isAuthenticated()) {
      const userId = (req.user as any).id;
      const progress = await storage.getLessonProgress(userId);
      const p = progress.find(p => p.lessonId === lesson.id);
      return res.json({
        ...lesson,
        isCompleted: p?.completed || false,
        score: p?.score || undefined
      });
    }

    res.json(lesson);
  });

  app.post(api.lessons.complete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).id;
    const lessonId = Number(req.params.id);
    const { score } = req.body;
    
    const progress = await storage.updateLessonProgress(userId, lessonId, score);
    res.json(progress);
  });

  // === MARKET DATA (MOCK) ===
  
  app.get(api.market.candles.path, async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    
    // Generate mock data
    // 30 days of daily data
    const candles = [];
    let price = 150.00; // Starting mock price
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    
    for (let i = 30; i >= 0; i--) {
      const time = now - (i * day);
      const volatility = price * 0.02; // 2% daily volatility
      const change = (Math.random() - 0.5) * volatility;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + (Math.random() * volatility * 0.5);
      const low = Math.min(open, close) - (Math.random() * volatility * 0.5);
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      candles.push({ time, open, high, low, close, volume });
      price = close;
    }
    
    res.json({ symbol, candles });
  });

  // Seed data on startup
  await storage.seedLessons();

  return httpServer;
}
