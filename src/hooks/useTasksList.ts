
import React from "react";
import { type Task } from "@/types/task";

interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  type: "contract" | "document" | "report";
}

const taskItems: TaskItem[] = [
  {
    id: 1,
    title: "Onderteken contract voor nieuwe spirit",
    description: "Bekijk en onderteken het contract voor de nieuwe spirit investering.",
    dueDate: "26 Apr 2025",
    priority: "high",
    completed: false,
    type: "contract",
  },
  {
    id: 2,
    title: "Verstuur identiteitsbewijs voor verificatie",
    description: "Upload een recente kopie van uw identiteitsbewijs voor verificatie.",
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

export const useTasksList = () => {
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

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    handleTaskToggle,
  };
};
