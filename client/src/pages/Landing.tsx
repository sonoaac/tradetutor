import { useState } from "react";
import { Link } from "wouter";
import { TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Users } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export default function Landing() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
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
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </button>
              <Link href="/market">
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Live Simulation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
              Master Trading <br />
              <span className="text-gradient">Without the Risk.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Practice with real-time market data, get AI-powered feedback on your trades, and master technical analysis before you risk a single dollar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/market">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  Start Trading Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#features">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary/50 text-foreground font-medium text-lg border border-white/5 hover:bg-secondary transition-all">
                  How it Works
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Chart Mockup */}
          <div className="relative rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            
            {/* Abstract Chart Representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
               {/* Just a visual placeholder for the landing page chart */}
               <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
                 <path d="M0,350 L50,340 L100,360 L150,300 L200,320 L250,250 L300,280 L350,200 L400,220 L450,150 L500,180 L550,100 L600,120 L650,80 L700,100 L750,50 L800,80 L850,20 L900,40 L950,10 L1200,10" 
                       fill="none" stroke="#3B82F6" strokeWidth="3" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                 <path d="M0,400 L0,350 L50,340 L100,360 L150,300 L200,320 L250,250 L300,280 L350,200 L400,220 L450,150 L500,180 L550,100 L600,120 L650,80 L700,100 L750,50 L800,80 L850,20 L900,40 L950,10 L1200,10 L1200,400 Z" 
                       fill="url(#grad1)" opacity="0.2" />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                     <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 0}} />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute top-10 left-10 p-4 bg-card border border-white/10 rounded-xl shadow-xl z-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                   <TrendingUp className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground uppercase">Total Profit</p>
                   <p className="text-xl font-bold font-mono text-green-400">+$12,450.00</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Risk-Free Environment"
              description="Start with $100,000 in SimCash. Make mistakes here so you don't make them with real money."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8 text-primary" />}
              title="Real-Time Data"
              description="Practice with live market charts and order books. The simulation behaves exactly like the real market."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="AI Trading Coach"
              description="Get instant feedback on your trades. Our AI analyzes your entry and exit points to help you improve."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <TrendingUp className="text-white w-3 h-3" />
             </div>
             <span className="font-display font-bold text-lg text-muted-foreground">TradeTutor</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TradeTutor. Built for traders, by traders.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group">
      <div className="mb-6 p-4 rounded-2xl bg-secondary/50 w-fit group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
