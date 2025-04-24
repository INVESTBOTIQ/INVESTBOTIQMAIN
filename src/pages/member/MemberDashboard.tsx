
import React from "react";
import Header from "@/components/Header";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import TotalValueCard from "@/components/dashboard/TotalValueCard";
import FlowlutasCount from "@/components/dashboard/FlowlutasCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/dashboard/TaskList";
import ReferralBox from "@/components/dashboard/ReferralBox";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/components/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FadeIn } from "@/components/info/FadeInAnimation";
import { motion } from "framer-motion";

// Let only 'member' users access this page
const MemberDashboard = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Extract first name from email for personalized greeting
  const getFirstName = () => {
    if (!user || !user.email) return "";
    const emailParts = user.email.split('@');
    const namePart = emailParts[0];
    // Convert first letter to uppercase for nicer display
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).split('.')[0];
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
      {/* Achtergrond orbs en animaties */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 opacity-30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-2xl z-0"
        animate={{ scale: [1, 1.07, 1], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <Header />
      <div className="flex flex-1 relative z-10">
        <CollapsibleSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="flex flex-col gap-8">
            {/* Hero header met animatie */}
            <FadeIn delay={0.08} className="space-y-2 mb-2">
              <div className="flex items-center gap-3">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.7 }} className="bg-primary/10 rounded-full p-2 shadow-md">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#6366F1" fillOpacity="0.15"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="#6366F1"/></svg>
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary drop-shadow-sm">Welkom {getFirstName() ? getFirstName() : "bij Investbotiq"}</h1>
              </div>
              <p className="text-muted-foreground text-lg md:text-xl">Jouw persoonlijke overzicht & voortgang</p>
            </FadeIn>

            {/* Statistic cards met animatie */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <FadeIn delay={0.15}><CashflowSummary /></FadeIn>
              <FadeIn delay={0.2}><TotalValueCard /></FadeIn>
              <FadeIn delay={0.25}><FlowlutasCount /></FadeIn>
              <FadeIn delay={0.3}><OpenTasks /></FadeIn>
            </div>

            {/* Cashflow chart + task list */}
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
              <FadeIn delay={0.35} className="lg:col-span-2">
                {isMobile ? (
                  <ScrollArea className="w-full">
                    <div className="min-w-[600px]">
                      <DashboardSummary />
                    </div>
                  </ScrollArea>
                ) : (
                  <DashboardSummary />
                )}
              </FadeIn>
              <FadeIn delay={0.45} className="fade-in slide-up">
                <TaskList />
              </FadeIn>
            </div>

            {/* Referral section */}
            <FadeIn delay={0.55}>
              <ReferralBox />
            </FadeIn>

            {/* Mobile help hint */}
            {isMobile && (
              <FadeIn delay={0.7}>
                <div className="mt-4 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground border border-muted-foreground/20 shadow">
                  <p className="mb-2">Swipe over grafieken om meer detail te zien</p>
                  <p>Open menu rechtsboven voor meer navigatie opties</p>
                </div>
              </FadeIn>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Export with member-only access
export default withRoleGuard(MemberDashboard, ["member"]);
