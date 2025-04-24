
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlowlutaStatusBadgeProps } from "../types/flowluta";

export const FlowlutaStatusBadge = ({ status }: FlowlutaStatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "planned":
        return "bg-blue-500 hover:bg-blue-600";
      case "paused":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusTooltip = (status: string) => {
    switch (status) {
      case "active":
        return "Deze flowluta is actief en genereert momenteel cashflow";
      case "planned":
        return "Deze flowluta wordt automatisch geactiveerd volgens planning";
      case "paused":
        return "Deze flowluta is tijdelijk gepauzeerd";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusTooltip(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
