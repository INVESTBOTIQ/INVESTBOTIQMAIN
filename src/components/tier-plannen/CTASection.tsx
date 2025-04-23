
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Klaar voor jouw cashflowgroei?
        </h2>
        
        <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
          <Link to="/auth">🟢 Start nu met Investbotiq</Link>
        </Button>
      </div>
    </section>
  );
}
