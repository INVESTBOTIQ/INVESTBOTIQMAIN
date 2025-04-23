
import React from "react";
import { TaskItem } from "./TaskItem";

interface Task {
  id: string;
  taak_omschrijving: string;
  deadline?: string;
  status: 'open' | 'completed' | 'expired';
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
}

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string) => void;
  onUpload: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onUpload }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">
          Geen taken gevonden
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onUpload={onUpload}
        />
      ))}
    </div>
  );
};
