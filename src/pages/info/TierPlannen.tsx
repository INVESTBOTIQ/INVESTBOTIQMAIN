
import React, { useEffect } from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import TierExplanationSection from "@/components/tier-plannen/TierExplanationSection";
import TierTableSection from "@/components/tier-plannen/TierTableSection";
import WhyItWorksSection from "@/components/tier-plannen/WhyItWorksSection";
import FAQSection from "@/components/tier-plannen/FAQSection";
import CTASection from "@/components/tier-plannen/CTASection";

export default function TierPlannen() {
  // Force scroll to top and ensure charts render properly
  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Force charts to re-render after a delay
    const timer1 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    
    // Additional resize event to ensure charts render properly
    const timer2 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  return (
    <InfoPageLayout
      title="Het Tier Plan – Jouw route naar structurele cashflow"
      subtitle="Stap voor stap naar financiële autonomie, zonder verrassingen."
    >
      <TierExplanationSection />
      <TierTableSection />
      <WhyItWorksSection />
      <FAQSection />
      <CTASection />
    </InfoPageLayout>
  );
}
