/**
 * Dashboard — Learning hub overview.
 * Combines lesson progress, simulator stats, live market pulse,
 * daily challenges, and achievements in one place.
 * 100% frontend — no backend required.
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  TrendingUp, TrendingDown, BookOpen, Target, Trophy, Flame,
  Zap, Activity, BarChart2, ArrowRight, Play, CheckCircle,
  GraduationCap, Crown, Star, DollarSign, Wallet,
} from 'lucide-react';
import { ASSETS, ASSET_MAP, formatPrice } from '@/hooks/use-simulator';
import { useLivePrices } from '@/hooks/use-live-prices';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/hooks/use-auth';

// ─── Lesson progress (mirrors LessonsPage localStorage) ──────────────────────

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

// ─── TV colour tokens ─────────────────────────────────────────────────────────

const TV = {
  bg:     '#0f1117',
  card:   '#1e2230',
  border: '#2a2e3e',
  text:   '#d1d4dc',
  muted:  '#6b7280',
  green:  '#26a69a',
  red:    '#ef5350',
  blue:   '#2196f3',
  yellow: '#f5c842',
  orange: '#ff9800',
  purple: '#9c27b0',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt$ = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ─── Small stat card ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub?: string; color: string; icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl p-4" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color }} />
        <span className="text-xs" style={{ color: TV.muted }}>{label}</span>
      </div>
      <p className="text-xl font-bold font-mono" style={{ color }}>{value}</p>
      {sub && <p className="text-[11px] mt-0.5" style={{ color: TV.muted }}>{sub}</p>}
    </div>
  );
}

// ─── Market pulse ticker ──────────────────────────────────────────────────────

const PULSE_SYMBOLS = ['ZYNC', 'AXPC', 'NRVA', 'AETR', 'TITAN500', 'VLTR'];

function MarketPulse({ prices }: { prices: Record<string, number> }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: TV.border }}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity size={14} style={{ color: TV.green }} /> Market Pulse
        </h3>
        <Link href="/market">
          <a className="text-xs flex items-center gap-1" style={{ color: TV.blue }}>
            All Markets <ArrowRight size={12} />
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
        {PULSE_SYMBOLS.map((sym, i) => {
          const asset = ASSET_MAP.get(sym);
          if (!asset) return null;
          const price  = prices[sym] ?? asset.basePrice;
          const chg    = ((price - asset.basePrice) / asset.basePrice) * 100;
          const up     = chg >= 0;
          const Icon   = up ? TrendingUp : TrendingDown;
          return (
            <Link key={sym} href="/market">
              <a
                className="flex items-center justify-between px-3 py-3 transition-colors"
                style={{
                  borderRight: i % 3 !== 2 ? `1px solid ${TV.border}` : undefined,
                  borderBottom: i < 3 ? `1px solid ${TV.border}` : undefined,
                }}
              >
                <div>
                  <p className="text-xs font-bold text-white">{sym}</p>
                  <p className="text-[10px]" style={{ color: TV.muted }}>{formatPrice(price, asset)}</p>
                </div>
                <span className="text-[11px] font-mono flex items-center gap-0.5" style={{ color: up ? TV.green : TV.red }}>
                  <Icon size={11} />{up ? '+' : ''}{chg.toFixed(2)}%
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Learning path progress card ──────────────────────────────────────────────

const ALL_LESSON_COUNT = 21; // from LessonsPage data

function LearningCard({ completed, xp, streak }: { completed: number; xp: number; streak: number }) {
  const { level, title, pct } = xpToLevel(xp);
  const pctDone = Math.round((completed / ALL_LESSON_COUNT) * 100);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: TV.border }}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <GraduationCap size={14} style={{ color: TV.blue }} /> Your Learning Path
        </h3>
        <Link href="/lessons">
          <a className="text-xs flex items-center gap-1" style={{ color: TV.blue }}>
            View all <ArrowRight size={12} />
          </a>
        </Link>
      </div>

      <div className="p-4">
        {/* Level */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
            style={{ background: TV.blue, color: '#fff' }}
          >
            {level}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-white">{title}</p>
              <div className="flex items-center gap-1">
                <Flame size={13} style={{ color: streak > 0 ? TV.red : TV.muted }} />
                <span className="text-xs font-bold" style={{ color: streak > 0 ? TV.red : TV.muted }}>{streak} day streak</span>
              </div>
            </div>
            <div className="h-2 rounded-full" style={{ background: TV.border }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: TV.blue }} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Lessons Done', value: `${completed}/${ALL_LESSON_COUNT}`, color: TV.green },
            { label: 'Total XP',     value: xp.toLocaleString(),                color: TV.yellow },
            { label: 'Complete',     value: `${pctDone}%`,                      color: TV.blue },
          ].map(s => (
            <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: TV.bg }}>
              <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: TV.muted }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/lessons">
          <a
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: TV.blue, color: '#fff' }}
          >
            <Play size={14} fill="#fff" /> Continue Learning
          </a>
        </Link>
      </div>
    </div>
  );
}

