/**
 * PricingPage — $9.99 SimCash top-up with live Stripe checkout.
 */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  CheckCircle, TrendingUp, DollarSign, RefreshCw, Zap, BarChart2, Loader2,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { apiUrl } from '@/lib/api';

const FEATURES = [
  { icon: TrendingUp, text: '$100,000 SimCash to trade with' },
  { icon: BarChart2,  text: 'Full simulator — 26 assets, candlestick charts' },
  { icon: Zap,        text: 'Long & Short positions with Stop Loss / Take Profit' },
  { icon: CheckCircle,text: 'All lessons, market encyclopedia, and gamified XP' },
  { icon: RefreshCw,  text: 'Top up any time when SimCash runs out' },
  { icon: DollarSign, text: 'No subscription — pay once, trade until it\'s gone' },
];

const FAQS = [
  {
    q: 'What is SimCash?',
    a: 'SimCash is practice money used inside the TradeTutor simulator. It works exactly like real money — you buy, sell, win, lose — but nothing is connected to real markets or real funds.',
  },
  {
    q: 'What happens when my SimCash runs out?',
    a: 'When your balance hits $0, come back here and top up for another $9.99. You keep your trade history and XP — just no cash to trade with.',
  },
  {
    q: 'Can I reset for free?',
    a: 'The Reset button in the simulator is always available, but it costs $9.99 to refill SimCash. Resetting without a purchase brings your cash back to $0.',
  },
  {
    q: 'Is payment secure?',
    a: 'Checkout is handled entirely by Stripe — one of the world\'s most trusted payment processors. We never see your card details.',
  },
];

const LS_CASH = 'tt_sim_cash_v1';

function getCurrentSimCash(): number {
  try { const v = localStorage.getItem(LS_CASH); return v ? Math.round(parseFloat(v)) : 0; } catch { return 0; }
}

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const currentCash = getCurrentSimCash();
  const hasBalance  = currentCash > 500;

  async function handleCheckout() {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/payment/create-simcash-checkout'), {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.';
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
          {[
            { value: '3,200+', label: 'learners practicing' },
            { value: '$0', label: 'real money risked' },
            { value: '21', label: 'lessons to master' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            One simple plan
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            $9.99 gets you<br />
            <span className="text-primary">$100,000 SimCash</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Practice trading with $100,000 of fake money. No risk. No subscriptions.
            When it runs out, top up and keep learning.
          </p>
        </div>

        {/* Current balance */}
        {hasBalance && (
          <div className="mb-8 rounded-xl border border-border bg-muted/50 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Your current SimCash balance</p>
              <p className="text-2xl font-bold font-mono text-primary mt-0.5">
                ${currentCash.toLocaleString()}
              </p>
            </div>
            <Link href="/simulator">
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
                <TrendingUp size={15} /> Go Trade
              </a>
            </Link>
          </div>
        )}

        {/* Main card */}
        <div className="rounded-2xl border-2 border-primary shadow-lg overflow-hidden mb-10">
          <div className="bg-primary px-6 py-3 flex items-center justify-between">
            <span className="text-primary-foreground font-bold text-sm">Full Access Pack</span>
            <span className="text-primary-foreground text-xs opacity-80">One-time · No subscription</span>
          </div>

          <div className="bg-card px-6 py-8">
            <div className="flex items-end gap-3 mb-6">
              <span className="text-6xl font-bold text-foreground">$9.99</span>
              <div className="pb-2">
                <p className="text-sm font-semibold text-muted-foreground leading-none">one-time</p>
                <p className="text-xs text-muted-foreground mt-0.5">pay as you go</p>
              </div>
              <div className="ml-auto pb-2 text-right">
                <p className="text-3xl font-bold text-primary">$100,000</p>
                <p className="text-sm text-muted-foreground">SimCash</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={12} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading
                ? <><Loader2 size={20} className="animate-spin" /> Redirecting...</>
                : isAuthenticated
                  ? 'Get $100,000 SimCash — $9.99'
                  : 'Sign In to Purchase'
              }
            </button>

            {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}

            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock size={10} /> Secure checkout via Stripe · No card saved · One-time charge
              </p>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle size={11} className="text-green-500 shrink-0" />
                <span className="text-[11px] font-medium text-green-600 dark:text-green-400">100% risk-free — it's all simulated money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Try free */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm mb-3">Not ready to pay? The simulator is open to everyone.</p>
          <Link href="/simulator">
            <a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition">
              Try Simulator Free
            </a>
          </Link>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Pay $9.99',              desc: 'One-time purchase. No recurring charges. No hidden fees.' },
              { step: '2', title: 'Get $100k SimCash',      desc: 'Credited instantly to your simulator account. Start trading immediately.' },
              { step: '3', title: "Trade until it's gone",  desc: "Lose it all? That's the game. Come back and top up to keep learning." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center p-5 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {step}
                </div>
                <p className="font-semibold text-foreground mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card px-5 py-4">
                <p className="font-semibold text-foreground mb-1">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
