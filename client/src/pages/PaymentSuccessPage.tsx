import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Optional: Track successful conversion
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    
    if (sessionId) {
      console.log("Payment successful, session:", sessionId);
      // Could send analytics event here
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Welcome to Trade Tutor Premium
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Your subscription is now active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Full access to all features unlocked</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Confirmation email sent to your inbox</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => setLocation("/dashboard")}
            >
              Go to Dashboard
            </Button>
            
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setLocation("/lessons")}
            >
              Start Learning
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can manage your subscription anytime from your account settings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
