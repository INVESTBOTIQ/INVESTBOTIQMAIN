
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 p-4 relative overflow-hidden">
      {/* ORB Element */}
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <Card className="w-full max-w-md shadow-2xl relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800">
            Bedankt voor uw aanmelding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.p 
            className="text-center text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            De IQ Bot bekijkt uw aanvraag.
            U ontvangt binnen 48 uur bericht via e-mail.
            Wij nemen zo spoedig mogelijk contact met u op.
          </motion.p>
          <Button asChild className="w-full hover:bg-indigo-600 transition-all">
            <Link to="/">Terug naar home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
