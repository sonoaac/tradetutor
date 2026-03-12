/**
 * Dashboard / Home — unified page for guests and logged-in users.
 * Routes: / and /dashboard both render this.
 * Guest:     marketing hero + live markets + features + pricing
 * Logged in: personalized stats + progress + market pulse
 */
import { useState } from 'react';
import { Link } from 'wouter';
import {
  TrendingUp, TrendingDown, BookOpen, Flame, Zap, Activity,
  BarChart2, ArrowRight, Play, CheckCircle, GraduationCap,
  ShieldCheck, Target, Award, ChevronRight,
} from 'lucide-react';
import { ASSET_MAP, ASSETS, formatPrice } from '@/hooks/use-simulator';
import { useLivePrices } from '@/hooks/use-live-prices';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/hooks/use-auth';

// ─── localStorage ─────────────────────────────────────────────────────────────

function loadLessonProgress() {
  try { const r = localStorage.getItem('tt_lessons_v2'); return r ? JSON.parse(r) : null; } catch { return null; }
}
function loadGamification() {
  try { const r = localStorage.getItem('tt_gamification_v1'); return r ? JSON.parse(r) : null; } catch { return null; }
}

function xpToLevel(xp: number) {
  const t = [0, 200, 500, 900, 1400, 2000, 2700, 3500];
  const n = ['Rookie','Student','Trader','Analyst','Strategist','Pro Trader','Expert','Master'];
  let l = 0;
  for (let i = t.length - 1; i >= 0; i--) { if (xp >= t[i]) { l = i; break; } }
  const curr = t[l], next = l < t.length - 1 ? t[l + 1] : 9999;
  return { level: l + 1, title: n[l], pct: Math.min(100, ((xp - curr) / (next - curr)) * 100) };
}

const ALL_LESSONS = 21;

// ─── Shared live ticker ───────────────────────────────────────────────────────

const TICKER_SYMS = ['ZYNC','AXPC','NRVA','AETR','VLTR','TITAN500','SLIX','MXST'];

