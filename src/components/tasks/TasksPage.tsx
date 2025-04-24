
import React, { useState } from "react";
import { type TaskSortBy } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskHeader } from "./TaskHeader";
import { TaskList } from "./TaskList";
import { TaskProgress } from "./TaskProgress";
import { useTaskManagement } from "@/hooks/useTaskManagement";

interface TasksPageProps {
  showHeader?: boolean;
}

export const TasksPage: React.FC<TasksPageProps> = ({ showHeader = false }) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<TaskSortBy>("deadline");

  const { tasks, handleStatusChange, handleUpload } = useTaskManagement();

  return (
    <main className="flex-1">
      <div className="flex flex-col gap-6">
        {showHeader && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Taken</h1>
          </div>
        )}

        <TaskProgress tasks={tasks} />

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
  );
};
