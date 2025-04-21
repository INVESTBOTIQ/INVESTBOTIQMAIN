
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, File, Tasks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const taskItems = [
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
  const [tasks, setTasks] = React.useState(taskItems);

  const handleTaskToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <File className="h-4 w-4" />;
      case "document":
        return <File className="h-4 w-4" />;
      case "report":
        return <Tasks className="h-4 w-4" />;
      default:
        return <Tasks className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Openstaande Taken</CardTitle>
        <Button variant="outline" size="sm">
          Alle Taken
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between space-x-4 rounded-lg border p-4"
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
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={`flex items-center space-x-1 ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getTypeIcon(task.type)}
                  <span className="capitalize">
                    {task.type === "contract"
                      ? "Contract"
                      : task.type === "document"
                      ? "Document"
                      : "Rapport"}
                  </span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
