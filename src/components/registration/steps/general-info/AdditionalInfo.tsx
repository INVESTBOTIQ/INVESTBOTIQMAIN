
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdditionalInfoProps {
  data: {
    hoe_hoorde_u_van_ons: string;
    referral: string;
    plus_1: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdditionalInfo = ({ data, onChange }: AdditionalInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hoe_hoorde_u_van_ons">Hoe heeft u van ons gehoord?</Label>
        <Input
          id="hoe_hoorde_u_van_ons"
          name="hoe_hoorde_u_van_ons"
          value={data.hoe_hoorde_u_van_ons}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="referral">Wie is uw referral?</Label>
        <Input
          id="referral"
          name="referral"
          value={data.referral}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="plus_1">Wie is uw plus één?</Label>
        <Input
          id="plus_1"
          name="plus_1"
          value={data.plus_1}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
