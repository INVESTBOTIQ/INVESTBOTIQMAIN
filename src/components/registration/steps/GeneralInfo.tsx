
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
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
    
    // Phone validation (simple check for now)
    if (!data.telefoon) {
      newErrors.telefoon = "Telefoonnummer is verplicht";
    }
    
    setErrors(newErrors);
    
    // If no errors, proceed to next step
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Persoonlijke gegevens</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="voornaam">Voornaam <span className="text-destructive">*</span></Label>
            <Input
              id="voornaam"
              name="voornaam"
              value={data.voornaam}
              onChange={handleChange}
              className={errors.voornaam ? "border-destructive" : ""}
            />
            {errors.voornaam && (
              <p className="text-destructive text-sm">{errors.voornaam}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="achternaam">Achternaam <span className="text-destructive">*</span></Label>
            <Input
              id="achternaam"
              name="achternaam"
              value={data.achternaam}
              onChange={handleChange}
              className={errors.achternaam ? "border-destructive" : ""}
            />
            {errors.achternaam && (
              <p className="text-destructive text-sm">{errors.achternaam}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="woonplaats">Woonplaats <span className="text-destructive">*</span></Label>
          <Input
            id="woonplaats"
            name="woonplaats"
            value={data.woonplaats}
            onChange={handleChange}
            className={errors.woonplaats ? "border-destructive" : ""}
          />
          {errors.woonplaats && (
            <p className="text-destructive text-sm">{errors.woonplaats}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="geboortedatum">Geboortedatum <span className="text-destructive">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  errors.geboortedatum && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd-MM-yyyy") : <span>Selecteer een datum</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {errors.geboortedatum && (
            <p className="text-destructive text-sm">{errors.geboortedatum}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mailadres <span className="text-destructive">*</span></Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefoon">Telefoonnummer <span className="text-destructive">*</span></Label>
          <Input
            id="telefoon"
            name="telefoon"
            value={data.telefoon}
            onChange={handleChange}
            className={errors.telefoon ? "border-destructive" : ""}
          />
          {errors.telefoon && (
            <p className="text-destructive text-sm">{errors.telefoon}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hoe_hoorde_u_van_ons">Hoe heeft u van ons gehoord?</Label>
          <Input
            id="hoe_hoorde_u_van_ons"
            name="hoe_hoorde_u_van_ons"
            value={data.hoe_hoorde_u_van_ons}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referral">Wie is uw referral?</Label>
          <Input
            id="referral"
            name="referral"
            value={data.referral}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plus_1">Wie is uw plus één?</Label>
          <Input
            id="plus_1"
            name="plus_1"
            value={data.plus_1}
            onChange={handleChange}
          />
        </div>

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
