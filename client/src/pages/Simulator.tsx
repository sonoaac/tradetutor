import { useState } from "react";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { TradingChart } from "@/components/TradingChart";
import { OrderForm } from "@/components/OrderForm";
import { TradeList } from "@/components/TradeList";
import { useMarketCandles } from "@/hooks/use-market";

export default function Simulator() {
  const [symbol, setSymbol] = useState("BTC-USD");
  const { data: marketData, isLoading } = useMarketCandles(symbol);
  
  // Get latest close price as "current price"
  const currentPrice = marketData?.candles[marketData.candles.length - 1]?.close;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8 flex flex-col h-screen overflow-hidden">
        <header className="px-6 py-4 border-b border-border bg-background flex justify-between items-center shrink-0">
          <div>
             <h1 className="text-xl font-bold font-display">Simulator</h1>
          </div>
          <div className="flex items-center gap-4">
             {/* Simple Symbol Selector */}
             <select 
               value={symbol} 
               onChange={(e) => setSymbol(e.target.value)}
               className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-bold border-none focus:ring-2 focus:ring-primary outline-none"
             >
               <option value="BTC-USD">BTC-USD</option>
               <option value="ETH-USD">ETH-USD</option>
               <option value="AAPL">AAPL</option>
               <option value="TSLA">TSLA</option>
             </select>
             
             {currentPrice && (
               <div className="flex flex-col items-end">
                 <span className="text-sm text-muted-foreground">Current Price</span>
                 <span className="text-lg font-mono font-bold text-foreground">${currentPrice.toFixed(2)}</span>
               </div>
             )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <TradingChart 
                data={marketData?.candles || []} 
                symbol={symbol} 
                isLoading={isLoading} 
              />
            </div>
            <div className="lg:col-span-1 h-[400px]">
              <OrderForm symbol={symbol} currentPrice={currentPrice || 0} />
            </div>
          </div>
          
          <div>
            <TradeList currentPrice={currentPrice} />
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
