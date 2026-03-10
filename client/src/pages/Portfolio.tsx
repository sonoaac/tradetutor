/**
 * Portfolio — full breakdown of SimCash, open positions, trade history,
 * per-symbol performance, and advanced stats. All from localStorage.
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  TrendingUp, TrendingDown, BarChart2, DollarSign, Activity,
  Zap, Target, Award, Filter, ChevronDown, ChevronUp,
  Trophy, Flame, AlertTriangle,
} from 'lucide-react';

const LS_CASH    = 'tt_sim_cash_v1';
const LS_HISTORY = 'tt_sim_history_v1';
const START_CASH = 100_000;

interface ClosedTrade {
  id: string;
  symbol: string;
  direction: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPct: number;
  closedAt: number;
}

function loadCash(): number {
  try { const v = localStorage.getItem(LS_CASH); return v ? parseFloat(v) : START_CASH; } catch { return START_CASH; }
}
function loadHistory(): ClosedTrade[] {
  try { const v = localStorage.getItem(LS_HISTORY); return v ? JSON.parse(v) : []; } catch { return []; }
}

function fmt$(n: number): string {
  const abs = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${n < 0 ? '-' : ''}$${abs}`;
}
function fmtPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}
function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color, icon: Icon, badge }: {
  label: string; value: string; sub?: string;
  color?: string; icon: React.ElementType; badge?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden">
      {badge && (
        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <Icon size={16} className="text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>
      <p className="text-3xl font-bold font-mono tracking-tight" style={color ? { color } : undefined}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

// ── Equity curve ──────────────────────────────────────────────────────────────

function EquityLine({ trades }: { trades: ClosedTrade[] }) {
  if (trades.length < 2) return null;
  const reversed = trades.slice().reverse();
  const cumPnl: number[] = [];
  let running = 0;
  reversed.forEach(t => { running += t.pnl; cumPnl.push(running); });

  const min = Math.min(...cumPnl, 0);
  const max = Math.max(...cumPnl, 0);
  const range = max - min || 1;
  const W = 100, H = 50;
  const pts = cumPnl.map((v, i) =>
    `${(i / (cumPnl.length - 1)) * W},${H - ((v - min) / range) * H}`
  ).join(' ');
  const isPositive = cumPnl[cumPnl.length - 1] >= 0;
  const color = isPositive ? '#26a69a' : '#ef5350';

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">Equity Curve</p>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {running >= 0 ? '+' : ''}{fmt$(running)} total
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="eq-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {min < 0 && max > 0 && (
          <line x1="0" x2={W}
            y1={H - ((0 - min) / range) * H} y2={H - ((0 - min) / range) * H}
            stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2"
          />
        )}
        <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#eq-grad)" />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <p className="text-xs text-muted-foreground mt-2">
        {trades.length} closed trade{trades.length !== 1 ? 's' : ''} · cumulative P&amp;L over time
      </p>
    </div>
  );
}

// ── Per-symbol breakdown ───────────────────────────────────────────────────────

interface SymbolStats {
  symbol: string;
  trades: number;
  wins: number;
  losses: number;
  totalPnl: number;
  bestTrade: number;
  worstTrade: number;
  avgPnl: number;
}

function SymbolCard({ s, expanded, onToggle }: { s: SymbolStats; expanded: boolean; onToggle: () => void }) {
  const winRate = s.trades > 0 ? Math.round((s.wins / s.trades) * 100) : 0;
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-primary">{s.symbol.slice(0, 4)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-sm">{s.symbol}</p>
          <p className="text-[11px] text-muted-foreground">{s.trades} trades · {winRate}% win rate</p>
        </div>
        <div className="text-right mr-2">
          <p className="font-mono font-bold text-sm" style={{ color: s.totalPnl >= 0 ? '#26a69a' : '#ef5350' }}>
            {s.totalPnl >= 0 ? '+' : ''}{fmt$(s.totalPnl)}
          </p>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-border pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Wins', value: s.wins.toString(), color: '#26a69a' },
            { label: 'Losses', value: s.losses.toString(), color: '#ef5350' },
            { label: 'Best Trade', value: fmt$(s.bestTrade), color: '#26a69a' },
            { label: 'Worst Trade', value: fmt$(s.worstTrade), color: '#ef5350' },
            { label: 'Avg P&L', value: fmt$(s.avgPnl), color: s.avgPnl >= 0 ? '#26a69a' : '#ef5350' },
            { label: 'Win Rate', value: `${winRate}%`, color: winRate >= 50 ? '#26a69a' : '#ef5350' },
            { label: 'Total P&L', value: fmt$(s.totalPnl), color: s.totalPnl >= 0 ? '#26a69a' : '#ef5350' },
            { label: 'Trades', value: s.trades.toString(), color: undefined },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-muted/50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
              <p className="text-sm font-bold font-mono" style={color ? { color } : undefined}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type HistoryFilter = 'all' | 'winners' | 'losers' | 'longs' | 'shorts';

export default function Portfolio() {
  const [cash, setCash]       = useState<number>(loadCash);
  const [history, setHistory] = useState<ClosedTrade[]>(loadHistory);
  const [histFilter, setHistFilter] = useState<HistoryFilter>('all');
  const [expandedSymbol, setExpandedSymbol] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => { setCash(loadCash()); setHistory(loadHistory()); }, 4000);
    return () => clearInterval(id);
  }, []);

  // ── Computed stats ───────────────────────────────────────────────────────
  const wins       = history.filter(t => t.pnl > 0);
  const losses     = history.filter(t => t.pnl <= 0);
  const totalPnl   = history.reduce((s, t) => s + t.pnl, 0);
  const winRate    = history.length > 0 ? Math.round((wins.length / history.length) * 100) : 0;
  const avgWin     = wins.length > 0 ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss    = losses.length > 0 ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
  const bestTrade  = history.length > 0 ? Math.max(...history.map(t => t.pnl)) : 0;
  const worstTrade = history.length > 0 ? Math.min(...history.map(t => t.pnl)) : 0;
  const profitFactor = Math.abs(avgLoss) > 0 ? (avgWin / Math.abs(avgLoss)).toFixed(2) : '∞';

  // Max drawdown
  let maxDrawdown = 0;
  let peak = 0;
  let running = 0;
  [...history].reverse().forEach(t => {
    running += t.pnl;
    if (running > peak) peak = running;
    const dd = peak - running;
    if (dd > maxDrawdown) maxDrawdown = dd;
  });

  // Consecutive streak
  let currentStreak = 0;
  let streakType: 'win' | 'loss' | null = null;
  for (const t of history) {
    const isWin = t.pnl > 0;
    if (streakType === null) { streakType = isWin ? 'win' : 'loss'; currentStreak = 1; }
    else if ((isWin && streakType === 'win') || (!isWin && streakType === 'loss')) currentStreak++;
    else break;
  }

  // Per-symbol stats
  const symbolMap = new Map<string, SymbolStats>();
  history.forEach(t => {
    let s = symbolMap.get(t.symbol);
    if (!s) { s = { symbol: t.symbol, trades: 0, wins: 0, losses: 0, totalPnl: 0, bestTrade: -Infinity, worstTrade: Infinity, avgPnl: 0 }; symbolMap.set(t.symbol, s); }
    s.trades++;
    s.totalPnl += t.pnl;
    if (t.pnl > 0) s.wins++; else s.losses++;
    if (t.pnl > s.bestTrade) s.bestTrade = t.pnl;
    if (t.pnl < s.worstTrade) s.worstTrade = t.pnl;
    s.avgPnl = s.totalPnl / s.trades;
  });
  const symbols = [...symbolMap.values()].sort((a, b) => Math.abs(b.totalPnl) - Math.abs(a.totalPnl));

  // Filtered history
  const filteredHistory = history.filter(t => {
    if (histFilter === 'winners') return t.pnl > 0;
    if (histFilter === 'losers')  return t.pnl <= 0;
    if (histFilter === 'longs')   return t.direction === 'long';
    if (histFilter === 'shorts')  return t.direction === 'short';
    return true;
  });

  const accountGrowth = ((cash - START_CASH) / START_CASH) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10 px-4">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Full breakdown of your SimCash account &amp; trading performance</p>
        </div>
        <Link href="/simulator">
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
            <TrendingUp size={14} /> Trade
          </a>
        </Link>
      </div>

      {/* ── Primary stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="SimCash Balance"
          value={fmt$(cash)}
          icon={DollarSign}
          color={cash >= START_CASH ? '#26a69a' : cash < 5000 ? '#ef5350' : undefined}
          sub={`${accountGrowth >= 0 ? '+' : ''}${accountGrowth.toFixed(1)}% from start`}
          badge={cash >= START_CASH ? 'In Profit' : undefined}
        />
        <StatCard
          label="Total P&L"
          value={fmt$(totalPnl)}
          icon={Activity}
          color={totalPnl >= 0 ? '#26a69a' : '#ef5350'}
          sub={`${history.length} closed trades`}
        />
        <StatCard
          label="Win Rate"
          value={`${winRate}%`}
          icon={BarChart2}
          color={winRate >= 60 ? '#26a69a' : winRate >= 40 ? '#f5c842' : '#ef5350'}
          sub={`${wins.length}W / ${losses.length}L`}
        />
        <StatCard
          label="Profit Factor"
          value={profitFactor}
          icon={Zap}
          color={parseFloat(profitFactor) >= 1.5 ? '#26a69a' : '#f5c842'}
          sub="avg win ÷ avg loss"
        />
      </div>

      {/* ── Secondary stats ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Best Trade</p>
          <p className="text-xl font-bold font-mono" style={{ color: '#26a69a' }}>{fmt$(bestTrade)}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Worst Trade</p>
          <p className="text-xl font-bold font-mono" style={{ color: '#ef5350' }}>{fmt$(worstTrade)}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Max Drawdown</p>
          <p className="text-xl font-bold font-mono" style={{ color: '#ef5350' }}>-{fmt$(maxDrawdown)}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
          <div className="flex items-center gap-1.5">
            {streakType === 'win' ? <Flame size={16} style={{ color: '#26a69a' }} /> : streakType === 'loss' ? <TrendingDown size={16} style={{ color: '#ef5350' }} /> : null}
            <p className="text-xl font-bold font-mono" style={{ color: streakType === 'win' ? '#26a69a' : streakType === 'loss' ? '#ef5350' : undefined }}>
              {currentStreak > 0 ? `${currentStreak} ${streakType}${currentStreak !== 1 ? 's' : ''}` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Avg win/loss bar ────────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm font-medium text-muted-foreground mb-3">Average Win vs Average Loss</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#26a69a' }}>Avg Win</span>
                <span className="font-mono font-bold" style={{ color: '#26a69a' }}>{fmt$(avgWin)}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ background: '#26a69a', width: `${Math.min(100, (avgWin / (avgWin + Math.abs(avgLoss) || 1)) * 100)}%` }} />
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-bold">VS</span>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#ef5350' }}>Avg Loss</span>
                <span className="font-mono font-bold" style={{ color: '#ef5350' }}>{fmt$(avgLoss)}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ background: '#ef5350', width: `${Math.min(100, (Math.abs(avgLoss) / (avgWin + Math.abs(avgLoss) || 1)) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Equity chart ─────────────────────────────────────────────────── */}
      {history.length >= 2 && <EquityLine trades={history} />}

      {/* ── Low balance banner ───────────────────────────────────────────── */}
      {cash < 5000 && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
                {cash <= 0 ? 'SimCash empty — top up to keep trading.' : `Low balance: ${fmt$(cash)} remaining.`}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Get $100,000 SimCash for $9.99.</p>
            </div>
          </div>
          <Link href="/pricing">
            <a className="flex-shrink-0 px-4 py-2 rounded-lg bg-yellow-500 text-black text-sm font-bold hover:bg-yellow-400 transition">
              Top Up — $9.99
            </a>
          </Link>
        </div>
      )}

      {/* ── Per-symbol breakdown ─────────────────────────────────────────── */}
      {symbols.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Target size={18} className="text-primary" /> Performance by Asset
          </h2>
          <div className="space-y-2">
            {symbols.map(s => (
              <SymbolCard
                key={s.symbol}
                s={s}
                expanded={expandedSymbol === s.symbol}
                onToggle={() => setExpandedSymbol(expandedSymbol === s.symbol ? null : s.symbol)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Trade history ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Award size={18} className="text-primary" /> Trade History
            <span className="text-sm font-normal text-muted-foreground">({filteredHistory.length})</span>
          </h2>
          {/* Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter size={13} className="text-muted-foreground" />
            {(['all', 'winners', 'losers', 'longs', 'shorts'] as HistoryFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setHistFilter(f)}
                className="text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all capitalize"
                style={{
                  background: histFilter === f ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  color:      histFilter === f ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <BarChart2 size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">
              {history.length === 0 ? 'No trades yet' : 'No trades match this filter'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {history.length === 0 ? 'Head to the simulator and place your first trade.' : 'Try a different filter above.'}
            </p>
            {history.length === 0 && (
              <Link href="/simulator">
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                  Open Simulator
                </a>
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Table header — desktop */}
            <div className="hidden sm:grid grid-cols-6 gap-2 px-4 py-2.5 border-b border-border text-xs font-semibold text-muted-foreground bg-muted/30">
              <span>Asset</span>
              <span>Side</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Entry → Exit</span>
              <span className="text-right">P&L</span>
              <span className="text-right">Closed</span>
            </div>

            {filteredHistory.map(t => (
              <div key={t.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition">
                {/* Desktop row */}
                <div className="hidden sm:grid grid-cols-6 gap-2 px-4 py-3 text-sm items-center">
                  <span className="font-bold text-foreground">{t.symbol}</span>
                  <span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{
                      background: t.direction === 'long' ? '#26a69a22' : '#ef535022',
                      color:      t.direction === 'long' ? '#26a69a'   : '#ef5350',
                    }}>
                      {t.direction.toUpperCase()}
                    </span>
                  </span>
                  <span className="text-right font-mono text-xs text-muted-foreground">{t.quantity}</span>
                  <span className="text-right font-mono text-xs text-muted-foreground">
                    {t.entryPrice.toFixed(2)} → {t.exitPrice.toFixed(2)}
                  </span>
                  <span className="text-right font-mono font-bold" style={{ color: t.pnl >= 0 ? '#26a69a' : '#ef5350' }}>
                    {t.pnl >= 0 ? '+' : ''}{fmt$(t.pnl)}
                    <span className="text-[10px] ml-1 opacity-70">{fmtPct(t.pnlPct)}</span>
                  </span>
                  <span className="text-right text-xs text-muted-foreground">{timeAgo(t.closedAt)}</span>
                </div>

                {/* Mobile card */}
                <div className="sm:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{
                      background: t.direction === 'long' ? '#26a69a22' : '#ef535022',
                      color:      t.direction === 'long' ? '#26a69a'   : '#ef5350',
                    }}>
                      {t.direction.toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.symbol}</p>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        {t.entryPrice.toFixed(2)} → {t.exitPrice.toFixed(2)} · {timeAgo(t.closedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm" style={{ color: t.pnl >= 0 ? '#26a69a' : '#ef5350' }}>
                      {t.pnl >= 0 ? '+' : ''}{fmt$(t.pnl)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{fmtPct(t.pnlPct)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Achievement badges ───────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Trophy size={16} style={{ color: '#f5c842' }} /> Trading Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'First Trade', earned: history.length >= 1, color: '#26a69a' },
              { label: '10 Trades', earned: history.length >= 10, color: '#2196f3' },
              { label: '50 Trades', earned: history.length >= 50, color: '#9c27b0' },
              { label: 'Win Streak 3', earned: wins.length >= 3, color: '#f5c842' },
              { label: 'Win Streak 5', earned: wins.length >= 5, color: '#ff9800' },
              { label: 'Profitable', earned: totalPnl > 0, color: '#26a69a' },
              { label: '+$10k P&L', earned: totalPnl >= 10000, color: '#26a69a' },
              { label: '+50% Account', earned: accountGrowth >= 50, color: '#ef5350' },
              { label: 'Best Trade $1k+', earned: bestTrade >= 1000, color: '#2196f3' },
            ].map(({ label, earned, color }) => (
              <span
                key={label}
                className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                style={earned
                  ? { background: color + '22', color, borderColor: color + '44' }
                  : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))', opacity: 0.5 }
                }
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
