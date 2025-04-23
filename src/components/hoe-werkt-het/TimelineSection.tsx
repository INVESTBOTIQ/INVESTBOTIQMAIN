
import React from "react";
import { motion } from "framer-motion";

export default function TimelineSection() {
  return (
    <section className="py-16 px-4 bg-white/80">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Je groeitraject
        </h2>
        
        <div className="relative flex justify-center mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -translate-y-1/2"></div>
          <div className="flex justify-between relative z-10 w-full max-w-4xl px-4">
            {['Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6'].map((tier, index) => (
              <motion.div 
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500 z-10"></div>
                <div className="text-sm sm:text-base font-medium mt-2">{tier}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <p className="text-center text-gray-600 mb-16">Elke tier brengt je drie maanden verder in je reis naar financiële groei</p>
      </div>
    </section>
  );
}
