import { useState } from "react";
import { Link } from "wouter";
import { AuthModal } from "@/components/AuthModal";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-display font-semibold">TradeTutor</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn trading basics with guided lessons and simulated practice.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">Quick Links</div>
            <div className="mt-2 grid gap-2 text-sm">
              <Link href="/lessons">
                <a className="text-muted-foreground hover:text-foreground">Lessons</a>
              </Link>
              <Link href="/market">
                <a className="text-muted-foreground hover:text-foreground">Markets</a>
              </Link>
              <Link href="/pricing">
                <a className="text-muted-foreground hover:text-foreground">Plans</a>
              </Link>
              <button
                type="button"
                className="text-left text-muted-foreground hover:text-foreground"
                onClick={() => setShowAuthModal(true)}
              >
                Log in / Create account
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Legal</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Educational use only. Not financial, investment, tax, or legal advice. Trading involves risk and can
              result in loss. Any performance examples are hypothetical and for demonstration only.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {year} TradeTutor. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">
            Simulated trading uses virtual currency (“SimCash”).
          </p>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </footer>
  );
}