function LiveTicker({ prices }: { prices: Record<string, number> }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto border-b border-border bg-background shrink-0 scrollbar-hide">
      {TICKER_SYMS.map(sym => {
        const asset = ASSET_MAP.get(sym);
        if (!asset) return null;
        const price = prices[sym] ?? asset.basePrice;
        const chg   = ((price - asset.basePrice) / asset.basePrice) * 100;
        const up    = chg >= 0;
        return (
          <Link key={sym} href="/market">
            <a className="flex items-center gap-3 px-4 py-2.5 border-r border-border hover:bg-muted/50 transition shrink-0">
              <div>
                <p className="text-xs font-semibold text-foreground leading-none">{sym}</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{formatPrice(price, asset)}</p>
              </div>
              <span className="text-[11px] font-semibold font-mono" style={{ color: up ? '#16a34a' : '#dc2626' }}>
                {up ? '+' : ''}{chg.toFixed(2)}%
              </span>
            </a>
          </Link>
        );
      })}
      <Link href="/market">
        <a className="flex items-center gap-1 px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground shrink-0 whitespace-nowrap transition">
          All markets <ArrowRight size={12} />
        </a>
      </Link>
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Quick lessons ────────────────────────────────────────────────────────────

const QUICK_LESSONS = [
  { id: 'f1', title: 'What is Trading?',        module: 'Foundations', accent: '#16a34a' },
  { id: 'c1', title: 'Candlestick Basics',       module: 'Charts',      accent: '#2563eb' },
  { id: 'r1', title: 'Stop Loss & Take Profit',  module: 'Risk',        accent: '#dc2626' },
  { id: 'i2', title: 'RSI Explained',            module: 'Indicators',  accent: '#7c3aed' },
  { id: 'c2', title: 'Support & Resistance',     module: 'Charts',      accent: '#2563eb' },
  { id: 'r2', title: 'Risk / Reward Ratio',      module: 'Risk',        accent: '#dc2626' },
];

// ─── GUEST HOME ───────────────────────────────────────────────────────────────

function GuestHome({ onSignUp }: { onSignUp: () => void }) {
  const prices = useLivePrices();

  return (
    <div className="w-full">
      <LiveTicker prices={prices} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-8 sm:pt-14 pb-12 sm:pb-16 max-w-5xl mx-auto">
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Simulator live — 26 assets updating now
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
          Master Trading.<br />
          <span className="text-primary">Risk Nothing.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          Practice with a live-looking simulator, complete gamified lessons, and build real trading skills — before you risk a single dollar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/simulator">
            <a className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              Start Simulator <ArrowRight size={15} />
            </a>
          </Link>
          <button
            onClick={onSignUp}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg border border-border bg-background text-foreground font-semibold hover:bg-muted transition"
          >
            Sign Up Free
          </button>
        </div>
      </section>

      {/* ── Live market preview ───────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Live Markets</h2>
              <p className="text-sm text-muted-foreground mt-1">26 fictional assets across stocks, crypto, forex &amp; indices</p>
            </div>
            <Link href="/market">
              <a className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Explore all <ArrowRight size={13} />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {['ZYNC','AXPC','NRVA','AETR','VLTR','TITAN500','SLIX','MXST'].map(sym => {
              const asset = ASSET_MAP.get(sym);
              if (!asset) return null;
              const price = prices[sym] ?? asset.basePrice;
              const chg   = ((price - asset.basePrice) / asset.basePrice) * 100;
              const up    = chg >= 0;
              const catColors: Record<string, string> = { Stocks: '#2563eb', Crypto: '#d97706', Forex: '#16a34a', Indices: '#7c3aed' };
              return (
                <Link key={sym} href="/market">
                  <a className="p-4 rounded-xl border border-border bg-card hover:bg-muted transition block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground">{sym}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: catColors[asset.category] + '18', color: catColors[asset.category] }}>
                        {asset.category}
                      </span>
                    </div>
                    <p className="text-base font-mono font-semibold text-foreground">{formatPrice(price, asset)}</p>
                    <p className="text-xs font-mono font-semibold mt-0.5" style={{ color: up ? '#16a34a' : '#dc2626' }}>
                      {up ? '+' : ''}{chg.toFixed(2)}%
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-12 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">Everything you need to learn</h2>
          <p className="text-muted-foreground mb-8">Built for beginners, powerful enough for serious practice.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: 'Risk-Free Simulator',    body: '26 fictional assets with live-looking price action. Practice with SimCash — zero real money.',          color: '#16a34a' },
              { icon: BookOpen,    title: '21 Structured Lessons',   body: 'Six modules from trading basics to advanced strategy. XP, levels, and streak tracking built in.',       color: '#2563eb' },
              { icon: Zap,         title: 'XP & Achievements',       body: 'Earn XP every time you trade or complete a lesson. Level up from Rookie to Master.',                    color: '#d97706' },
              { icon: BarChart2,   title: 'Live Candlestick Charts', body: 'MA9, MA21, MA50, Bollinger Bands, RSI, volume — all updating in real time on every asset.',             color: '#7c3aed' },
              { icon: Target,      title: 'Stop Loss & Take Profit', body: 'Set SL/TP on every trade. The simulator auto-executes them — just like real brokers.',                  color: '#dc2626' },
              { icon: Activity,    title: 'Win Streak Tracking',     body: 'Track your win rate, streak, and R:R ratio. See exactly where your strategy needs work.',               color: '#0891b2' },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-5 rounded-xl border border-border bg-card">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: f.color + '15' }}>
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lessons preview ───────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Start Learning</h2>
              <p className="text-sm text-muted-foreground mt-1">21 lessons across 6 modules — unlock as you progress</p>
            </div>
            <Link href="/lessons">
              <a className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                All lessons <ArrowRight size={13} />
              </a>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_LESSONS.map(l => (
              <Link key={l.id} href="/lessons">
                <a className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted transition group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: l.accent + '15' }}>
                    <Play size={13} style={{ color: l.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{l.title}</p>
                    <p className="text-xs text-muted-foreground">{l.module}</p>
                  </div>
                  <ChevronRight size={15} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-12 bg-muted/30">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Ready to start?</h3>
            <p className="text-sm text-muted-foreground">Free account unlocks lessons, the simulator, and XP tracking.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={onSignUp}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition"
            >
              Create Free Account
            </button>
            <Link href="/pricing">
              <a className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition">
                View Plans
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LOGGED-IN DASHBOARD ──────────────────────────────────────────────────────

function UserDashboard({ user }: { user: NonNullable<ReturnType<typeof useAuth>['user']> }) {
  const prices = useLivePrices();

  const lessonData   = loadLessonProgress();
  const gamifyData   = loadGamification();
  const completed: string[] = lessonData?.completed ?? [];
  const lessonXp    = lessonData?.xp     ?? 0;
  const streak      = lessonData?.streak  ?? 0;
  const simXp       = gamifyData?.xp ?? 0;
  const totalXp     = lessonXp + simXp;
  const { level, title: levelTitle, pct: levelPct } = xpToLevel(totalXp);
  const pctDone     = Math.round((completed.length / ALL_LESSONS) * 100);
  const userName    = (user as any).username || user.email?.split('@')[0] || 'Trader';
  const tier        = (user as any).tier || 'free';
  const tierLabel   = tier.charAt(0).toUpperCase() + tier.slice(1);
  const nextLevelXp = [200,500,900,1400,2000,2700,3500][level - 1] ?? 9999;

  return (
    <div className="w-full">
      <LiveTicker prices={prices} />

      <div className="w-full px-6 pt-8 pb-24">

        {/* ── Welcome ────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Good to see you</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{userName}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2.5">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{tierLabel}</span>
              <span className="text-sm text-muted-foreground">Level {level} · {levelTitle}</span>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#dc2626' }}>
                  <Flame size={14} />{streak}-day streak
                </span>
              )}
            </div>
          </div>

          {/* XP progress */}
          <div className="lg:w-64">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <Zap size={11} className="text-yellow-500" />{totalXp.toLocaleString()} XP
              </span>
              <span>{Math.max(0, nextLevelXp - totalXp).toLocaleString()} to Lv{level + 1}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${levelPct}%` }} />
            </div>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Lessons completed', value: `${completed.length}/${ALL_LESSONS}`, sub: `${pctDone}% done`, Icon: BookOpen,      color: '#16a34a' },
            { label: 'Level',             value: levelTitle,                            sub: `Level ${level}`,   Icon: GraduationCap, color: '#2563eb' },
            { label: 'Day streak',        value: `${streak}`,                           sub: 'in a row',         Icon: Flame,         color: '#dc2626' },
            { label: 'Total XP',          value: totalXp.toLocaleString(),              sub: 'experience',       Icon: Zap,           color: '#d97706' },
          ].map(({ label, value, sub, Icon, color }) => (
            <div key={label} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon size={15} style={{ color }} />
              </div>
              <p className="text-2xl font-bold text-foreground leading-none mb-1">{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">

          {/* Lesson progress — 3 cols */}
          <div className="lg:col-span-3">
            <Divider label="Learning path" />

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{pctDone}% complete · {completed.length} of {ALL_LESSONS} lessons</p>
              <Link href="/lessons">
                <a className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={12} />
                </a>
              </Link>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden mb-6">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pctDone}%` }} />
            </div>

            <div className="space-y-2 mb-4">
              {QUICK_LESSONS.map(l => {
                const done = completed.includes(l.id);
                return (
                  <Link key={l.id} href="/lessons">
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted transition group">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: l.accent + '18' }}>
                        {done
                          ? <CheckCircle size={17} style={{ color: l.accent }} />
                          : <Play size={14} className="text-muted-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.module}</p>
                      </div>
                      {done
                        ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: l.accent + '18', color: l.accent }}>Done</span>
                        : <ChevronRight size={15} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />}
                    </a>
                  </Link>
                );
              })}
            </div>

            <Link href="/lessons">
              <a className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition">
                Continue Learning <ArrowRight size={13} />
              </a>
            </Link>
          </div>

          {/* Right column — 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market pulse */}
            <div>
              <Divider label="Market pulse" />
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {TICKER_SYMS.slice(0, 6).map((sym, i) => {
                  const asset = ASSET_MAP.get(sym);
                  if (!asset) return null;
                  const price = prices[sym] ?? asset.basePrice;
                  const chg   = ((price - asset.basePrice) / asset.basePrice) * 100;
                  const up    = chg >= 0;
                  return (
                    <Link key={sym} href="/market">
                      <a
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
                        style={{ borderBottom: i < 5 ? '1px solid var(--border)' : undefined }}
                      >
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
                <a className="flex items-center gap-1 mt-3 text-sm text-muted-foreground hover:text-foreground transition">
                  All 26 markets <ArrowRight size={12} />
                </a>
              </Link>
            </div>

            {/* Sim card */}
            <div>
              <Divider label="Simulator" />
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">26 Assets · Always Live</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                      Stocks, crypto, forex &amp; indices. Realistic price action, zero real money.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[['Stocks','10','#2563eb'],['Crypto','8','#d97706'],['Forex','4','#16a34a'],['Indices','4','#7c3aed']].map(([l, c, col]) => (
                    <div key={l} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: col }} />
                      <span className="font-medium text-foreground">{l}</span>
                      <span className="text-muted-foreground ml-auto">{c}</span>
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

        {/* ── Upgrade banner (free only) ─────────────────────────────────── */}
        {tier === 'free' && (
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Upgrade</p>
              <h3 className="text-lg font-bold text-foreground">Unlock more SimCash &amp; positions</h3>
              <p className="text-sm text-muted-foreground mt-1">Starter: $25k SimCash, 15 positions. Pro: $100k SimCash, 50 positions.</p>
            </div>
            <Link href="/pricing">
              <a className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shrink-0 hover:opacity-90 transition">
                View Plans <ArrowRight size={13} />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {user
        ? <UserDashboard user={user} />
        : <GuestHome onSignUp={() => setShowAuth(true)} />
      }
      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />}
    </>
  );
}