// ─── Sim snapshot card ─────────────────────────────────────────────────────────

function SimCard() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: TV.border }}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BarChart2 size={14} style={{ color: TV.orange }} /> Practice Simulator
        </h3>
        <Link href="/simulator">
          <a className="text-xs flex items-center gap-1" style={{ color: TV.blue }}>Open <ArrowRight size={12} /></a>
        </Link>
      </div>
      <div className="p-4">
        <p className="text-sm mb-3" style={{ color: TV.muted }}>
          Trade 26 fake assets across stocks, crypto, forex & indices with zero real risk. Practice strategies, earn XP, and build your skills.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Stocks',  count: '10 assets', color: TV.blue },
            { label: 'Crypto',  count: '8 assets',  color: TV.orange },
            { label: 'Forex',   count: '4 pairs',   color: TV.green },
            { label: 'Indices', count: '4 indices', color: TV.purple },
          ].map(c => (
            <div key={c.label} className="p-2 rounded-lg flex items-center gap-2" style={{ background: TV.bg }}>
              <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              <div>
                <p className="text-xs font-bold text-white">{c.label}</p>
                <p className="text-[10px]" style={{ color: TV.muted }}>{c.count}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/simulator">
          <a
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold"
            style={{ background: TV.orange + '22', color: TV.orange, border: `1px solid ${TV.orange}44` }}
          >
            <Play size={14} /> Start Trading
          </a>
        </Link>
      </div>
    </div>
  );
}

// ─── Quick lessons ─────────────────────────────────────────────────────────────

const QUICK_LESSONS = [
  { id: 'f1', title: 'What is Trading?',         module: 'Foundations', color: '#26a69a' },
  { id: 'c1', title: 'Candlestick Basics',        module: 'Charts',      color: '#2196f3' },
  { id: 'r1', title: 'Stop Loss & Take Profit',   module: 'Risk',        color: '#ef5350' },
  { id: 'i2', title: 'RSI — Overbought/Oversold', module: 'Indicators',  color: '#9c27b0' },
];

