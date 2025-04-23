
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FlowlutasCount = () => {
  const { data: flowlutasCount } = useQuery({
    queryKey: ["activeFlowlutas"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("flowlutas")
        .select("*", { count: "exact" });
      
      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Actieve Flowlutas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{flowlutasCount || 0}</div>
      </CardContent>
    </Card>
  );
};

export default FlowlutasCount;
