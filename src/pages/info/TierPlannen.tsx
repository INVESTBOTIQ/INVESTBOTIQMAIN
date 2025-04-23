import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import { CircleCheck, Bot, TrendingUp, Timer } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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

export default function TierPlannen() {
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
            Het Tier Plan – Jouw route naar structurele cashflow
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-center text-gray-700 max-w-3xl mx-auto"
          >
            Stap voor stap naar financiële autonomie, zonder verrassingen.
          </motion.p>
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {/* What is Tier Plan Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Wat is het Tier Plan?
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Een Tier Plan is een gefaseerde structuur waarin elke deelnemer groeit van kleine cashflowopbouw naar een stabiel, zelfstandig passief inkomen. Elke tier duurt gemiddeld 3 maanden.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Elke gebruiker volgt een vooraf bepaald groeitraject, bestaande uit 5 actieve tiers. Elke tier voegt spirits toe die jouw maandelijkse cashflow verhogen.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-full max-w-md p-4">
                <div className="flex flex-col gap-6">
                  {[2, 3, 4, 5, 6].map((tier, index) => (
                    <div 
                      key={tier} 
                      className="flex items-center rounded-lg border border-indigo-200 p-4 shadow-sm bg-white"
                      style={{marginLeft: `${index * 20}px`}}
                    >
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600 shrink-0">
                        {tier}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Tier {tier}</p>
                        {tier === 6 ? (
                          <p className="text-green-600 text-sm">Schuldvrij!</p>
                        ) : (
                          <p className="text-gray-600 text-sm">Maand {(tier - 2) * 3} - {(tier - 1) * 3}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Table Section */}
      <section className="py-16 px-4 bg-white/80">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            TIER OVERZICHT
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-lg shadow-md mb-10">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-indigo-50 border-b border-indigo-100">
                  <th className="py-4 px-6 text-left">Tier</th>
                  <th className="py-4 px-6 text-left">Periode</th>
                  <th className="py-4 px-6 text-left">Acties</th>
                  <th className="py-4 px-6 text-left">Maandelijkse Leningen</th>
                  <th className="py-4 px-6 text-left">Spirits Actief</th>
                  <th className="py-4 px-6 text-left">Maandelijkse Cashflow</th>
                  <th className="py-4 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Tier 2 */}
                <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Tier 2</td>
                  <td className="py-4 px-6">0 – 3 maanden</td>
                  <td className="py-4 px-6">4 BV's oprichten, eerste spirit activeren</td>
                  <td className="py-4 px-6">€2.100 (BEL + PLAT)</td>
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6 font-semibold">€400</td>
                  <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                </tr>
                
                {/* Tier 3 */}
                <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Tier 3</td>
                  <td className="py-4 px-6">3 – 6 maanden</td>
                  <td className="py-4 px-6">Geen nieuwe leningen, nieuwe spirit activeren</td>
                  <td className="py-4 px-6">€2.100 (BEL)</td>
                  <td className="py-4 px-6">2</td>
                  <td className="py-4 px-6 font-semibold">€800</td>
                  <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                </tr>
                
                {/* Tier 4 */}
                <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Tier 4</td>
                  <td className="py-4 px-6">6 – 9 maanden</td>
                  <td className="py-4 px-6">Nieuwe spirit activeren</td>
                  <td className="py-4 px-6">€2.100 (BEL)</td>
                  <td className="py-4 px-6">3</td>
                  <td className="py-4 px-6 font-semibold">€1.200</td>
                  <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                </tr>
                
                {/* Tier 5 */}
                <tr className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Tier 5</td>
                  <td className="py-4 px-6">9 – 12 maanden</td>
                  <td className="py-4 px-6">2 spirits activeren</td>
                  <td className="py-4 px-6">€2.100 (BEL)</td>
                  <td className="py-4 px-6">5</td>
                  <td className="py-4 px-6 font-semibold">€2.000</td>
                  <td className="py-4 px-6"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actief</span></td>
                </tr>
                
                {/* Tier 6 */}
                <tr className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Tier 6</td>
                  <td className="py-4 px-6">12 – 15 maanden</td>
                  <td className="py-4 px-6">Geen nieuwe leningen meer</td>
                  <td className="py-4 px-6">€0</td>
                  <td className="py-4 px-6">5</td>
                  <td className="py-4 px-6 font-semibold">€2.000</td>
                  <td className="py-4 px-6"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Schuldvrij</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {[
              {
                tier: "Tier 2",
                period: "0 – 3 maanden",
                actions: "4 BV's oprichten, eerste spirit activeren",
                loan: "€2.100 (BEL + PLAT)",
                spirits: 1,
                cashflow: "€400",
                status: "Actief"
              },
              {
                tier: "Tier 3",
                period: "3 – 6 maanden",
                actions: "Geen nieuwe leningen, nieuwe spirit activeren",
                loan: "€2.100 (BEL)",
                spirits: 2,
                cashflow: "€800",
                status: "Actief"
              },
              {
                tier: "Tier 4",
                period: "6 – 9 maanden",
                actions: "Nieuwe spirit activeren",
                loan: "€2.100 (BEL)",
                spirits: 3,
                cashflow: "€1.200",
                status: "Actief"
              },
              {
                tier: "Tier 5",
                period: "9 – 12 maanden",
                actions: "2 spirits activeren",
                loan: "€2.100 (BEL)",
                spirits: 5,
                cashflow: "€2.000",
                status: "Actief"
              },
              {
                tier: "Tier 6",
                period: "12 – 15 maanden",
                actions: "Geen nieuwe leningen meer",
                loan: "€0",
                spirits: 5,
                cashflow: "€2.000",
                status: "Schuldvrij"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">{item.tier}</h3>
                  <span className={`px-2 py-1 ${item.status === "Actief" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"} rounded-full text-xs`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Periode:</span>
                    <span className="font-medium">{item.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spirits:</span>
                    <span className="font-medium">{item.spirits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lening:</span>
                    <span className="font-medium">{item.loan}</span>
                  </div>
                  <div className="flex justify-between text-lg mt-4">
                    <span className="text-gray-800">Cashflow:</span>
                    <span className="font-bold text-indigo-600">{item.cashflow}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why It Works Section */}
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
            {/* Reason 1 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Time Gap Profit</h3>
              <p className="text-gray-700">
                Door slim gebruik te maken van tijdskloofprofijt kan het systeem optimaal kapitaal benutten tussen verschillende financieringsrondes.
              </p>
            </motion.div>
            
            {/* Reason 2 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automatisering via IQ Bot</h3>
              <p className="text-gray-700">
                De IQ Bot voert het schema foutloos uit en neemt alle optimalisatiebeslissingen zonder menselijke tussenkomst.
              </p>
            </motion.div>
            
            {/* Reason 3 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <CircleCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">BEL-leningstructuur</h3>
              <p className="text-gray-700">
                Het systeem maakt gebruik van een geoptimaliseerde leningstructuur die zichzelf terugbetaalt en uiteindelijk leidt tot een schuldvrije cashflow.
              </p>
            </motion.div>
            
            {/* Reason 4 */}
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
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Veelgestelde vragen
          </h2>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6">Wat als ik tussendoor wil stoppen?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Je kunt op elk moment stoppen. De IQ Bot zorgt voor een gecontroleerde afbouw van lopende processen en sluit eventuele openstaande verplichtingen af. Neem contact op met support voor persoonlijke begeleiding bij dit proces.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6">Wat is een spirit?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Een spirit is de cashflow-motor van je investering. Elke spirit genereert ongeveer €400 per maand aan passief inkomen. De IQ Bot activeert nieuwe spirits volgens het Tier Plan om je maandelijkse cashflow geleidelijk op te bouwen.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6">Wanneer stopt mijn lening?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                In Tier 6, na ongeveer 12-15 maanden, zijn er geen nieuwe leningen meer nodig. Je systeem is dan volledig schuldvrij en blijft een stabiele cashflow genereren van ongeveer €2.000 per maand.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Klaar voor jouw cashflowgroei?
          </h2>
          
          <Button asChild size="lg" className="text-lg py-6 px-8 font-semibold">
            <Link to="/auth">🟢 Start nu met Investbotiq</Link>
          </Button>
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
