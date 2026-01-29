import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CandlestickChart, 
  GraduationCap, 
  Wallet, 
  LogOut,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/simulator", icon: CandlestickChart, label: "Simulator" },
    { href: "/lessons", icon: GraduationCap, label: "Lessons" },
    { href: "/portfolio", icon: Wallet, label: "Portfolio" },
  ];

  return (
    <aside className="w-64 fixed h-screen bg-card border-r border-border flex flex-col hidden md:flex z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">TradeTutor</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 flex justify-around items-center z-50 pb-safe">
      <Link href="/dashboard" className="p-3 text-muted-foreground hover:text-primary">
        <LayoutDashboard className="w-6 h-6" />
      </Link>
      <Link href="/simulator" className="p-3 text-muted-foreground hover:text-primary">
        <CandlestickChart className="w-6 h-6" />
      </Link>
      <Link href="/lessons" className="p-3 text-muted-foreground hover:text-primary">
        <GraduationCap className="w-6 h-6" />
      </Link>
      <Link href="/portfolio" className="p-3 text-muted-foreground hover:text-primary">
        <Wallet className="w-6 h-6" />
      </Link>
    </div>
  );
}
