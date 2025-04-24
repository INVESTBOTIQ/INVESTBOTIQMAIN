
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2, Sparkles, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberAIRunning = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">AI Running</h1>
            
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center py-16 relative">
                <div className="w-32 md:w-48 h-32 md:h-48 relative flex items-center justify-center fade-in">
                  {/* Animated orb with multiple layers */}
                  <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-80"></div>
                  <div className="absolute w-4/5 h-4/5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse opacity-60" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute w-3/5 h-3/5 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 animate-pulse opacity-40" style={{ animationDelay: "1s" }}></div>
                  
                  {/* Add subtle rotation animation */}
                  <div className="absolute w-2/3 h-2/3 rounded-full border border-white/20 animate-spin" style={{ animationDuration: "15s" }}></div>
                  <div className="absolute w-1/2 h-1/2 rounded-full border border-white/10 animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}></div>
                </div>
                
                <p className="text-center mt-8 text-white/80 slide-up">
                  De IQ Bot is bezig jouw cashflow automatisch op te bouwen.<br />
                  Geen actie vereist.
                </p>

                <div className="mt-8 text-center text-sm text-white/70 space-y-3 slide-up">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p>De IQ Bot verwerkt jouw huidige tier</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <p>Beheert cashflow van actieve spirits</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <p>Volgende spirit activatie binnen 2 maanden</p>
                  </div>
                </div>
                
                {/* Status bar */}
                <div className="mt-8 w-full max-w-sm">
                  <div className="text-xs text-white/60 mb-1 flex justify-between">
                    <span>IQ Bot Status</span>
                    <span>Actief</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(MemberAIRunning, ["member"]);
