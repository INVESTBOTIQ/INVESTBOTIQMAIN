
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

export default function HowSection() {
  return (
    <>
      <FadeIn delay={0.42}>
        <h3 id="hoe-werkt-het" className="text-2xl font-semibold mb-4 text-indigo-800">
          Hoe werkt het?
        </h3>
      </FadeIn>
      <FadeIn delay={0.48}>
        <ol className="mb-8 list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>Aanmelden</li>
          <li>Activeer de Bot</li>
          <li>Groei elke maand automatisch</li>
        </ol>
      </FadeIn>
    </>
  );
}
