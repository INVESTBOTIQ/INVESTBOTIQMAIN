
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CashflowSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const CashflowSearch = ({ searchTerm, onSearchChange }: CashflowSearchProps) => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Zoek op naam of email"
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
