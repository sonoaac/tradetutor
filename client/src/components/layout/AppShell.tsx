import { ReactNode, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { LogOut, LogIn, TrendingUp, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { SiteFooter } from "@/components/SiteFooter";

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const avatarLetter = useMemo(() => {
    const fromFirst = user?.firstName?.trim()?.[0];
    const fromEmail = user?.email?.trim()?.[0];
    return (fromFirst || fromEmail || "U").toUpperCase();
  }, [user?.email, user?.firstName]);

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
      <Sidebar />

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

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  const next = theme === "dark" ? "light" : "dark";
                  setTheme(next);
                  if (next === "dark") document.documentElement.classList.add("dark");
                  else document.documentElement.classList.remove("dark");
                  try {
                    localStorage.setItem("theme", next);
                  } catch {
                    // ignore
                  }
                }}
                title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label="User menu"
                        title={user?.email || "User"}
                      >
                        {avatarLetter}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                        disabled={isLoggingOut}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link href={`/auth?mode=login&next=${encodeURIComponent(location)}`}>
                  <a className="inline-flex">
                    <Button variant="default" size="sm" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      <span className="hidden sm:inline">Sign in</span>
                    </Button>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 pb-24 md:pb-10">
          {children}
        </main>

        <SiteFooter />
      </div>

      <MobileNav />
    </div>
  );
}
