
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Zoeken..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-3">
          <Select onValueChange={onTierFilter} defaultValue="all">
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter op tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle tiers</SelectItem>
              <SelectItem value="1">Tier 1</SelectItem>
              <SelectItem value="2">Tier 2</SelectItem>
              <SelectItem value="3">Tier 3</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={onStatusFilter} defaultValue="all">
            <SelectTrigger className="flex-1">
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
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Zoeken..."
        onChange={(e) => onSearch(e.target.value)}
        className="max-w-xs"
      />
      <Select onValueChange={onTierFilter} defaultValue="all">
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
      <Select onValueChange={onStatusFilter} defaultValue="all">
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
