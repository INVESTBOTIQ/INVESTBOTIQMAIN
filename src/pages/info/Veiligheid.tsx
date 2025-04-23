
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import { Check, Lock, Shield, Eye, FileCheck, RefreshCw } from "lucide-react";

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

export default function Veiligheid() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
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
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {/* Security Features Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Slimme beveiliging – technisch uitgelegd
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">End-to-end encryptie</h3>
              </div>
              <p className="text-gray-700 ml-12">
                Alleen jij en de IQ Bot hebben toegang tot je gegevens. Alle data-uitwisseling is volledig versleuteld.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">JWT + RLS (Supabase)</h3>
              </div>
              <p className="text-gray-700 ml-12">
                Toegang per rol: member/admin. JWT-tokens zorgen voor beveiligde sessies zonder dat wachtwoorden worden opgeslagen.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Rolgebaseerde policies</h3>
              </div>
              <p className="text-gray-700 ml-12">
                Geen toegang tot andermans data. Members hebben alleen toegang tot hun eigen gegevens, admins hebben beperkte toegang.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Auditlogging</h3>
              </div>
              <p className="text-gray-700 ml-12">
                Elke wijziging wordt gelogd, zodat er volledige transparantie is over wie wat heeft gedaan en wanneer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* No external access section */}
      <section className="py-16 px-4 bg-[#1A1F2C] text-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Eye className="w-10 h-10" />
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Jouw data is nooit te koop</h2>
              <p className="text-lg opacity-90">
                We delen niets met derde partijen. Alles blijft in het Investbotiq-ecosysteem. Geen externe brokers, geen API's naar andere platforms.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Security Measures Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Beveiligingsmaatregelen – Visueel overzicht
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {/* Measure 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white z-10 relative">
                    <Lock className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-6 md:hidden">
                    <h3 className="font-bold text-lg">Login beveiligd via Supabase</h3>
                  </div>
                </div>
                
                <div className="hidden md:block md:flex-1 md:text-right">
                  <h3 className="font-bold text-lg">Login beveiligd via Supabase</h3>
                </div>
                
                <div className="ml-16 md:ml-0 md:flex-1">
                  <p className="text-gray-700">
                    State-of-the-art beveiligingsmechanismen voor authenticatie en sessiemanagement.
                  </p>
                </div>
              </motion.div>
              
              {/* Measure 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row-reverse md:items-center gap-4 md:gap-8"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white z-10 relative">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-6 md:hidden">
                    <h3 className="font-bold text-lg">Toegangscontrole via policies</h3>
                  </div>
                </div>
                
                <div className="hidden md:block md:flex-1">
                  <h3 className="font-bold text-lg">Toegangscontrole via policies</h3>
                </div>
                
                <div className="ml-16 md:ml-0 md:flex-1 md:text-right">
                  <p className="text-gray-700">
                    Row Level Security op alle tabellen zorgt ervoor dat gebruikers alleen toegang hebben tot hun eigen data.
                  </p>
                </div>
              </motion.div>
              
              {/* Measure 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white z-10 relative">
                    <FileCheck className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="ml-6 md:hidden">
                    <h3 className="font-bold text-lg">Trigger logging bij gevoelige acties</h3>
                  </div>
                </div>
                
                <div className="hidden md:block md:flex-1 md:text-right">
                  <h3 className="font-bold text-lg">Trigger logging bij gevoelige acties</h3>
                </div>
                
                <div className="ml-16 md:ml-0 md:flex-1">
                  <p className="text-gray-700">
                    Automatische logging van alle wijzigingen in cashflow, taken en spirits voor volledige transparantie.
                  </p>
                </div>
              </motion.div>
              
              {/* Measure 4 */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row-reverse md:items-center gap-4 md:gap-8"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border-4 border-white z-10 relative">
                    <RefreshCw className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-6 md:hidden">
                    <h3 className="font-bold text-lg">Maandelijkse auditcheck</h3>
                  </div>
                </div>
                
                <div className="hidden md:block md:flex-1">
                  <h3 className="font-bold text-lg">Maandelijkse auditcheck</h3>
                </div>
                
                <div className="ml-16 md:ml-0 md:flex-1 md:text-right">
                  <p className="text-gray-700">
                    Regelmatige controles op verdachte activiteit of ongebruikelijke patronen in het systeem.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future Updates */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Toekomstige updates
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            We blijven onze beveiliging verbeteren. <br />
            Binnenkort: activity log voor members + optionele 2FA.
          </motion.p>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Jouw veiligheid is onze prioriteit
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We behandelen je cashflow alsof het onze eigen is.
            </p>
            
            <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
              <Link to="/auth">Start veilig met Investbotiq</Link>
            </Button>
          </motion.div>
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
