import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export default function FAQSection() {
  return <section className="py-16 px-4 bg-indigo-50">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Veelgestelde vragen
        </h2>
        
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 text-left">Wat als ik tussendoor wil stoppen?</AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              Je kunt op elk moment stoppen. De IQ Bot zorgt voor een gecontroleerde afbouw van lopende processen en sluit eventuele openstaande verplichtingen af. Neem contact op met support voor persoonlijke begeleiding bij dit proces.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-6">Wat is een spirit?</AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              Een spirit is de cashflow-motor van je investering. Elke spirit genereert ongeveer €400 per maand aan passief inkomen. De IQ Bot activeert nieuwe spirits volgens het Tier Plan om je maandelijkse cashflow geleidelijk op te bouwen.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="px-6">Wanneer stopt mijn lening?</AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              In Tier 6, na ongeveer 12-15 maanden, zijn er geen nieuwe leningen meer nodig. Je systeem is dan volledig schuldvrij en blijft een stabiele cashflow genereren van ongeveer €2.000 per maand.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>;
}