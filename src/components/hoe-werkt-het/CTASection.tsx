
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 px-4 bg-indigo-50">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Klaar om je eigen groeitraject te starten?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
            <Link to="/tier-plannen">🔵 Bekijk jouw route</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="text-lg py-6 px-8 font-semibold border-indigo-300">
            <Link to="/member/dashboard">⚪ Ga naar Member Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
