import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <div className="bg-card p-12 rounded-2xl border border-border shadow-2xl text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold font-display mb-2">404</h1>
        <p className="text-xl font-medium mb-6">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all w-full">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
