import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'wouter';

export function ProfessionalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      
      {/* Animated Shapes */}
      <div className="absolute top-0 left-1/4 size-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
          <Sparkles className="size-4" />
          <span>Join thousands of successful traders</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Trading?
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Begin your journey to becoming a confident trader with risk-free practice and AI-powered guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/market">
            <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-gray-100 group">
              Start Free Now
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/auth">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-white text-white hover:bg-white/10"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <p className="text-white/80 mt-6 text-sm">
          No credit card required • Start trading in minutes
        </p>
      </div>
    </section>
  );
}
