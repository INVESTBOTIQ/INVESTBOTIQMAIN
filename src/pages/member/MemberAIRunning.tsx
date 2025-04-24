
import React from "react";
import Header from "@/components/Header";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { FadeIn } from "@/components/info/FadeInAnimation";
import { motion } from "framer-motion";
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
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
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
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.08} className="mb-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary drop-shadow-sm mb-6">CashFlow Intelligence</h1>
            </FadeIn>
            
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
                  CashFlow Intelligence beheert automatisch jouw financiële groei.<br />
                  Geen handmatige acties vereist.
                </p>

                <div className="mt-8 text-center text-sm text-white/70 space-y-3 slide-up">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p>Verwerkt jouw huidige tier</p>
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
                    <span>Intelligence Status</span>
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
