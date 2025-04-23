
import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Bot } from "lucide-react";

// Animation variants
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

export default function ValuesSection() {
  return (
    <section className="py-16 px-4 bg-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Onze waarden
        </h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Value 1 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Toegankelijkheid</h3>
            <p className="text-gray-700">
              We maken vermogensgroei beschikbaar voor iedereen, ongeacht startkapitaal of kennis.
            </p>
          </motion.div>
          
          {/* Value 2 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Transparantie</h3>
            <p className="text-gray-700">
              Volledige zichtbaarheid in ons proces. Je weet precies waar je staat en waar je naartoe gaat.
            </p>
          </motion.div>
          
          {/* Value 3 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Innovatie</h3>
            <p className="text-gray-700">
              We zetten AI in om traditionele financiële barrières te doorbreken en nieuwe mogelijkheden te creëren.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
