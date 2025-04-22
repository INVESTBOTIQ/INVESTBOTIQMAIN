
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Progress from "./pages/Progress";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AIRunning from "./pages/AIRunning";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminCashflows from "./pages/admin/AdminCashflows";
import AdminSpirits from "./pages/admin/AdminSpirits";
import AdminNotifications from "./pages/admin/AdminNotifications";

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
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/ai-running" element={<AIRunning />} />
            <Route path="/dashboard/taken" element={<Tasks />} />
            <Route path="/dashboard/voortgang" element={<Progress />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-running" element={<AIRunning />} />
            
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
