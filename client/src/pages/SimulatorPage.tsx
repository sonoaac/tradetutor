import { useState, useCallback, useMemo } from 'react';
import {
  TrendingUp, TrendingDown, X, Zap, Trophy, Flame, Star,
  Activity, DollarSign, Globe, Cpu, Crown, ChevronRight,
  BarChart2, Target, Award, AlertTriangle, RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/AuthModal';
import {
  useSimulator, ASSETS, ASSET_MAP, formatPrice,
  type Asset, type Position, type ClosedTrade,
} from '@/hooks/use-simulator';
import { useGamification } from '@/hooks/use-gamification';
import { LiveCandleChart } from '@/components/simulator/LiveCandleChart';

// ─── Icon map for achievements ─────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Trophy, Flame, Star, Activity, DollarSign, Globe, Cpu, Crown,
};

// ─── Theme colours ─────────────────────────────────────────────────────────

const TV = {
  bg:       '#131722',
  panel:    '#1e2230',
  border:   '#2a2e3e',
  text:     '#d1d4dc',
  muted:    '#6b7280',
  green:    '#26a69a',
  red:      '#ef5350',
  blue:     '#2196f3',
  cyan:     '#00bcd4',
  orange:   '#ff9800',
  purple:   '#9c27b0',
  yellow:   '#f5c842',
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const fmt$ = (n: number) =>
  `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtPct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

// ─── Sub-components ────────────────────────────────────────────────────────

function PnlBadge({ value, pct }: { value: number; pct: number }) {
  const color = value >= 0 ? TV.green : TV.red;
  const Icon = value >= 0 ? TrendingUp : TrendingDown;
  return (
    <span style={{ color }} className="flex items-center gap-1 text-xs font-mono">
      <Icon size={12} />
      {fmt$(value)} ({fmtPct(pct)})
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Stocks: '#2196f333', Crypto: '#ff980033', Forex: '#26a69a33', Indices: '#9c27b033',
  };
  const texts: Record<string, string> = {
    Stocks: '#2196f3', Crypto: '#ff9800', Forex: '#26a69a', Indices: '#9c27b0',
  };
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded font-medium"
      style={{ background: colors[category] || '#333', color: texts[category] || '#fff' }}
    >
      {category}
    </span>
  );
}

// ─── XP Bar ────────────────────────────────────────────────────────────────

function XpBar({ level, xpProgress, xpRequired }: { level: number; xpProgress: number; xpRequired: number }) {
  const pct = xpRequired > 0 ? Math.min(100, (xpProgress / xpRequired) * 100) : 100;
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-bold px-1.5 py-0.5 rounded"
        style={{ background: TV.blue + '33', color: TV.blue }}
      >
        Lv{level}
      </span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: TV.border }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: TV.blue }}
        />
      </div>
      <span className="text-[10px] font-mono" style={{ color: TV.muted }}>
        {xpProgress}/{xpRequired}
      </span>
    </div>
  );
}

// ─── Watchlist Item ────────────────────────────────────────────────────────

function WatchlistItem({
  asset, price, prevPrice, selected, onClick,
}: {
  asset: Asset; price: number; prevPrice: number; selected: boolean; onClick: () => void;
}) {
  const change = prevPrice > 0 ? ((price - prevPrice) / prevPrice) * 100 : 0;
  const color = change >= 0 ? TV.green : TV.red;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors"
      style={{
        background: selected ? TV.border : 'transparent',
        borderLeft: selected ? `2px solid ${TV.blue}` : '2px solid transparent',
      }}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-white">{asset.symbol}</span>
        <span className="text-[10px] truncate" style={{ color: TV.muted }}>{asset.name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-mono text-white">{formatPrice(price, asset)}</span>
        <span className="text-[10px] font-mono" style={{ color }}>{fmtPct(change)}</span>
      </div>
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function SimulatorPage() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const tier = user?.tier ?? 'free';
  const sim = useSimulator(tier);
  const gam = useGamification();

  // ── UI state ──────────────────────────────────────────────────────────────
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [qty, setQty] = useState('1');
  const [slInput, setSlInput] = useState('');
  const [tpInput, setTpInput] = useState('');
  const [activeTab, setActiveTab] = useState<'positions' | 'history' | 'achievements' | 'challenges'>('positions');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<'chart' | 'order' | 'watch' | 'stats'>('chart');

  const asset = ASSET_MAP.get(selectedSymbol)!;
  const currentPrice = sim.prices[selectedSymbol] ?? asset.basePrice;
  const candles = sim.candles[selectedSymbol] ?? [];

  // ── Prev prices for % change (compare to candle[length-2]) ───────────────
  const prevPrices = useMemo(() => {
    const p: Record<string, number> = {};
    ASSETS.forEach(a => {
      const hist = sim.candles[a.symbol];
      if (hist && hist.length >= 2) p[a.symbol] = hist[hist.length - 2].close;
      else p[a.symbol] = a.basePrice;
    });
    return p;
  }, [sim.candles]);

  // ── Active position for selected symbol (to show lines on chart) ──────────
  const activePos = sim.positions.find(p => p.symbol === selectedSymbol);

  // ── R:R calculation ───────────────────────────────────────────────────────
  const qtyNum = parseFloat(qty) || 0;
  const slNum  = parseFloat(slInput) || null;
  const tpNum  = parseFloat(tpInput) || null;
  const rrRatio = useMemo(() => {
    if (!slNum || !tpNum || !currentPrice) return null;
    const risk   = Math.abs(currentPrice - slNum)  * qtyNum;
    const reward = Math.abs(currentPrice - tpNum)  * qtyNum;
    if (risk === 0) return null;
    return (reward / risk).toFixed(2);
  }, [slNum, tpNum, currentPrice, qtyNum]);

  // ── Place trade ───────────────────────────────────────────────────────────
  const handleTrade = useCallback(() => {
    const result = sim.openPosition(selectedSymbol, direction, qtyNum, slNum, tpNum);
    if (result.ok) {
      gam.onTradeOpened(selectedSymbol, asset.category);
      setQty('1');
      setSlInput('');
      setTpInput('');
    } else {
      alert(result.error);
    }
  }, [sim, gam, selectedSymbol, direction, qtyNum, slNum, tpNum, asset.category]);

  // ── Close position ────────────────────────────────────────────────────────
  const handleClose = useCallback((pos: Position) => {
    sim.closePosition(pos.id);
    gam.onTradeClosed(pos.pnl, pos.pnl > 0, sim.winStreak, sim.totalTrades + 1, pos.symbol);
  }, [sim, gam]);

  // ── Watchlist filtered ───────────────────────────────────────────────────
  const watchlistAssets = categoryFilter
    ? ASSETS.filter(a => a.category === categoryFilter)
    : ASSETS;

  // ─── Panel: Watchlist ────────────────────────────────────────────────────
  const WatchlistPanel = (
    <div className="flex flex-col h-full" style={{ background: TV.bg }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: TV.border }}>
        <p className="text-xs font-bold text-white mb-1.5">Markets</p>
        <div className="flex gap-1 flex-wrap">
          {['All', 'Stocks', 'Crypto', 'Forex', 'Indices'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat === 'All' ? null : cat)}
              className="text-[10px] px-2 py-0.5 rounded transition-colors"
              style={{
                background: (categoryFilter ?? 'All') === cat ? TV.blue : TV.border,
                color: (categoryFilter ?? 'All') === cat ? '#fff' : TV.muted,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {watchlistAssets.map(a => (
          <WatchlistItem
            key={a.symbol}
            asset={a}
            price={sim.prices[a.symbol] ?? a.basePrice}
            prevPrice={prevPrices[a.symbol] ?? a.basePrice}
            selected={a.symbol === selectedSymbol}
            onClick={() => setSelectedSymbol(a.symbol)}
          />
        ))}
      </div>
    </div>
  );

  // ─── Panel: Order Form ────────────────────────────────────────────────────
  const cost = qtyNum * currentPrice;
  const canAfford = cost <= sim.available;
  const atPosLimit = sim.positions.length >= sim.maxPositions;

  const OrderPanel = (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: TV.panel }}>
      {/* Account summary */}
      <div className="px-3 py-2 border-b" style={{ borderColor: TV.border }}>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: TV.muted }}>SimCash</span>
          <span className="font-mono font-bold text-white">{fmt$(sim.available)}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: TV.muted }}>Equity</span>
          <span className="font-mono text-white">{fmt$(sim.totalBalance)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: TV.muted }}>Open PnL</span>
          <span className="font-mono" style={{ color: sim.positions.reduce((s, p) => s + p.pnl, 0) >= 0 ? TV.green : TV.red }}>
            {fmt$(sim.positions.reduce((s, p) => s + p.pnl, 0))}
          </span>
        </div>
      </div>

      {/* XP bar */}
      <div className="px-3 py-2 border-b" style={{ borderColor: TV.border }}>
        <XpBar level={gam.level} xpProgress={gam.xpProgress} xpRequired={gam.xpRequired} />
        <div className="flex gap-3 mt-1 text-[10px]" style={{ color: TV.muted }}>
          <span>Streak <span className="font-bold" style={{ color: TV.yellow }}>{sim.winStreak}</span></span>
          <span>Win Rate <span className="font-bold" style={{ color: TV.green }}>{sim.winRate}%</span></span>
          <span>Trades <span className="font-bold text-white">{sim.totalTrades}</span></span>
        </div>
      </div>

      {/* Symbol + price */}
      <div className="px-3 py-2 border-b" style={{ borderColor: TV.border }}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-white">{asset.symbol}</span>
          <CategoryBadge category={asset.category} />
        </div>
        <p className="text-xs mt-0.5" style={{ color: TV.muted }}>{asset.name}</p>
        <p className="text-lg font-mono font-bold text-white mt-1">{formatPrice(currentPrice, asset)}</p>
      </div>

      {/* Long / Short toggle */}
      <div className="px-3 py-2 border-b" style={{ borderColor: TV.border }}>
        <div className="flex rounded overflow-hidden border" style={{ borderColor: TV.border }}>
          <button
            onClick={() => setDirection('long')}
            className="flex-1 py-1.5 text-xs font-bold transition-colors"
            style={{ background: direction === 'long' ? TV.green : 'transparent', color: direction === 'long' ? '#fff' : TV.muted }}
          >
            LONG
          </button>
          <button
            onClick={() => setDirection('short')}
            className="flex-1 py-1.5 text-xs font-bold transition-colors"
            style={{ background: direction === 'short' ? TV.red : 'transparent', color: direction === 'short' ? '#fff' : TV.muted }}
          >
            SHORT
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="px-3 py-2 space-y-2 border-b" style={{ borderColor: TV.border }}>
        <div>
          <label className="text-[10px] mb-1 block" style={{ color: TV.muted }}>Quantity</label>
          <input
            type="number"
            value={qty}
            min="0"
            step="any"
            onChange={e => setQty(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded font-mono outline-none"
            style={{ background: TV.bg, border: `1px solid ${TV.border}`, color: TV.text }}
          />
        </div>
        <div>
          <label className="text-[10px] mb-1 block" style={{ color: TV.muted }}>Stop Loss (optional)</label>
          <input
            type="number"
            value={slInput}
            placeholder={`e.g. ${formatPrice(currentPrice * 0.97, asset)}`}
            onChange={e => setSlInput(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded font-mono outline-none"
            style={{ background: TV.bg, border: `1px solid ${slInput ? TV.red : TV.border}`, color: TV.text }}
          />
        </div>
        <div>
          <label className="text-[10px] mb-1 block" style={{ color: TV.muted }}>Take Profit (optional)</label>
          <input
            type="number"
            value={tpInput}
            placeholder={`e.g. ${formatPrice(currentPrice * 1.03, asset)}`}
            onChange={e => setTpInput(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded font-mono outline-none"
            style={{ background: TV.bg, border: `1px solid ${tpInput ? TV.green : TV.border}`, color: TV.text }}
          />
        </div>

        {/* R:R */}
        {rrRatio && (
          <div className="flex items-center justify-between text-[10px]">
            <span style={{ color: TV.muted }}>Risk : Reward</span>
            <span className="font-mono font-bold" style={{ color: parseFloat(rrRatio) >= 2 ? TV.green : TV.yellow }}>
              1 : {rrRatio}
            </span>
          </div>
        )}

        {/* Cost */}
        <div className="flex items-center justify-between text-[10px]">
          <span style={{ color: TV.muted }}>Cost</span>
          <span className="font-mono" style={{ color: canAfford ? TV.text : TV.red }}>{fmt$(cost)}</span>
        </div>
      </div>

      {/* Place button */}
      <div className="px-3 py-2">
        <button
          onClick={handleTrade}
          disabled={!qtyNum || !canAfford || atPosLimit}
          className="w-full py-2 text-sm font-bold rounded transition-opacity disabled:opacity-40"
          style={{ background: direction === 'long' ? TV.green : TV.red, color: '#fff' }}
        >
          {atPosLimit ? 'Position Limit Reached' : !canAfford ? 'Insufficient SimCash' : `${direction === 'long' ? 'BUY' : 'SELL'} ${asset.symbol}`}
        </button>
        <p className="text-[10px] text-center mt-1" style={{ color: TV.muted }}>
          {sim.positions.length}/{sim.maxPositions} positions open
        </p>
      </div>

      {/* Reset */}
      <div className="px-3 pb-3">
        <button
          onClick={sim.resetAccount}
          className="w-full py-1.5 text-[10px] rounded flex items-center justify-center gap-1 transition-colors"
          style={{ background: TV.border, color: TV.muted }}
        >
          <RefreshCw size={10} /> Reset Account
        </button>
      </div>
    </div>
  );

  // ─── Bottom tabs: Positions / History / Achievements / Challenges ─────────
  const BottomTabs = (
    <div className="flex flex-col" style={{ background: TV.panel, borderTop: `1px solid ${TV.border}` }}>
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: TV.border }}>
        {(['positions', 'history', 'achievements', 'challenges'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 text-[11px] font-medium capitalize transition-colors"
            style={{
              color: activeTab === tab ? TV.blue : TV.muted,
              borderBottom: activeTab === tab ? `2px solid ${TV.blue}` : '2px solid transparent',
            }}
          >
            {tab === 'positions' ? `Positions (${sim.positions.length})` :
             tab === 'history'   ? 'History' :
             tab === 'achievements' ? 'Badges' : 'Challenges'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-h-52 overflow-y-auto">
        {activeTab === 'positions' && (
          sim.positions.length === 0
            ? <p className="text-[11px] text-center py-4" style={{ color: TV.muted }}>No open positions</p>
            : sim.positions.map(pos => (
              <div key={pos.id} className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: TV.border }}>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: pos.direction === 'long' ? TV.green + '33' : TV.red + '33', color: pos.direction === 'long' ? TV.green : TV.red }}
                  >
                    {pos.direction.toUpperCase()}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white">{pos.symbol}</p>
                    <p className="text-[10px]" style={{ color: TV.muted }}>
                      {pos.quantity} @ {formatPrice(pos.entryPrice, ASSET_MAP.get(pos.symbol)!)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PnlBadge value={pos.pnl} pct={pos.pnlPct} />
                  <button onClick={() => { setSelectedSymbol(pos.symbol); }}>
                    <ChevronRight size={14} style={{ color: TV.muted }} />
                  </button>
                  <button onClick={() => handleClose(pos)}>
                    <X size={14} style={{ color: TV.red }} />
                  </button>
                </div>
              </div>
            ))
        )}

        {activeTab === 'history' && (
          sim.history.length === 0
            ? <p className="text-[11px] text-center py-4" style={{ color: TV.muted }}>No closed trades yet</p>
            : sim.history.slice(0, 50).map((t: ClosedTrade) => (
              <div key={t.id} className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: TV.border }}>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: t.direction === 'long' ? TV.green + '33' : TV.red + '33', color: t.direction === 'long' ? TV.green : TV.red }}
                  >
                    {t.direction.toUpperCase()}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white">{t.symbol}</p>
                    <p className="text-[10px]" style={{ color: TV.muted }}>
                      {t.quantity} · {formatPrice(t.entryPrice, ASSET_MAP.get(t.symbol)!)} → {formatPrice(t.exitPrice, ASSET_MAP.get(t.symbol)!)}
                    </p>
                  </div>
                </div>
                <PnlBadge value={t.pnl} pct={t.pnlPct} />
              </div>
            ))
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-2 p-2">
            {gam.achievements.map(a => {
              const Icon = ICON_MAP[a.icon] ?? Star;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-2 p-2 rounded"
                  style={{ background: a.unlocked ? TV.border : TV.bg, opacity: a.unlocked ? 1 : 0.4 }}
                >
                  <Icon size={16} style={{ color: a.unlocked ? TV.yellow : TV.muted }} />
                  <div>
                    <p className="text-[11px] font-bold text-white">{a.name}</p>
                    <p className="text-[9px]" style={{ color: TV.muted }}>{a.description}</p>
                    <p className="text-[9px]" style={{ color: TV.blue }}>+{a.xpReward} XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="p-2 space-y-2">
            {gam.dailyChallenges.map(c => {
              const pct = Math.min(100, (c.progress / c.target) * 100);
              return (
                <div key={c.id} className="p-2 rounded" style={{ background: TV.bg }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Target size={12} style={{ color: c.completed ? TV.green : TV.muted }} />
                      <p className="text-[11px] font-bold text-white">{c.name}</p>
                    </div>
                    <span className="text-[10px]" style={{ color: TV.blue }}>+{c.xpReward} XP</span>
                  </div>
                  <p className="text-[10px] mb-1.5" style={{ color: TV.muted }}>{c.description}</p>
                  <div className="h-1 rounded-full" style={{ background: TV.border }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: c.completed ? TV.green : TV.blue }}
                    />
                  </div>
                  <p className="text-[10px] text-right mt-0.5" style={{ color: TV.muted }}>
                    {c.progress}/{c.target}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // ─── Desktop layout (3 columns) ───────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen" style={{ background: TV.bg, color: TV.text }}>

      {/* ── Mobile tab bar ───────────────────────────────────────────────── */}
      <div className="flex md:hidden border-b" style={{ borderColor: TV.border }}>
        {(['chart', 'order', 'watch', 'stats'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMobilePanel(tab)}
            className="flex-1 py-2 text-[11px] font-medium capitalize"
            style={{ color: mobilePanel === tab ? TV.blue : TV.muted, borderBottom: mobilePanel === tab ? `2px solid ${TV.blue}` : '2px solid transparent' }}
          >
            {tab === 'watch' ? 'Markets' : tab === 'stats' ? 'Stats' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Mobile panels ────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-1 flex-col overflow-hidden">
        {mobilePanel === 'chart' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <LiveCandleChart
              candles={candles}
              asset={asset}
              entryPrice={activePos?.entryPrice}
              stopLoss={activePos?.stopLoss}
              takeProfit={activePos?.takeProfit}
              height={300}
            />
            {BottomTabs}
          </div>
        )}
        {mobilePanel === 'order' && (
          <div className="flex-1 overflow-y-auto">{OrderPanel}</div>
        )}
        {mobilePanel === 'watch' && (
          <div className="flex-1 overflow-y-auto">{WatchlistPanel}</div>
        )}
        {mobilePanel === 'stats' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <StatGrid sim={sim} gam={gam} />
          </div>
        )}
      </div>

      {/* ── Desktop 3-column layout ───────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Col 1: Watchlist (200px) */}
        <div className="w-[200px] flex-shrink-0 border-r overflow-hidden flex flex-col" style={{ borderColor: TV.border }}>
          {WatchlistPanel}
        </div>

        {/* Col 2: Chart + bottom tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <LiveCandleChart
            candles={candles}
            asset={asset}
            entryPrice={activePos?.entryPrice}
            stopLoss={activePos?.stopLoss}
            takeProfit={activePos?.takeProfit}
            height={400}
          />
          {BottomTabs}
        </div>

        {/* Col 3: Order panel (260px) */}
        <div className="w-[260px] flex-shrink-0 border-l overflow-y-auto" style={{ borderColor: TV.border }}>
          {OrderPanel}
        </div>
      </div>

      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

// ─── Stat grid (used in mobile stats panel) ───────────────────────────────

function StatGrid({ sim, gam }: { sim: ReturnType<typeof useSimulator>; gam: ReturnType<typeof useGamification> }) {
  const stats = [
    { label: 'Balance', value: `$${sim.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: TV.text, Icon: DollarSign },
    { label: 'Available', value: `$${sim.available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: TV.green, Icon: BarChart2 },
    { label: 'Win Rate', value: `${sim.winRate}%`, color: sim.winRate >= 50 ? TV.green : TV.red, Icon: Activity },
    { label: 'Win Streak', value: sim.winStreak.toString(), color: TV.yellow, Icon: Flame },
    { label: 'Total Trades', value: sim.totalTrades.toString(), color: TV.blue, Icon: Target },
    { label: 'Level', value: `Lv${gam.level}`, color: TV.blue, Icon: Award },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {stats.map(({ label, value, color, Icon }) => (
        <div key={label} className="p-3 rounded" style={{ background: TV.panel }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Icon size={12} style={{ color }} />
            <p className="text-[10px]" style={{ color: TV.muted }}>{label}</p>
          </div>
          <p className="text-base font-bold font-mono" style={{ color }}>{value}</p>
        </div>
      ))}
    </div>
  );
}
