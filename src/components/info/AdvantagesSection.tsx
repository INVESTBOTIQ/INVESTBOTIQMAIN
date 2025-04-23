
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

export default function AdvantagesSection() {
  return (
    <>
      <FadeIn delay={0.54}>
        <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Voordelen:</h3>
      </FadeIn>
      <FadeIn delay={0.60}>
        <ul className="mb-8 list-none space-y-2 text-gray-700 pl-2">
          <li>✔️ Geen minimale investering vereist</li>
          <li>✔️ Transparantie en maandelijkse rapportage</li>
          <li>✔️ Non-technical: merendeels passief</li>
          <li>✔️ Passief inkomen</li>
          <li>✔️ Maandelijkse groei</li>
        </ul>
      </FadeIn>
    </>
  );
}
