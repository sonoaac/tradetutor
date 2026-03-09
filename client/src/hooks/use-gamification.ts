import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

// ─── XP / Level table ────────────────────────────────────────────────────────

export const MAX_LEVEL = 100;

function xpForLevel(level: number): number {
  // XP required to reach `level` from level 1
  // Quadratic: 100 * level^1.8
  return Math.round(100 * Math.pow(level, 1.8));
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpForLevel(level + 1)) level++;
  return level;
}

export function xpToNextLevel(xp: number): { current: number; required: number; level: number } {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) return { current: xp, required: xp, level };
  const current = xp - xpForLevel(level);
  const required = xpForLevel(level + 1) - xpForLevel(level);
  return { current, required, level };
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

const ACHIEVEMENT_DEFS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first_trade',    name: 'First Blood',       description: 'Place your first trade',           xpReward: 50,  icon: 'Zap' },
  { id: 'first_win',     name: 'Winner Winner',      description: 'Close a profitable trade',          xpReward: 100, icon: 'Trophy' },
  { id: 'streak_3',      name: 'Hot Streak',         description: 'Win 3 trades in a row',             xpReward: 200, icon: 'Flame' },
  { id: 'streak_5',      name: 'On Fire',            description: 'Win 5 trades in a row',             xpReward: 400, icon: 'Flame' },
  { id: 'trades_10',     name: 'Active Trader',      description: 'Complete 10 trades',                xpReward: 150, icon: 'Activity' },
  { id: 'trades_50',     name: 'Veteran Trader',     description: 'Complete 50 trades',                xpReward: 500, icon: 'Star' },
  { id: 'profit_1k',     name: 'Grand',              description: 'Earn $1,000 total profit',          xpReward: 250, icon: 'DollarSign' },
  { id: 'profit_10k',    name: 'High Roller',        description: 'Earn $10,000 total profit',         xpReward: 1000,icon: 'Crown' },
  { id: 'try_crypto',    name: 'Crypto Curious',     description: 'Trade any crypto asset',            xpReward: 75,  icon: 'Cpu' },
  { id: 'try_forex',     name: 'Forex Explorer',     description: 'Trade any forex pair',              xpReward: 75,  icon: 'Globe' },
];

// ─── Daily Challenges ─────────────────────────────────────────────────────────

export interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

const DAILY_POOLS: Omit<Challenge, 'progress' | 'completed'>[] = [
  { id: 'daily_trades_3',  name: 'Day Trader',       description: 'Complete 3 trades today',           target: 3,    xpReward: 200 },
  { id: 'daily_win_2',     name: 'Double Win',        description: 'Win 2 trades today',                target: 2,    xpReward: 300 },
  { id: 'daily_profit',    name: 'Daily Profit',      description: 'End the day with a net profit',     target: 1,    xpReward: 250 },
  { id: 'daily_multi',     name: 'Diversified',       description: 'Trade 3 different assets today',    target: 3,    xpReward: 200 },
];

// ─── Storage keys ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'tt_gamification_v1';

interface StoredGamification {
  xp: number;
  achievements: Record<string, { unlocked: boolean; unlockedAt?: number }>;
  dailyKey: string;
  dailyChallenges: Record<string, number>; // id → progress
  totalProfit: number;
  tradedCategories: string[];
}

function loadStorage(): StoredGamification {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    xp: 0,
    achievements: {},
    dailyKey: getTodayKey(),
    dailyChallenges: {},
    totalProfit: 0,
    tradedCategories: [],
  };
}

