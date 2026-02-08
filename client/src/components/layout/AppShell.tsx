import { ReactNode, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { LogOut, LogIn, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";
import { Sidebar, MobileNav } from "@/components/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const pageLabel = useMemo(() => {
    if (location === "/dashboard") return "Dashboard";
    if (location.startsWith("/market")) return "Markets";
    if (location.startsWith("/simulator")) return "Simulator";
    if (location.startsWith("/lessons")) return "Lessons";
    if (location.startsWith("/portfolio")) return "Portfolio";
    if (location.startsWith("/pricing")) return "Plans";
    if (location.startsWith("/subscription")) return "Subscription";
    return "TradeTutor";
  }, [location]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Sidebar onRequestAuth={() => setShowAuthModal(true)} />

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Link href="/">
                <a className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <span className={cn("font-display text-sm font-semibold tracking-tight", "hidden sm:inline")}>TradeTutor</span>
                </a>
              </Link>
              <div className="h-5 w-px bg-border" />
              <div className="text-sm font-medium text-muted-foreground">{pageLabel}</div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/pricing">
                <a className="hidden sm:inline-flex">
                  <Button variant="secondary" size="sm">Plans</Button>
                </a>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex flex-col items-end leading-none">
                    <span className="text-xs font-medium text-muted-foreground">Signed in</span>
                    <span className="text-sm font-semibold">
                      {user?.firstName ? `${user.firstName}` : "Trader"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Log out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign in</span>
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 pb-24 md:pb-10">
          {children}
        </main>
      </div>

      <MobileNav />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
