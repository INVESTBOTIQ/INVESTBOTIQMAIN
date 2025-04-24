
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FlowlutasFiltersProps {
  onTierFilter: (tier: string) => void;
  onStatusFilter: (status: string) => void;
  onSearch: (search: string) => void;
}

export const FlowlutasFilters = ({
  onTierFilter,
  onStatusFilter,
  onSearch,
}: FlowlutasFiltersProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Input
        placeholder="Zoeken..."
        onChange={(e) => onSearch(e.target.value)}
        className="max-w-xs"
      />
      <Select onValueChange={onTierFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter op tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle tiers</SelectItem>
          <SelectItem value="1">Tier 1</SelectItem>
          <SelectItem value="2">Tier 2</SelectItem>
          <SelectItem value="3">Tier 3</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter op status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle statussen</SelectItem>
          <SelectItem value="planned">Gepland</SelectItem>
          <SelectItem value="active">Actief</SelectItem>
          <SelectItem value="paused">Gepauzeerd</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
