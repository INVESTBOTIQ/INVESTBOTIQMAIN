
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlowlutaStatusBadge } from "./FlowlutaStatusBadge";
import { FlowlutaCardProps } from "../types/flowluta";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FlowlutaCard = ({ flowluta }: FlowlutaCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Tier {flowluta.tier}</CardTitle>
          <FlowlutaStatusBadge status={flowluta.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Cashflow:</span>
          <span className="font-medium">€{flowluta.monthly_cashflow}</span>
        </div>
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Geactiveerd op:</span>
          <span className="font-medium">
            {format(new Date(flowluta.activated_at), "dd/MM/yyyy")}
          </span>
        </div>
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Volgende activatie:</span>
          <span className="font-medium">
            {flowluta.next_activation_date
              ? format(new Date(flowluta.next_activation_date), "dd/MM/yyyy")
              : "N/A"}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="w-full mt-2" disabled>
                Details
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Deze functionaliteit is binnenkort beschikbaar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
