import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import SecurityHero from "@/components/veiligheid/SecurityHero";
import SecurityFeatures from "@/components/veiligheid/SecurityFeatures";
import NoExternalAccess from "@/components/veiligheid/NoExternalAccess";
import SecurityTimeline from "@/components/veiligheid/SecurityTimeline";
import FutureUpdates from "@/components/veiligheid/FutureUpdates";
import SecurityCTA from "@/components/veiligheid/SecurityCTA";
export default function Veiligheid() {
  return <InfoPageLayout title="" showGradientBackground>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <SecurityHero />
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {/* Security Features Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Slimme beveiliging</h2>
          <SecurityFeatures />
        </div>
      </section>
      
      {/* No external access section */}
      <section className="py-16 px-4 bg-[#1A1F2C] text-white">
        <div className="container mx-auto max-w-4xl">
          <NoExternalAccess />
        </div>
      </section>
      
      {/* Security Measures Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Beveiligingsmaatregelen – Visueel overzicht
          </h2>
          <SecurityTimeline />
        </div>
      </section>
      
      {/* Future Updates */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Toekomstige updates
          </h2>
          <FutureUpdates />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <SecurityCTA />
        </div>
      </section>
    </InfoPageLayout>;
}