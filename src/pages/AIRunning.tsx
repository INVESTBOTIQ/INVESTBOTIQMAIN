
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AIRunning = () => {
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
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-6">AI Running</h1>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-48 h-48 relative flex items-center justify-center">
                  {/* Placeholder for animated orb - would ideally be replaced with an actual PNG */}
                  <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-80"></div>
                  <div className="absolute w-4/5 h-4/5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse opacity-60" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute w-3/5 h-3/5 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 animate-pulse opacity-40" style={{ animationDelay: "1s" }}></div>
                </div>
                
                <p className="text-center mt-8 text-muted-foreground">
                  De IQ Bot is bezig jouw cashflow automatisch op te bouwen.<br />
                  Geen actie vereist.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIRunning;
