
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import PublicHeader from "@/components/PublicHeader";

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

// Kleine animated orb visual
function OrbVisual() {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0.6 }}
      animate={{ scale: [0.85, 1.08, 0.98, 1], opacity: [0.65, 1, 0.7, 1] }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3,
        ease: "easeInOut",
      }}
      className="relative z-10"
    >
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-indigo-400 via-pink-300 to-sky-300 shadow-xl blur-[1px] flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm shadow-inner border-4 border-white/40" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  // Section refs/controls
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax: background moves slower than scroll
  const yBG = useTransform(scrollY, [0, 400], [0, -70]);

  // Smooth scroll naar info
  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fade-in helpers
  function FadeIn({ children, className = "", delay = 0 }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div style={{ backgroundPositionY: yBG }} className="bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 min-h-screen w-full relative">
      {/* HEADER (LOGO + HAMBURGER) */}
      <PublicHeader />

      {/* HERO SECTION - responsive splitscreen */}
      <div className="pt-24 md:pt-32 flex flex-col md:flex-row min-h-[80vh] w-full">
        {/* LEFT: Tekst */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-6 sm:px-10 lg:pl-20">
          <FadeIn delay={0.03}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm text-left md:text-left text-balance">
              Automatische <span className="text-indigo-500">cashflow</span> opbouwen <br className="hidden md:block"/> met Investbotiq.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mb-10 text-lg md:text-xl text-gray-700 max-w-xl text-left">
              De slimme manier om je maandelijkse inkomsten te laten groeien – automatisering, transparantie en resultaat, zonder gedoe.
            </p>
          </FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-5 mt-2 mb-7 w-full md:w-auto">
            <FadeIn delay={0.23}>
              <Button asChild 
                className="w-72 md:w-56 text-lg py-6 px-6 font-semibold shadow-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
              >
                <Link to="/auth">🔵 Inloggen</Link>
              </Button>
            </FadeIn>
            <FadeIn delay={0.32}>
              <Button
                className="w-72 md:w-56 text-lg py-6 px-6 font-semibold border bg-white text-indigo-600 shadow-lg border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300"
                variant="outline"
                onClick={handleScroll}
              >
                ⚪ Bekijk hoe het werkt
              </Button>
            </FadeIn>
          </div>
        </div>
        {/* RIGHT: Visual */}
        <div className="flex-1 flex flex-col justify-center items-center relative">
          <FadeIn delay={0.25} className="mt-4 md:mt-0">
            <OrbVisual />
          </FadeIn>
          <FadeIn delay={0.42}>
            <div className="mt-8 md:mt-14 text-indigo-800 font-semibold text-xl max-w-xs text-center z-10">
              Nooit meer handmatig investeren.
            </div>
          </FadeIn>
        </div>
      </div>

      {/* INFO SECTION (parallax fade-in) */}
      <div
        ref={infoRef}
        id="wat-is-investbotiq"
        className="mx-auto max-w-3xl w-full rounded-2xl shadow-xl bg-white/95 backdrop-blur-lg p-6 md:p-10 -mt-16 z-30 relative animate-fade-in"
        style={{ position: "relative" }}
      >
        <FadeIn delay={0.13}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Wat is Investbotiq?</h2>
        </FadeIn>
        <FadeIn delay={0.24}>
          <p className="mb-8 text-lg text-gray-700">
            Investbotiq is een platform dat automatisch cashflow voor jou genereert met behulp van de IQ Bot. Geen investeringskeuzes, geen financieringsaanvragen, geen technische kennis vereist – alles gebeurt transparant en automatisch.
          </p>
        </FadeIn>

        {/* Waarom Investbotiq */}
        <FadeIn delay={0.30}>
          <h3 id="waarom-investbotiq" className="text-2xl font-semibold mb-1 text-indigo-800">Waarom Investbotiq?</h3>
        </FadeIn>
        <FadeIn delay={0.36}>
          <ul className="mb-8 list-disc list-inside space-y-1 text-gray-700 pl-2">
            <li>Automatische cashflowgroei, maand na maand</li>
            <li>Geen technische kennis nodig</li>
            <li>Transparante maandelijkse opbouw zichtbaar via je dashboard</li>
            <li>Gestructureerde opbouw via spirits en cashflows</li>
            <li>Geen externe tussenpartijen: alles in eigen beheer via de IQ Bot</li>
          </ul>
        </FadeIn>

        {/* Hoe werkt het? */}
        <FadeIn delay={0.42}>
          <h3 id="hoe-werkt-het" className="text-2xl font-semibold mb-1 text-indigo-800">Hoe werkt het?</h3>
        </FadeIn>
        <FadeIn delay={0.48}>
          <ol className="mb-8 list-decimal list-inside space-y-1 text-gray-700 pl-2">
            <li>Aanmelden</li>
            <li>De IQ Bot activeert automatisch spirits en cashflows</li>
            <li>Jouw cashflow groeit elke maand zichtbaar op je dashboard</li>
          </ol>
        </FadeIn>

        {/* Voordelen */}
        <FadeIn delay={0.54}>
          <h3 className="text-2xl font-semibold mb-1 text-indigo-800">Voordelen:</h3>
        </FadeIn>
        <FadeIn delay={0.60}>
          <ul className="mb-8 list-none space-y-1 text-gray-700 pl-2">
            <li>✔️ Geen minimale investering vereist</li>
            <li>✔️ Transparante maandrapportage in dashboard</li>
            <li>✔️ Non-technical: gebruikers hoeven niets te doen</li>
            <li>✔️ Maandelijkse automatische groei</li>
          </ul>
        </FadeIn>

        {/* FAQ */}
        <div className="mt-8 md:mt-12" id="faq">
          <FadeIn delay={0.666}>
            <h3 className="text-2xl font-semibold mb-3 text-indigo-800">
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
      </div>

      {/* FOOTER (blijft responsive) */}
      <footer className="py-8 mt-24 bg-[#1A1F2C] text-center text-white font-medium border-t border-indigo-900 shadow-inner">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="underline hover:text-pink-200 transition">Algemene Voorwaarden</a>
          <a href="#" className="underline hover:text-pink-200 transition">Privacybeleid</a>
          <a href="#" className="underline hover:text-pink-200 transition">Contact</a>
        </div>
        <div className="mt-4 text-xs text-indigo-200">© {new Date().getFullYear()} Investbotiq</div>
      </footer>
    </motion.div>
  );
}

// Na deze wijziging is Home.tsx > 200 regels; graag refactoren in kleinere componenten voor onderhoudbaarheid!
