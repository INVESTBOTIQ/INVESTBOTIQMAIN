
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberAIRunning = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
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
            
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-32 md:w-48 h-32 md:h-48 relative flex items-center justify-center">
                  {/* Animated orb with multiple layers */}
                  <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-80"></div>
                  <div className="absolute w-4/5 h-4/5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse opacity-60" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute w-3/5 h-3/5 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 animate-pulse opacity-40" style={{ animationDelay: "1s" }}></div>
                </div>
                
                <p className="text-center mt-8 text-white/80">
                  De IQ Bot is bezig jouw cashflow automatisch op te bouwen.<br />
                  Geen actie vereist.
                </p>

                <div className="mt-8 text-center text-sm text-white/70">
                  <p className="mb-2">✓ De IQ Bot verwerkt jouw huidige tier</p>
                  <p className="mb-2">💼 Beheert cashflow van actieve spirits</p>
                  <p>⏳ Volgende spirit activatie binnen 2 maanden</p>
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
