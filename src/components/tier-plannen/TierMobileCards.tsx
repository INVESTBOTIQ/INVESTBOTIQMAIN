
import { FadeIn } from "../info/FadeInAnimation";
import { CalendarDays, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tierData = [
  {
    tier: "Tier 2",
    period: "0 – 3 maanden",
    flowlutas: 1,
    cashflow: "€400",
    status: "Actief"
  },
  {
    tier: "Tier 3",
    period: "3 – 6 maanden",
    flowlutas: 2,
    cashflow: "€800",
    status: "Actief"
  },
  {
    tier: "Tier 4",
    period: "6 – 9 maanden",
    flowlutas: 3,
    cashflow: "€1.200",
    status: "Actief"
  },
  {
    tier: "Tier 5",
    period: "9 – 12 maanden",
    flowlutas: 5,
    cashflow: "€2.000",
    status: "Actief"
  },
  {
    tier: "Tier 6",
    period: "12 – 15 maanden",
    flowlutas: 5,
    cashflow: "€2.000",
    status: "Finishing Tier Plan"
  }
];

export default function TierMobileCards() {
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

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600">
                  {item.flowlutas} {item.flowlutas === 1 ? 'Flowluta' : 'Flowlutas'}
                </span>
                <button 
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center gap-1"
                  onClick={() => {}}
                >
                  Details
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
