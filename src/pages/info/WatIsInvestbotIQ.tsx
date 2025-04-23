
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import { Box, Check, Coins, Lock, Shield, Users } from "lucide-react";

// Animation variants for staggered entrance
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

export default function WatIsInvestbotIQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4"
          >
            Wat is InvestbotIQ?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-center text-gray-700 max-w-3xl mx-auto"
          >
            Slimme AI. Automatische cashflow. Geen zorgen.
          </motion.p>
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {/* Introduction Block */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Jouw persoonlijke AI-financieringspartner
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                InvestbotIQ is jouw persoonlijke AI-financieringspartner. Het platform bouwt automatisch maandelijkse cashflow op via ons unieke Tier-systeem. Geen investeringskeuzes, geen moeilijke formulieren – de IQ Bot regelt alles voor je.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400 via-purple-300 to-blue-300 shadow-lg flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white/25 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                  <span className="text-6xl">🤖</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-12 px-4 bg-white/80">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Hoofdkenmerken
          </h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automatisch inkomen opbouwen</h3>
              <p className="text-gray-600">De IQ Bot bouwt automatisch een maandelijkse cashflow op zonder dat je er omkijken naar hebt.</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Geen technische kennis vereist</h3>
              <p className="text-gray-600">Geen financiële of technische voorkennis nodig. De IQ Bot neemt alle complexiteit voor je weg.</p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparant en voorspelbaar</h3>
              <p className="text-gray-600">Volledig inzicht in het groeitraject van je cashflow. Je weet vooraf precies wat je kunt verwachten.</p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Alles via één account geregeld</h3>
              <p className="text-gray-600">Eén dashboard voor al je activiteiten. Overzichtelijk en eenvoudig te beheren.</p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Slim gebruik van zakelijke leningen</h3>
              <p className="text-gray-600">Geoptimaliseerde leningstructuur die zichzelf terugbetaalt. De bot zorgt voor een verstandige opbouw.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Quote Block */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <blockquote className="text-2xl md:text-4xl font-bold text-indigo-900 italic leading-relaxed">
              "Investeren zonder hoofdpijn. De AI regelt het."
            </blockquote>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Klaar om je cashflow automatisch te laten groeien?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
              <Link to="/auth">🔵 Start direct met InvestbotIQ</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg py-6 px-8 font-semibold border-indigo-300">
              <Link to="/tier-plannen">⚪ Bekijk het Tier Plan</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-[#1A1F2C] text-center text-white font-medium">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="underline hover:text-pink-200 transition">Algemene Voorwaarden</a>
          <a href="#" className="underline hover:text-pink-200 transition">Privacybeleid</a>
          <a href="#" className="underline hover:text-pink-200 transition">Contact</a>
        </div>
        <div className="mt-4 text-xs text-indigo-200">© {new Date().getFullYear()} Investbotiq</div>
      </footer>
    </div>
  );
}
