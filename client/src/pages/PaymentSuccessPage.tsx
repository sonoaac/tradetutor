/**
 * PaymentSuccessPage — polls server for SimCash balance after successful checkout.
 * Also syncs to localStorage for the simulator.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, TrendingUp, Zap, Loader2 } from 'lucide-react';
import { apiUrl } from '@/lib/api';

const SIMCASH_REWARD = 100_000;
const LS_CASH = 'tt_sim_cash_v1';

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();
  const [serverBalance, setServerBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    const params    = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id') || 'demo';

    // Demo / local mode — just read from localStorage
    if (sessionId === 'demo') {
      try {
        const bal = parseFloat(localStorage.getItem(LS_CASH) ?? '0') || 0;
        setServerBalance(bal);
      } catch { /* */ }
      setLoadingBalance(false);
      return;
    }

    // Real mode — poll server for updated balance (webhook may take a moment)
    let attempts = 0;
    const maxAttempts = 8;
    const creditedKey = `tt_credited_${sessionId}`;

    async function fetchBalance() {
      try {
        const res = await fetch(apiUrl('/api/simcash'), { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const bal  = data.balance || 0;
          setServerBalance(bal);
          // Sync to localStorage for simulator
          try { localStorage.setItem(LS_CASH, String(bal)); } catch { /* */ }
          sessionStorage.setItem(creditedKey, '1');
          setLoadingBalance(false);
          return true;
        }
      } catch { /* */ }
      return false;
    }

    async function poll() {
      if (sessionStorage.getItem(creditedKey)) {
        // Already processed — just show localStorage balance
        try { setServerBalance(parseFloat(localStorage.getItem(LS_CASH) ?? '0')); } catch { /* */ }
        setLoadingBalance(false);
        return;
      }
      const ok = await fetchBalance();
      if (!ok && attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 2000);
      } else if (!ok) {
        setLoadingBalance(false);
      }
    }

    setTimeout(poll, 1200); // wait for webhook to process
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
          <p className="text-5xl font-bold text-primary font-mono mb-2">
            +${SIMCASH_REWARD.toLocaleString()}
          </p>
          <div className="text-sm text-muted-foreground">
            {loadingBalance ? (
              <span className="flex items-center justify-center gap-1.5">
                <Loader2 size={14} className="animate-spin" /> Syncing balance...
              </span>
            ) : serverBalance !== null ? (
              <span>
                New balance: <span className="font-semibold text-foreground font-mono">${serverBalance.toLocaleString()}</span>
              </span>
            ) : (
              <span>Balance will appear in your simulator shortly.</span>
            )}
          </div>
        </div>

        {/* What to do now */}
        <div className="rounded-xl border border-border bg-muted/40 p-4 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Zap size={14} className="text-primary flex-shrink-0" />
            <span>SimCash is live in your simulator right now</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <TrendingUp size={14} className="text-primary flex-shrink-0" />
            <span>Trade 26 assets — stocks, crypto, forex &amp; indices</span>
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
