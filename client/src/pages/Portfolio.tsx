import { usePortfolio, useResetPortfolio } from "@/hooks/use-portfolio";
import { useTrades } from "@/hooks/use-trades";
import { Loader2, RefreshCcw, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TradeList } from "@/components/TradeList";

export default function Portfolio() {
  const { data: portfolio, isLoading, isError: isPortfolioError, error: portfolioError } = usePortfolio();
  const { data: trades = [], isLoading: isLoadingTrades, isError: isTradesError, error: tradesError } = useTrades();
  const { mutate: resetPortfolio, isPending: isResetting } = useResetPortfolio();

  if (isLoading) {
     return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
  }

  if (isPortfolioError || isTradesError) {
    const message = ((portfolioError as Error | undefined)?.message || (tradesError as Error | undefined)?.message || "Portfolio is locked.");
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Upgrade to unlock portfolio tracking.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl">
          <p className="font-semibold mb-2">Your portfolio is locked in Learn Mode</p>
          <p className="text-sm text-muted-foreground mb-4">{message}</p>
          <Link href="/pricing">
            <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 text-sm font-medium">
              View plans
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Manage your account and history.</p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-lg transition-all text-sm font-semibold">
              <RefreshCcw className="w-4 h-4" /> Reset account
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="text-destructive w-5 h-5" /> Reset portfolio?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This wipes trade history and resets balance to $100,000. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-secondary hover:bg-secondary/80">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => resetPortfolio()}
                className="bg-destructive hover:bg-destructive/90 text-white"
              >
                {isResetting ? "Resetting..." : "Yes, reset"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="text-base font-semibold font-display mb-4">Account summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current balance</p>
            <p className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">${Number(portfolio?.balance || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total profit/loss</p>
            <p
              className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight ${
                trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0) >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0) > 0 ? "+" : ""}$
              {trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total trades</p>
            <p className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">{trades.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold font-display mb-4">Trade history</h2>
        <TradeList />
      </div>
    </div>
  );
}
