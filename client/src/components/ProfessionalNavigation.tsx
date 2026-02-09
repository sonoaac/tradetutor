import { useState } from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export function ProfessionalNavigation() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

  const avatarLetter = (() => {
    const fromFirst = user?.firstName?.trim()?.[0];
    const fromEmail = user?.email?.trim()?.[0];
    return (fromFirst || fromEmail || 'U').toUpperCase();
  })();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                  <TrendingUp className="size-6 text-white" />
                </div>
                <span className="text-xl font-semibold">TradeTutor</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#markets" className="text-gray-700 hover:text-blue-600 transition-colors">
                Markets
              </a>
              <a href="#learn" className="text-gray-700 hover:text-blue-600 transition-colors">
                Learn
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <div
                      className="h-9 w-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm font-semibold cursor-pointer"
                      aria-label="User profile"
                      title={user?.email || 'User'}
                    >
                      {avatarLetter}
                    </div>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => logout()} disabled={isLoggingOut}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                    Log In
                  </Button>
                  <Link href="/auth">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#markets" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Markets
                </a>
                <a href="#learn" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Learn
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <div className="flex flex-col gap-2 pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard">
                        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 w-full">
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={() => logout()} disabled={isLoggingOut}>
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setLoginOpen(true)}>
                        Log In
                      </Button>
                      <Link href="/auth">
                        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 w-full">
                          Get Started Free
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <Dialog open={!isAuthenticated && loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>
              Sign in to your TradeTutor account to continue your learning journey.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Link href="/auth">
              <Button className="w-full">Sign In</Button>
            </Link>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <Link href="/auth" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
