
import { withRoleGuard } from "@/utils/withRoleGuard";
import { TasksPage } from "@/components/tasks/TasksPage";

const MemberTasks = () => {
  return <TasksPage />;
};

export default withRoleGuard(MemberTasks, ["member"]);