function saveStorage(s: StoredGamification) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGamification() {
  const { toast } = useToast();
  const [stored, setStored] = useState<StoredGamification>(loadStorage);

  // persist on every change
  useEffect(() => { saveStorage(stored); }, [stored]);

  // reset daily challenges if new day
  useEffect(() => {
    const today = getTodayKey();
    if (stored.dailyKey !== today) {
      setStored(s => ({ ...s, dailyKey: today, dailyChallenges: {} }));
    }
  }, []);

  // ─── Derived state ─────────────────────────────────────────────────────────

  const achievements: Achievement[] = ACHIEVEMENT_DEFS.map(def => ({
    ...def,
    unlocked: stored.achievements[def.id]?.unlocked ?? false,
    unlockedAt: stored.achievements[def.id]?.unlockedAt,
  }));

  const dailyChallenges: Challenge[] = DAILY_POOLS.map(def => ({
    ...def,
    progress: stored.dailyChallenges[def.id] ?? 0,
    completed: (stored.dailyChallenges[def.id] ?? 0) >= def.target,
  }));

  const { level, current: xpProgress, required: xpRequired } = xpToNextLevel(stored.xp);

  // ─── Internal helpers ──────────────────────────────────────────────────────

  const addXp = useCallback((amount: number) => {
    setStored(s => {
      const prevLevel = levelFromXp(s.xp);
      const newXp = s.xp + amount;
      const newLevel = levelFromXp(newXp);
      if (newLevel > prevLevel) {
        toast({ title: `Level Up! You're now Level ${newLevel}`, description: `+${amount} XP` });
      }
      return { ...s, xp: newXp };
    });
  }, [toast]);

  const unlockAchievement = useCallback((id: string) => {
    setStored(s => {
      if (s.achievements[id]?.unlocked) return s;
      const def = ACHIEVEMENT_DEFS.find(d => d.id === id);
      if (!def) return s;
      toast({ title: `Achievement Unlocked: ${def.name}`, description: `+${def.xpReward} XP — ${def.description}` });
      const updated: StoredGamification = {
        ...s,
        xp: s.xp + def.xpReward,
        achievements: { ...s.achievements, [id]: { unlocked: true, unlockedAt: Date.now() } },
      };
      return updated;
    });
  }, [toast]);

  const advanceChallenge = useCallback((id: string, by = 1) => {
    setStored(s => {
      const prev = s.dailyChallenges[id] ?? 0;
      const pool = DAILY_POOLS.find(d => d.id === id);
      if (!pool) return s;
      if (prev >= pool.target) return s; // already done

      const next = Math.min(prev + by, pool.target);
      const justCompleted = prev < pool.target && next >= pool.target;

      let newS: StoredGamification = { ...s, dailyChallenges: { ...s.dailyChallenges, [id]: next } };

      if (justCompleted) {
        newS = { ...newS, xp: newS.xp + pool.xpReward };
        toast({ title: `Challenge Complete: ${pool.name}`, description: `+${pool.xpReward} XP` });
      }
      return newS;
    });
  }, [toast]);

  // ─── Public: called after each trade close ─────────────────────────────────

  const onTradeOpened = useCallback((symbol: string, category: string) => {
    addXp(10); // XP for opening a trade

    // first_trade
    setStored(s => {
      if (!s.achievements['first_trade']?.unlocked) {
        unlockAchievement('first_trade');
      }
      // category tracking
      if (!s.tradedCategories.includes(category)) {
        const cats = [...s.tradedCategories, category];
        if (category === 'Crypto')  unlockAchievement('try_crypto');
        if (category === 'Forex')   unlockAchievement('try_forex');
        return { ...s, tradedCategories: cats };
      }
      return s;
    });
  }, [addXp, unlockAchievement]);

  const onTradeClosed = useCallback((pnl: number, isWin: boolean, winStreak: number, totalTrades: number, symbol: string) => {
    addXp(isWin ? 25 : 5);

    // advance daily challenges
    advanceChallenge('daily_trades_3');
    if (isWin) advanceChallenge('daily_win_2');

    setStored(s => {
      const newProfit = s.totalProfit + pnl;
      let updated: StoredGamification = { ...s, totalProfit: newProfit };

      // achievements
      const unlock = (id: string) => {
        if (!updated.achievements[id]?.unlocked) {
          const def = ACHIEVEMENT_DEFS.find(d => d.id === id)!;
          updated = {
            ...updated,
            xp: updated.xp + def.xpReward,
            achievements: { ...updated.achievements, [id]: { unlocked: true, unlockedAt: Date.now() } },
          };
          toast({ title: `Achievement Unlocked: ${def.name}`, description: `+${def.xpReward} XP — ${def.description}` });
        }
      };

      if (isWin) unlock('first_win');
      if (winStreak >= 3) unlock('streak_3');
      if (winStreak >= 5) unlock('streak_5');
      if (totalTrades >= 10) unlock('trades_10');
      if (totalTrades >= 50) unlock('trades_50');
      if (newProfit >= 1000) unlock('profit_1k');
      if (newProfit >= 10000) unlock('profit_10k');

      return updated;
    });
  }, [addXp, advanceChallenge, toast]);

  return {
    xp: stored.xp,
    level,
    xpProgress,
    xpRequired,
    achievements,
    dailyChallenges,
    onTradeOpened,
    onTradeClosed,
  };
}
