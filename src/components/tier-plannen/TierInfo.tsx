
import { FadeIn } from "../info/FadeInAnimation";
import TierProgressChart from "./TierProgressChart";

export default function TierInfo() {
  return (
    <FadeIn delay={0.2} className="mb-12">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">📊 Jouw Groei via het Tier Plan</h3>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-4">
          Dit interactieve overzicht toont hoe je kaspositie, leningen en investeringen in flowlutas zich ontwikkelen van maand tot maand.
          <span className="block mt-2 text-sm text-indigo-500">Beweeg je muis over de grafiek voor meer details per tier!</span>
        </p>
        <div className="w-full min-h-[400px] bg-white rounded-lg shadow-md p-4">
          <TierProgressChart />
        </div>
      </div>
    </FadeIn>
  );
}
