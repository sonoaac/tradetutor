import { useState } from 'react';
import { Link } from 'wouter';
import {
  TrendingUp, TrendingDown, BookOpen, Flame, Zap, Activity,
  BarChart2, ArrowRight, Play, CheckCircle, GraduationCap,
  Trophy, Target, ChevronRight,
} from 'lucide-react';
import { ASSET_MAP, formatPrice } from '@/hooks/use-simulator';
import { useLivePrices } from '@/hooks/use-live-prices';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/hooks/use-auth';

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS_LESSONS = 'tt_lessons_v2';
const LS_GAMIFY  = 'tt_gamification_v1';

function loadLessonProgress() {
  try { const r = localStorage.getItem(LS_LESSONS); return r ? JSON.parse(r) : null; } catch { return null; }
}
function loadGamification() {
  try { const r = localStorage.getItem(LS_GAMIFY); return r ? JSON.parse(r) : null; } catch { return null; }
}

function xpToLevel(xp: number) {
  const thresholds = [0, 200, 500, 900, 1400, 2000, 2700, 3500];
  const titles     = ['Rookie', 'Student', 'Trader', 'Analyst', 'Strategist', 'Pro Trader', 'Expert', 'Master'];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) { level = i + 1; break; }
  }
  const curr = thresholds[level - 1];
  const next = level < thresholds.length ? thresholds[level] : 9999;
  return { level, title: titles[level - 1], pct: Math.min(100, ((xp - curr) / (next - curr)) * 100) };
}

const ALL_LESSON_COUNT = 21;

// ─── Market ticker strip ──────────────────────────────────────────────────────

const TICKER_SYMBOLS = ['ZYNC', 'AXPC', 'NRVA', 'AETR', 'VLTR', 'TITAN500', 'SLIX', 'MXST'];

function TickerStrip({ prices }: { prices: Record<string, number> }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto border-b border-border">
      {TICKER_SYMBOLS.map((sym, i) => {
        const asset = ASSET_MAP.get(sym);
        if (!asset) return null;
        const price = prices[sym] ?? asset.basePrice;
        const chg   = ((price - asset.basePrice) / asset.basePrice) * 100;
        const up    = chg >= 0;
        return (
          <Link key={sym} href="/market">
            <a className="flex items-center gap-3 px-5 py-3 border-r border-border hover:bg-muted transition-colors shrink-0">
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{sym}</p>
                <p className="text-xs text-muted-foreground font-mono">{formatPrice(price, asset)}</p>
              </div>
              <span
                className="text-xs font-semibold font-mono flex items-center gap-0.5"
                style={{ color: up ? '#16a34a' : '#dc2626' }}
              >
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {up ? '+' : ''}{chg.toFixed(2)}%
              </span>
            </a>
          </Link>
        );
      })}
      <Link href="/market">
        <a className="flex items-center gap-1 px-5 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 whitespace-nowrap">
          All markets <ArrowRight size={13} />
        </a>
      </Link>
    </div>
  );
}

// ─── Quick lessons list ───────────────────────────────────────────────────────

const QUICK_LESSONS = [
  { id: 'f1', title: 'What is Trading?',          module: 'Foundations', accent: '#16a34a' },
  { id: 'c1', title: 'Candlestick Basics',         module: 'Charts',      accent: '#2563eb' },
  { id: 'r1', title: 'Stop Loss & Take Profit',    module: 'Risk',        accent: '#dc2626' },
  { id: 'i2', title: 'RSI Explained',              module: 'Indicators',  accent: '#7c3aed' },
  { id: 'c2', title: 'Support & Resistance',       module: 'Charts',      accent: '#2563eb' },
  { id: 'r2', title: 'Risk / Reward Ratio',        module: 'Risk',        accent: '#dc2626' },
];

// ─── Divider with label ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Guest landing ────────────────────────────────────────────────────────────

