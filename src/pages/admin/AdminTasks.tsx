
import { withRoleGuard } from "@/utils/withRoleGuard";
import { TasksPage } from "@/components/tasks/TasksPage";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";

const AdminTasks = () => {
  return (
    <div>
      <Header />
      <AdminNavBar />
      <TasksPage />
    </div>
  );
};

export default withRoleGuard(AdminTasks, ["admin"]);
