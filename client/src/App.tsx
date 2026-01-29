import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Simulator from "@/pages/Simulator";
import Lessons from "@/pages/Lessons";
import LessonDetail from "@/pages/LessonDetail";
import Portfolio from "@/pages/Portfolio";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Component {...rest} />;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Landing />}
      </Route>
      
      {/* Protected Routes */}
      <Route path="/dashboard">
        {() => isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
      </Route>
      <Route path="/simulator">
        {() => isAuthenticated ? <Simulator /> : <Redirect to="/" />}
      </Route>
      <Route path="/lessons">
        {() => isAuthenticated ? <Lessons /> : <Redirect to="/" />}
      </Route>
      <Route path="/lessons/:slug">
        {() => isAuthenticated ? <LessonDetail /> : <Redirect to="/" />}
      </Route>
      <Route path="/portfolio">
        {() => isAuthenticated ? <Portfolio /> : <Redirect to="/" />}
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
