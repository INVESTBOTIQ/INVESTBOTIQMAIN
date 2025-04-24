import React from "react";
import { motion } from "framer-motion";
export default function FutureUpdates() {
  return <motion.p initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.7
  }} className="text-lg text-gray-700 max-w-2xl mx-auto text-center">
      We blijven onze beveiliging verbeteren. <br />
      Binnenkort: activity log voor members + optionele 2FA.
    </motion.p>;
}