function QuickLessonsCard({ completed }: { completed: string[] }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: TV.border }}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen size={14} style={{ color: TV.green }} /> Lessons to Try
        </h3>
        <Link href="/lessons">
          <a className="text-xs flex items-center gap-1" style={{ color: TV.blue }}>All <ArrowRight size={12} /></a>
        </Link>
      </div>
      <div className="divide-y" style={{ borderColor: TV.border }}>
        {QUICK_LESSONS.map(l => {
          const done = completed.includes(l.id);
          return (
            <Link key={l.id} href="/lessons">
              <a className="flex items-center gap-3 px-4 py-3 transition-colors" style={{ background: 'transparent' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: done ? l.color + '33' : TV.bg, border: `1.5px solid ${done ? l.color : TV.border}` }}
                >
                  {done
                    ? <CheckCircle size={14} style={{ color: l.color }} />
                    : <Play size={12} style={{ color: TV.muted }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{l.title}</p>
                  <p className="text-[10px]" style={{ color: l.color }}>{l.module}</p>
                </div>
                <ChevronRight size={14} style={{ color: TV.muted }} />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Why use a simulator info card ────────────────────────────────────────────

function WhySimCard() {
  return (
    <div className="rounded-xl p-4" style={{ background: '#2196f310', border: `1px solid #2196f330` }}>
      <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
        <Star size={14} style={{ color: TV.yellow }} /> Why Practice with a Sim?
      </h4>
      <ul className="space-y-2">
        {[
          'Make mistakes risk-free before trading real money',
          'Learn order types, stop losses, and position sizing',
          'Build muscle memory for reading live charts',
          'Test strategies against live-looking price action',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: TV.text }}>
            <CheckCircle size={12} style={{ color: TV.green, flexShrink: 0, marginTop: 1 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Unauthenticated hero ─────────────────────────────────────────────────────

function GuestDashboard() {
  const [showAuth, setShowAuth] = useState(false);
  const prices = useLivePrices();

  return (
    <div className="w-full px-4 py-6">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-6 text-center"
        style={{ background: 'linear-gradient(135deg, #1e2230 0%, #131722 100%)', border: `1px solid ${TV.border}` }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: TV.blue }}>
          <GraduationCap size={32} style={{ color: '#fff' }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Learn to Trade</h1>
        <p className="text-sm sm:text-base mb-6 max-w-md mx-auto" style={{ color: TV.muted }}>
          Practice with fake SimCash, complete gamified lessons, and build real trading skills — all before risking a single dollar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: TV.blue, color: '#fff' }}
          >
            Get Started Free
          </button>
          <Link href="/lessons">
            <a className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: TV.card, color: TV.text, border: `1px solid ${TV.border}` }}>
              Browse Lessons
            </a>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <LearningCard completed={0} xp={0} streak={0} />
        <SimCard />
      </div>

      <MarketPulse prices={prices} />
      <div className="mt-4"><WhySimCard /></div>

      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const ChevronRight = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={style}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Dashboard() {
  const { user } = useAuth();
  const prices = useLivePrices();

  // Load local progress
  const lessonData   = loadLessonProgress();
  const gamifyData   = loadGamification();

  const completedLessons: string[] = lessonData?.completed ?? [];
  const lessonXp     = lessonData?.xp ?? 0;
  const lessonStreak = lessonData?.streak ?? 0;
  const simXp        = gamifyData?.xp ?? 0;
  const totalXp      = lessonXp + simXp;
  const simLevel     = gamifyData ? (() => {
    let l = 1;
    const t = [0, 100, 300, 700, 1500, 3000, 6000, 10000];
    for (let i = t.length - 1; i >= 0; i--) { if (simXp >= t[i]) { l = i + 1; break; } }
    return l;
  })() : 1;

  if (!user) return <GuestDashboard />;

  const { level, title: levelTitle, pct: levelPct } = xpToLevel(totalXp);
  const userName = user.username || user.email?.split('@')[0] || 'Trader';
  const tier = user.tier || 'free';
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <div className="w-full px-4 py-4 pb-24 space-y-4">

      {/* ── Welcome header ──────────────────────────────────────────────── */}
      <div className="rounded-2xl p-4 sm:p-5" style={{ background: TV.card, border: `1px solid ${TV.border}` }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
              style={{ background: TV.blue, color: '#fff' }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Welcome back, {userName}!</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: TV.blue + '22', color: TV.blue }}>
                  {tierLabel} Plan
                </span>
                <span className="text-xs" style={{ color: TV.muted }}>Level {level} {levelTitle}</span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <div className="flex items-center gap-1">
              <Zap size={14} style={{ color: TV.yellow }} />
              <span className="text-sm font-bold font-mono" style={{ color: TV.yellow }}>{totalXp.toLocaleString()} XP</span>
            </div>
            <div className="flex-1 h-2 rounded-full" style={{ background: TV.border }}>
              <div className="h-full rounded-full" style={{ width: `${levelPct}%`, background: TV.yellow }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick stats ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-3">
        <StatCard label="Lessons Done"  value={`${completedLessons.length}/21`} sub="lessons completed"  color={TV.green}  icon={BookOpen} />
        <StatCard label="Sim Level"     value={`Lv${simLevel}`}                  sub="simulator rank"    color={TV.orange} icon={Trophy} />
        <StatCard label="Streak"        value={`${lessonStreak}d`}               sub="days in a row"     color={TV.red}    icon={Flame} />
        <StatCard label="Total XP"      value={totalXp.toLocaleString()}         sub="experience points" color={TV.yellow} icon={Zap} />
      </div>

      {/* ── Learning + Sim cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <LearningCard completed={completedLessons.length} xp={lessonXp} streak={lessonStreak} />
        <SimCard />
      </div>

      {/* ── Market pulse ─────────────────────────────────────────────────── */}
      <MarketPulse prices={prices} />

      {/* ── Quick lessons + why sim ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <QuickLessonsCard completed={completedLessons} />
        <WhySimCard />
      </div>
    </div>
  );
}
