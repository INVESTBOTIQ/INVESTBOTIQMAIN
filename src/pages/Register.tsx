
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiStepForm } from "@/components/registration/MultiStepForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* ORB Element */}
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800 hover:text-indigo-600 transition-colors">
              Aanmelden bij Investbotiq
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultiStepForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
