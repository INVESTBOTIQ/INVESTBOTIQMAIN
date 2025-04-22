
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, File, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withRoleGuard } from "@/utils/withRoleGuard";

const taskItems = [
  {
    id: 1,
    title: "Onderteken contract voor nieuwe spirit",
    description:
      "Bekijk en onderteken het contract voor de nieuwe spirit investering.",
    dueDate: "26 Apr 2025",
    priority: "high",
    completed: false,
    type: "contract",
  },
  {
    id: 2,
    title: "Verstuur identiteitsbewijs voor verificatie",
    description:
      "Upload een recente kopie van uw identiteitsbewijs voor verificatie.",
    dueDate: "28 Apr 2025",
    priority: "medium",
    completed: false,
    type: "document",
  },
  {
    id: 3,
    title: "Bevestig maandelijks rapport",
    description: "Bekijk en bevestig het maandelijkse voortgangsrapport.",
    dueDate: "30 Apr 2025",
    priority: "low",
    completed: false,
    type: "report",
  },
  {
    id: 4,
    title: "Update persoonlijke gegevens",
    description: "Controleer en actualiseer uw persoonlijke gegevens.",
    dueDate: "2 Mei 2025",
    priority: "medium",
    completed: false,
    type: "document",
  },
  {
    id: 5,
    title: "Bevestig nieuwe spirit activatie",
    description: "Bevestig de activatie van uw nieuwste spirit.",
    dueDate: "5 Mei 2025",
    priority: "high",
    completed: false,
    type: "contract",
  },
];

const MemberTasks = () => {
  const [tasks, setTasks] = React.useState(taskItems);
  const [filter, setFilter] = React.useState("all");

  const handleTaskToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = React.useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "high":
        return tasks.filter((task) => task.priority === "high");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "low":
        return tasks.filter((task) => task.priority === "low");
      default:
        return tasks;
    }
  }, [tasks, filter]);

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
              <div className="flex items-center gap-4">
                <Select
                  value={filter}
                  onValueChange={setFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle taken</SelectItem>
                    <SelectItem value="pending">Openstaand</SelectItem>
                    <SelectItem value="completed">Afgerond</SelectItem>
                    <SelectItem value="high">Hoge prioriteit</SelectItem>
                    <SelectItem value="medium">Gemiddelde prioriteit</SelectItem>
                    <SelectItem value="low">Lage prioriteit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Taken ({filteredTasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col space-y-4 rounded-lg border p-4 md:flex-row md:items-start md:justify-between md:space-x-4 md:space-y-0"
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
                              task.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {task.title}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
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
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredTasks.length === 0 && (
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

export default withRoleGuard(MemberTasks, ["member"]);
