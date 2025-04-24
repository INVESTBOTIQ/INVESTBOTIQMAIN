
import { FadeIn } from "../info/FadeInAnimation";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TierSelectorProps {
  selectedTier: string;
  onTierChange: (value: string) => void;
}

export default function TierSelector({ selectedTier, onTierChange }: TierSelectorProps) {
  return (
    <FadeIn delay={0.3}>
      <div className="mb-10 max-w-xs mx-auto">
        <Select value={selectedTier} onValueChange={onTierChange}>
          <SelectTrigger className="w-full bg-white border-indigo-200 hover:border-indigo-300 transition-colors">
            <SelectValue placeholder="Selecteer een Tier Plan" />
            <ChevronDown className="h-4 w-4 text-indigo-500" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-indigo-100 shadow-lg z-50">
            <SelectItem value="inbotiq2" className="hover:bg-indigo-50 cursor-pointer">
              InBotIQ2 Tier 2-6
            </SelectItem>
            <SelectItem value="inbotiq1" className="text-gray-400 hover:bg-gray-50 cursor-not-allowed" disabled>
              InBotIQ1 Tier 1 (Binnenkort beschikbaar)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FadeIn>
  );
}
