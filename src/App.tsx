
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import FAQ from "@/pages/FAQ";
import MemberDashboard from "@/pages/member/MemberDashboard";
import MemberProgress from "@/pages/member/MemberProgress";
import MemberTasks from "@/pages/member/MemberTasks";
import MemberProfile from "@/pages/member/MemberProfile";
import MemberAIRunning from "@/pages/member/MemberAIRunning";
import MemberReferrals from "@/pages/member/MemberReferrals";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminTasks from "@/pages/admin/AdminTasks";
import AdminCashflows from "@/pages/admin/AdminCashflows";
import AdminSpirits from "@/pages/admin/AdminSpirits";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminReferrals from "@/pages/admin/AdminReferrals";
import NotFound from "@/pages/NotFound";

// Import the new information pages
import WatIsInvestbotIQ from "@/pages/info/WatIsInvestbotIQ";
import HoeWerktHet from "@/pages/info/HoeWerktHet";
import MissieVisie from "@/pages/info/MissieVisie";
import TierPlannen from "@/pages/info/TierPlannen";
import Veiligheid from "@/pages/info/Veiligheid";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/faq" element={<FAQ />} />

            {/* INFO PAGES */}
            <Route path="/alles-over-investbot/wat-is-het" element={<WatIsInvestbotIQ />} />
            <Route path="/alles-over-investbot/hoe-werkt-het" element={<HoeWerktHet />} />
            <Route path="/alles-over-investbot/mission-vision" element={<MissieVisie />} />
            <Route path="/tier-plannen" element={<TierPlannen />} />
            <Route path="/veiligheid" element={<Veiligheid />} />

            {/* MEMBER ROUTES */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/progress" element={<MemberProgress />} />
            <Route path="/member/tasks" element={<MemberTasks />} />
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/ai-running" element={<MemberAIRunning />} />
            <Route path="/member/referrals" element={<MemberReferrals />} />

            {/* Protect /member/* only for member */}
            <Route path="/member" element={<Navigate to="/member/dashboard" replace />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/tasks" element={<AdminTasks />} /> 
            <Route path="/admin/cashflows" element={<AdminCashflows />} />
            <Route path="/admin/spirits" element={<AdminSpirits />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/referrals" element={<AdminReferrals />} />
            <Route path="/admin/index" element={<Navigate to="/admin" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
