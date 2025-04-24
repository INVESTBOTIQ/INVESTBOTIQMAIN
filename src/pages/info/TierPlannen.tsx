
import React, { useEffect } from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import TierExplanationSection from "@/components/tier-plannen/TierExplanationSection";
import TierTableSection from "@/components/tier-plannen/TierTableSection";
import WhyItWorksSection from "@/components/tier-plannen/WhyItWorksSection";
import FAQSection from "@/components/tier-plannen/FAQSection";
import CTASection from "@/components/tier-plannen/CTASection";

export default function TierPlannen() {
  // Force scroll to top when component mounts to ensure charts are in viewport
  useEffect(() => {
    window.scrollTo(0, 0);
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
