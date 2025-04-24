
import { withRoleGuard } from "@/utils/withRoleGuard";
import { TasksPage } from "@/components/tasks/TasksPage";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";

const AdminTasks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-2">Takenbeheer</h2>
        <p className="text-muted-foreground mb-4">
          Beheer alle taken in het Investbotiq platform.
        </p>
        <TasksPage showHeader={false} />
      </div>
    </div>
  );
};

export default withRoleGuard(AdminTasks, ["admin"]);
