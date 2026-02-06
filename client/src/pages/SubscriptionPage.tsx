import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  Settings, 
  Loader2,
  Crown,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Subscription {
  id: number;
  userId: string;
  provider: string;
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
}

export default function SubscriptionPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/payment/subscription", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const data = await response.json();
      setSubscription(data.subscription || data);
    } catch (error: any) {
      console.error("Error fetching subscription:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    
    try {
      if (subscription?.provider === "paypal") {
        window.open("https://www.paypal.com/myaccount/autopay", "_blank");
        setPortalLoading(false);
        return;
      }

      const response = await fetch("/api/payment/create-portal-session", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error("Portal error:", error);
      toast({
        title: "Error",
        description: "Failed to open billing portal",
        variant: "destructive",
      });
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    
    try {
      const endpoint = subscription?.provider === "paypal"
        ? "/api/payment/paypal/cancel-subscription"
        : "/api/payment/cancel-subscription";

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      const data = await response.json();
      
      toast({
        title: "Subscription Canceled",
        description: data.message,
      });

      // Refresh subscription data
      await fetchSubscription();
    } catch (error: any) {
      console.error("Cancel error:", error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setCancelLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlanName = (plan: string) => {
    const names: Record<string, string> = {
      starter: "Starter Plan",
      pro: "Pro Trader Plan",
    };
    return names[plan] || plan;
  };

  const getStatusBadge = (status: string, cancelAtPeriodEnd: boolean) => {
    if (cancelAtPeriodEnd) {
      return <Badge variant="destructive">Canceling</Badge>;
    }
    
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "trialing":
        return <Badge variant="secondary">Trial</Badge>;
      case "past_due":
        return <Badge variant="destructive">Past Due</Badge>;
      case "canceled":
        return <Badge variant="outline">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="ghost"
            onClick={() => setLocation("/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>No Active Subscription</CardTitle>
              <CardDescription>
                You're currently using the free plan
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Upgrade to unlock premium features, real-time coaching, and advanced trading tools.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation("/pricing")}
              >
                View Plans
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => setLocation("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{getPlanName(subscription.plan)}</CardTitle>
                    <CardDescription>
                      {subscription.provider === "stripe" ? "Stripe" : "PayPal"} Subscription
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(subscription.status, subscription.cancelAtPeriodEnd)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Current Period</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        Subscription Ending
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your subscription will end on {formatDate(subscription.currentPeriodEnd)}.
                        You can reactivate it anytime before then.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Plan Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {subscription.plan === "pro" ? (
                    <>
                      <li>✓ Real-Time Tutor (RTT) mode</li>
                      <li>✓ Advanced market analysis</li>
                      <li>✓ Real-time coaching</li>
                      <li>✓ Priority support</li>
                      <li>✓ All lessons and features</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Full trading simulator</li>
                      <li>✓ 10 structured lessons</li>
                      <li>✓ Portfolio tracking</li>
                      <li>✓ Market data access</li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={handleManageBilling}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    {subscription.provider === "paypal"
                      ? "Manage in PayPal"
                      : "Manage Billing & Payment Method"}
                  </>
                )}
              </Button>

              {!subscription.cancelAtPeriodEnd && subscription.status === "active" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="w-full text-muted-foreground">
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your subscription will remain active until {formatDate(subscription.currentPeriodEnd)}.
                        After that, you'll be downgraded to the free plan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        disabled={cancelLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {cancelLoading ? "Canceling..." : "Cancel Subscription"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardFooter>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>
                  {subscription.provider === "paypal"
                    ? "Manage your PayPal subscription in your PayPal account"
                    : "Manage your payment methods and billing details through the billing portal"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
