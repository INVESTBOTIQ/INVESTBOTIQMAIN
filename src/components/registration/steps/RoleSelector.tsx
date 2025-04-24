
import { Role } from "../MultiStepForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const roles: { id: Role; label: string }[] = [
  { id: "member", label: "Member" },
  { id: "student", label: "Student" },
  { id: "ouder", label: "Ouder" },
  { id: "affiliated", label: "Affiliated" },
  { id: "freelancer", label: "Freelancer" },
  { id: "ondernemer", label: "Ondernemer" },
  { id: "artiest", label: "Artiest" },
];

interface RoleSelectorProps {
  selected: Role;
  onSelect: (role: Role) => void;
}

export const RoleSelector = ({ selected, onSelect }: RoleSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Kies uw rol</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={`p-4 cursor-pointer transition-colors ${
              selected === role.id
                ? "border-primary bg-primary/10"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelect(role.id)}
          >
            <h3 className="text-lg font-medium">{role.label}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};
