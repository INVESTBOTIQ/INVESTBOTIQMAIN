
import { FadeIn } from "../info/FadeInAnimation";

export default function TierDescription() {
  return (
    <>
      <FadeIn delay={0.2}>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          TIER OVERZICHT
        </h2>
      </FadeIn>
    </>
  );
}
