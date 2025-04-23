
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText } from "lucide-react";

interface TaskActionsProps {
  taskId: string;
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
  onUpload: (taskId: string) => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ taskId, type, priority, onUpload }) => {
  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <Badge variant="outline" className={getPriorityBadge(priority)}>
        {priority}
      </Badge>
      
      {type === "document" && (
        <Button size="sm" variant="outline" onClick={() => onUpload(taskId)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      )}
      {type === "contract" && (
        <Button size="sm" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Bekijk
        </Button>
      )}
    </div>
  );
};
