
import React from "react";
import { Progress } from "@/components/ui/progress";
import { type Task } from "@/types/task";

interface TaskProgressProps {
  tasks: Task[];
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ tasks }) => {
  const completedCount = tasks.filter(task => task.status === "completed").length;
  const completionPercentage = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Progress value={completionPercentage} className="w-full sm:w-64" />
      <p className="text-sm text-muted-foreground">
        Je hebt {completedCount} van de {tasks.length} taken voltooid ({Math.round(completionPercentage)}%)
      </p>
    </div>
  );
};
