
import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const AdminFlowlutas = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Flowlutas Beheer</h1>
          {/* Content will be added in future updates */}
          <p className="text-muted-foreground">
            Hier kunt u alle flowlutas beheren en monitoren.
          </p>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminFlowlutas, ["admin"]);
