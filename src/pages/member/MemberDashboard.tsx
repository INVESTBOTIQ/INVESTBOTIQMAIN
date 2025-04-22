
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import TotalValueCard from "@/components/dashboard/TotalValueCard";
import SpiritsCount from "@/components/dashboard/SpiritsCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/tasks/TaskList";
import ReferralBox from "@/components/dashboard/ReferralBox";
import { withRoleGuard } from "@/utils/withRoleGuard";

// Let only 'member' users access this page
const MemberDashboard = () => (
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
          {/* Four statistic cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CashflowSummary />
            <TotalValueCard />
            <SpiritsCount />
            <OpenTasks />
          </div>
          {/* Cashflow chart + task list */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DashboardSummary />
            </div>
            <div className="lg:col-span-1">
              <TaskList />
            </div>
          </div>
          {/* Referral section */}
          <ReferralBox />
        </div>
      </main>
    </div>
  </div>
);

// Export with member-only access
export default withRoleGuard(MemberDashboard, ["member"]);
