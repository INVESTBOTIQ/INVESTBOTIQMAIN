
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Bevestig uw aanmelding</h2>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-3">Persoonlijke gegevens</h3>
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
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-3">Rol specifieke informatie - {getRoleLabel(formData.role)}</h3>
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
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="privacy" 
            checked={privacyAgreed} 
            onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)}
          />
          <Label htmlFor="privacy" className="text-sm">
            Ik ga akkoord met de privacyverklaring en de algemene voorwaarden
          </Label>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
            Terug
          </Button>
          <Button onClick={handleSubmit} disabled={!privacyAgreed || submitting}>
            {submitting ? "Aanmelden..." : "Aanmelden"}
          </Button>
        </div>
      </div>
    </div>
  );
};
