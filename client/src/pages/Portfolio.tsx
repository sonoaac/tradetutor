import { Sidebar, MobileNav } from "@/components/Sidebar";
import { usePortfolio, useResetPortfolio } from "@/hooks/use-portfolio";
import { useTrades } from "@/hooks/use-trades";
import { Loader2, RefreshCcw, AlertTriangle } from "lucide-react";
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
  const { data: portfolio, isLoading } = usePortfolio();
  const { data: trades = [], isLoading: isLoadingTrades } = useTrades();
  const { mutate: resetPortfolio, isPending: isResetting } = useResetPortfolio();

  if (isLoading) {
     return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        <header className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display">Portfolio</h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Manage your account and history.</p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-lg transition-all text-sm font-bold">
                <RefreshCcw className="w-4 h-4" /> Reset Account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-destructive w-5 h-5" /> Reset Portfolio?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will wipe all your trade history and reset your balance to $100,000. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-secondary hover:bg-secondary/80">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => resetPortfolio()} 
                  className="bg-destructive hover:bg-destructive/90 text-white"
                >
                  {isResetting ? "Resetting..." : "Yes, Reset Everything"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </header>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
           {/* Account Summary */}
           <div className="bg-card rounded-lg sm:rounded-2xl border border-border p-4 sm:p-6 md:p-8 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold font-display mb-4 sm:mb-6">Account Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                   <p className="text-4xl font-mono font-bold text-foreground tracking-tight">${Number(portfolio?.balance || 0).toLocaleString()}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">Total Profit/Loss</p>
                   <p className={`text-4xl font-mono font-bold tracking-tight ${(trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0)) >= 0 ? 'text-success' : 'text-destructive'}`}>
                     {trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0) > 0 ? '+' : ''}${trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0).toLocaleString()}
                   </p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">Total Trades</p>
                   <p className="text-4xl font-mono font-bold text-foreground tracking-tight">{trades.length}</p>
                 </div>
              </div>
           </div>

           {/* Full Trade History */}
           <div>
              <h2 className="text-lg font-bold font-display mb-6">Full Trade History</h2>
              <TradeList />
           </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
