
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, File, CheckSquare } from "lucide-react";

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  type: "contract" | "document" | "report";
  onToggle: (id: number) => void;
}

export const SimpleTaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  dueDate,
  priority,
  completed,
  type,
  onToggle,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <File className="h-4 w-4" />;
      case "document":
        return <File className="h-4 w-4" />;
      case "report":
        return <CheckSquare className="h-4 w-4" />;
      default:
        return <CheckSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-4 md:flex-row md:items-start md:justify-between md:space-x-4 md:space-y-0">
      <div className="flex space-x-4">
        <div>
          <Checkbox
            id={`task-${id}`}
            checked={completed}
            onCheckedChange={() => onToggle(id)}
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor={`task-${id}`}
            className={`font-medium ${
              completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {title}
          </Label>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            <span>Uiterste datum: {dueDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge
          variant="outline"
          className={`flex items-center space-x-1 ${getPriorityColor(priority)}`}
        >
          {getTypeIcon(type)}
          <span className="capitalize">
            {type === "contract"
              ? "Contract"
              : type === "document"
              ? "Document"
              : "Rapport"}
          </span>
        </Badge>
        <Button size="sm" variant="outline">
          Details
        </Button>
      </div>
    </div>
  );
};
