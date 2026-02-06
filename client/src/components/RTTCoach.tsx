import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AlertCircle, TrendingUp, TrendingDown, Zap, Lock, Activity, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/AuthModal';
import { apiUrl } from '@/lib/api';

interface CoachingSignal {
  action: string;
  tag: string;
  reason: string;
  score_bias: number;
  rsi: number | null;
  ma9: number | null;
  ma21: number | null;
  current_price: number;
}

interface RTTCoachProps {
  symbol: string;
  side?: 'buy' | 'sell';
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function RTTCoach({ symbol, side = 'buy', enabled, onToggle }: RTTCoachProps) {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [coaching, setCoaching] = useState<CoachingSignal | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Remove tier check for now since User type doesn't have tier property
  const canUseRTT = isAuthenticated;

  const handleToggle = (newEnabled: boolean) => {
    if (!isAuthenticated && newEnabled) {
      const confirmed = window.confirm('Login required for RTT Mode. Would you like to log in now?');
      if (confirmed) {
        setShowAuthModal(true);
      }
      return;
    }
    onToggle(newEnabled);
  };

  useEffect(() => {
    if (enabled && canUseRTT) {
      fetchCoaching();
      // Refresh coaching every 30 seconds
      const interval = setInterval(fetchCoaching, 30000);
      return () => clearInterval(interval);
    }
  }, [symbol, side, enabled, canUseRTT]);

  const fetchCoaching = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl(`/api/market/rtt/${symbol}?side=${side}`));
      const data = await res.json();
      setCoaching(data.coaching);
    } catch (error) {
      console.error('Failed to fetch RTT coaching:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes("DON'T") || action === 'WAIT') {
      return 'bg-red-100 text-red-700 border-red-300';
    } else if (action.includes('BUY') || action.includes('SELL')) {
      return 'bg-green-100 text-green-700 border-green-300';
    } else if (action.includes('CAUTIOUS')) {
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getActionIcon = (action: string) => {
    if (action.includes("DON'T") || action === 'WAIT') {
      return <AlertCircle className="w-4 h-4" />;
    } else if (action.includes('BUY') || action.includes('UP')) {
      return <TrendingUp className="w-4 h-4" />;
    } else if (action.includes('SELL') || action.includes('DOWN')) {
      return <TrendingDown className="w-4 h-4" />;
    }
    return <Activity className="w-4 h-4" />;
  };

  const getScoreColor = (bias: number) => {
    if (bias > 0) return 'text-green-600';
    if (bias < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white border-2 border-gray-200 shadow-sm overflow-hidden">
      {/* Professional RTT Coach Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3 border-b-2 border-purple-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            RTT Coach
          </h2>
          
          <div className="flex items-center gap-3">
            {!canUseRTT && (
              <Lock className="w-4 h-4 text-purple-200" />
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => handleToggle(e.target.checked)}
                disabled={!isAuthenticated || !canUseRTT}
                className="w-4 h-4 rounded border-2 border-white/30 bg-white/10 checked:bg-white checked:border-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              />
              <span className="text-sm font-semibold text-white">
                {enabled ? 'RTT Mode' : 'Free Mode'}
              </span>
            </label>
          </div>
        </div>
        <p className="text-sm text-purple-100 mt-1">
          {!isAuthenticated ? (
            'Login required to use RTT Mode'
          ) : !canUseRTT ? (
            'Upgrade to unlock AI coaching'
          ) : enabled ? (
            'Real-time trading tutor analyzing market conditions'
          ) : (
            'Enable RTT to get entry/exit warnings and earn points'
          )}
        </p>
      </div>

      {/* Coach Content */}
      <div className="p-4 space-y-4">
        {!enabled && (
          <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              Turn on RTT to get real-time coaching like "overbought RSI", "breakout confirmed", 
              and "risk too high". Earn points for following good risk management practices.
            </p>
          </div>
        )}

        {enabled && !canUseRTT && (
          <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-300">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-900 leading-relaxed">
                RTT Mode requires Pro tier subscription ($19.99/mo or $199/year). 
                Upgrade to unlock AI-powered coaching and point rewards.
              </p>
            </div>
          </div>
        )}

        {enabled && canUseRTT && coaching && (
          <>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`px-3 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-1 border-2 ${getActionColor(coaching.action)}`}>
                  {getActionIcon(coaching.action)}
                  {coaching.action}
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-600 uppercase font-semibold">Point Bias</div>
                  <div className={`text-lg font-bold ${getScoreColor(coaching.score_bias)}`}>
                    {coaching.score_bias > 0 ? '+' : ''}{coaching.score_bias}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {coaching.reason}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t-2 border-purple-200">
                <div>
                  <div className="text-xs text-gray-600 uppercase font-semibold">RSI(14)</div>
                  <div className="text-sm font-mono font-bold text-black">
                    {coaching.rsi !== null ? coaching.rsi.toFixed(1) : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase font-semibold">MA(9)</div>
                  <div className="text-sm font-mono font-bold text-black">
                    {coaching.ma9 !== null ? coaching.ma9.toFixed(2) : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase font-semibold">MA(21)</div>
                  <div className="text-sm font-mono font-bold text-black">
                    {coaching.ma21 !== null ? coaching.ma21.toFixed(2) : '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Coaching updates every 30 seconds based on latest price action
            </div>
          </>
        )}

        {enabled && canUseRTT && loading && !coaching && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Analyzing market conditions...
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
