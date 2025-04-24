
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecipientSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RecipientSelector = ({ value, onChange }: RecipientSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="recipients">Ontvangers</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="recipients">
          <SelectValue placeholder="Selecteer ontvangers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Gebruikers</SelectItem>
          <SelectItem value="active">Actieve Gebruikers</SelectItem>
          <SelectItem value="pending">Nieuwe Gebruikers</SelectItem>
          <SelectItem value="select">Selecteer Gebruikers...</SelectItem>
        </SelectContent>
      </Select>

      {value === "select" && (
        <div className="p-4 border rounded-md bg-muted mt-2">
          <p className="text-sm text-muted-foreground mb-2">Selecteer specifieke gebruikers:</p>
          <div className="flex items-center gap-2 mb-2">
            <Input placeholder="Zoek gebruikers..." className="flex-1" />
            <Button variant="outline" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Voeg toe
            </Button>
          </div>
          <div className="h-32 border rounded-md p-2 overflow-y-auto bg-card">
            <p className="text-center text-sm text-muted-foreground pt-12">
              Geen gebruikers geselecteerd
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
