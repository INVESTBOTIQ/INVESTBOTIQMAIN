
import React from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface TaskDeadlineProps {
  deadline: string;
}

export const TaskDeadline: React.FC<TaskDeadlineProps> = ({ deadline }) => {
  const getDeadlineColor = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 1) return "text-red-500";
    if (days <= 4) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Calendar className="h-4 w-4" />
      <span className={getDeadlineColor(deadline)}>
        {format(new Date(deadline), "d MMM yyyy")}
      </span>
    </div>
  );
};
