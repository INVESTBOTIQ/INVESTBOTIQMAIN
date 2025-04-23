
import React from "react";
import WhatIsSection from "./info/WhatIsSection";
import WhySection from "./info/WhySection";
import HowSection from "./info/HowSection";
import AdvantagesSection from "./info/AdvantagesSection";
import FAQSection from "./info/FAQSection";

const InfoSection = React.forwardRef<HTMLDivElement>((props, ref) => (
  <section
    ref={ref}
    id="wat-is-investbotiq"
    className="mx-auto w-full max-w-3xl rounded-2xl shadow-xl bg-white/95 backdrop-blur-lg px-5 xs:px-7 sm:px-9 md:px-12 py-10 xs:py-12 md:py-16 mt-12 md:mt-20 mb-14 md:mb-24 z-30 relative"
  >
    <WhatIsSection />
    <WhySection />
    <HowSection />
    <AdvantagesSection />
    <FAQSection />
  </section>
));

InfoSection.displayName = "InfoSection";

export default InfoSection;
