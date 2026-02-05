import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LayoutDashboard, CandlestickChart, GraduationCap, Wallet, TrendingUp, Store, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/AuthModal";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/market", icon: Store, label: "Market" },
    { href: "/simulator", icon: CandlestickChart, label: "Simulator" },
    { href: "/lessons", icon: GraduationCap, label: "Lessons" },
    { href: "/portfolio", icon: Wallet, label: "Portfolio" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu - Only visible on mobile */}
      <div className="md:hidden fixed top-0 right-0 z-50 p-3 sm:p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 sm:p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="md:hidden fixed top-0 right-0 h-screen w-64 bg-white border-l-2 border-gray-200 z-40 flex flex-col shadow-xl animate-in slide-in-from-right">
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center gap-3 border-b-2 border-gray-200">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-black">TradeTutor</span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 sm:px-4 space-y-1 sm:space-y-2 mt-4 sm:mt-6">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 group font-medium text-sm sm:text-base",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", isActive ? "text-white" : "text-gray-600 group-hover:text-black")} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Login Button */}
            <div className="p-3 sm:p-4 border-t-2 border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 w-full rounded-lg sm:rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base shadow-lg shadow-blue-600/30"
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Log In</span>
              </button>
            </div>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </>
      )}
    </>
  );
}
