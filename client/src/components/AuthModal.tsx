import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrendingUp, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiUrl } from '@/lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  disableRedirectOnSuccess?: boolean;
  successRedirectTo?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'register',
  disableRedirectOnSuccess = false,
  successRedirectTo,
}: AuthModalProps) {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const sanitizedSuccessRedirectTo = (() => {
    if (!successRedirectTo) return null;
    if (!successRedirectTo.startsWith('/')) return null;
    if (successRedirectTo.startsWith('/api/')) return null;
    return successRedirectTo;
  })();
  const nextPath = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next');
      if (!next) return null;
      if (!next.startsWith('/')) return null;
      if (next.startsWith('/api/')) return null;
      return next;
    } catch {
      return null;
    }
  })();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setErrorMessage('');
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setErrorMessage('');
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

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
        setErrorMessage(data.message || 'Authentication failed');
        return;
      }

      // Update cached session immediately so the UI reflects logged-in state right away
      if (data?.user) {
        queryClient.setQueryData(["/api/auth/user"], data.user);
      } else {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      }

      const willRedirect = !disableRedirectOnSuccess;

      toast({
        title: mode === 'login' ? 'Welcome back!' : 'Account created!',
        description: mode === 'login' 
          ? (willRedirect ? 'Redirecting...' : 'You are now signed in.')
          : 'Your account has been created successfully.',
      });

      // Close modal and navigate
      onClose();
      if (!disableRedirectOnSuccess) {
        setTimeout(() => {
          navigate(sanitizedSuccessRedirectTo || nextPath || '/dashboard');
        }, 300);
      }

    } catch (error: any) {
      setErrorMessage(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <Card className="w-full max-w-md border border-border shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <TrendingUp className="text-primary-foreground w-6 h-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-display">
            {mode === 'login' ? 'Welcome Back' : 'Get Started Free'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'Enter your credentials to continue' 
              : 'Create your account and start trading'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </div>
            ) : null}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-background"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? 'Log In' : 'Create Account'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-primary hover:opacity-90 font-semibold underline underline-offset-4"
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
                    className="text-primary hover:opacity-90 font-semibold underline underline-offset-4"
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
