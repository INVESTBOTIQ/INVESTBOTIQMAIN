
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessageTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MessageTypeSelector = ({ value, onChange }: MessageTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Type Bericht</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="type">
          <SelectValue placeholder="Selecteer type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="info">Informatie</SelectItem>
          <SelectItem value="task">Taak Update</SelectItem>
          <SelectItem value="success">Succes Melding</SelectItem>
          <SelectItem value="warning">Waarschuwing</SelectItem>
          <SelectItem value="security">Beveiligingsbericht</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
