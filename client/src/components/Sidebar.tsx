import { Link, useLocation } from "wouter";
import { useState } from "react";
import { 
  LayoutDashboard, 
  CandlestickChart, 
  GraduationCap, 
  Wallet, 
  LogOut,
  TrendingUp,
  Store,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/AuthModal";

export function Sidebar() {
  const [location] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/market", icon: Store, label: "Market" },
    { href: "/simulator", icon: CandlestickChart, label: "Simulator" },
    { href: "/lessons", icon: GraduationCap, label: "Lessons" },
    { href: "/portfolio", icon: Wallet, label: "Portfolio" },
  ];

  return (
    <aside className="w-64 fixed h-screen bg-white border-r-2 border-gray-200 flex flex-col hidden md:flex z-40 shadow-sm">
      <div className="p-6 flex items-center gap-3 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-black">TradeTutor</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group font-medium",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-600 group-hover:text-black")} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <button 
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30"
        >
          <LogIn className="w-5 h-5" />
          <span>Log In</span>
        </button>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-3 flex justify-around items-center z-30 pb-safe shadow-lg">
      <Link href="/dashboard" className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
        <LayoutDashboard className="w-6 h-6" />
      </Link>
      <Link href="/market" className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
        <Store className="w-6 h-6" />
      </Link>
      <Link href="/simulator" className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
        <CandlestickChart className="w-6 h-6" />
      </Link>
      <Link href="/lessons" className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
        <GraduationCap className="w-6 h-6" />
      </Link>
      <Link href="/portfolio" className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
        <Wallet className="w-6 h-6" />
      </Link>
    </div>
  );
}
