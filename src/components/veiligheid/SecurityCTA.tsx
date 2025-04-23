
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SecurityCTA() {
  return (
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
  );
}
