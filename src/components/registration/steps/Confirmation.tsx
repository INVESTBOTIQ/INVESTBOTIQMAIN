
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Role } from "../MultiStepForm";

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

// Define questions per role for display
const roleQuestions: Record<Role, { id: string; question: string }[]> = {
  member: [
    { id: "financiele_situatie", question: "Huidige financiële situatie" },
    { id: "voornaamste_doel", question: "Voornaamste doel met Investbotiq" }
  ],
  student: [
    { id: "studie", question: "Studeert momenteel" },
    { id: "instituut", question: "Verbonden aan instituut" }
  ],
  ouder: [
    { id: "voor_wie", question: "Formulier ingevuld voor" },
    { id: "zelf_investeren", question: "Investeren namens uzelf" }
  ],
  affiliated: [
    { id: "promotie_manier", question: "Promotiewijze" },
    { id: "bereik_netwerk", question: "Bereik of netwerk" }
  ],
  freelancer: [
    { id: "expertise", question: "Expertise of vakgebied" },
    { id: "kvk", question: "KVK-inschrijving" }
  ],
  ondernemer: [
    { id: "bedrijf_naam", question: "Naam bedrijf" },
    { id: "maandelijkse_omzet", question: "Gemiddelde maandelijkse omzet" }
  ],
  artiest: [
    { id: "discipline", question: "Discipline" },
    { id: "eerder_gepubliceerd", question: "Eerder gepubliceerd of opgetreden" }
  ]
};

// Get role label for display
const getRoleLabel = (roleId: Role): string => {
  const roleMappings: Record<Role, string> = {
    member: "Member",
    student: "Student",
    ouder: "Ouder",
    affiliated: "Affiliated",
    freelancer: "Freelancer",
    ondernemer: "Ondernemer",
    artiest: "Artiest"
  };
  return roleMappings[roleId] || roleId;
};

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
      {/* Grote orb rechtsboven */}
      <motion.div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200 rounded-full opacity-20 blur-3xl z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.18 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* Kleine orb linksonder */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-2xl z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.13 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto z-10 animate-fade-in"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-400 to-pink-300 rounded-full p-3 shadow-lg mb-2"
          >
            {/* Check icoon */}
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#eef2ff" />
              <path d="M7 13l3 3 7-7" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mt-2 tracking-tight">
            Bevestig uw aanmelding
          </h2>
          <p className="text-center text-muted-foreground max-w-lg mt-2">
            Controleer uw gegevens zorgvuldig voordat u uw aanmelding definitief verstuurt.
          </p>
        </div>
        <div className="space-y-6">
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3 text-indigo-700">Persoonlijke gegevens</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Naam</dt>
                  <dd>{formData.general.voornaam} {formData.general.achternaam}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Woonplaats</dt>
                  <dd>{formData.general.woonplaats}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Geboortedatum</dt>
                  <dd>{formData.general.geboortedatum}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">E-mailadres</dt>
                  <dd>{formData.general.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Telefoonnummer</dt>
                  <dd>{formData.general.telefoon}</dd>
                </div>
                {formData.general.hoe_hoorde_u_van_ons && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Hoe gehoord van ons</dt>
                    <dd>{formData.general.hoe_hoorde_u_van_ons}</dd>
                  </div>
                )}
                {formData.general.referral && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Referral</dt>
                    <dd>{formData.general.referral}</dd>
                  </div>
                )}
                {formData.general.plus_1 && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Plus één</dt>
                    <dd>{formData.general.plus_1}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3 text-indigo-700">Rol specifieke informatie - {getRoleLabel(formData.role)}</h3>
              <dl className="grid grid-cols-1 gap-3">
                {questions.map((question) => (
                  <div key={question.id}>
                    <dt className="text-sm font-medium text-muted-foreground">{question.question}</dt>
                    <dd>{formData.answers[question.id] || "-"}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2 bg-white/80 rounded-lg px-4 py-3 border border-indigo-100 shadow-sm">
            <Checkbox 
              id="privacy" 
              checked={privacyAgreed} 
              onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)}
            />
            <Label htmlFor="privacy" className="text-sm">
              Ik ga akkoord met de <span className="underline text-indigo-700 cursor-pointer">privacyverklaring</span> en de <span className="underline text-indigo-700 cursor-pointer">algemene voorwaarden</span>
            </Label>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} disabled={submitting} className="w-full sm:w-auto">
              Terug
            </Button>
            <Button onClick={handleSubmit} disabled={!privacyAgreed || submitting} className="w-full sm:w-auto shadow-md text-base py-6">
              {submitting ? "Aanmelden..." : "Aanmelden"}
            </Button>
          </div>
        </div>
      </motion.div>
      {/* Fade-in animatie keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};
