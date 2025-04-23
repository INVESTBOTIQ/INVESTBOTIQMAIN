
import { useMemo } from "react";
import { type Task, type TaskSortBy } from "@/types/task";

interface UseTaskFiltersProps {
  tasks: Task[];
  statusFilter: string;
  typeFilter: string;
  priorityFilter: string;
  sortBy: TaskSortBy;
}

export const useTaskFilters = ({
  tasks,
  statusFilter,
  typeFilter,
  priorityFilter,
  sortBy,
}: UseTaskFiltersProps) => {
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(task => task.type === typeFilter);
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime();
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

    return filtered;
  }, [tasks, statusFilter, typeFilter, priorityFilter, sortBy]);

  return { filteredAndSortedTasks };
};
