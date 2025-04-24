
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactDetailsProps {
  data: {
    email: string;
    telefoon: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactDetails = ({ data, errors, onChange }: ContactDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mailadres <span className="text-destructive">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
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
          onChange={onChange}
          className={errors.telefoon ? "border-destructive" : ""}
        />
        {errors.telefoon && (
          <p className="text-destructive text-sm">{errors.telefoon}</p>
        )}
      </div>
    </div>
  );
};
