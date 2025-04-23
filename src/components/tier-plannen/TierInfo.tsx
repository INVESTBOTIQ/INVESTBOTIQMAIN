
import { FadeIn } from "../info/FadeInAnimation";
import TierProgressChart from "./TierProgressChart";

export default function TierInfo() {
  return (
    <FadeIn delay={0.4} className="mb-12">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">📊 Jouw Groei via het Tier Plan</h3>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
          Dit overzicht toont hoe je kaspositie, leningen en investeringen in flowlutas zich ontwikkelen van maand tot maand.
        </p>
        <TierProgressChart />
      </div>
    </FadeIn>
  );
}
