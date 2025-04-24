
import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { FlowlutasDataGrid } from "@/components/flowlutas/FlowlutasDataGrid";
import { FlowlutasChart } from "@/components/flowlutas/FlowlutasChart";
import { FlowlutasFilters } from "@/components/flowlutas/FlowlutasFilters";
import { Separator } from "@/components/ui/separator";

const AdminFlowlutas = () => {
  const handleTierFilter = (tier: string) => {
    console.log("Filter by tier:", tier);
  };

  const handleStatusFilter = (status: string) => {
    console.log("Filter by status:", status);
  };

  const handleSearch = (search: string) => {
    console.log("Search:", search);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">Flowlutas Beheer</h1>
              <p className="text-muted-foreground">
                Beheer en monitor alle flowlutas in het systeem
              </p>
            </div>
            
            <FlowlutasFilters
              onTierFilter={handleTierFilter}
              onStatusFilter={handleStatusFilter}
              onSearch={handleSearch}
            />

            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Flowlutas Overzicht</h2>
              <FlowlutasDataGrid />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Cashflow Trend</h2>
              <FlowlutasChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminFlowlutas, ["admin"]);
