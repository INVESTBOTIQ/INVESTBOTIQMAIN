
import { FadeIn } from "../info/FadeInAnimation";

export default function TierTable() {
  return (
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
          <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
            <td className="py-4 px-6 font-medium">Tier 2</td>
            <td className="py-4 px-6">0 – 3 maanden</td>
            <td className="py-4 px-6">1</td>
            <td className="py-4 px-6 font-semibold">€400</td>
            <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
            <td className="py-4 px-6 font-medium">Tier 3</td>
            <td className="py-4 px-6">3 – 6 maanden</td>
            <td className="py-4 px-6">2</td>
            <td className="py-4 px-6 font-semibold">€800</td>
            <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
            <td className="py-4 px-6 font-medium">Tier 4</td>
            <td className="py-4 px-6">6 – 9 maanden</td>
            <td className="py-4 px-6">3</td>
            <td className="py-4 px-6 font-semibold">€1.200</td>
            <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
            <td className="py-4 px-6 font-medium">Tier 5</td>
            <td className="py-4 px-6">9 – 12 maanden</td>
            <td className="py-4 px-6">5</td>
            <td className="py-4 px-6 font-semibold">€2.000</td>
            <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
          </tr>
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
  );
}
