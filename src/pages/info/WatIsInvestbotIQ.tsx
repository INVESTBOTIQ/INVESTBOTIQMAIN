
import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import IntroductionSection from "@/components/wat-is-investbot/IntroductionSection";
import FeaturesSection from "@/components/wat-is-investbot/FeaturesSection";
import QuoteSection from "@/components/wat-is-investbot/QuoteSection";
import CTASection from "@/components/tier-plannen/CTASection";

export default function WatIsInvestbotIQ() {
  return (
    <InfoPageLayout
      title="Wat is InvestbotIQ?"
      subtitle="Slimme AI. Automatische cashflow. Geen zorgen."
    >
      <IntroductionSection />
      <FeaturesSection />
      <QuoteSection />
      <CTASection />
    </InfoPageLayout>
  );
}
