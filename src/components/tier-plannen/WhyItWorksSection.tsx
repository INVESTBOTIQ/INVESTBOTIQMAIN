
import React from "react";
import { motion } from "framer-motion";
import { Timer, Bot, CircleCheck, TrendingUp } from "lucide-react";

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

export default function WhyItWorksSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Waarom werkt dit?
        </h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Timer className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Time Gap Profit</h3>
            <p className="text-gray-700">
              Door slim gebruik te maken van tijdskloofprofijt kan het systeem optimaal kapitaal benutten tussen verschillende financieringsrondes.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automatisering via IQ Bot</h3>
            <p className="text-gray-700">
              De IQ Bot voert het schema foutloos uit en neemt alle optimalisatiebeslissingen zonder menselijke tussenkomst.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <CircleCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">BEL-leningstructuur</h3>
            <p className="text-gray-700">
              Het systeem maakt gebruik van een geoptimaliseerde leningstructuur die zichzelf terugbetaalt en uiteindelijk leidt tot een schuldvrije cashflow.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Gecontroleerde cashflowgroei</h3>
            <p className="text-gray-700">
              Je weet vooraf exact wat je kunt verwachten – geen verrassingen. De groei is voorspelbaar en controleerbaar.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
