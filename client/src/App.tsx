import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import SimulatorPage from "@/pages/SimulatorPage";
import MarketPage from "@/pages/MarketPage";
import LessonsPage from "@/pages/LessonsPage";
import LessonDetailPage from "@/pages/LessonDetailPage";
import Portfolio from "@/pages/Portfolio";
import PricingPage from "@/pages/PricingPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import PaymentCancelPage from "@/pages/PaymentCancelPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import { AppShell } from "@/components/layout/AppShell";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />

      <Route path="/dashboard">
        {() => (
          <AppShell>
            <Dashboard />
          </AppShell>
        )}
      </Route>
      <Route path="/simulator">
        {() => (
          <AppShell>
            <SimulatorPage />
          </AppShell>
        )}
      </Route>
      <Route path="/market">
        {() => (
          <AppShell>
            <MarketPage />
          </AppShell>
        )}
      </Route>
      <Route path="/lessons">
        {() => (
          <AppShell>
            <LessonsPage />
          </AppShell>
        )}
      </Route>
      <Route path="/lessons/:id">
        {() => (
          <AppShell>
            <LessonDetailPage />
          </AppShell>
        )}
      </Route>
      <Route path="/portfolio">
        {() => (
          <AppShell>
            <Portfolio />
          </AppShell>
        )}
      </Route>
      <Route path="/pricing">
        {() => (
          <AppShell>
            <PricingPage />
          </AppShell>
        )}
      </Route>
      <Route path="/subscription">
        {() => (
          <AppShell>
            <SubscriptionPage />
          </AppShell>
        )}
      </Route>
      <Route path="/payment/success">
        {() => (
          <AppShell>
            <PaymentSuccessPage />
          </AppShell>
        )}
      </Route>
      <Route path="/payment/cancel">
        {() => (
          <AppShell>
            <PaymentCancelPage />
          </AppShell>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
