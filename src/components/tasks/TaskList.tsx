
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

  // Function to check if a task deadline is soon (within 3 days)
  const isDeadlineSoon = (dateString: string) => {
    const dueDate = new Date(dateString.replace(/(Jan|Feb|Mar|Apr|Mei|Jun|Jul|Aug|Sep|Okt|Nov|Dec)/, (match) => {
      const months: Record<string, string> = {
        'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
        'Mei': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 
        'Sep': 'September', 'Okt': 'October', 'Nov': 'November', 'Dec': 'December'
      };
      return months[match] || match;
    }));
    
    const today = new Date();
    const diffInDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays >= 0 && diffInDays <= 3;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Openstaande Taken</CardTitle>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {tasks.filter(t => !t.completed).length} openstaand
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex flex-col sm:flex-row sm:items-start justify-between space-y-2 sm:space-y-0 sm:space-x-4 rounded-lg border p-3 sm:p-4 transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer task-item"
              onClick={() => handleTaskToggle(task.id)}
            >
              <div className="flex space-x-4">
                <div className="pt-0.5">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="mobile-btn"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium text-base ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </Label>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span className={isDeadlineSoon(task.dueDate) && !task.completed ? "text-red-500 font-medium" : ""}>
                      Uiterste datum: {task.dueDate}
                      {isDeadlineSoon(task.dueDate) && !task.completed && " (binnenkort)"}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`flex items-center space-x-1 self-start sm:self-center ${getPriorityColor(
                  task.priority
                )} mt-2 sm:mt-0`}
              >
                {getTypeIcon(task.type)}
                <span className="ml-1">{task.type}</span>
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
