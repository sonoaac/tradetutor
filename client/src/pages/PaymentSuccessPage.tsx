/**
 * PaymentSuccessPage — credits $100,000 SimCash to localStorage on arrival.
 * Stripe redirects here with ?session_id=... after a successful checkout.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, TrendingUp, Zap } from 'lucide-react';

const SIMCASH_REWARD = 100_000;
const LS_CASH        = 'tt_sim_cash_v1';

function creditSimCash(): number {
  try {
    const current = parseFloat(localStorage.getItem(LS_CASH) ?? '0') || 0;
    const next    = current + SIMCASH_REWARD;
    localStorage.setItem(LS_CASH, String(next));
    return next;
  } catch {
    return SIMCASH_REWARD;
  }
}

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();
  const [newBalance, setNewBalance] = useState<number | null>(null);

  useEffect(() => {
    // Credit SimCash once on mount — idempotent via credited flag per session_id
    const params    = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id') || 'manual';
    const flagKey   = `tt_credited_${sessionId}`;

    if (!sessionStorage.getItem(flagKey)) {
      const bal = creditSimCash();
      setNewBalance(bal);
      sessionStorage.setItem(flagKey, '1');
    } else {
      // Already credited — just show current balance
      try { setNewBalance(parseFloat(localStorage.getItem(LS_CASH) ?? '0')); } catch { /* */ }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground mt-2">Your SimCash has been credited.</p>
        </div>

        {/* SimCash credited card */}
        <div className="rounded-2xl border-2 border-primary bg-card p-6 mb-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-1">SimCash Added</p>
          <p className="text-5xl font-bold text-primary font-mono mb-1">
            +${SIMCASH_REWARD.toLocaleString()}
          </p>
          {newBalance != null && (
            <p className="text-sm text-muted-foreground">
              New balance: <span className="font-semibold text-foreground font-mono">${newBalance.toLocaleString()}</span>
            </p>
          )}
        </div>

        {/* What to do now */}
        <div className="rounded-xl border border-border bg-muted/40 p-4 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Zap size={14} className="text-primary flex-shrink-0" />
            <span>SimCash is live in your simulator right now</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <TrendingUp size={14} className="text-primary flex-shrink-0" />
            <span>Trade 26 assets — stocks, crypto, forex & indices</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <CheckCircle size={14} className="text-primary flex-shrink-0" />
            <span>When it runs out, top up again for $9.99</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => setLocation('/simulator')}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <TrendingUp size={18} /> Start Trading Now
          </button>
          <button
            onClick={() => setLocation('/lessons')}
            className="w-full py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition"
          >
            Go to Lessons
          </button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Receipt sent to your email · Need help? contact@tradetutor.app
        </p>
      </div>
    </div>
  );
}
