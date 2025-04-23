import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";

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

            {/* MEMBER ROUTES */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/progress" element={<MemberProgress />} />
            <Route path="/member/tasks" element={<MemberTasks />} />
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/ai-running" element={<MemberAIRunning />} />

            {/* Protect /member/* only for member */}
            <Route path="/member" element={<Navigate to="/member/dashboard" replace />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/tasks" element={<AdminTasks />} /> 
            <Route path="/admin/cashflows" element={<AdminCashflows />} />
            <Route path="/admin/spirits" element={<AdminSpirits />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
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
