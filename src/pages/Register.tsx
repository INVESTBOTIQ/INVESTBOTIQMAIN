
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiStepForm } from "@/components/registration/MultiStepForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 py-8 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Orb */}
      <motion.div 
        className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-indigo-300 rounded-full opacity-30 blur-3xl z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* Info Text */}
      <div className="max-w-xl mx-auto relative z-10 mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2 drop-shadow">Aanmelden bij Investbotiq</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Vul hieronder je gegevens in om je interesse kenbaar te maken. We nemen contact met je op en maken je account handmatig aan. Je ontvangt een bevestiging zodra je toegang krijgt tot het platform.
        </p>
      </div>
      <div className="max-w-4xl w-full mx-auto relative z-10">
        <Card className="shadow-2xl">
          <CardContent className="py-8">
            <MultiStepForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
