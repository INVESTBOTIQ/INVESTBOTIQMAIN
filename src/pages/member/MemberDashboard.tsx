import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import TotalValueCard from "@/components/dashboard/TotalValueCard";
import FlowlutasCount from "@/components/dashboard/FlowlutasCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/dashboard/TaskList";
import ReferralBox from "@/components/dashboard/ReferralBox";
import { withRoleGuard } from "@/utils/withRoleGuard";

// Let only 'member' users access this page
const MemberDashboard = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Member Dashboard</h1>
          <p className="text-muted-foreground">
            Welkom bij uw Investbotiq dashboard
          </p>
          {/* Four statistic cards - responsive grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <CashflowSummary />
            <TotalValueCard />
            <FlowlutasCount />
            <OpenTasks />
          </div>
          {/* Cashflow chart + task list - stacked on mobile, side-by-side on desktop */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 fade-in">
              <DashboardSummary />
            </div>
            <div className="fade-in slide-up">
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
