import { useTrades, useCloseTrade } from "@/hooks/use-trades";
import { AlertCircle, Loader2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export function TradeList({ currentPrice }: { currentPrice?: number }) {
  const { data: trades, isLoading, isError, error } = useTrades();
  const { mutate: closeTrade, isPending: isClosing } = useCloseTrade();

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>;
  }

  if (isError) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
          <div className="space-y-2">
            <p className="font-bold">Trade history is locked</p>
            <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
            <Link href="/pricing">
              <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 text-sm font-medium">
                View plans
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const openTrades = trades?.filter(t => t.status === 'open') || [];
  const closedTrades = trades?.filter(t => t.status === 'closed') || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-secondary/30">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open Positions
          </h3>
        </div>
        
        {openTrades.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No open positions</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/20 text-muted-foreground font-medium text-xs uppercase tracking-wider text-left">
                <tr>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Side</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Entry</th>
                  <th className="p-4">Current PnL</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {openTrades.map((trade) => {
                  // Calculate unrealized PnL if we have current price
                  const pnl = currentPrice 
                    ? (currentPrice - Number(trade.entryPrice)) * Number(trade.size) * (trade.side === 'buy' ? 1 : -1)
                    : 0;
                  
                  return (
                    <tr key={trade.id} className="hover:bg-secondary/10 transition-colors group">
                      <td className="p-4 font-bold font-mono">{trade.symbol}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-bold uppercase",
                          trade.side === 'buy' ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        )}>
                          {trade.side}
                        </span>
                      </td>
                      <td className="p-4 font-mono">{trade.size}</td>
                      <td className="p-4 font-mono text-muted-foreground">${Number(trade.entryPrice).toFixed(2)}</td>
                      <td className={cn("p-4 font-mono font-bold", pnl >= 0 ? "text-success" : "text-destructive")}>
                        {pnl > 0 ? "+" : ""}{pnl.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => currentPrice && closeTrade({ id: trade.id, exitPrice: currentPrice })}
                          disabled={isClosing || !currentPrice}
                          className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors"
                          title="Close Position"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm opacity-80 hover:opacity-100 transition-opacity">
        <div className="p-4 border-b border-border bg-secondary/30">
          <h3 className="font-bold text-muted-foreground">Trade History</h3>
        </div>
        {closedTrades.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No closed trades yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/20 text-muted-foreground font-medium text-xs uppercase tracking-wider text-left">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Side</th>
                  <th className="p-4">Entry</th>
                  <th className="p-4">Exit</th>
                  <th className="p-4 text-right">PnL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {closedTrades.slice(0, 5).map((trade) => (
                  <tr key={trade.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 text-muted-foreground">
                      {trade.exitTime ? format(new Date(trade.exitTime), "MMM d, HH:mm") : "-"}
                    </td>
                    <td className="p-4 font-medium font-mono">{trade.symbol}</td>
                    <td className="p-4">
                      <span className={cn(
                        "text-xs font-bold uppercase",
                        trade.side === 'buy' ? "text-success" : "text-destructive"
                      )}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-muted-foreground">${Number(trade.entryPrice).toFixed(2)}</td>
                    <td className="p-4 font-mono text-muted-foreground">${Number(trade.exitPrice).toFixed(2)}</td>
                    <td className={cn("p-4 text-right font-mono font-bold", Number(trade.pnl) >= 0 ? "text-success" : "text-destructive")}>
                      {Number(trade.pnl) > 0 ? "+" : ""}{Number(trade.pnl).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
