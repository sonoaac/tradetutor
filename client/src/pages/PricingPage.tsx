import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { apiUrl } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";

type PlanInterval = "month" | "year";

interface PricingPlan {
  id: string;
  baseId: "starter" | "pro";
  name: string;
  description: string;
  interval: PlanInterval;
  price: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "starter-monthly",
    baseId: "starter",
    name: "Starter (Trader Mode)",
    description: "Place trades, unlock your portfolio, and track performance",
    interval: "month",
    price: 9.99,
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Trading simulator (Buy/Sell)",
      "Portfolio tracking (P&L, positions)",
      "Up to 10 lessons",
      "Basic market data",
      "Community updates",
    ],
  },
  {
    id: "starter-yearly",
    baseId: "starter",
    name: "Starter (Trader Mode)",
    description: "2 months free with annual billing",
    interval: "year",
    price: 99,
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Trading simulator (Buy/Sell)",
      "Portfolio tracking (P&L, positions)",
      "Up to 10 lessons",
      "Basic market data",
      "Community updates",
    ],
  },
  {
    id: "pro-monthly",
    baseId: "pro",
    name: "Pro (Mentored Trader)",
    description: "RTT Coach + advanced insights while you trade",
    interval: "month",
    price: 19.99,
    icon: <TrendingUp className="h-6 w-6" />,
    popular: true,
    features: [
      "Everything in Starter",
      "RTT Coach (real-time feedback)",
      "Advanced market analysis",
      "Performance analytics",
      "Priority support",
    ],
  },
  {
    id: "pro-yearly",
    baseId: "pro",
    name: "Pro (Mentored Trader)",
    description: "Best value with annual billing",
    interval: "year",
    price: 199,
    icon: <TrendingUp className="h-6 w-6" />,
    features: [
      "Everything in Starter",
      "RTT Coach (real-time feedback)",
      "Advanced market analysis",
      "Performance analytics",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [billingInterval, setBillingInterval] = useState<PlanInterval>("month");
  const [checkoutLoadingPlanId, setCheckoutLoadingPlanId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const formatPrice = (plan: PricingPlan) => {
    const period = plan.interval === "month" ? "month" : "year";
    
    if (plan.interval === "year") {
      const monthlyEquivalent = (plan.price / 12).toFixed(2);
      return (
        <div>
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/{period}</span>
          {plan.baseId === "starter" && (
            <div className="text-sm text-primary mt-1 font-medium">
              2 months free
            </div>
          )}
          <div className="text-sm text-muted-foreground mt-1">
            (${monthlyEquivalent}/month)
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
    );
  };

  const visiblePlans = useMemo(
    () => plans.filter((plan) => plan.interval === billingInterval),
    [billingInterval]
  );

  const handleCheckout = async (plan: PricingPlan) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to continue.",
        variant: "destructive",
      });
      setShowAuthModal(true);
      return;
    }

    setCheckoutLoadingPlanId(plan.id);

    try {
      const response = await fetch(apiUrl("/api/payment/create-checkout-session"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          plan: plan.baseId,
          interval: plan.interval,
        }),
      });

      if (response.status === 401) {
        toast({
          title: "Sign in required",
          description: "Please sign in to continue.",
          variant: "destructive",
        });
        setShowAuthModal(true);
        return;
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to start checkout");
      }

      if (!data?.url) {
        throw new Error("Missing checkout URL");
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Error",
        description: error?.message || "Unable to start checkout.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoadingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start in Learn Mode. Upgrade when you're ready to trade.
          </p>

          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setBillingInterval("month")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingInterval === "month"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval("year")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingInterval === "year"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {billingInterval === "year" ? "Save with annual billing" : "Flexible month-to-month"}
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Free (Learn Mode)</CardTitle>
              <CardDescription>Preview the platform and learn the basics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>

              <div className="space-y-3">
                {[
                  "Access the first 2 lessons",
                  "Market exploration and watchlists",
                  "RTT Coach preview (locked)",
                  "Trading and portfolio tracking locked",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/auth">
                <a className="w-full inline-flex items-center justify-center rounded-md border border-border bg-background min-h-10 px-8 text-sm font-medium hover:bg-secondary/40 transition-colors">
                  Create free account
                </a>
              </Link>
            </CardFooter>
          </Card>

          {visiblePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <Badge
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  variant="default"
                >
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>{formatPrice(plan)}</div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleCheckout(plan)}
                  disabled={checkoutLoadingPlanId !== null}
                >
                  {checkoutLoadingPlanId === plan.id ? "Redirecting..." : "Continue to checkout"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Secure checkout. Cancel anytime.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Need help choosing?{" "}
            <a href="mailto:support@tradetutor.com" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
