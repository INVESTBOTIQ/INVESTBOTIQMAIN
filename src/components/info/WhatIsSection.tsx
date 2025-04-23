import React from "react";
import { motion } from "framer-motion";
function FadeIn({
  children,
  className = "",
  delay = 0
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 36
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    amount: 0.7
  }} transition={{
    duration: 0.88,
    delay
  }} className={className}>
      {children}
    </motion.div>;
}
export default function WhatIsSection() {
  return <>
      <FadeIn delay={0.13}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">
          Wat is Investbotiq?
        </h2>
      </FadeIn>
      <FadeIn delay={0.24}>
        <p className="mb-8 text-lg text-gray-700 text-center md:text-justify">
          Investbotiq is een platform dat automatisch cashflow voor jou genereert met behulp van de IQ Bot. 
          Geen investeringskeuzes, geen financieringsaanvragen, geen technische kennis vereist – alles gebeurt 
          transparant en automatisch.
        </p>
      </FadeIn>
    </>;
}