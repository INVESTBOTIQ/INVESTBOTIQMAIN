
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

export default function WhySection() {
  return (
    <>
      <FadeIn delay={0.30}>
        <h3 id="waarom-investbotiq" className="text-2xl font-semibold mb-4 text-indigo-800">
          Waarom Investbotiq?
        </h3>
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
    </>
  );
}
