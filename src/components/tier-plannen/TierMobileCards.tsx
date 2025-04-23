
import { FadeIn } from "../info/FadeInAnimation";

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
  );
}
