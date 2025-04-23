import React, { useState } from "react";
import { FadeIn } from "../info/FadeInAnimation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TierProgressChart from "./TierProgressChart";

export default function TierTableSection() {
  const [selectedTier, setSelectedTier] = useState<string>("inbotiq2");

  return (
    <section className="py-16 px-4 bg-white/80">
      <div className="container mx-auto max-w-6xl">
        <FadeIn delay={0.2}>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            TIER OVERZICHT
          </h2>
        </FadeIn>

        {/* Tier Selection Dropdown */}
        <FadeIn delay={0.3}>
          <div className="mb-10 max-w-xs mx-auto">
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-full bg-white border-indigo-200 hover:border-indigo-300 transition-colors">
                <SelectValue placeholder="Selecteer een Tier Plan" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-indigo-100 shadow-lg">
                <SelectItem value="inbotiq1" className="hover:bg-indigo-50 cursor-pointer">
                  InBotIQ1 Tier 1
                </SelectItem>
                <SelectItem value="inbotiq2" className="hover:bg-indigo-50 cursor-pointer">
                  InBotIQ2 Tier 2-6
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FadeIn>
        
        {selectedTier === "inbotiq2" && (
          <>
            <FadeIn delay={0.4} className="mb-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-indigo-600">📊 Jouw Groei via het Tier Plan</h3>
                <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
                  Dit overzicht toont hoe je kaspositie, leningen en investeringen in flowlutas zich ontwikkelen van maand tot maand.
                </p>
                <TierProgressChart />
              </div>
            </FadeIn>

            {/* Desktop Table */}
            <FadeIn delay={0.5} className="hidden md:block overflow-hidden rounded-lg shadow-md mb-10">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-indigo-50 border-b border-indigo-100">
                    <th className="py-4 px-6 text-left">Tier</th>
                    <th className="py-4 px-6 text-left">Periode</th>
                    <th className="py-4 px-6 text-left">Flowlutas Actief</th>
                    <th className="py-4 px-6 text-left">Maandelijkse Cashflow</th>
                    <th className="py-4 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Tier 2 */}
                  <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 font-medium">Tier 2</td>
                    <td className="py-4 px-6">0 – 3 maanden</td>
                    <td className="py-4 px-6">1</td>
                    <td className="py-4 px-6 font-semibold">€400</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                  </tr>
                  
                  {/* Tier 3 */}
                  <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 font-medium">Tier 3</td>
                    <td className="py-4 px-6">3 – 6 maanden</td>
                    <td className="py-4 px-6">2</td>
                    <td className="py-4 px-6 font-semibold">€800</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                  </tr>
                  
                  {/* Tier 4 */}
                  <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 font-medium">Tier 4</td>
                    <td className="py-4 px-6">6 – 9 maanden</td>
                    <td className="py-4 px-6">3</td>
                    <td className="py-4 px-6 font-semibold">€1.200</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                  </tr>
                  
                  {/* Tier 5 */}
                  <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 font-medium">Tier 5</td>
                    <td className="py-4 px-6">9 – 12 maanden</td>
                    <td className="py-4 px-6">5</td>
                    <td className="py-4 px-6 font-semibold">€2.000</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                  </tr>
                  
                  {/* Tier 6 */}
                  <tr className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 font-medium">Tier 6</td>
                    <td className="py-4 px-6">12 – 15 maanden</td>
                    <td className="py-4 px-6">5</td>
                    <td className="py-4 px-6 font-semibold">€2.000</td>
                    <td className="py-4 px-6"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Finishing Tier Plan</span></td>
                  </tr>
                </tbody>
              </table>
            </FadeIn>
            
            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {[
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
              ].map((item, index) => (
                <FadeIn key={index} delay={0.3 + index * 0.1} className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{item.tier}</h3>
                    <span className={`px-2 py-1 ${item.status === "Actief" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"} rounded-full text-xs`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Periode:</span>
                      <span className="font-medium">{item.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flowlutas:</span>
                      <span className="font-medium">{item.flowlutas}</span>
                    </div>
                    <div className="flex justify-between text-lg mt-4">
                      <span className="text-gray-800">Cashflow:</span>
                      <span className="font-bold text-indigo-600">{item.cashflow}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
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
