
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import SpiritsCount from "@/components/dashboard/SpiritsCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import ReferralInfo from "@/components/dashboard/ReferralInfo";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/tasks/TaskList";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Redirect admin to admin dashboard
  if (userRole === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Member Dashboard</h1>
              <p className="text-muted-foreground">
                Welkom bij uw Investbotiq dashboard
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <CashflowSummary />
              <SpiritsCount />
              <OpenTasks />
              <ReferralInfo />
            </div>
            <DashboardSummary />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
