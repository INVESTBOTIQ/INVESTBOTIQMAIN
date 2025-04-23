import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import { BookOpen, Flag, Heart, Shield, Bot } from "lucide-react";

export default function MissieVisie() {
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
            Missie & Visie van InvestbotIQ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-center text-gray-700 max-w-3xl mx-auto"
          >
            Financiële vrijheid. Voor iedereen. Altijd.
          </motion.p>
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <Flag className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Onze Missie</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Wij geloven dat iedereen het recht heeft op financiële groei – zonder drempels, zonder afwijzingen, en zonder afhankelijk te zijn van banken of investeerders.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Daarom bouwen wij een AI-ecosysteem dat toegang biedt tot cashflow en financiële zekerheid, ongeacht je achtergrond, kennis of startkapitaal.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-72 h-72 bg-gradient-to-br from-indigo-300 via-purple-200 to-blue-300 rounded-2xl shadow-lg flex items-center justify-center p-8">
                <img src="/lovable-uploads/11ad8cab-507c-4b7a-8060-45ab227cd3e6.png" alt="Investbotiq Mission" className="max-h-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-16 px-4 bg-white/80 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Onze Visie</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Een wereld waarin miljoenen mensen via onze bots automatisch vermogen opbouwen en financiële vrijheid bereiken – veilig, transparant en schaalbaar.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                We zien een toekomst waarin AI de deur opent naar financiële zelfstandigheid voor iedereen, ongeacht startpositie of voorkennis.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-300 shadow-lg flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white/25 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                  <span className="text-6xl">🌍</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Quote Block */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <blockquote className="text-3xl md:text-5xl font-bold text-indigo-600 leading-tight mb-8">
              "Financiële vrijheid. Voor iedereen. Altijd."
            </blockquote>
            <p className="text-lg text-gray-600">Onze belofte aan jou</p>
          </motion.div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Onze waarden
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Wil je meer weten?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
              <Link to="/tier-plannen">🔵 Lees meer over onze Tier Strategie</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg py-6 px-8 font-semibold border-indigo-300">
              <Link to="/veiligheid">⚪ Bekijk onze Veiligheidsaanpak</Link>
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
