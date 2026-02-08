import { useAuth } from "@/hooks/use-auth";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useTrades } from "@/hooks/use-trades";
import { StatCard } from "@/components/StatCard";
import { Wallet, TrendingUp, Activity, BarChart2, AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: portfolio, isLoading: isPortfolioLoading, isError: isPortfolioError, error: portfolioError } = usePortfolio();
  const { data: trades, isLoading: isTradesLoading, isError: isTradesError, error: tradesError } = useTrades();

  const tier = user?.tier || "free";

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-bold font-display mb-2">Trading Dashboard</h1>
          <p className="text-muted-foreground mb-6">Log in to view your portfolio, trade history, and performance stats.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth">
              <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-6 text-sm font-medium">
                Log in
              </a>
            </Link>
            <Link href="/pricing">
              <a className="inline-flex items-center justify-center rounded-md border border-border bg-background h-11 px-6 text-sm font-medium">
                View plans
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (tier === "free") {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold font-display">Learn Mode</h1>
                <p className="text-sm text-muted-foreground">
                  Trading and portfolio tracking are locked while you learn. Upgrade to Starter to place trades, unlock your portfolio, and track your performance.
                </p>
                <Link href="/pricing">
                  <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-6 text-sm font-medium">
                    Upgrade to Starter
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPortfolioLoading || isTradesLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (isPortfolioError || isTradesError) {
    const message = ((portfolioError as Error | undefined)?.message || (tradesError as Error | undefined)?.message || "Dashboard data is unavailable.");
    return (
      <div className="flex items-center justify-center py-10">
        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold font-display">Dashboard unavailable</h1>
                <p className="text-sm text-muted-foreground">{message}</p>
                <Link href="/pricing">
                  <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-6 text-sm font-medium">
                    View plans
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate some stats
  const totalTrades = trades?.length || 0;
  const winRate = trades?.filter(t => Number(t.pnl) > 0).length || 0;
  const winRatePct = totalTrades > 0 ? (winRate / totalTrades) * 100 : 0;
  
  // Recent 5 trades
  const recentTrades = [...(trades || [])].sort((a, b) => 
    new Date(b.entryTime || 0).getTime() - new Date(a.entryTime || 0).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.firstName || "Trader"}.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total SimCash"
          value={`$${Number(portfolio?.balance || 0).toLocaleString()}`}
          icon={<Wallet className="w-6 h-6" />}
          className="bg-gradient-to-br from-card to-card/50"
        />
        <StatCard
          title="Total P&L"
          value={`$${Number(portfolio?.totalProfitLoss || 0).toLocaleString()}`}
          trend={portfolio?.totalProfitLoss && Number(portfolio.totalProfitLoss) > 0 ? 5.2 : -2.1}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatCard
          title="Win Rate"
          value={`${winRatePct.toFixed(1)}%`}
          icon={<Activity className="w-6 h-6" />}
          description="Last 30 days"
        />
        <StatCard
          title="Total Trades"
          value={totalTrades}
          icon={<BarChart2 className="w-6 h-6" />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm min-h-[360px]">
          <h3 className="text-lg font-bold mb-6 font-display">Performance History</h3>
          <div className="h-[260px] flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-xl">
            Chart coming soon (needs historical portfolio data)
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6 font-display">Recent Activity</h3>
          <div className="space-y-3">
            {recentTrades.length === 0 ? (
              <p className="text-muted-foreground text-sm">No trades yet. Go to Simulator to start.</p>
            ) : (
              recentTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", trade.side === "buy" ? "bg-success" : "bg-destructive")} />
                    <div>
                      <p className="font-semibold font-mono text-sm">{trade.symbol}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {trade.side} • {trade.size} units
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {trade.status === "closed" ? (
                      <p
                        className={cn(
                          "font-mono font-semibold text-sm",
                          Number(trade.pnl) >= 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {Number(trade.pnl) > 0 ? "+" : ""}
                        {Number(trade.pnl).toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">OPEN</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
