
import { useState } from "react";
import { Role } from "../MultiStepForm";
import { motion } from "framer-motion";
import { ConfirmationOrbs } from "./confirmation/ConfirmationOrbs";
import { ConfirmationHeader } from "./confirmation/ConfirmationHeader";
import { PersonalInfoCard } from "./confirmation/PersonalInfoCard";
import { RoleInfoCard } from "./confirmation/RoleInfoCard";
import { PrivacyAgreement } from "./confirmation/PrivacyAgreement";
import { ConfirmationFooter } from "./confirmation/ConfirmationFooter";
import { roleQuestions } from "./confirmation/roleQuestionsData";
import { AnimationStyles } from "./confirmation/AnimationStyles";

interface ConfirmationProps {
  formData: {
    role: Role;
    general: {
      voornaam: string;
      achternaam: string;
      woonplaats: string;
      geboortedatum: string;
      email: string;
      telefoon: string;
      hoe_hoorde_u_van_ons: string;
      referral: string;
      plus_1: string;
    };
    answers: Record<string, string>;
  };
  onSubmit: () => void;
  onBack: () => void;
}

export const Confirmation = ({ formData, onSubmit, onBack }: ConfirmationProps) => {
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!privacyAgreed) return;
    
    setSubmitting(true);
    await onSubmit();
    setSubmitting(false);
  };

  const questions = roleQuestions[formData.role] || [];

  return (
    <div className="relative py-8 px-2 sm:px-0 min-h-[80vh] flex flex-col items-center justify-center">
      <ConfirmationOrbs />
      
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto z-10 animate-fade-in"
      >
        <ConfirmationHeader />
        
        <div className="space-y-6">
          <PersonalInfoCard generalInfo={formData.general} />
          <RoleInfoCard 
            role={formData.role} 
            questions={questions} 
            answers={formData.answers} 
          />
          
          <PrivacyAgreement 
            agreed={privacyAgreed} 
            onAgreeChange={setPrivacyAgreed} 
          />
          
          <ConfirmationFooter 
            onBack={onBack} 
            onSubmit={handleSubmit} 
            disabled={!privacyAgreed} 
            submitting={submitting} 
          />
        </div>
      </motion.div>
      
      <AnimationStyles />
    </div>
  );
};
