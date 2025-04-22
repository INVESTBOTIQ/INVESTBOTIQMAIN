
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const TotalValueCard = () => {
  const { data: totalValue, isLoading, error } = useQuery({
    queryKey: ["totalValue"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_total_value');
      
      if (error) {
        console.error("Error fetching total value:", error);
        return 0;
      }
      return data || 0;
    },
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Totale Opbouw
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center">
        <CircleDollarSign className="h-5 w-5 text-muted-foreground mr-2" />
        <div className="text-2xl font-bold">
          €{totalValue?.toLocaleString("nl-NL", { minimumFractionDigits: 2 }) || "0,00"}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalValueCard;
