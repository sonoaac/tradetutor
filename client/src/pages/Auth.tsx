import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  TrendingUp, TrendingDown, Loader2, Eye, EyeOff,
  BarChart2, BookOpen, Zap, ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiUrl } from '@/lib/api';

// ─── Mock ticker data for the left panel ─────────────────────────────────────
const TICKERS = [
  { symbol: 'BTC', price: '67,420.50', change: '+2.34%', up: true },
  { symbol: 'ETH', price: '3,512.80', change: '+1.87%', up: true },
  { symbol: 'AAPL', price: '189.45', change: '-0.62%', up: false },
  { symbol: 'TSLA', price: '248.10', change: '+4.15%', up: true },
  { symbol: 'SPY', price: '521.30', change: '+0.38%', up: true },
  { symbol: 'EUR/USD', price: '1.0842', change: '-0.21%', up: false },
];

const FEATURES = [
  { icon: BarChart2,  label: '26 assets', sub: 'Stocks, crypto & forex' },
  { icon: BookOpen,   label: '10 lessons', sub: 'Structured curriculum' },
  { icon: Zap,        label: '$100k SimCash', sub: 'Risk-free practice' },
  { icon: ShieldCheck,label: 'AI Coach', sub: 'Real-Time Tutor mode' },
];

// ─── Password helpers ─────────────────────────────────────────────────────────
function isValidPassword(pw: string) {
  return pw.length >= 7 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const hasLen = password.length >= 7;
  const hasUpper = /[A-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const score = [hasLen, hasUpper, hasNum].filter(Boolean).length;
  const colors = ['bg-destructive', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['Too short', 'Weak', 'Almost', 'Strong'];
  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score] : 'bg-muted'}`} />
        ))}
      </div>
      <p className={`text-xs ${score === 3 ? 'text-green-500' : 'text-muted-foreground'}`}>{labels[score]}</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Auth() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getModeFromSearch = (): 'login' | 'register' => {
    try {
      const m = new URLSearchParams(window.location.search).get('mode');
      return m === 'login' ? 'login' : 'register';
    } catch { return 'register'; }
  };

  const getNextPath = (): string | null => {
    try {
      const next = new URLSearchParams(window.location.search).get('next');
      if (!next || !next.startsWith('/') || next.startsWith('/api/')) return null;
      return next;
    } catch { return null; }
  };

  const [mode, setMode] = useState<'login' | 'register'>(getModeFromSearch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifier: '', email: '', password: '',
    username: '', firstName: '', lastName: '',
  });

  useEffect(() => {
    setMode(getModeFromSearch());
    setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      setError('');
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (mode === 'register' && !isValidPassword(form.password)) {
      setError('Password needs 7+ characters, 1 uppercase letter, and 1 number.');
      return;
    }

    setLoading(true);
    try {
      const url = apiUrl(mode === 'login' ? '/api/auth/login' : '/api/auth/register');
      const body = mode === 'login'
        ? { identifier: form.identifier.trim(), password: form.password }
        : {
            email: form.email,
            password: form.password,
            username: form.username.trim() || undefined,
            firstName: form.firstName,
            lastName: form.lastName,
          };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Authentication failed'); return; }

      if (data?.user) queryClient.setQueryData(['/api/auth/user'], data.user);
      else queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });

      toast({
        title: mode === 'login' ? 'Welcome back!' : 'Account created!',
        description: 'Redirecting…',
      });
      setTimeout(() => navigate(getNextPath() || '/dashboard'), 400);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: 'login' | 'register') {
    setMode(next);
    setError('');
    setForm({ identifier: '', email: '', password: '', username: '', firstName: '', lastName: '' });
    setShowPassword(false);
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel (desktop only) ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] flex-col justify-between bg-[#0d0f14] text-white p-10 xl:p-14 relative overflow-hidden select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Glow blobs */}
        <div className="absolute top-[-80px] left-[-60px] w-[340px] h-[340px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[260px] h-[260px] rounded-full bg-blue-500/10 blur-[80px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">TradeTutor</span>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl xl:text-4xl font-display font-bold leading-tight text-white">
              Learn to trade.<br />
              <span className="text-primary">Risk-free.</span>
            </h2>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">
              Practice with $100,000 of simulated cash. Master the markets before you risk a dollar.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary/15">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live ticker strip */}
          <div className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Simulator Markets</p>
            </div>
            <div className="divide-y divide-white/5">
              {TICKERS.map(t => (
                <div key={t.symbol} className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-mono font-semibold text-white/70">{t.symbol}</span>
                  <span className="text-xs font-mono text-white/50">{t.price}</span>
                  <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${t.up ? 'text-green-400' : 'text-red-400'}`}>
                    {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {t.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="relative z-10 text-[10px] text-white/20">
          Simulated prices for educational use only. Not real market data.
        </p>
      </div>

      {/* ── Right panel (form) ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-5 py-10 sm:px-10">

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">TradeTutor</span>
        </div>

        <div className="w-full max-w-sm">

          {/* Tab toggle */}
          <div className="flex rounded-xl bg-muted p-1 mb-7">
            {(['register', 'login'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === m
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'register' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'login'
                ? 'Enter your credentials to continue trading.'
                : 'Free to join. Start practicing in minutes.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Register extra fields */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs font-medium">First name</Label>
                    <Input id="firstName" placeholder="Jane" value={form.firstName} onChange={set('firstName')} autoComplete="given-name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs font-medium">Last name</Label>
                    <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-xs font-medium">
                    Username <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input id="username" placeholder="traderJane" value={form.username} onChange={set('username')} autoComplete="username" />
                </div>
              </>
            )}

            {/* Email / identifier */}
            <div className="space-y-1.5">
              <Label htmlFor="identifier" className="text-xs font-medium">
                {mode === 'login' ? 'Email or username' : 'Email'}
              </Label>
              {mode === 'login' ? (
                <Input
                  id="identifier"
                  placeholder="you@example.com"
                  value={form.identifier}
                  onChange={set('identifier')}
                  required
                  autoComplete="username"
                />
              ) : (
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                  autoComplete="email"
                />
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'Min 7 chars, 1 uppercase, 1 number' : ''}
                  value={form.password}
                  onChange={set('password')}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'register' && <PasswordStrength password={form.password} />}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading} className="w-full font-semibold mt-1">
              {loading
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {mode === 'login' ? 'Logging in…' : 'Creating account…'}</>
                : mode === 'login' ? 'Log In' : 'Create Account'}
            </Button>
          </form>

          {/* Switch mode link */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary font-semibold hover:opacity-80 transition"
            >
              {mode === 'login' ? 'Sign up free' : 'Log in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
