import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrendingUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiUrl } from '@/lib/api';

export default function Auth() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = apiUrl(mode === 'login' ? '/api/auth/login' : '/api/auth/register');
      const body = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      toast({
        title: mode === 'login' ? 'Welcome back!' : 'Account created!',
        description: mode === 'login' 
          ? 'Redirecting to dashboard...' 
          : 'Your account has been created successfully.',
      });

      // Small delay for UX
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-secondary/70 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md border border-border shadow-xl sm:shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center p-6 sm:p-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <TrendingUp className="text-primary-foreground w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold font-display">
            {mode === 'login' ? 'Welcome Back' : 'Get Started Free'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {mode === 'login' 
              ? 'Enter your credentials to continue' 
              : 'Create your account and start trading'}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-background text-sm sm:text-base p-2 sm:p-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-background text-sm sm:text-base p-2 sm:p-2.5"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-background text-sm sm:text-base p-2 sm:p-2.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="bg-background text-sm sm:text-base p-2 sm:p-2.5"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-semibold transition-all shadow-sm text-sm sm:text-base py-2 sm:py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span className="hidden sm:inline">{mode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
                  <span className="sm:hidden">{mode === 'login' ? 'Logging in' : 'Creating...'}</span>
                </>
              ) : (
                mode === 'login' ? 'Log In' : 'Create Account'
              )}
            </Button>

            <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-2">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-primary hover:opacity-90 font-semibold underline underline-offset-4 block sm:inline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-primary hover:opacity-90 font-semibold underline underline-offset-4 block sm:inline"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
