
import { withRoleGuard } from "@/utils/withRoleGuard";
import { TasksPage } from "@/components/tasks/TasksPage";
import { AdminNavBar } from "@/components/admin/AdminNavBar";

const AdminTasks = () => {
  return (
    <div>
      <AdminNavBar />
      <TasksPage />
    </div>
  );
};

export default withRoleGuard(AdminTasks, ["admin"]);
