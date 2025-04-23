
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { TaskDeadline } from "./TaskDeadline";
import { TaskActions } from "./TaskActions";
import { type Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string) => void;
  onUpload: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onUpload }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0 sm:space-x-4 group hover:bg-accent hover:text-accent-foreground transition-colors">
      <div className="flex items-start space-x-4 flex-1">
        <Button
          size="sm"
          variant={task.status === "completed" ? "default" : "outline"}
          className="shrink-0"
          onClick={() => onStatusChange(task.id)}
        >
          <Check className="h-4 w-4" />
        </Button>
        
        <div className="space-y-1 min-w-0">
          <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
            {task.taak_omschrijving}
          </p>
          {task.deadline && <TaskDeadline deadline={task.deadline} />}
        </div>
      </div>

      <TaskActions
        taskId={task.id}
        type={task.type}
        priority={task.priority}
        onUpload={onUpload}
      />
    </div>
  );
};
