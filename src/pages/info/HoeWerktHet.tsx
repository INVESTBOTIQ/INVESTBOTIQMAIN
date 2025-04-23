
import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import StepsSection from "@/components/hoe-werkt-het/StepsSection";
import TimelineSection from "@/components/hoe-werkt-het/TimelineSection";
import BenefitsSection from "@/components/hoe-werkt-het/BenefitsSection";
import CTASection from "@/components/hoe-werkt-het/CTASection";

export default function HoeWerktHet() {
  return (
    <InfoPageLayout
      title="Hoe werkt InvestbotIQ?"
      subtitle="Eenvoudig, transparant en volledig geautomatiseerd."
    >
      <StepsSection />
      <TimelineSection />
      <BenefitsSection />
      <CTASection />
    </InfoPageLayout>
  );
}
