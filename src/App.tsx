
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminCashflows from "./pages/admin/AdminCashflows";
import AdminSpirits from "./pages/admin/AdminSpirits";
import AdminNotifications from "./pages/admin/AdminNotifications";

// Member pages
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberProgress from "./pages/member/MemberProgress";
import MemberTasks from "./pages/member/MemberTasks";
import MemberProfile from "./pages/member/MemberProfile";
import MemberAIRunning from "./pages/member/MemberAIRunning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* MEMBER ROUTES */}
            <Route path="/member" element={<MemberDashboard />} />
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/dashboard/progress" element={<MemberProgress />} />
            <Route path="/member/dashboard/tasks" element={<MemberTasks />} />
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/ai-running" element={<MemberAIRunning />} />
            
            {/* Root redirects to /member for member users */}
            <Route path="/" element={<Navigate to="/member" replace />} />
            <Route path="/dashboard" element={<Navigate to="/member" replace />} />
            <Route path="/progress" element={<Navigate to="/member/dashboard/progress" replace />} />
            <Route path="/tasks" element={<Navigate to="/member/dashboard/tasks" replace />} />
            <Route path="/profile" element={<Navigate to="/member/profile" replace />} />
            <Route path="/ai-running" element={<Navigate to="/member/ai-running" replace />} />
            
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="cashflows" element={<AdminCashflows />} />
              <Route path="spirits" element={<AdminSpirits />} />
              <Route path="notifications" element={<AdminNotifications />} />
              {/* Redirect base /admin to /admin/users */}
              <Route index element={<AdminUsers />} />
            </Route>
            
            {/* Catch-all route for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
