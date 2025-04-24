
import { FadeIn } from "../info/FadeInAnimation";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowlutaDetailsAccordion } from "./FlowlutaDetailsAccordion";
import { Button } from "../ui/button";

const tierData = [
  {
    tier: "Tier 2",
    status: "Actief",
    period: "Maand 1 - Maand 3",
    cashflow: "€400/mnd"
  },
  {
    tier: "Tier 3",
    status: "Gepland",
    period: "Maand 4 - Maand 6",
    cashflow: "€800/mnd"
  },
  {
    tier: "Tier 4",
    status: "Gepland",
    period: "Maand 7 - Maand 9",
    cashflow: "€1200/mnd"
  }
];

export default function TierMobileCards() {
  if (tierData.length === 0) {
    return (
      <div className="md:hidden">
        <FadeIn delay={0.3}>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Nog geen flowlutas geactiveerd</h3>
            <p className="text-gray-600 mb-4">Begin vandaag nog met het opbouwen van je cashflow!</p>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {}}
            >
              Start nu
            </Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-6">
      {tierData.map((item, index) => (
        <FadeIn key={index} delay={0.3 + index * 0.1} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-l-4 border-indigo-500 p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{item.tier}</h3>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                item.status === "Actief" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-blue-100 text-blue-700"
              )}>
                {item.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{item.period}</span>
              </div>
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Maandelijkse cashflow</div>
                  <div className="h-8 bg-gray-100 rounded relative overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-indigo-500 transition-all duration-500"
                      style={{ 
                        width: `${(parseInt(item.cashflow.replace(/[^0-9]/g, '')) / 2000) * 100}%`
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-end px-2 font-mono text-sm">
                      {item.cashflow}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <FlowlutaDetailsAccordion
                  activatedAt="01/04/2024"
                  nextActivation={item.status === "Actief" ? "01/07/2024" : undefined}
                  cashPosition="€5.400"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
