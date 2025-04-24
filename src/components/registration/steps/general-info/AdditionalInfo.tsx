
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdditionalInfoProps {
  data: {
    hoe_hoorde_u_van_ons: string;
    referral: string;
    plus_1: string;
    plus_1_voornaam?: string;
    plus_1_achternaam?: string;
    plus_1_email?: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdditionalInfo = ({ data, errors, onChange }: AdditionalInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hoe_hoorde_u_van_ons">Hoe heeft u van ons gehoord? <span className="text-destructive">*</span></Label>
        <Input
          id="hoe_hoorde_u_van_ons"
          name="hoe_hoorde_u_van_ons"
          value={data.hoe_hoorde_u_van_ons}
          onChange={onChange}
          required
          className={errors.hoe_hoorde_u_van_ons ? "border-destructive" : ""}
        />
        {errors.hoe_hoorde_u_van_ons && (
          <p className="text-destructive text-sm">{errors.hoe_hoorde_u_van_ons}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referral">Wie is uw referral? <span className="text-destructive">*</span></Label>
        <Input
          id="referral"
          name="referral"
          type="email"
          value={data.referral}
          onChange={onChange}
          required
          placeholder="E-mailadres van uw referral"
          className={errors.referral ? "border-destructive" : ""}
        />
        {errors.referral && (
          <p className="text-destructive text-sm">{errors.referral}</p>
        )}
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium">Plus één informatie</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plus_1_voornaam">Voornaam plus één <span className="text-destructive">*</span></Label>
            <Input
              id="plus_1_voornaam"
              name="plus_1_voornaam"
              value={data.plus_1_voornaam || ''}
              onChange={onChange}
              required
              className={errors.plus_1_voornaam ? "border-destructive" : ""}
            />
            {errors.plus_1_voornaam && (
              <p className="text-destructive text-sm">{errors.plus_1_voornaam}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="plus_1_achternaam">Achternaam plus één <span className="text-destructive">*</span></Label>
            <Input
              id="plus_1_achternaam"
              name="plus_1_achternaam"
              value={data.plus_1_achternaam || ''}
              onChange={onChange}
              required
              className={errors.plus_1_achternaam ? "border-destructive" : ""}
            />
            {errors.plus_1_achternaam && (
              <p className="text-destructive text-sm">{errors.plus_1_achternaam}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="plus_1_email">E-mailadres plus één <span className="text-destructive">*</span></Label>
            <Input
              id="plus_1_email"
              name="plus_1_email"
              type="email"
              value={data.plus_1_email || ''}
              onChange={onChange}
              required
              className={errors.plus_1_email ? "border-destructive" : ""}
            />
            {errors.plus_1_email && (
              <p className="text-destructive text-sm">{errors.plus_1_email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
