
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type Task = {
  id: string;
  taak_omschrijving: string;
  deadline?: string;
  status: 'open' | 'completed' | 'expired';
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
};

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
      return data as Task[];
    },
  });

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply filters
    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(task => task.type === typeFilter);
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply sorting
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
  const completionPercentage = (completedCount / tasks.length) * 100;

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

  const getDeadlineColor = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 1) return "text-red-500";
    if (days <= 4) return "text-yellow-500";
    return "text-green-500";
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors];
  };

  const handleUpload = (taskId: string) => {
    // TODO: Implement file upload
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
                <div className="flex flex-wrap gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter op status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle statussen</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="completed">Afgerond</SelectItem>
                      <SelectItem value="expired">Verlopen</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter op type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle types</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="report">Rapport</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter op prioriteit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle prioriteiten</SelectItem>
                      <SelectItem value="high">Hoog</SelectItem>
                      <SelectItem value="medium">Gemiddeld</SelectItem>
                      <SelectItem value="low">Laag</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as "deadline" | "priority")}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sorteer op" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="priority">Prioriteit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {filteredAndSortedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0 sm:space-x-4 group hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <Button
                          size="sm"
                          variant={task.status === "completed" ? "default" : "outline"}
                          className="shrink-0"
                          onClick={() => handleStatusChange(task.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        
                        <div className="space-y-1 min-w-0">
                          <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                            {task.taak_omschrijving}
                          </p>
                          {task.deadline && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span className={getDeadlineColor(task.deadline)}>
                                {format(new Date(task.deadline), "d MMM yyyy")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <Badge variant="outline" className={getPriorityBadge(task.priority)}>
                          {task.priority}
                        </Badge>
                        
                        {task.type === "document" && (
                          <Button size="sm" variant="outline" onClick={() => handleUpload(task.id)}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        )}
                        {task.type === "contract" && (
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Bekijk
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredAndSortedTasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">
                        Geen taken gevonden
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(MemberTasks, ["member"]);
