import { CheckCircle2, TrendingUp, TrendingDown, Eye, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Trade {
  id: number;
  symbol: string;
  side: 'buy' | 'sell';
  size: number;
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface TradeConfirmationProps {
  trade: Trade | null;
  newBalance: number;
  open: boolean;
  onClose: () => void;
}

export function TradeConfirmation({ trade, newBalance, open, onClose }: TradeConfirmationProps) {
  if (!trade) return null;

  const totalCost = trade.size * trade.entryPrice;
  const fee = totalCost * 0.001; // 0.1% fee
  const netCost = trade.side === 'buy' ? totalCost + fee : totalCost - fee;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${trade.side === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
              {trade.side === 'buy' ? (
                <TrendingUp className="w-6 h-6 text-success" />
              ) : (
                <TrendingDown className="w-6 h-6 text-destructive" />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Order Executed
              </DialogTitle>
              <DialogDescription>
                Your {trade.side} order has been filled
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Trade Details */}
          <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Symbol</span>
              <span className="font-mono font-bold text-lg">{trade.symbol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Side</span>
              <span className={`font-bold uppercase ${trade.side === 'buy' ? 'text-success' : 'text-destructive'}`}>
                {trade.side}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Quantity</span>
              <span className="font-mono font-bold">{trade.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Execution Price</span>
              <span className="font-mono font-bold">${trade.entryPrice.toFixed(2)}</span>
            </div>
            {trade.stopLoss && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stop Loss</span>
                <span className="font-mono text-sm text-destructive">${trade.stopLoss.toFixed(2)}</span>
              </div>
            )}
            {trade.takeProfit && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Take Profit</span>
                <span className="font-mono text-sm text-success">${trade.takeProfit.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order Value</span>
              <span className="font-mono">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee (0.1%)</span>
              <span className="font-mono">${fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border/50">
              <span className="font-bold">Total {trade.side === 'buy' ? 'Cost' : 'Credit'}</span>
              <span className="font-mono font-bold text-lg">${netCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-muted-foreground">New Balance</span>
              <span className="font-mono font-bold text-xl text-primary">${newBalance.toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Continue Trading
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
