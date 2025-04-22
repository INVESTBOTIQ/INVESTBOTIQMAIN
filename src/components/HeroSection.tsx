
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

function OrbVisual() {
  // Zachte pulse orb, responsive
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.62 }}
      animate={{
        scale: [0.95, 1.12, 0.96, 1],
        opacity: [0.62, 1, 0.67, 1]
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3.2,
        ease: "easeInOut"
      }}
      className="relative z-10"
    >
      <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-indigo-400 via-pink-300 to-sky-300 shadow-2xl blur-[1.5px] flex items-center justify-center">
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white/25 backdrop-blur-sm shadow-inner border-4 border-white/40" />
      </div>
    </motion.div>
  );
}

type Props = {
  onScrollToInfo: () => void;
};

const HeroSection: React.FC<Props> = ({ onScrollToInfo }) => {
  // Fade in animatie per section
  function FadeIn({ children, delay = 0, className = "" }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.95, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section className="relative z-10 w-full flex flex-col md:flex-row min-h-[81vh] md:min-h-[70vh] lg:min-h-[72vh] pt-24 md:pt-32 bg-transparent">
      {/* Linkerkant: tekst en knoppen */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-center px-5 sm:px-10 lg:pl-20">
        <FadeIn delay={0.05}>
          <h1 className="text-4xl xs:text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-snug md:leading-tight drop-shadow-sm text-center md:text-left text-balance max-w-2xl">
            Automatische <span className="text-indigo-500">cashflow</span> opbouwen
            <br className="hidden md:block"/>
            met Investbotiq.
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-9 text-lg xs:text-xl md:text-xl text-gray-700 max-w-xl text-center md:text-left">
            De slimme manier om je maandelijkse inkomsten te laten groeien – automatisering, transparantie en resultaat, zonder gedoe.
          </p>
        </FadeIn>
        <div className="flex flex-col md:flex-row items-center gap-5 mt-2 mb-7 w-full md:w-auto">
          <FadeIn delay={0.22}>
            <Button asChild 
              className="w-72 max-w-full md:w-56 text-lg py-6 px-6 font-semibold shadow-lg bg-indigo-500 hover:bg-indigo-600/90 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 rounded-xl"
            >
              <Link to="/auth">🔵 Inloggen</Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.32}>
            <Button
              className="w-72 max-w-full md:w-56 text-lg py-6 px-6 font-semibold border bg-white text-indigo-700 shadow-lg border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 rounded-xl"
              variant="outline"
              onClick={onScrollToInfo}
            >
              ⚪ Bekijk hoe het werkt
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Rechterkant: orb + kleine slogan */}
      <div className="flex-1 flex flex-col justify-center items-center relative mt-14 md:mt-0">
        <FadeIn delay={0.23} className="mt-4 md:mt-0">
          <OrbVisual />
        </FadeIn>
        <FadeIn delay={0.34}>
          <div className="mt-8 md:mt-14 text-indigo-800 font-semibold text-lg sm:text-xl max-w-xs text-center z-10">
            Nooit meer handmatig investeren.
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
