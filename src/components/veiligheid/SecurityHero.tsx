
import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function SecurityHero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Veiligheid voorop bij Investbotiq
        </h1>
        <p className="text-xl text-gray-700">
          Wij beschermen jouw cashflow, data en traject met state-of-the-art technologie.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-shrink-0"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full flex items-center justify-center">
          <Shield className="w-16 h-16 md:w-24 md:h-24 text-indigo-600" />
        </div>
      </motion.div>
    </div>
  );
}
