import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <XCircle className="h-10 w-10 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-2xl">Payment Canceled</CardTitle>
          <CardDescription>
            Your payment was not completed
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              No charges were made to your account. You can try again whenever you're ready,
              or continue using Trade Tutor with the free plan.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => setLocation("/pricing")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pricing
            </Button>
            
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setLocation("/dashboard")}
            >
              Continue with Free Plan
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need help? <a href="mailto:support@tradetutor.com" className="text-primary hover:underline">Contact support</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
