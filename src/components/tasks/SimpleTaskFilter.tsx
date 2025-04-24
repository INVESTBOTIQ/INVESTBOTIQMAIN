
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const SimpleTaskFilter: React.FC<TaskFilterProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] md:w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent position="popper" className="min-w-[220px]">
        <SelectItem value="all">Alle taken</SelectItem>
        <SelectItem value="pending">Openstaand</SelectItem>
        <SelectItem value="completed">Afgerond</SelectItem>
        <SelectItem value="high">Hoge prioriteit</SelectItem>
        <SelectItem value="medium">Gemiddelde prioriteit</SelectItem>
        <SelectItem value="low">Lage prioriteit</SelectItem>
      </SelectContent>
    </Select>
  );
};
