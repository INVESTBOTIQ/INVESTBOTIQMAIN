
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Task } from "@/types/task";

const OpenTasks = () => {
  // Fetch the open tasks count
  const { data: openTasksCount = 0 } = useQuery({
    queryKey: ["openTasksCount"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("tasks")
        .select("*", { count: 'exact', head: true })
        .eq("status", "open");

      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Open Taken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <CheckSquare className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-2xl font-bold">{openTasksCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTasks;
