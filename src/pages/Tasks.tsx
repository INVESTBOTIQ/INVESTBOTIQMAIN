
import { withRoleGuard } from "@/utils/withRoleGuard";
import { TasksPage } from "@/components/tasks/TasksPage";

const Tasks = () => {
  return <TasksPage />;
};

export default withRoleGuard(Tasks, ["member"]);
