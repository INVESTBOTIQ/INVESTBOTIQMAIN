
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OpenTasks = () => {
  const { data: tasksCount } = useQuery({
    queryKey: ["openTasks"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("tasks")
        .select("*", { count: "exact" })
        .eq("status", "open");
      
      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Open Taken
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{tasksCount || 0}</div>
      </CardContent>
    </Card>
  );
};

export default OpenTasks;
