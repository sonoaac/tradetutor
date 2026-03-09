/**
 * Portfolio — reads trade history & SimCash directly from localStorage.
 * Zero backend. Open to all users.
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { TrendingUp, TrendingDown, BarChart2, DollarSign, Activity, RefreshCw, Zap } from 'lucide-react';

// ─── localStorage keys (must match SimulatorPage) ─────────────────────────────

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
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub?: string;
  color?: string; icon: React.ElementType;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
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

// ─── PnL Equity mini-chart ────────────────────────────────────────────────────

function EquityLine({ trades }: { trades: ClosedTrade[] }) {
  if (trades.length < 2) return null;
  const cumPnl: number[] = [];
  let running = 0;
  trades.slice().reverse().forEach(t => { running += t.pnl; cumPnl.push(running); });

  const min = Math.min(...cumPnl, 0);
  const max = Math.max(...cumPnl, 0);
  const range = max - min || 1;
  const W = 100, H = 40;
  const pts = cumPnl.map((v, i) =>
    `${(i / (cumPnl.length - 1)) * W},${H - ((v - min) / range) * H}`
  ).join(' ');
  const isPositive = cumPnl[cumPnl.length - 1] >= 0;
  const color = isPositive ? '#26a69a' : '#ef5350';

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm text-muted-foreground font-medium mb-3">Cumulative P&L</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 64 }}>
        <defs>
          <linearGradient id="eq-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Zero line */}
        {min < 0 && max > 0 && (
          <line
            x1="0" x2={W}
            y1={H - ((0 - min) / range) * H}
            y2={H - ((0 - min) / range) * H}
            stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2"
          />
        )}
        {/* Fill */}
        <polygon
          points={`0,${H} ${pts} ${W},${H}`}
          fill="url(#eq-grad)"
        />
        {/* Line */}
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xs text-muted-foreground mt-2">
        Based on {trades.length} closed trade{trades.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [cash,    setCash]    = useState<number>(loadCash);
  const [history, setHistory] = useState<ClosedTrade[]>(loadHistory);

  // Live-refresh from localStorage every 5s (picks up new trades from Simulator)
  useEffect(() => {
    const id = setInterval(() => {
      setCash(loadCash());
      setHistory(loadHistory());
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const totalPnl  = history.reduce((s, t) => s + t.pnl, 0);
  const wins      = history.filter(t => t.pnl > 0).length;
  const losses    = history.filter(t => t.pnl <= 0).length;
  const winRate   = (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
  const avgPnl    = history.length > 0 ? totalPnl / history.length : 0;
  const bestTrade = history.length > 0 ? Math.max(...history.map(t => t.pnl)) : 0;
  const worstTrade= history.length > 0 ? Math.min(...history.map(t => t.pnl)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your SimCash account & trade history</p>
        </div>
        <Link href="/simulator">
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
            <TrendingUp size={14} /> Trade
          </a>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="SimCash Balance" value={fmt$(cash)}       icon={DollarSign} color={cash > 0 ? undefined : '#ef5350'} sub={`of $${START_CASH.toLocaleString()} starting`} />
        <StatCard label="Total P&L"       value={fmt$(totalPnl)}  icon={Activity}   color={totalPnl >= 0 ? '#26a69a' : '#ef5350'} sub={`${history.length} trades`} />
        <StatCard label="Win Rate"        value={`${winRate}%`}   icon={BarChart2}  color={winRate >= 50 ? '#26a69a' : '#ef5350'} sub={`${wins}W / ${losses}L`} />
        <StatCard label="Avg Trade P&L"   value={fmt$(avgPnl)}    icon={Zap}        color={avgPnl >= 0 ? '#26a69a' : '#ef5350'} />
      </div>

      {/* Equity chart + best/worst */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EquityLine trades={history} />
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm text-muted-foreground mb-3">Best Trade</p>
            <p className="text-2xl font-bold font-mono" style={{ color: '#26a69a' }}>{fmt$(bestTrade)}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm text-muted-foreground mb-3">Worst Trade</p>
            <p className="text-2xl font-bold font-mono" style={{ color: '#ef5350' }}>{fmt$(worstTrade)}</p>
          </div>
        </div>
      </div>

      {/* Low balance banner */}
      {cash < 5000 && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
              {cash <= 0 ? 'SimCash empty — top up to keep trading.' : `Low balance: ${fmt$(cash)} remaining.`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Get $100,000 SimCash for $9.99.</p>
          </div>
          <Link href="/pricing">
            <a className="flex-shrink-0 px-4 py-2 rounded-lg bg-yellow-500 text-black text-sm font-bold hover:bg-yellow-400 transition">
              Top Up — $9.99
            </a>
          </Link>
        </div>
      )}

      {/* Trade history */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Trade History</h2>

        {history.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <BarChart2 size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No trades yet</p>
            <p className="text-sm text-muted-foreground mb-4">Head to the simulator and place your first trade.</p>
            <Link href="/simulator">
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                Open Simulator
              </a>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-2 px-4 py-2 border-b border-border text-xs font-semibold text-muted-foreground">
              <span>Asset</span>
              <span>Direction</span>
              <span className="text-right">Entry → Exit</span>
              <span className="text-right">P&L</span>
              <span className="text-right">Time</span>
            </div>
            {/* Rows */}
            {history.slice(0, 100).map(t => (
              <div key={t.id} className="grid grid-cols-5 gap-2 px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition text-sm">
                <span className="font-bold text-foreground">{t.symbol}</span>
                <span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: t.direction === 'long' ? '#26a69a22' : '#ef535022',
                      color:      t.direction === 'long' ? '#26a69a'   : '#ef5350',
                    }}
                  >
                    {t.direction.toUpperCase()}
                  </span>
                </span>
                <span className="text-right font-mono text-xs text-muted-foreground">
                  {t.entryPrice.toFixed(2)} → {t.exitPrice.toFixed(2)}
                </span>
                <span className="text-right font-mono font-bold" style={{ color: t.pnl >= 0 ? '#26a69a' : '#ef5350' }}>
                  {t.pnl >= 0 ? '+' : ''}{fmt$(t.pnl)}
                  <span className="text-[10px] ml-1 opacity-70">{fmtPct(t.pnlPct)}</span>
                </span>
                <span className="text-right text-xs text-muted-foreground">{timeAgo(t.closedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
