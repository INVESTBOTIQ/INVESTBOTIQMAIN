
import React from "react";
import { motion } from "framer-motion";
import PublicHeader from "@/components/PublicHeader";

interface InfoPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showGradientBackground?: boolean;
}

export default function InfoPageLayout({
  children,
  title,
  subtitle,
  showGradientBackground = true,
}: InfoPageLayoutProps) {
  return (
    <div className={`min-h-screen ${showGradientBackground ? "bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100" : ""}`}>
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
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-center text-gray-700 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Background Element */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </section>
      
      {children}
      
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
