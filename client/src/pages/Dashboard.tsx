import { useAuth } from "@/hooks/use-auth";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useTrades } from "@/hooks/use-trades";
import { StatCard } from "@/components/StatCard";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { Wallet, TrendingUp, Activity, BarChart2, AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: portfolio, isLoading: isPortfolioLoading } = usePortfolio();
  const { data: trades, isLoading: isTradesLoading } = useTrades();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <header className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Trading Dashboard
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Learn, practice, and master trading with zero risk</p>
          </header>

          <div className="px-3 sm:px-4 md:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
            {/* Welcome Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 py-6 sm:py-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-4">
                <span className="animate-pulse">🚀</span> <span className="hidden sm:inline">Start Your Trading Journey Today</span><span className="sm:hidden">Get Started</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Master Trading Without<br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Risking Real Money
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Practice with $50,000 virtual cash, track your performance, and learn proven strategies before trading with real capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-sm sm:text-sm md:text-base hover:shadow-xl hover:scale-105 transition-all shadow-lg"
                >
                  Start Free Trial
                </button>
                <Link href="/market">
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 border border-gray-300 sm:border-2 rounded-lg font-bold text-sm sm:text-sm md:text-base hover:border-blue-500 hover:bg-blue-50 transition-all">
                    Browse Markets
                  </button>
                </Link>
              </div>
            </div>

            {/* Dashboard Preview with Annotations */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  📊 Your Dashboard Preview
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Here's what you'll get access to after signing up</p>
              </div>

              {/* Mockup Dashboard */}
              <div className="relative bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl border border-gray-200 sm:border-2 overflow-hidden">
                {/* Stats Grid Preview */}
                <div className="p-3 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                  <div className="relative group">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs mb-1 sm:mb-2">
                        <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-semibold text-xs">PORTFOLIO</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">$50,000</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">+$2,450 (5.2%)</div>
                    </div>
                    {/* Pointer Annotation - Hidden on mobile */}
                    <div className="hidden group-hover:block absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-semibold">
                        💰 Track your balance
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs mb-1 sm:mb-2">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-semibold text-xs">P&L</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-green-600">+$4,250</div>
                      <div className="text-xs text-gray-600 font-semibold mt-1">Last 30 days</div>
                    </div>
                    <div className="hidden group-hover:block absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-green-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-semibold">
                        📈 Monitor profits
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs mb-1 sm:mb-2">
                        <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-semibold text-xs">WIN RATE</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">68.5%</div>
                      <div className="text-xs text-gray-600 font-semibold mt-1">142 of 207 trades</div>
                    </div>
                    <div className="hidden group-hover:block absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-semibold">
                        🎯 Track success rate
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-purple-600"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs mb-1 sm:mb-2">
                        <BarChart2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-semibold text-xs">TRADES</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">207</div>
                      <div className="text-xs text-gray-600 font-semibold mt-1">Total executed</div>
                    </div>
                    <div className="hidden group-hover:block absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-orange-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-semibold">
                        📊 View all trades
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-orange-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Preview */}
                <div className="p-3 sm:p-6 bg-gray-50">
                  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 sm:border-2">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h4 className="font-bold text-sm sm:text-base text-gray-900">Performance Chart</h4>
                      <span className="text-xs text-gray-500">Last 30 Days</span>
                    </div>
                    <div className="h-32 sm:h-48 flex items-end gap-1">
                      {Array.from({ length: 30 }).map((_, i) => {
                        const height = Math.random() * 80 + 20;
                        const isGreen = Math.random() > 0.4;
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-t transition-all hover:opacity-70 ${
                              isGreen ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent backdrop-blur-[2px] flex items-end justify-center pb-8 sm:pb-12">
                  <div className="text-center space-y-2 sm:space-y-4 px-4">
                    <div className="text-4xl sm:text-6xl mb-1 sm:mb-2">🔒</div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Sign Up to Unlock</h3>
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-sm sm:text-base hover:shadow-xl transition-all"
                    >
                      Create Free Account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6 sm:mb-10">
                <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  💎 Simple, Transparent Pricing
                </h3>
                <p className="text-xs sm:text-base text-gray-600">Start free. Upgrade when you're ready.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* FREE */}
                <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 sm:border-2 hover:border-blue-400 hover:shadow-lg sm:hover:shadow-xl transition-all">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg sm:text-2xl">🆓</span>
                      <h4 className="text-base sm:text-xl font-bold text-gray-900">FREE</h4>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      $0
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Demo Plan</p>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span> $100 SimCash
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span> 1 lesson only
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span> 1 trade (ever)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span> 1 asset (BTN)
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <span className="text-gray-300">✗</span> No portfolio stats
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <span className="text-gray-300">✗</span> No RTT coaching
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-2 sm:py-2.5 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors text-xs sm:text-sm"
                  >
                    Try Demo
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2 sm:mt-3">Show value first</p>
                </div>

                {/* STARTER */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-green-300 sm:border-2 sm:border-green-400 hover:shadow-lg sm:hover:shadow-xl transition-all">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg sm:text-2xl">🟢</span>
                      <h4 className="text-base sm:text-xl font-bold text-gray-900">STARTER</h4>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      $9.99<span className="text-xs sm:text-sm text-gray-600">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium">Monthly or Yearly</p>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> $20,000 SimCash
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> Unlimited trades
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> 8 free assets
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> All 6 lessons
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> Portfolio tracking
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <span className="text-gray-300">✗</span> No RTT coaching
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg transition-all text-xs sm:text-sm"
                  >
                    Start Learning
                  </button>
                  <p className="text-center text-xs text-gray-600 mt-2 sm:mt-3">Best for beginners</p>
                </div>

                {/* PRO */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-yellow-400 sm:border-2 sm:border-yellow-500 hover:shadow-lg sm:hover:shadow-2xl transition-all relative overflow-hidden">
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-yellow-500 text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold">
                    POPULAR
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg sm:text-2xl">🟡</span>
                      <h4 className="text-base sm:text-xl font-bold text-gray-900">PRO</h4>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      $19.99<span className="text-xs sm:text-sm text-gray-600">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-900 font-bold">Monthly or Yearly</p>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-gray-900 font-semibold">
                      <span className="text-green-500">✓</span> $50,000 SimCash
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> All 20 assets
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> RTT coaching ⚡
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> Strategy hints
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> Performance analytics
                    </li>
                    <li className="flex items-center gap-2 text-gray-900">
                      <span className="text-green-500">✓</span> Priority features
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold hover:shadow-lg sm:hover:shadow-xl transition-all text-xs sm:text-sm"
                  >
                    Go PRO
                  </button>
                  <p className="text-center text-xs text-gray-700 mt-2 sm:mt-3">Learn properly 🚀</p>
                </div>

                {/* CTA to View Pricing */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-blue-300 sm:border-2 sm:border-blue-400 hover:shadow-lg sm:hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💡</div>
                  <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-2">More Options Available</h4>
                  <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">See all payment plans and choose monthly or yearly billing</p>
                  <Link href="/pricing">
                    <button className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg sm:hover:shadow-xl transition-all text-xs sm:text-sm">
                      View All Plans
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="max-w-4xl mx-auto text-center space-y-4 py-6 sm:py-8">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">🎓 What You'll Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Trading Basics</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Master orders, positions, and market mechanics</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📊</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Technical Analysis</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Learn to read charts and identify patterns</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💡</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Risk Management</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Protect capital with proven strategies</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <MobileMenu />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

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
    new Date(b.entryTime || 0).getTime() - new Date(a.entryTime || 0).getTime()
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
      
      <MobileMenu />
    </div>
  );
}
