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
const FAQ = [{
  question: "Moet ik investeren?",
  answer: "Nee, alles gebeurt automatisch."
}, {
  question: "Kan ik zelf investeringen kiezen?",
  answer: "Nee, de IQ Bot doet dit volgens plan."
}, {
  question: "Hoe zie ik mijn cashflow groeien?",
  answer: "Via je persoonlijke Member Dashboard."
}];
export default function FAQSection() {
  return <div className="mt-8 md:mt-12" id="faq">
      <FadeIn delay={0.666}>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-800 text-center md:text-left">FAQ</h3>
      </FadeIn>
      <div className="space-y-4">
        {FAQ.map((f, i) => <FadeIn delay={0.68 + 0.04 * i} key={f.question}>
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
              <p className="font-medium text-indigo-900 mb-1">{f.question}</p>
              <p className="text-indigo-700">{f.answer}</p>
            </div>
          </FadeIn>)}
      </div>
    </div>;
}