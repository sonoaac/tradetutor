import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PlanInterval = "month" | "year";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for beginners learning to trade",
    monthlyPrice: 9.99,
    yearlyPrice: 99,
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Full access to trading simulator",
      "10 structured lessons",
      "Basic market data",
      "Portfolio tracking",
      "Mobile app access",
    ],
  },
  {
    id: "pro",
    name: "Pro Trader",
    description: "For serious traders pushing their limits",
    monthlyPrice: 19.99,
    yearlyPrice: 199,
    icon: <TrendingUp className="h-6 w-6" />,
    popular: true,
    features: [
      "Everything in Starter",
      "Real-Time Tutor (RTT) mode",
      "Advanced market analysis",
      "Real-time coaching",
      "Priority support",
      "Exclusive trading strategies",
      "Performance analytics",
    ],
  },
];

export default function PricingPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [interval, setInterval] = useState<PlanInterval>("month");
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    
    try {
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          plan: planId,
          interval: interval,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  const formatPrice = (plan: PricingPlan) => {
    const price = interval === "month" ? plan.monthlyPrice : plan.yearlyPrice;
    const period = interval === "month" ? "month" : "year";
    
    if (interval === "year") {
      const monthlyEquivalent = (price / 12).toFixed(2);
      return (
        <div>
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{period}</span>
          <div className="text-sm text-muted-foreground mt-1">
            (${monthlyEquivalent}/month)
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Trading Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start learning to trade with confidence
          </p>

          {/* Interval Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-secondary rounded-lg">
            <Button
              variant={interval === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInterval("month")}
            >
              Monthly
            </Button>
            <Button
              variant={interval === "year" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInterval("year")}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
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
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loading !== null}
                >
                  {loading === plan.id ? "Loading..." : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            All plans include a 7-day money-back guarantee
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Need help choosing?{" "}
            <a href="mailto:support@tradetutor.com" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
