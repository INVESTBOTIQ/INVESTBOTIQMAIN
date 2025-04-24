import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalDetails } from "./general-info/PersonalDetails";
import { ContactDetails } from "./general-info/ContactDetails";
import { DatePicker } from "./general-info/DatePicker";
import { AdditionalInfo } from "./general-info/AdditionalInfo";

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
}

interface GeneralInfoProps {
  data: GeneralInfoData;
  onUpdate: (data: GeneralInfoData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GeneralInfo = ({ data, onUpdate, onNext, onBack }: GeneralInfoProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [date, setDate] = useState<Date | undefined>(
    data.geboortedatum ? new Date(data.geboortedatum) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onUpdate({
        ...data,
        geboortedatum: newDate.toISOString().split("T")[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!data.voornaam) newErrors.voornaam = "Voornaam is verplicht";
    if (!data.achternaam) newErrors.achternaam = "Achternaam is verplicht";
    if (!data.woonplaats) newErrors.woonplaats = "Woonplaats is verplicht";
    if (!data.geboortedatum) newErrors.geboortedatum = "Geboortedatum is verplicht";
    
    if (!data.email) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Ongeldig e-mailadres";
    }
    
    if (!data.telefoon) {
      newErrors.telefoon = "Telefoonnummer is verplicht";
    }
    
    if (!data.hoe_hoorde_u_van_ons) {
      newErrors.hoe_hoorde_u_van_ons = "Dit veld is verplicht";
    }
    if (!data.referral) {
      newErrors.referral = "Referral e-mailadres is verplicht";
    } else if (!/\S+@\S+\.\S+/.test(data.referral)) {
      newErrors.referral = "Ongeldig e-mailadres";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Persoonlijke gegevens</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalDetails
          data={data}
          errors={errors}
          onChange={handleChange}
        />

        <DatePicker
          date={date}
          error={errors.geboortedatum}
          onSelect={handleDateChange}
        />

        <ContactDetails
          data={data}
          errors={errors}
          onChange={handleChange}
        />

        <AdditionalInfo
          data={data}
          errors={errors}
          onChange={handleChange}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Terug
          </Button>
          <Button type="submit">
            Volgende
          </Button>
        </div>
      </form>
    </div>
  );
};
