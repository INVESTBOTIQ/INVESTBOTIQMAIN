import React from "react";

export default function TierTableSection() {
  return (
    <section className="py-16 px-4 bg-white/80">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          TIER OVERZICHT
        </h2>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-lg shadow-md mb-10">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-indigo-50 border-b border-indigo-100">
                <th className="py-4 px-6 text-left">Tier</th>
                <th className="py-4 px-6 text-left">Periode</th>
                <th className="py-4 px-6 text-left">Acties</th>
                <th className="py-4 px-6 text-left">Maandelijkse Leningen</th>
                <th className="py-4 px-6 text-left">Spirits Actief</th>
                <th className="py-4 px-6 text-left">Maandelijkse Cashflow</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Tier 2 */}
              <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td className="py-4 px-6 font-medium">Tier 2</td>
                <td className="py-4 px-6">0 – 3 maanden</td>
                <td className="py-4 px-6">4 BV's oprichten, eerste spirit activeren</td>
                <td className="py-4 px-6">€2.100 (BEL + PLAT)</td>
                <td className="py-4 px-6">1</td>
                <td className="py-4 px-6 font-semibold">€400</td>
                <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
              </tr>
              
              {/* Tier 3 */}
              <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td className="py-4 px-6 font-medium">Tier 3</td>
                <td className="py-4 px-6">3 – 6 maanden</td>
                <td className="py-4 px-6">Geen nieuwe leningen, nieuwe spirit activeren</td>
                <td className="py-4 px-6">€2.100 (BEL)</td>
                <td className="py-4 px-6">2</td>
                <td className="py-4 px-6 font-semibold">€800</td>
                <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
              </tr>
              
              {/* Tier 4 */}
              <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td className="py-4 px-6 font-medium">Tier 4</td>
                <td className="py-4 px-6">6 – 9 maanden</td>
                <td className="py-4 px-6">Nieuwe spirit activeren</td>
                <td className="py-4 px-6">€2.100 (BEL)</td>
                <td className="py-4 px-6">3</td>
                <td className="py-4 px-6 font-semibold">€1.200</td>
                <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
              </tr>
              
              {/* Tier 5 */}
              <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td className="py-4 px-6 font-medium">Tier 5</td>
                <td className="py-4 px-6">9 – 12 maanden</td>
                <td className="py-4 px-6">2 spirits activeren</td>
                <td className="py-4 px-6">€2.100 (BEL)</td>
                <td className="py-4 px-6">5</td>
                <td className="py-4 px-6 font-semibold">€2.000</td>
                <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
              </tr>
              
              {/* Tier 6 */}
              <tr className="hover:bg-indigo-50/30 transition-colors">
                <td className="py-4 px-6 font-medium">Tier 6</td>
                <td className="py-4 px-6">12 – 15 maanden</td>
                <td className="py-4 px-6">Geen nieuwe leningen meer</td>
                <td className="py-4 px-6">€0</td>
                <td className="py-4 px-6">5</td>
                <td className="py-4 px-6 font-semibold">€2.000</td>
                <td className="py-4 px-6"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Schuldvrij</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {[
            {
              tier: "Tier 2",
              period: "0 – 3 maanden",
              actions: "4 BV's oprichten, eerste spirit activeren",
              loan: "€2.100 (BEL + PLAT)",
              spirits: 1,
              cashflow: "€400",
              status: "Actief"
            },
            {
              tier: "Tier 3",
              period: "3 – 6 maanden",
              actions: "Geen nieuwe leningen, nieuwe spirit activeren",
              loan: "€2.100 (BEL)",
              spirits: 2,
              cashflow: "€800",
              status: "Actief"
            },
            {
              tier: "Tier 4",
              period: "6 – 9 maanden",
              actions: "Nieuwe spirit activeren",
              loan: "€2.100 (BEL)",
              spirits: 3,
              cashflow: "€1.200",
              status: "Actief"
            },
            {
              tier: "Tier 5",
              period: "9 – 12 maanden",
              actions: "2 spirits activeren",
              loan: "€2.100 (BEL)",
              spirits: 5,
              cashflow: "€2.000",
              status: "Actief"
            },
            {
              tier: "Tier 6",
              period: "12 – 15 maanden",
              actions: "Geen nieuwe leningen meer",
              loan: "€0",
              spirits: 5,
              cashflow: "€2.000",
              status: "Schuldvrij"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
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
                  <span className="text-gray-600">Spirits:</span>
                  <span className="font-medium">{item.spirits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lening:</span>
                  <span className="font-medium">{item.loan}</span>
                </div>
                <div className="flex justify-between text-lg mt-4">
                  <span className="text-gray-800">Cashflow:</span>
                  <span className="font-bold text-indigo-600">{item.cashflow}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
