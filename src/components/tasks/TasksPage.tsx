
import React, { useState } from "react";
import { type TaskSortBy } from "@/types/task";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskHeader } from "./TaskHeader";
import { TaskList } from "./TaskList";
import { TaskProgress } from "./TaskProgress";
import { useTaskManagement } from "@/hooks/useTaskManagement";

export const TasksPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<TaskSortBy>("deadline");

  const { tasks, handleStatusChange, handleUpload } = useTaskManagement();

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
