
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SpiritsCount = () => {
  const { data: spiritsCount } = useQuery({
    queryKey: ["activeSpirits"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("spirits")
        .select("*", { count: "exact" });
      
      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Actieve Spirits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{spiritsCount || 0}</div>
      </CardContent>
    </Card>
  );
};

export default SpiritsCount;
