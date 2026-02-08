import { Link, useLocation } from "wouter";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  CandlestickChart,
  GraduationCap,
  Wallet,
  TrendingUp,
  Store,
  CreditCard,
  LogIn,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar({ onRequestAuth }: { onRequestAuth?: () => void }) {
  const [location] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, logout, isLoggingOut } = useAuth();

  const navItems = useMemo(
    () => [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/market", icon: Store, label: "Market" },
      { href: "/simulator", icon: CandlestickChart, label: "Simulator" },
      { href: "/lessons", icon: GraduationCap, label: "Lessons" },
      { href: "/portfolio", icon: Wallet, label: "Portfolio" },
      { href: "/pricing", icon: CreditCard, label: "Plans" },
    ],
    []
  );

  const isActivePath = (href: string) => location === href || location.startsWith(`${href}/`);

  return (
    <aside className="fixed hidden h-[100dvh] w-64 flex-col border-r border-border bg-background md:flex z-40">
      <div className="px-4 py-4 border-b border-border">
        <Link href="/">
          <a className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent transition">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="text-primary-foreground w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-base tracking-tight">TradeTutor</div>
              <div className="text-xs text-muted-foreground">Practice. Learn. Trade.</div>
            </div>
          </a>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = isActivePath(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-foreground" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        {isAuthenticated ? (
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        ) : (
          <Button
            className="w-full justify-start gap-2"
            onClick={() => (onRequestAuth ? onRequestAuth() : setShowAuthModal(true))}
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Button>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </aside>
  );
}

export function MobileNav() {
  const [location] = useLocation();
  const items = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
    { href: "/market", icon: Store, label: "Market" },
    { href: "/simulator", icon: CandlestickChart, label: "Sim" },
    { href: "/lessons", icon: GraduationCap, label: "Learn" },
    { href: "/portfolio", icon: Wallet, label: "Wallet" },
  ] as const;

  const isActivePath = (href: string) => location === href || location.startsWith(`${href}/`);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="pb-safe">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
          {items.map((item) => {
            const active = isActivePath(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-foreground" : "text-muted-foreground")} />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
