import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/AuthModal';

export function ProfessionalHeroSection() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignUp = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    setShowAuthModal(true);
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 size-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 size-96 bg-purple-400/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 rounded-full bg-green-100 text-green-700 border-green-200">
              <span className="inline-block size-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              Live Simulation
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Trading
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Without the Risk
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Practice with real-time market data and get AI-powered feedback to become a confident trader.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/market">
                <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 group">
                  Start Trading
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full" onClick={handleSignUp}>
                Sign Up Free
              </Button>
            </div>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

            <div className="flex items-center gap-8 mt-12 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-green-500" />
                <span>Real-time data</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>No risk</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Chart Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600">Portfolio Value</p>
                  <p className="text-3xl font-bold">$112,450</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm">
                  +12.4%
                </div>
              </div>
              
              {/* SVG Chart */}
              <div className="relative h-64">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d="M 0 180 L 0 120 Q 50 100, 100 110 T 200 80 T 300 60 L 400 40 L 400 200 Z"
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Line */}
                  <path
                    d="M 0 120 Q 50 100, 100 110 T 200 80 T 300 60 L 400 40"
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -right-4 top-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[160px]"
              >
                <p className="text-xs text-gray-600 mb-1">Daily Gain</p>
                <p className="text-2xl font-bold text-green-600">+$2,450</p>
                <p className="text-xs text-gray-500">+2.2%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
