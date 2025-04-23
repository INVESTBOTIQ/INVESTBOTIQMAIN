
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskProgress } from "@/components/tasks/TaskProgress";
import { type Task, type TaskSortBy } from "@/types/task";

const MemberTasks = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<TaskSortBy>("deadline");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Task[];
    },
  });

  const handleStatusChange = async (taskId: string) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status: "completed" })
      .eq("id", taskId);

    if (error) {
      toast.error("Er is een fout opgetreden bij het bijwerken van de taak");
      return;
    }

    toast.success("Taakstatus bijgewerkt");
  };

  const handleUpload = (taskId: string) => {
    toast.info("Uploadfunctionaliteit komt binnenkort beschikbaar");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Taken</h1>
              <TaskProgress tasks={tasks} />
            </div>

            <Card>
              <CardHeader className="space-y-4">
                <CardTitle>Takenlijst</CardTitle>
                <TaskHeader
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  priorityFilter={priorityFilter}
                  sortBy={sortBy}
                  onStatusChange={setStatusFilter}
                  onTypeChange={setTypeFilter}
                  onPriorityChange={setPriorityFilter}
                  onSortChange={setSortBy}
                />
              </CardHeader>

              <CardContent>
                <TaskList
                  tasks={tasks}
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  priorityFilter={priorityFilter}
                  sortBy={sortBy}
                  onStatusChange={handleStatusChange}
                  onUpload={handleUpload}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(MemberTasks, ["member"]);
