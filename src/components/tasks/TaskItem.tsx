
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check, Calendar } from "lucide-react";
import { format } from "date-fns";

interface TaskItemProps {
  task: {
    id: string;
    taak_omschrijving: string;
    deadline?: string;
    status: 'open' | 'completed' | 'expired';
    type: 'contract' | 'document' | 'report';
    priority: 'high' | 'medium' | 'low';
  };
  onStatusChange: (taskId: string) => void;
  onUpload: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onUpload }) => {
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

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0 sm:space-x-4 group hover:bg-accent hover:text-accent-foreground transition-colors"
    >
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
          <Button size="sm" variant="outline" onClick={() => onUpload(task.id)}>
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
  );
};
