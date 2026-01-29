import { useState } from "react";
import { useCreateTrade } from "@/hooks/use-trades";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const orderSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  size: z.number().min(0.01, "Size must be > 0"),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  symbol: string;
  currentPrice: number;
}

export function OrderForm({ symbol, currentPrice }: OrderFormProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const { mutate: createTrade, isPending } = useCreateTrade();
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      symbol: symbol,
      size: 1,
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    createTrade(
      {
        ...data,
        side,
        entryPrice: currentPrice,
      },
      {
        onSuccess: () => {
          toast({
            title: "Order Executed",
            description: `${side.toUpperCase()} ${data.size} ${data.symbol} @ ${currentPrice}`,
            className: side === 'buy' ? "border-l-4 border-l-success" : "border-l-4 border-l-destructive",
          });
          form.reset({ symbol, size: 1 });
        },
        onError: (err) => {
          toast({
            title: "Order Failed",
            description: err.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-primary rounded-full" />
        Place Order
      </h3>

      <div className="flex bg-secondary p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setSide('buy')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
            side === 'buy' 
              ? "bg-success text-white shadow-md" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <TrendingUp className="w-4 h-4" /> BUY
        </button>
        <button
          type="button"
          onClick={() => setSide('sell')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
            side === 'sell' 
              ? "bg-destructive text-white shadow-md" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <TrendingDown className="w-4 h-4" /> SELL
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase">Quantity</label>
          <input
            {...form.register("size", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {form.formState.errors.size && (
            <p className="text-destructive text-xs">{form.formState.errors.size.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase">Stop Loss</label>
            <input
              {...form.register("stopLoss", { valueAsNumber: true })}
              type="number"
              placeholder="Optional"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-destructive/50 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase">Take Profit</label>
            <input
              {...form.register("takeProfit", { valueAsNumber: true })}
              type="number"
              placeholder="Optional"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-success/50 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <span>Est. Total</span>
            <span className="font-mono text-foreground font-bold">
              ${(form.watch("size") * currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              side === 'buy' ? "bg-success text-white shadow-success/20" : "bg-destructive text-white shadow-destructive/20"
            )}
          >
            {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : side.toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  );
}
