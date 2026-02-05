import { useState, useRef } from "react";
import { Link } from "wouter";
import { 
  TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Users, 
  ChevronRight, Star, Briefcase, Target, BookOpen, Gauge,
  ChevronLeft, GraduationCap, TrendingDown, Award
} from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export default function Landing() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const scrollRefs = {
    markets: useRef<HTMLDivElement>(null),
    lessons: useRef<HTMLDivElement>(null),
  };

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/5 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">TradeTutor</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#markets" className="text-sm text-muted-foreground hover:text-foreground transition">Markets</a>
              <a href="#learn" className="text-sm text-muted-foreground hover:text-foreground transition">Learn</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                Log In
              </button>
              <Link href="/market">
                <button className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-5 py-2 rounded-full font-medium text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-white/10 mb-4 md:mb-6 backdrop-blur-sm text-xs md:text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium text-green-400 uppercase tracking-wide">Live Simulation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 tracking-tight leading-tight">
              Master Trading <br className="hidden sm:block" />
              <span className="text-gradient">Without the Risk.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
              Practice with real-time market data, get AI-powered feedback on your trades, and master technical analysis before you risk a single dollar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link href="/market">
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-white font-bold text-base md:text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  Start Trading <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </button>
              </Link>
              <button onClick={() => setShowAuthModal(true)} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-secondary/50 text-foreground font-medium text-base md:text-lg border border-white/5 hover:bg-secondary transition-all">
                Sign Up Free
              </button>
            </div>
          </div>

          {/* Hero Chart */}
          <div className="relative rounded-xl md:rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden w-full aspect-video md:aspect-[16/9]">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
              <path d="M0,350 L50,340 L100,360 L150,300 L200,320 L250,250 L300,280 L350,200 L400,220 L450,150 L500,180 L550,100 L600,120 L650,80 L700,100 L750,50 L800,80 L850,20 L900,40 L950,10 L1200,10" 
                    fill="none" stroke="#3B82F6" strokeWidth="3" style={{filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))"}} />
              <path d="M0,400 L0,350 L50,340 L100,360 L150,300 L200,320 L250,250 L300,280 L350,200 L400,220 L450,150 L500,180 L550,100 L600,120 L650,80 L700,100 L750,50 L800,80 L850,20 L900,40 L950,10 L1200,10 L1200,400 Z" 
                    fill="url(#grad1)" opacity="0.2" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 0}} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-4 md:top-6 left-4 md:left-8 p-3 md:p-4 bg-card border border-white/10 rounded-lg md:rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <TrendingUp className="w-5 md:w-6 h-5 md:h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Portfolio Value</p>
                  <p className="text-lg md:text-xl font-bold font-mono text-green-400">+$12,450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section - Horizontal Scroll */}
      <section id="markets" className="py-12 md:py-20 border-t border-white/5 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Markets</h2>
              <p className="text-sm md:text-base text-muted-foreground">Trade any asset class with real-time data</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scroll(scrollRefs.markets, 'left')} className="p-2 hover:bg-secondary rounded-lg transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll(scrollRefs.markets, 'right')} className="p-2 hover:bg-secondary rounded-lg transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={scrollRefs.markets} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:pb-6">
            {[
              { name: 'Stocks', emoji: '📈' },
              { name: 'Crypto', emoji: '₿' },
              { name: 'Futures', emoji: '📊' },
              { name: 'Options', emoji: '📉' },
              { name: 'Forex', emoji: '💱' },
              { name: 'Commodities', emoji: '⛽' },
            ].map((market) => (
              <div key={market.name} className="flex-shrink-0 w-40 md:w-48 p-4 md:p-6 bg-card border border-white/10 rounded-lg hover:border-primary/50 transition cursor-pointer group">
                <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition">{market.emoji}</div>
                <h3 className="font-bold text-base md:text-lg">{market.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">Live data available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to become a better trader</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Risk-Free Trading"
              description="Start with virtual capital. Make mistakes without real consequences and build confidence."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8 text-primary" />}
              title="Real-Time Data"
              description="Live market charts and order books. Practice with the exact same conditions as live trading."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="AI Coaching"
              description="Get instant feedback on your trades. Learn from your mistakes with AI-powered analysis."
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-primary" />}
              title="Portfolio Tracking"
              description="Monitor all your positions and analyze your performance metrics in detail."
            />
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-primary" />}
              title="Structured Lessons"
              description="Learn trading fundamentals from beginner to advanced levels with interactive guides."
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8 text-primary" />}
              title="Progress Tracking"
              description="See your improvement over time with detailed statistics and achievements."
            />
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section id="learn" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start md:items-center mb-8 md:mb-12 flex-col md:flex-row gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning Paths</h2>
              <p className="text-sm md:text-base text-muted-foreground">Start from basics, progress to advanced strategies</p>
            </div>
            <Link href="/lessons">
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition font-medium text-sm md:text-base">
                View All Lessons <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Trading Basics', level: 'Beginner', topics: 12 },
              { title: 'Technical Analysis', level: 'Intermediate', topics: 15 },
              { title: 'Risk Management', level: 'Intermediate', topics: 10 },
              { title: 'Advanced Strategies', level: 'Advanced', topics: 18 },
              { title: 'Market Psychology', level: 'Advanced', topics: 8 },
              { title: 'Real-Time Trading', level: 'Pro', topics: 20 },
            ].map((lesson) => (
              <div key={lesson.title} className="group p-5 md:p-6 bg-card border border-white/10 rounded-lg hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <GraduationCap className="w-6 md:w-8 h-6 md:h-8 text-primary opacity-60 group-hover:opacity-100 transition" />
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">{lesson.level}</span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1">{lesson.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{lesson.topics} topics</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-secondary/5 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <StatCard number="50K+" label="Active Traders" />
            <StatCard number="1M+" label="Trades Simulated" />
            <StatCard number="98%" label="Success Rate" />
            <StatCard number="24/7" label="Market Coverage" />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your trading journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <PricingCard 
              name="Starter"
              price="$9.99"
              period="/month"
              features={['Full simulator access', '10 lessons', 'Basic data', 'Community support']}
            />
            <PricingCard 
              name="Pro Trader"
              price="$19.99"
              period="/month"
              popular
              features={['Everything in Starter', 'Real-Time Tutor (RTT)', 'Advanced analysis', 'Priority support', 'Exclusive strategies']}
            />
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/pricing">
              <button className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition">
                View All Plans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Ready to Start Trading?</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of traders practicing risk-free. Build confidence, master strategies, then trade with real money.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/market">
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-white font-bold text-base md:text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Start Free Now <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </Link>
            <button onClick={() => setShowAuthModal(true)} className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-secondary/50 text-foreground font-medium border border-white/5 hover:bg-secondary transition">
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-secondary/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Trading Platform</a></li>
                <li><a href="#" className="hover:text-foreground transition">Simulator</a></li>
                <li><a href="#" className="hover:text-foreground transition">Lessons</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Getting Started</a></li>
                <li><a href="#" className="hover:text-foreground transition">Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Discord</a></li>
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">Forum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <TrendingUp className="text-white w-3 h-3" />
              </div>
              <span className="font-display font-bold text-muted-foreground">TradeTutor</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} TradeTutor. Built for traders, by traders.
            </p>
          </div>
        </div>
      </footer>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 md:p-8 bg-card border border-white/10 rounded-lg hover:border-primary/50 transition group">
      <div className="mb-4 group-hover:scale-110 transition">{icon}</div>
      <h3 className="font-bold text-lg md:text-xl mb-2">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="p-6 md:p-8">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">{number}</div>
      <div className="text-base md:text-lg text-muted-foreground">{label}</div>
    </div>
  );
}

function PricingCard({ name, price, period, features, popular = false }: 
  { name: string, price: string, period: string, features: string[], popular?: boolean }) {
  return (
    <div className={`relative p-6 md:p-8 border rounded-lg transition ${
      popular 
        ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' 
        : 'border-white/10 bg-card'
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-3xl md:text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground text-sm md:text-base">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm md:text-base">
            <Star className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 md:py-3 rounded-lg font-bold transition ${
        popular
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'bg-secondary/50 hover:bg-secondary'
      }`}>
        Get Started
      </button>
    </div>
  );
}
