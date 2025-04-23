
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TaskHeaderProps {
  statusFilter: string;
  typeFilter: string;
  priorityFilter: string;
  sortBy: "deadline" | "priority";
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: "deadline" | "priority") => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  statusFilter,
  typeFilter,
  priorityFilter,
  sortBy,
  onStatusChange,
  onTypeChange,
  onPriorityChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter op status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle statussen</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="completed">Afgerond</SelectItem>
          <SelectItem value="expired">Verlopen</SelectItem>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter op type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle types</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="document">Document</SelectItem>
          <SelectItem value="report">Rapport</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter op prioriteit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle prioriteiten</SelectItem>
          <SelectItem value="high">Hoog</SelectItem>
          <SelectItem value="medium">Gemiddeld</SelectItem>
          <SelectItem value="low">Laag</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(value) => onSortChange(value as "deadline" | "priority")}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sorteer op" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deadline">Deadline</SelectItem>
          <SelectItem value="priority">Prioriteit</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
