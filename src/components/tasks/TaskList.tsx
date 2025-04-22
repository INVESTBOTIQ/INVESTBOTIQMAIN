
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, File, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Define the task type to ensure type safety
interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  type: string;
}

const taskItems: Task[] = [
  {
    id: 1,
    title: "Onderteken contract voor nieuwe spirit",
    dueDate: "26 Apr 2025",
    priority: "high",
    completed: false,
    type: "contract",
  },
  {
    id: 2,
    title: "Verstuur identiteitsbewijs voor verificatie",
    dueDate: "28 Apr 2025",
    priority: "medium",
    completed: false,
    type: "document",
  },
  {
    id: 3,
    title: "Bevestig maandelijks rapport",
    dueDate: "30 Apr 2025",
    priority: "low",
    completed: false,
    type: "report",
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(taskItems);

  const handleTaskToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Taakstatus bijgewerkt");
  };

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

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Openstaande Taken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-start justify-between space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
              role="button"
              onClick={() => handleTaskToggle(task.id)}
            >
              <div className="flex space-x-4">
                <div>
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </Label>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>Uiterste datum: {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`flex items-center space-x-1 ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.type === "contract" ? (
                  <File className="h-4 w-4" />
                ) : task.type === "document" ? (
                  <File className="h-4 w-4" />
                ) : (
                  <CheckSquare className="h-4 w-4" />
                )}
                <span>{task.type}</span>
              </Badge>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-muted-foreground">
                Geen openstaande taken
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
