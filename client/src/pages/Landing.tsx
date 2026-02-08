import { ProfessionalNavigation } from "@/components/ProfessionalNavigation";
import { ProfessionalHeroSection } from "@/components/ProfessionalHeroSection";
import { ProfessionalFeaturesSection } from "@/components/ProfessionalFeaturesSection";
import { ProfessionalMarketsSection } from "@/components/ProfessionalMarketsSection";
import { ProfessionalLessonsSection } from "@/components/ProfessionalLessonsSection";
import { ProfessionalStatsSection } from "@/components/ProfessionalStatsSection";
import { ProfessionalPricingSection } from "@/components/ProfessionalPricingSection";
import { ProfessionalCTASection } from "@/components/ProfessionalCTASection";
import { ProfessionalFooter } from "@/components/ProfessionalFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <ProfessionalNavigation />
      <ProfessionalHeroSection />
      <ProfessionalFeaturesSection />
      <ProfessionalMarketsSection />
      <ProfessionalLessonsSection />
      <ProfessionalStatsSection />
      <ProfessionalPricingSection />
      <ProfessionalCTASection />
      <ProfessionalFooter />
    </div>
  );
}
