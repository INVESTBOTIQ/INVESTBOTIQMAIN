import React from "react";
import { motion } from "framer-motion";

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.88, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FAQ = [
  {
    question: "Moet ik investeren?",
    answer: "Nee, alles gebeurt automatisch.",
  },
  {
    question: "Kan ik zelf investeringen kiezen?",
    answer: "Nee, de IQ Bot doet dit volgens plan.",
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via je persoonlijke Member Dashboard.",
  },
];

const InfoSection = React.forwardRef<HTMLDivElement>((props, ref) => (
  <section
    ref={ref}
    id="wat-is-investbotiq"
    className="mx-auto w-full max-w-3xl rounded-2xl shadow-xl bg-white/95 backdrop-blur-lg px-5 xs:px-7 sm:px-9 md:px-12 py-10 xs:py-12 md:py-16 mt-12 md:mt-20 mb-14 md:mb-24 z-30 relative"
  >
    <FadeIn delay={0.13}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">Wat is Investbotiq?</h2>
    </FadeIn>
    <FadeIn delay={0.24}>
      <p className="mb-8 text-lg text-gray-700 text-center md:text-left">
        Investbotiq is een platform dat automatisch cashflow voor jou genereert met behulp van de IQ Bot. Geen investeringskeuzes, geen financieringsaanvragen, geen technische kennis vereist – alles gebeurt transparant en automatisch.
      </p>
    </FadeIn>

    {/* Waarom Investbotiq */}
    <FadeIn delay={0.30}>
      <h3 id="waarom-investbotiq" className="text-2xl font-semibold mb-4 text-indigo-800">Waarom Investbotiq?</h3>
    </FadeIn>
    <FadeIn delay={0.36}>
      <ul className="mb-8 list-disc list-inside space-y-2 text-gray-700 pl-2">
        <li>Automatische groei</li>
        <li>Geen technische kennis nodig</li>
        <li>Transparante maandelijkse opbouw</li>
        <li>Gestructureerde opbouw</li>
        <li>Geen externe tussenpartijen: alles in eigen beheer via de IQ Bot</li>
      </ul>
    </FadeIn>

    {/* Hoe werkt het? */}
    <FadeIn delay={0.42}>
      <h3 id="hoe-werkt-het" className="text-2xl font-semibold mb-4 text-indigo-800">Hoe werkt het?</h3>
    </FadeIn>
    <FadeIn delay={0.48}>
      <ol className="mb-8 list-decimal list-inside space-y-2 text-gray-700 pl-2">
        <li>Aanmelden</li>
        <li>Activeer de Bot</li>
        <li>Groei elke maand automatisch</li>
      </ol>
    </FadeIn>

    {/* Voordelen */}
    <FadeIn delay={0.54}>
      <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Voordelen:</h3>
    </FadeIn>
    <FadeIn delay={0.60}>
      <ul className="mb-8 list-none space-y-2 text-gray-700 pl-2">
        <li>✔️ Geen minimale investering vereist</li>
        <li>✔️ Transparantie en maandelijkse rapportage</li>
        <li>✔️ Non-technical: merendeels passief</li>
        <li>✔️ Passief inkomen</li>
        <li>✔�� Maandelijkse groei</li>
      </ul>
    </FadeIn>

    {/* FAQ */}
    <div className="mt-8 md:mt-12" id="faq">
      <FadeIn delay={0.666}>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-800 text-center md:text-left">
          Mini FAQ
        </h3>
      </FadeIn>
      <div className="space-y-4">
        {FAQ.map((f, i) => (
          <FadeIn delay={0.68 + 0.04 * i} key={f.question}>
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
              <p className="font-medium text-indigo-900 mb-1">{f.question}</p>
              <p className="text-indigo-700">{f.answer}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
));

export default InfoSection;
