
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Voordelen
        </h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-2xl mb-4">💼</p>
            <h3 className="text-xl font-semibold mb-3">Geen minimale investering vereist</h3>
            <p className="text-gray-600">Begin zonder grote startkosten. Het systeem bouwt geleidelijk op en gebruikt alleen de middelen die nodig zijn.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-2xl mb-4">💡</p>
            <h3 className="text-xl font-semibold mb-3">Automatische opbouw via de IQ Bot</h3>
            <p className="text-gray-600">Geen handmatige stappen of ingewikkelde beslissingen. De IQ Bot regelt alles voor je.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-2xl mb-4">📈</p>
            <h3 className="text-xl font-semibold mb-3">Maandelijkse cashflow die groeit</h3>
            <p className="text-gray-600">Zie je cashflow elke drie maanden groeien dankzij nieuwe spirits en geoptimaliseerde strategieën.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-2xl mb-4">🤖</p>
            <h3 className="text-xl font-semibold mb-3">Geen tussenpersonen – puur algoritmisch</h3>
            <p className="text-gray-600">Direct en efficiënt: zonder menselijke tussenkomst of subjectieve beslissingen.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
