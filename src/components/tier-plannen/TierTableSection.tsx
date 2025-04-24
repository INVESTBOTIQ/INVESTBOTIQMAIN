
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
          <FadeIn delay={0.2}>
            <TierInfo />
            <div className="mb-10">
              <TierGrowthVisualizer className="mb-8 md:block" />
            </div>
            <TierTable />
            <TierMobileCards />
          </FadeIn>
        )}

        {selectedTier === "inbotiq1" && (
          <FadeIn delay={0.2}>
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                InBotIQ1 Tier 1 - Binnenkort Beschikbaar
              </h3>
              <p className="text-gray-600">
                We werken hard aan de ontwikkeling van InBotIQ1. 
                Blijf op de hoogte voor updates over de lancering!
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
