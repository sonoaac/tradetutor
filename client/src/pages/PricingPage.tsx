import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    paypal?: any;
  }
}

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
    name: "Starter Monthly",
    description: "Perfect for beginners learning to trade",
    interval: "month",
    price: 9.99,
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
    id: "starter-yearly",
    baseId: "starter",
    name: "Starter Yearly",
    description: "Save 17% with annual billing",
    interval: "year",
    price: 99,
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
    id: "pro-monthly",
    baseId: "pro",
    name: "Pro Monthly",
    description: "For serious traders pushing their limits",
    interval: "month",
    price: 19.99,
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
  {
    id: "pro-yearly",
    baseId: "pro",
    name: "Pro Yearly",
    description: "Best value for committed traders",
    interval: "year",
    price: 199,
    icon: <TrendingUp className="h-6 w-6" />,
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
  const { toast } = useToast();
  const [paypalConfig, setPaypalConfig] = useState<any>(null);
  const [paypalReady, setPaypalReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"subscription" | "card">("subscription");

  const formatPrice = (plan: PricingPlan) => {
    const period = plan.interval === "month" ? "month" : "year";
    
    if (plan.interval === "year") {
      const monthlyEquivalent = (plan.price / 12).toFixed(2);
      return (
        <div>
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/{period}</span>
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

  useEffect(() => {
    const fetchPayPalConfig = async () => {
      try {
        const response = await fetch("/api/payment/paypal/config", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load PayPal config");
        }

        const data = await response.json();
        setPaypalConfig(data);
      } catch (error: any) {
        console.error("PayPal config error:", error);
        toast({
          title: "PayPal Error",
          description: "Unable to load PayPal configuration.",
          variant: "destructive",
        });
      }
    };

    fetchPayPalConfig();
  }, [toast]);

  useEffect(() => {
    const clientId = paypalConfig?.clientId;
    if (!clientId || paypalReady) {
      return;
    }

    if (window.paypal) {
      setPaypalReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=USD&components=buttons,card-fields`;
    script.async = true;
    script.onload = () => setPaypalReady(true);
    script.onerror = () => {
      toast({
        title: "PayPal Error",
        description: "Failed to load PayPal SDK.",
        variant: "destructive",
      });
    };

    document.body.appendChild(script);
  }, [paypalConfig, paypalReady, toast]);

  useEffect(() => {
    if (!paypalReady || !paypalConfig?.plans) {
      return;
    }

    plans.forEach((plan) => {
      const planId = paypalConfig?.plans?.[plan.baseId]?.[plan.interval];
      const containerId = `paypal-button-${plan.id}`;
      const container = document.getElementById(containerId);

      if (!container || !planId || !window.paypal) {
        return;
      }

      container.innerHTML = "";

      window.paypal.Buttons({
        style: { layout: "vertical", label: "subscribe" },
        createSubscription: (_data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: async (data: any) => {
          try {
            const response = await fetch("/api/payment/paypal/activate-subscription", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                subscriptionId: data.subscriptionID,
                plan: plan.baseId,
                interval: plan.interval
              }),
            });

            if (!response.ok) {
              throw new Error("Failed to activate subscription");
            }

            window.location.href = `/payment/success?provider=paypal&subscription_id=${data.subscriptionID}`;
          } catch (error: any) {
            console.error("PayPal approve error:", error);
            toast({
              title: "Payment Error",
              description: "Unable to activate subscription. Please contact support.",
              variant: "destructive",
            });
            window.location.href = "/payment/cancel";
          }
        },
        onError: (error: any) => {
          console.error("PayPal error:", error);
          toast({
            title: "PayPal Error",
            description: "There was an error with PayPal. Please try again.",
            variant: "destructive",
          });
        }
      }).render(`#${containerId}`);
    });
  }, [paypalReady, paypalConfig, toast]);

  // Render Card Fields for each plan
  useEffect(() => {
    if (!paypalReady || !window.paypal || paymentMethod !== "card") {
      return;
    }

    plans.forEach((plan) => {
      const containerId = `card-fields-${plan.id}`;
      const container = document.getElementById(containerId);

      if (!container || !window.paypal.CardFields) {
        return;
      }

      container.innerHTML = "";

      const cardFields = window.paypal.CardFields({
        createOrder: async () => {
          try {
            const response = await fetch("/api/payment/paypal/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                plan: plan.baseId,
                interval: plan.interval,
              }),
            });

            if (!response.ok) throw new Error("Failed to create order");

            const data = await response.json();
            return data.id;
          } catch (error: any) {
            console.error("Create order error:", error);
            toast({
              title: "Payment Error",
              description: "Unable to create payment order.",
              variant: "destructive",
            });
            throw error;
          }
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const response = await fetch(
              `/api/payment/paypal/orders/${data.orderID}/capture`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );

            if (!response.ok) throw new Error("Failed to capture payment");

            const result = await response.json();
            
            // Handle INSTRUMENT_DECLINED error
            const errorDetail = result?.details?.[0];
            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
              return actions.restart();
            }

            window.location.href = `/payment/success?provider=paypal&order_id=${data.orderID}`;
          } catch (error: any) {
            console.error("Capture error:", error);
            toast({
              title: "Payment Error",
              description: "Unable to process payment.",
              variant: "destructive",
            });
            window.location.href = "/payment/cancel";
          }
        },
        onError: (error: any) => {
          console.error("Card Fields error:", error);
          toast({
            title: "Payment Error",
            description: "There was an error processing your card. Please try again.",
            variant: "destructive",
          });
        },
        style: {
          input: {
            "font-size": "16px",
            "font-family": "system-ui, sans-serif",
            color: "#1a1a1a",
          },
          ".invalid": {
            color: "#ef4444",
          },
        },
      });

      if (cardFields.isEligible()) {
        const fieldsContainer = document.createElement("div");
        fieldsContainer.className = "space-y-4";

        // Card Name Field
        const nameContainer = document.createElement("div");
        nameContainer.className = "space-y-1";
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Cardholder Name";
        nameLabel.className = "text-sm font-medium";
        const nameField = document.createElement("div");
        nameField.id = `card-name-${plan.id}`;
        nameField.className = "border rounded-md p-2";
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameField);
        fieldsContainer.appendChild(nameContainer);

        // Card Number Field
        const numberContainer = document.createElement("div");
        numberContainer.className = "space-y-1";
        const numberLabel = document.createElement("label");
        numberLabel.textContent = "Card Number";
        numberLabel.className = "text-sm font-medium";
        const numberField = document.createElement("div");
        numberField.id = `card-number-${plan.id}`;
        numberField.className = "border rounded-md p-2";
        numberContainer.appendChild(numberLabel);
        numberContainer.appendChild(numberField);
        fieldsContainer.appendChild(numberContainer);

        // Expiry and CVV Row
        const expiryRow = document.createElement("div");
        expiryRow.className = "grid grid-cols-2 gap-3";

        // Expiry Field
        const expiryContainer = document.createElement("div");
        expiryContainer.className = "space-y-1";
        const expiryLabel = document.createElement("label");
        expiryLabel.textContent = "Expiration";
        expiryLabel.className = "text-sm font-medium";
        const expiryField = document.createElement("div");
        expiryField.id = `card-expiry-${plan.id}`;
        expiryField.className = "border rounded-md p-2";
        expiryContainer.appendChild(expiryLabel);
        expiryContainer.appendChild(expiryField);
        expiryRow.appendChild(expiryContainer);

        // CVV Field
        const cvvContainer = document.createElement("div");
        cvvContainer.className = "space-y-1";
        const cvvLabel = document.createElement("label");
        cvvLabel.textContent = "CVV";
        cvvLabel.className = "text-sm font-medium";
        const cvvField = document.createElement("div");
        cvvField.id = `card-cvv-${plan.id}`;
        cvvField.className = "border rounded-md p-2";
        cvvContainer.appendChild(cvvLabel);
        cvvContainer.appendChild(cvvField);
        expiryRow.appendChild(cvvContainer);

        fieldsContainer.appendChild(expiryRow);

        // Billing Address Fields
        const billingTitle = document.createElement("p");
        billingTitle.textContent = "Billing Address";
        billingTitle.className = "text-sm font-medium mt-4";
        fieldsContainer.appendChild(billingTitle);

        // Address Line 1
        const address1Input = document.createElement("input");
        address1Input.type = "text";
        address1Input.id = `billing-address-${plan.id}`;
        address1Input.placeholder = "Street Address";
        address1Input.className = "w-full border rounded-md p-2 text-sm";
        fieldsContainer.appendChild(address1Input);

        // City, State, Zip Row
        const cityRow = document.createElement("div");
        cityRow.className = "grid grid-cols-3 gap-2";

        const cityInput = document.createElement("input");
        cityInput.type = "text";
        cityInput.id = `billing-city-${plan.id}`;
        cityInput.placeholder = "City";
        cityInput.className = "border rounded-md p-2 text-sm";
        cityRow.appendChild(cityInput);

        const stateInput = document.createElement("input");
        stateInput.type = "text";
        stateInput.id = `billing-state-${plan.id}`;
        stateInput.placeholder = "State";
        stateInput.className = "border rounded-md p-2 text-sm";
        stateInput.maxLength = 2;
        cityRow.appendChild(stateInput);

        const zipInput = document.createElement("input");
        zipInput.type = "text";
        zipInput.id = `billing-zip-${plan.id}`;
        zipInput.placeholder = "ZIP";
        zipInput.className = "border rounded-md p-2 text-sm";
        cityRow.appendChild(zipInput);

        fieldsContainer.appendChild(cityRow);

        // Country Code
        const countryInput = document.createElement("input");
        countryInput.type = "text";
        countryInput.id = `billing-country-${plan.id}`;
        countryInput.placeholder = "Country Code (e.g., US)";
        countryInput.value = "US";
        countryInput.className = "w-full border rounded-md p-2 text-sm";
        countryInput.maxLength = 2;
        fieldsContainer.appendChild(countryInput);

        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.className =
          "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 py-2 rounded-md font-medium mt-4 transition-colors";
        submitButton.textContent = "Pay Now";
        submitButton.onclick = () => {
          const billingAddress = {
            addressLine1: (document.getElementById(`billing-address-${plan.id}`) as HTMLInputElement)?.value,
            adminArea2: (document.getElementById(`billing-city-${plan.id}`) as HTMLInputElement)?.value,
            adminArea1: (document.getElementById(`billing-state-${plan.id}`) as HTMLInputElement)?.value,
            postalCode: (document.getElementById(`billing-zip-${plan.id}`) as HTMLInputElement)?.value,
            countryCode: (document.getElementById(`billing-country-${plan.id}`) as HTMLInputElement)?.value,
          };

          cardFields.submit({ billingAddress }).catch((error: any) => {
            console.error("Submit error:", error);
            toast({
              title: "Payment Error",
              description: error.message || "Unable to submit payment.",
              variant: "destructive",
            });
          });
        };
        fieldsContainer.appendChild(submitButton);

        container.appendChild(fieldsContainer);

        // Render PayPal Card Fields
        cardFields.NameField({ placeholder: "John Doe" }).render(`#card-name-${plan.id}`);
        cardFields.NumberField({ placeholder: "Card number" }).render(`#card-number-${plan.id}`);
        cardFields.ExpiryField({ placeholder: "MM/YY" }).render(`#card-expiry-${plan.id}`);
        cardFields.CVVField({ placeholder: "123" }).render(`#card-cvv-${plan.id}`);
      } else {
        container.innerHTML = `<p class="text-sm text-muted-foreground">Card payments not available</p>`;
      }
    });
  }, [paypalReady, paymentMethod, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Trading Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start learning to trade with confidence
          </p>

          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setPaymentMethod("subscription")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  paymentMethod === "subscription"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PayPal Subscription
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  paymentMethod === "card"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Credit/Debit Card
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {paymentMethod === "subscription"
                ? "Automatic recurring billing through PayPal"
                : "One-time payment with any credit or debit card"}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm text-muted-foreground">
            Choose monthly or yearly to match your trading pace
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                {paymentMethod === "subscription" ? (
                  paypalConfig?.plans?.[plan.baseId]?.[plan.interval] ? (
                    <div id={`paypal-button-${plan.id}`} className="w-full" />
                  ) : (
                    <Button className="w-full" size="lg" variant="outline" disabled>
                      PayPal not configured
                    </Button>
                  )
                ) : (
                  <div id={`card-fields-${plan.id}`} className="w-full" />
                )}
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
