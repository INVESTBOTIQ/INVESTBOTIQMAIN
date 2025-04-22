
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { withRoleGuard } from "@/utils/withRoleGuard";

const adminTabs = [
  { value: "users", label: "Users", path: "/admin/users" },
  { value: "tasks", label: "Tasks", path: "/admin/tasks" },
  { value: "cashflows", label: "Cashflows", path: "/admin/cashflows" },
  { value: "spirits", label: "Spirits", path: "/admin/spirits" },
  { value: "notifications", label: "Notifications", path: "/admin/notifications" },
];

const getTabValueFromPath = (pathname: string) => {
  for (const tab of adminTabs) {
    if (pathname.startsWith(tab.path)) return tab.value;
  }
  return "users";
};

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getTabValueFromPath(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            </div>
            <Tabs value={activeTab} className="w-full">
              <TabsList>
                {adminTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => navigate(tab.path)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminDashboard, ["admin"]);
