
import { CalendarDays } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FlowlutaDetailsProps {
  activatedAt: string;
  nextActivation?: string;
  cashPosition: string;
}

export const FlowlutaDetailsAccordion = ({
  activatedAt,
  nextActivation,
  cashPosition,
}: FlowlutaDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-between text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          Details
          <svg
            className={`h-4 w-4 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-2 py-3 bg-gray-50 rounded-b-lg mt-2">
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <CalendarDays className="h-4 w-4" />
          <div className="space-y-1">
            <p>Geactiveerd op: {activatedAt}</p>
            {nextActivation && <p>Volgende activatie: {nextActivation}</p>}
            <p>Kaspositie bij activering: {cashPosition}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
