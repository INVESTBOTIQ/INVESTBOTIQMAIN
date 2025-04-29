
import { useState } from "react";

interface GeneralInfoData {
  voornaam: string;
  achternaam: string;
  woonplaats: string;
  geboortedatum: string;
  email: string;
  telefoon: string;
  hoe_hoorde_u_van_ons: string;
  referral: string;
  plus_1: string;
  plus_1_voornaam?: string;
  plus_1_achternaam?: string;
  plus_1_email?: string;
}

export const useGeneralInfoValidation = (data: GeneralInfoData) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!data.voornaam) newErrors.voornaam = "Voornaam is verplicht";
    if (!data.achternaam) newErrors.achternaam = "Achternaam is verplicht";
    if (!data.woonplaats) newErrors.woonplaats = "Woonplaats is verplicht";
    if (!data.geboortedatum) newErrors.geboortedatum = "Geboortedatum is verplicht";
    
    // Email validation
    if (!data.email) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Ongeldig e-mailadres";
    }
    
    // Phone validation
    if (!data.telefoon) {
      newErrors.telefoon = "Telefoonnummer is verplicht";
    }
    
    // Additional info validation
    if (!data.hoe_hoorde_u_van_ons) {
      newErrors.hoe_hoorde_u_van_ons = "Dit veld is verplicht";
    }
    if (!data.referral) {
      newErrors.referral = "Referral e-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(data.referral)) {
      newErrors.referral = "Ongeldig e-mailadres";
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm, setErrors };
};