function GuestDashboard() {
  const [showAuth, setShowAuth] = useState(false);
  const prices = useLivePrices();

  return (
    <div className="w-full">
      <TickerStrip prices={prices} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Simulator live — 26 fake assets updating now
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Learn to trade.<br />
            <span className="text-primary">Risk nothing.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Gamified lessons, a live-looking simulator, and real trading concepts — all free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition"
            >
              Get started free
            </button>
            <Link href="/lessons">
              <a className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition">
                Browse lessons
              </a>
            </Link>
          </div>
        </div>

        {/* Feature row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {[
            { icon: GraduationCap, title: '21 Structured Lessons', body: 'Six modules from trading basics to advanced strategy — unlock as you progress.', color: '#2563eb' },
            { icon: BarChart2,     title: 'Live-Looking Simulator', body: '26 fictional assets with realistic price action. Practice entries, exits, and SL/TP.', color: '#16a34a' },
            { icon: Trophy,        title: 'XP & Achievements',      body: 'Earn XP every lesson and trade. Level up through Rookie to Master trader.', color: '#d97706' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-6 rounded-xl border border-border bg-card">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: f.color + '15' }}
                >
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>

        {/* Lessons preview */}
        <SectionLabel>Start Learning</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
          {QUICK_LESSONS.map(l => (
            <Link key={l.id} href="/lessons">
              <a className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors group">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: l.accent + '15' }}
                >
                  <Play size={14} style={{ color: l.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.module}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Link>
          ))}
        </div>

        {/* Sim CTA */}
        <div className="rounded-xl border border-border bg-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Try the Simulator</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Open a position on ZYNC, AXPC, AETR and 23 more fictional assets. SL/TP, live charts, win streak — all in your browser.
            </p>
          </div>
          <Link href="/simulator">
            <a className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm whitespace-nowrap hover:opacity-90 transition shrink-0">
              Open Simulator <ArrowRight size={14} />
            </a>
          </Link>
        </div>
      </div>

      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />}
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const prices   = useLivePrices();

  const lessonData   = loadLessonProgress();
  const gamifyData   = loadGamification();

  const completedLessons: string[] = lessonData?.completed ?? [];
  const lessonXp     = lessonData?.xp     ?? 0;
  const lessonStreak = lessonData?.streak  ?? 0;
  const simXp        = gamifyData?.xp ?? 0;
  const totalXp      = lessonXp + simXp;

  if (!user) return <GuestDashboard />;

  const { level, title: levelTitle, pct: levelPct } = xpToLevel(totalXp);
  const userName  = (user as any).username || user.email?.split('@')[0] || 'Trader';
  const tier      = (user as any).tier || 'free';
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const pctDone   = Math.round((completedLessons.length / ALL_LESSON_COUNT) * 100);

  return (
    <div className="w-full">
      {/* Live ticker */}
      <TickerStrip prices={prices} />

      <div className="w-full px-6 py-8 pb-24">

        {/* ── Hero row ───────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {userName}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {tierLabel} Plan
              </span>
              <span className="text-sm text-muted-foreground">Level {level} · {levelTitle}</span>
              {lessonStreak > 0 && (
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#dc2626' }}>
                  <Flame size={14} /> {lessonStreak} day streak
                </span>
              )}
            </div>
          </div>

          {/* XP bar */}
          <div className="lg:w-72">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Zap size={12} className="text-yellow-500" />
                {totalXp.toLocaleString()} XP
              </span>
              <span>Level {level + 1} in {Math.max(0, (level < 8 ? [200,500,900,1400,2000,2700,3500,9999][level] : 9999) - totalXp).toLocaleString()} XP</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${levelPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Four stats ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Lessons completed', value: `${completedLessons.length} / ${ALL_LESSON_COUNT}`, sub: `${pctDone}% of curriculum`, Icon: BookOpen,      accent: '#16a34a' },
            { label: 'Learning level',    value: levelTitle,                                          sub: `Level ${level}`,          Icon: GraduationCap, accent: '#2563eb' },
            { label: 'Day streak',        value: `${lessonStreak}`,                                   sub: 'consecutive days',        Icon: Flame,         accent: '#dc2626' },
            { label: 'Total XP',          value: totalXp.toLocaleString(),                            sub: 'experience points',       Icon: Zap,           accent: '#d97706' },
          ].map(({ label, value, sub, Icon, accent }) => (
            <div key={label} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon size={16} style={{ color: accent }} />
              </div>
              <p className="text-2xl font-bold text-foreground leading-none mb-1">{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main two-column ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">

          {/* Learning path (3 cols) */}
          <div className="lg:col-span-3">
            <SectionLabel>Your Learning Path</SectionLabel>

            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{pctDone}% complete</p>
              <Link href="/lessons">
                <a className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                  View all lessons <ArrowRight size={13} />
                </a>
              </Link>
            </div>
            <div className="h-2 rounded-full bg-muted mb-6 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${pctDone}%` }}
              />
            </div>

            {/* Lesson list */}
            <div className="space-y-2">
              {QUICK_LESSONS.map(l => {
                const done = completedLessons.includes(l.id);
                return (
                  <Link key={l.id} href="/lessons">
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors group">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: done ? l.accent + '20' : undefined }}
                        data-done={done}
                      >
                        {done
                          ? <CheckCircle size={18} style={{ color: l.accent }} />
                          : <Play size={15} className="text-muted-foreground" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm leading-tight">{l.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{l.module}</p>
                      </div>
                      {done
                        ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: l.accent + '15', color: l.accent }}>Done</span>
                        : <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      }
                    </a>
                  </Link>
                );
              })}
            </div>

            <Link href="/lessons">
              <a className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition">
                Continue Learning <ArrowRight size={14} />
              </a>
            </Link>
          </div>

          {/* Right column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Pulse */}
            <div>
              <SectionLabel>Market Pulse</SectionLabel>
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden bg-card">
                {TICKER_SYMBOLS.slice(0, 6).map(sym => {
                  const asset = ASSET_MAP.get(sym);
                  if (!asset) return null;
                  const price = prices[sym] ?? asset.basePrice;
                  const chg   = ((price - asset.basePrice) / asset.basePrice) * 100;
                  const up    = chg >= 0;
                  return (
                    <Link key={sym} href="/market">
                      <a className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{sym}</p>
                          <p className="text-xs text-muted-foreground">{asset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono text-foreground">{formatPrice(price, asset)}</p>
                          <p className="text-xs font-mono font-semibold" style={{ color: up ? '#16a34a' : '#dc2626' }}>
                            {up ? '+' : ''}{chg.toFixed(2)}%
                          </p>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
              <Link href="/market">
                <a className="flex items-center gap-1 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View all 26 markets <ArrowRight size={13} />
                </a>
              </Link>
            </div>

            {/* Sim CTA */}
            <div>
              <SectionLabel>Practice Simulator</SectionLabel>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">26 Assets · Always Live</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                      Stocks, crypto, forex & indices with realistic price action. Zero real money.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {[
                    ['Stocks', '10', '#2563eb'],
                    ['Crypto', '8',  '#d97706'],
                    ['Forex',  '4',  '#16a34a'],
                    ['Indices','4',  '#7c3aed'],
                  ].map(([label, count, color]) => (
                    <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color as string }} />
                      <span className="text-foreground font-medium">{label}</span>
                      <span className="text-muted-foreground ml-auto">{count}</span>
                    </div>
                  ))}
                </div>
                <Link href="/simulator">
                  <a className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                    <Play size={13} fill="currentColor" /> Open Simulator
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        {tier === 'free' && (
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Upgrade</p>
              <h3 className="text-lg font-bold text-foreground">Unlock more SimCash &amp; positions</h3>
              <p className="text-sm text-muted-foreground mt-1">Starter gives you $25,000 SimCash and 15 open positions. Pro gives $100,000.</p>
            </div>
            <Link href="/pricing">
              <a className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap hover:opacity-90 transition shrink-0">
                View Plans <ArrowRight size={14} />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
