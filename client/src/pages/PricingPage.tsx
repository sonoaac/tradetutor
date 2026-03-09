/**
 * PricingPage — single $9.99 SimCash top-up.
 * No tiers. No subscriptions. Pay $9.99 → get $100,000 SimCash to trade.
 * When SimCash runs out, come back and top up again.
 */
import { Link } from 'wouter';
import {
  CheckCircle, TrendingUp, DollarSign, RefreshCw, Zap, BarChart2,
} from 'lucide-react';

const SIMCASH_AMOUNT = 100_000;
const PRICE         = 9.99;
const LS_CASH       = 'tt_sim_cash_v1';

function getCurrentSimCash(): number {
  try { const v = localStorage.getItem(LS_CASH); return v ? Math.round(parseFloat(v)) : 0; } catch { return 0; }
}

const FEATURES = [
  { icon: TrendingUp, text: '$100,000 SimCash to trade with' },
  { icon: BarChart2,  text: 'Full simulator — 26 assets, candlestick charts' },
  { icon: Zap,        text: 'Long & Short positions with Stop Loss / Take Profit' },
  { icon: CheckCircle,text: 'All lessons, market encyclopedia, and gamified XP' },
  { icon: RefreshCw,  text: 'Top up any time when SimCash runs out' },
  { icon: DollarSign, text: 'No subscription — pay once, play until it\'s gone' },
];

const FAQS = [
  {
    q: 'What is SimCash?',
    a: 'SimCash is fake money you use inside the TradeTutor simulator. It works exactly like real money — you buy, sell, win, lose — but nothing is connected to real markets or real funds.',
  },
  {
    q: 'What happens when my SimCash runs out?',
    a: 'When your balance hits $0, you come back here and top up for another $9.99. You keep your trade history and XP — just no cash to trade with.',
  },
  {
    q: 'Can I reset for free?',
    a: 'The Reset button in the simulator is always available, but it costs $9.99 to refill SimCash. Resetting without a purchase brings your cash back to $0.',
  },
  {
    q: 'When will Stripe be connected?',
    a: 'Payment processing is coming very soon. For now, use the simulator freely while we finish the checkout integration.',
  },
];

export default function PricingPage() {
  const currentCash = getCurrentSimCash();
  const hasBalance  = currentCash > 500;

  // Payment link from env — connect Stripe later
  const paymentLink = (import.meta as any)?.env?.VITE_STRIPE_PAYMENT_LINK_SIMCASH as string | undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">

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

        {/* Current balance (if any) */}
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
          {/* Top badge */}
          <div className="bg-primary px-6 py-3 flex items-center justify-between">
            <span className="text-primary-foreground font-bold text-sm">SimCash Top-Up</span>
            <span className="text-primary-foreground text-xs opacity-80">One-time · No subscription</span>
          </div>

          <div className="bg-card px-6 py-8">
            {/* Price */}
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

            {/* Features */}
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
            {paymentLink ? (
              <a
                href={paymentLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg text-center hover:opacity-90 transition"
              >
                Get $100,000 SimCash — $9.99
              </a>
            ) : (
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg opacity-60 cursor-not-allowed"
                >
                  Checkout Coming Soon
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Payment processing is being set up. Try the simulator free in the meantime.
                </p>
              </div>
            )}

            {/* Sub-text */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout via Stripe · No card saved · Cancel not needed — it's one-time
            </p>
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
              { step: '1', title: 'Pay $9.99',           desc: 'One-time purchase. No recurring charges. No hidden fees.' },
              { step: '2', title: 'Get $100k SimCash',   desc: 'Credited instantly to your simulator account. Start trading immediately.' },
              { step: '3', title: 'Trade until it\'s gone', desc: 'Lose it all? That\'s the game. Come back and top up to keep learning.' },
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
