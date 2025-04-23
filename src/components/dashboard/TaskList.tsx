
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { type Task } from "@/types/task";

const TaskList = () => {
  const navigate = useNavigate();
  
  const { data: recentTasks = [] } = useQuery({
    queryKey: ["recentTasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      return data as Task[];
    },
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recente Taken</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentTasks.length > 0 ? (
          <>
            {recentTasks.map(task => (
              <div key={task.id} className="flex items-start space-x-3 p-2 rounded hover:bg-accent transition-colors">
                <div className="mt-0.5">
                  <Check className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{task.taak_omschrijving}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="ghost" 
              className="w-full text-xs mt-2" 
              onClick={() => navigate("/member/tasks")}
            >
              Bekijk alle taken
            </Button>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Geen taken gevonden</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
