import { useAuth } from "@/hooks/use-auth";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useTrades } from "@/hooks/use-trades";
import { StatCard } from "@/components/StatCard";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { Wallet, TrendingUp, Activity, BarChart2 } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: portfolio, isLoading: isPortfolioLoading } = usePortfolio();
  const { data: trades, isLoading: isTradesLoading } = useTrades();

  if (isPortfolioLoading || isTradesLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Calculate some stats
  const totalTrades = trades?.length || 0;
  const winRate = trades?.filter(t => Number(t.pnl) > 0).length || 0;
  const winRatePct = totalTrades > 0 ? (winRate / totalTrades) * 100 : 0;
  
  // Recent 5 trades
  const recentTrades = [...(trades || [])].sort((a, b) => 
    new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
  ).slice(0, 5);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-20 md:pb-8">
        <header className="px-8 py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
          <h1 className="text-2xl font-bold font-display">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Trader'}.</p>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total SimCash" 
              value={`$${Number(portfolio?.balance || 0).toLocaleString()}`} 
              icon={<Wallet className="w-6 h-6" />}
              className="bg-gradient-to-br from-card to-card/50"
            />
            <StatCard 
              title="Total P&L" 
              value={`$${Number(portfolio?.totalProfitLoss || 0).toLocaleString()}`} 
              trend={portfolio?.totalProfitLoss && Number(portfolio.totalProfitLoss) > 0 ? 5.2 : -2.1} // Mock trend for now
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chart Section Placeholder */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm min-h-[400px]">
              <h3 className="text-lg font-bold mb-6 font-display">Performance History</h3>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                Chart coming soon (needs historical portfolio data)
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 font-display">Recent Activity</h3>
              <div className="space-y-4">
                {recentTrades.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No trades yet. Go to Simulator to start!</p>
                ) : (
                  recentTrades.map(trade => (
                    <div key={trade.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${trade.side === 'buy' ? 'bg-success' : 'bg-destructive'}`} />
                        <div>
                          <p className="font-bold font-mono text-sm">{trade.symbol}</p>
                          <p className="text-xs text-muted-foreground capitalize">{trade.side} • {trade.size} units</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {trade.status === 'closed' ? (
                          <p className={`font-mono font-bold text-sm ${Number(trade.pnl) >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {Number(trade.pnl) > 0 ? '+' : ''}{Number(trade.pnl).toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">OPEN</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
