
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PublicHeader from "@/components/PublicHeader";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax effect voor subtiel bewegen van achtergrond
  const yBG = useTransform(scrollY, [0, 400], [0, -70]);

  // Smooth scroll naar info-section
  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      style={{ backgroundPositionY: yBG }}
      className="bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 min-h-screen w-full relative overflow-x-hidden"
    >
      <PublicHeader />
      <main className="flex flex-col w-full relative z-10">
        <HeroSection onScrollToInfo={handleScroll} />
        {/* Info block: nu lager, met voldoende witruimte */}
        <div className="flex justify-center px-2 xs:px-4">
          <InfoSection ref={infoRef} />
        </div>
      </main>
      {/* FOOTER */}
      <footer className="py-8 mt-20 bg-[#1A1F2C] text-center text-white font-medium border-t border-indigo-900 shadow-inner">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="underline hover:text-pink-200 transition">Algemene Voorwaarden</a>
          <a href="#" className="underline hover:text-pink-200 transition">Privacybeleid</a>
          <a href="#" className="underline hover:text-pink-200 transition">Contact</a>
        </div>
        <div className="mt-4 text-xs text-indigo-200">© {new Date().getFullYear()} Invest Bot IQ</div>
      </footer>
    </motion.div>
  );
}
