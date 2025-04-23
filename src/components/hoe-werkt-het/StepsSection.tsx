
import React from "react";
import { motion } from "framer-motion";
import { CircleUser, Bot, TrendingUp } from "lucide-react";

export default function StepsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          In 3 eenvoudige stappen
        </h2>
        
        <div className="flex flex-col gap-16">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shrink-0">
              1
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <CircleUser className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl md:text-2xl font-semibold">Aanmelden</h3>
              </div>
              <p className="text-lg text-gray-700">
                Je registreert eenvoudig met je e-mail en basisgegevens. Geen ingewikkelde formulieren of lange verificatieprocessen.
              </p>
            </div>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 shrink-0">
              2
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl md:text-2xl font-semibold">Activeer de Bot</h3>
              </div>
              <p className="text-lg text-gray-700">
                Kies je type account en start je eerste Tier. De IQ Bot neemt het vanaf hier over en zet alle nodige stappen in gang.
              </p>
            </div>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600 shrink-0">
              3
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-xl md:text-2xl font-semibold">Groei automatisch per maand</h3>
              </div>
              <p className="text-lg text-gray-700">
                Elke 3 maanden wordt je cashflow geüpdatet via nieuwe spirits. Je ziet de groei rechtstreeks in je dashboard, zonder dat je actie hoeft te ondernemen.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
