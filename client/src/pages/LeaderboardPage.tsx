/**
 * LeaderboardPage — Weekly league rankings.
 * XP is read from localStorage (same source as LessonsPage).
 * All "earn points" actions point back to /lessons.
 */
import { Link } from 'wouter';
import {
  Trophy, Flame, Zap, ArrowRight, Crown, Medal, Star,
  ChevronUp, ChevronDown, Minus, BookOpen, Lock,
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWeekLabel(): string {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `Week ${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

function loadXp(): number {
  try {
    const raw = localStorage.getItem('tt_lessons_v2');
    if (raw) return JSON.parse(raw).xp ?? 0;
  } catch { /* */ }
  return 0;
}

function loadStreak(): number {
  try {
    const raw = localStorage.getItem('tt_lessons_v2');
    if (raw) return JSON.parse(raw).streak ?? 0;
  } catch { /* */ }
  return 0;
}

// ─── League config ────────────────────────────────────────────────────────────

const LEAGUES = [
  { name: 'Copper',   emoji: '🥉', color: '#b87333', min: 0,    desc: 'Starting league — everyone begins here' },
  { name: 'Silver',   emoji: '🥈', color: '#9ca3af', min: 200,  desc: 'Emerging traders building their edge' },
  { name: 'Gold',     emoji: '🥇', color: '#f5c842', min: 500,  desc: 'Consistent learners with real knowledge' },
  { name: 'Platinum', emoji: '💎', color: '#06b6d4', min: 900,  desc: 'Advanced strategists climbing fast' },
  { name: 'Diamond',  emoji: '👑', color: '#8b5cf6', min: 1400, desc: 'Elite traders — top of the platform' },
];

function getLeague(xp: number) {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (xp >= LEAGUES[i].min) return LEAGUES[i];
  }
  return LEAGUES[0];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const xp     = loadXp();
  const streak = loadStreak();
  const league = getLeague(xp);
  const week   = getWeekLabel();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy size={22} className="text-yellow-500" /> Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{week}</p>
        </div>
        <Link href="/lessons">
          <a className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
            <BookOpen size={14} /> Earn XP
          </a>
        </Link>
      </div>

      {/* ── Your league card ───────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ background: league.color + '12', borderColor: league.color + '40' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
            style={{ background: league.color + '25', border: `2px solid ${league.color}50` }}
          >
            {league.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: league.color }}>
              Your League
            </p>
            <h2 className="text-xl font-bold text-foreground">{league.name} League</h2>
            <p className="text-sm text-muted-foreground">{league.desc}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold font-mono text-foreground">{xp.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">XP this week</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t" style={{ borderColor: league.color + '30' }}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Flame size={14} style={{ color: streak > 0 ? '#ef4444' : undefined }} className={streak === 0 ? 'text-muted-foreground' : ''} />
              <span className="font-bold text-foreground">{streak}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Day streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Zap size={14} className="text-yellow-500" />
              <span className="font-bold text-foreground">{xp.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Star size={14} style={{ color: league.color }} />
              <span className="font-bold text-foreground">{league.name}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Current rank</p>
          </div>
        </div>
      </div>

      {/* ── League Rankings ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            {league.emoji} {league.name} League Rankings
          </h3>
          <span className="text-xs text-muted-foreground">{week}</span>
        </div>

        {/* Empty state */}
        <div className="px-5 py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Trophy size={24} className="text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground mb-1">No players in this league yet</p>
          <p className="text-sm text-muted-foreground mb-6">Be the first to climb the ranks this week.</p>
          <Link href="/lessons">
            <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
              <BookOpen size={15} /> Start Learning <ArrowRight size={14} />
            </a>
          </Link>
        </div>
      </div>

      {/* ── League ladder ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-bold text-foreground">League Ladder</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Earn XP through lessons to climb</p>
        </div>
        <div className="divide-y divide-border">
          {LEAGUES.slice().reverse().map((lg, i) => {
            const isCurrentLeague = lg.name === league.name;
            const isUnlockedLeague = xp >= lg.min;
            return (
              <div
                key={lg.name}
                className="flex items-center gap-4 px-5 py-3"
                style={isCurrentLeague ? { background: lg.color + '10' } : undefined}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: isUnlockedLeague ? lg.color + '20' : undefined,
                    opacity: isUnlockedLeague ? 1 : 0.4,
                  }}
                >
                  {isUnlockedLeague ? lg.emoji : <Lock size={16} className="text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${isCurrentLeague ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {lg.name} League
                    </p>
                    {isCurrentLeague && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white"
                        style={{ background: lg.color }}
                      >
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{lg.min.toLocaleString()}+ XP required</p>
                </div>
                {!isUnlockedLeague && (
                  <Link href="/lessons">
                    <a className="text-xs font-semibold px-3 py-1 rounded-lg hover:opacity-80 transition text-white flex-shrink-0" style={{ background: lg.color }}>
                      Earn XP
                    </a>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-bold text-foreground">How the League System Works</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            {
              icon: ChevronUp,
              color: '#22c55e',
              title: 'Weekly Promotion',
              desc: 'Top 7 players in each league move up to the next tier',
            },
            {
              icon: ChevronDown,
              color: '#ef4444',
              title: 'Weekly Demotion',
              desc: 'Bottom 10% of players move down to the previous tier',
            },
            {
              icon: Flame,
              color: '#f97316',
              title: 'Weekly Reset',
              desc: 'XP resets every Monday for fair weekly competition',
            },
            {
              icon: Crown,
              color: '#8b5cf6',
              title: 'Premium Bonus',
              desc: 'Subscribed players get 1.42× XP multiplier on all lessons',
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="flex items-start gap-4 px-5 py-3.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: color + '18' }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <Medal size={28} className="text-yellow-500 mx-auto mb-3" />
        <h3 className="font-bold text-foreground mb-1">Ready to climb?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Complete lessons to earn XP and rise through the leagues.
        </p>
        <Link href="/lessons">
          <a className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            <BookOpen size={16} /> Go to Lessons <ArrowRight size={14} />
          </a>
        </Link>
      </div>

    </div>
  );
}
