
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalDetailsProps {
  data: {
    voornaam: string;
    achternaam: string;
    woonplaats: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalDetails = ({ data, errors, onChange }: PersonalDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="voornaam">Voornaam <span className="text-destructive">*</span></Label>
        <Input
          id="voornaam"
          name="voornaam"
          value={data.voornaam}
          onChange={onChange}
          className={errors.voornaam ? "border-destructive" : ""}
          required
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
          onChange={onChange}
          className={errors.achternaam ? "border-destructive" : ""}
          required
        />
        {errors.achternaam && (
          <p className="text-destructive text-sm">{errors.achternaam}</p>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="woonplaats">Woonplaats <span className="text-destructive">*</span></Label>
        <Input
          id="woonplaats"
          name="woonplaats"
          value={data.woonplaats}
          onChange={onChange}
          className={errors.woonplaats ? "border-destructive" : ""}
          required
        />
        {errors.woonplaats && (
          <p className="text-destructive text-sm">{errors.woonplaats}</p>
        )}
      </div>
    </div>
  );
};
