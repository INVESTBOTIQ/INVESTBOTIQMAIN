
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleTaskItem } from "@/components/tasks/SimpleTaskItem";
import { SimpleTaskFilter } from "@/components/tasks/SimpleTaskFilter";
import { useTasksList } from "@/hooks/useTasksList";
import { withRoleGuard } from "@/utils/withRoleGuard";

const TasksPage = () => {
  const { tasks, filter, setFilter, handleTaskToggle } = useTasksList();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Taken</h1>
                <p className="text-muted-foreground">
                  Beheer uw openstaande taken
                </p>
              </div>
              <SimpleTaskFilter value={filter} onChange={setFilter} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Taken ({tasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <SimpleTaskItem
                      key={task.id}
                      {...task}
                      onToggle={handleTaskToggle}
                    />
                  ))}
                  {tasks.length === 0 && (
                    <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                      <p className="text-center text-muted-foreground">
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

export default withRoleGuard(TasksPage, ["member"]);
