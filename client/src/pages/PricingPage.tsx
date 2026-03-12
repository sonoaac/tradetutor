/**
 * PricingPage — $9.99 SimCash top-up with live Stripe checkout.
 */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  CheckCircle, TrendingUp, DollarSign, RefreshCw, Zap, BarChart2, Loader2,
  Lock, ShieldCheck, Check,
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

        {/* Social proof stats bar */}
        <div className="bg-gradient-to-br from-blue-500/7 to-indigo-500/5 border border-blue-500/12 rounded-2xl mb-12 mx-auto max-w-xl">
          <div className="flex items-center justify-center gap-0">
            {[
              { value: '3,200+', label: 'Learners practicing' },
              { value: '$0',     label: 'Real money risked' },
              { value: '21',     label: 'Lessons to master' },
            ].map((s, i) => (
              <div key={i} className={`flex-1 text-center py-4 ${i < 2 ? 'border-r border-border' : ''}`}>
                <p className="text-2xl font-extrabold tracking-tight text-foreground">{s.value}</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
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
          <div className="mb-8 rounded-xl border border-green-500/15 bg-gradient-to-r from-green-500/7 to-emerald-500/4 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Your current SimCash balance</p>
              <p className="text-2xl font-extrabold font-mono text-green-400 tabular-nums mt-0.5">
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
        <div className="rounded-2xl border border-blue-500/20 shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_80px_rgba(59,130,246,0.06)] overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 flex items-center justify-between">
            <span className="text-white font-bold text-sm">Full Access Pack</span>
            <span className="text-white/70 text-xs">One-time · No subscription</span>
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

            {/* Trust strip */}
            <div className="flex items-center justify-center gap-5 flex-wrap px-2 py-2.5 bg-green-500/5 border border-green-500/12 rounded-xl mb-3 text-[11px] text-green-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} /> Risk-free — no real money
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} /> No card saved
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={13} /> Instant access
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-[18px] rounded-[14px] font-bold text-[1.05rem] tracking-wide text-white
                bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                shadow-[0_4px_24px_rgba(59,130,246,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
                hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)] hover:-translate-y-0.5
                transition-all duration-200
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                flex items-center justify-center gap-2"
            >
              {loading
                ? <><Loader2 size={20} className="animate-spin" /> Redirecting...</>
                : isAuthenticated
                  ? 'Get $100,000 SimCash — $9.99'
                  : 'Sign In to Purchase'
              }
            </button>

            {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}

            <div className="flex items-center justify-center gap-5 flex-wrap mt-3.5">
              {['Secured by Stripe', 'No card saved', 'Instant access', 'One-time charge'].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check size={11} className="text-green-500" /> {t}
                </span>
              ))}
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
              { step: '1', title: 'Pay $9.99',             desc: 'One-time purchase. No recurring charges. No hidden fees.' },
              { step: '2', title: 'Get $100k SimCash',     desc: 'Credited instantly to your simulator account. Start trading immediately.' },
              { step: '3', title: "Trade until it's gone", desc: "Lose it all? That's the game. Come back and top up to keep learning." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center p-5 rounded-xl border border-border bg-card hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)] transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-[0_4px_14px_rgba(99,102,241,0.4)]">
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
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card px-5 py-4 hover:border-blue-500/25 hover:bg-blue-500/[0.02] transition-all duration-200">
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
