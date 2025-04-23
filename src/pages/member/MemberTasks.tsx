
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskList } from "@/components/tasks/TaskList";

interface Task {
  id: string;
  taak_omschrijving: string;
  deadline?: string;
  status: 'open' | 'completed' | 'expired';
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
}

const MemberTasks = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"deadline" | "priority">("deadline");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map the database tasks to our Task interface
      return data.map(task => ({
        ...task,
        type: task.type || 'document',
        priority: task.priority || 'medium'
      })) as Task[];
    },
  });

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(task => task.type === typeFilter);
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime();
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

    return filtered;
  }, [tasks, statusFilter, typeFilter, priorityFilter, sortBy]);

  const completedCount = tasks.filter(task => task.status === "completed").length;
  const completionPercentage = tasks.length ? (completedCount / tasks.length) * 100 : 0;

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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Progress value={completionPercentage} className="w-full sm:w-64" />
                <p className="text-sm text-muted-foreground">
                  Je hebt {completedCount} van de {tasks.length} taken voltooid ({Math.round(completionPercentage)}%)
                </p>
              </div>
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
                  tasks={filteredAndSortedTasks}
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
