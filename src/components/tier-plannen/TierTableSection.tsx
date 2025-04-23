
import React, { useState } from "react";
import TierDescription from "./TierDescription";
import TierSelector from "./TierSelector";
import TierInfo from "./TierInfo";
import TierTable from "./TierTable";
import TierMobileCards from "./TierMobileCards";
import TierGrowthVisualizer from "./TierGrowthVisualizer";
import { FadeIn } from "../info/FadeInAnimation";

export default function TierTableSection() {
  const [selectedTier, setSelectedTier] = useState<string>("inbotiq2");

  return (
    <section className="py-16 px-4 bg-white/80">
      <div className="container mx-auto max-w-6xl">
        <TierDescription />
        <TierSelector 
          selectedTier={selectedTier} 
          onTierChange={setSelectedTier} 
        />
        
        {selectedTier === "inbotiq2" && (
          <>
            <TierInfo />
            <div className="mb-10">
              <TierGrowthVisualizer className="mb-8 hidden md:block" />
            </div>
            <TierTable />
            <TierMobileCards />
          </>
        )}

        {selectedTier === "inbotiq1" && (
          <FadeIn delay={0.4}>
            <div className="text-center text-gray-600 py-8">
              Informatie over InBotIQ1 Tier 1 komt binnenkort beschikbaar.
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
