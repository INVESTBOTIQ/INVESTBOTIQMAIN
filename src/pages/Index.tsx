
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import SpiritsCount from "@/components/dashboard/SpiritsCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import ReferralInfo from "@/components/dashboard/ReferralInfo";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/tasks/TaskList";
import ReportsList from "@/components/reports/ReportsList";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welkom bij uw Investbotiq dashboard
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CashflowSummary />
              <SpiritsCount />
              <OpenTasks />
              <ReferralInfo />
            </div>
            <DashboardSummary />
            <div className="grid gap-6 md:grid-cols-2">
              <TaskList />
              <ReportsList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
