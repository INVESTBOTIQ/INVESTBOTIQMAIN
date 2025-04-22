
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not admin
  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Beheer gebruikers, taken en meer
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Gebruikers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Gebruikersbeheer</div>
                  <p className="text-xs text-muted-foreground">
                    Beheer alle gebruikers van het platform
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Taken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Takenbeheer</div>
                  <p className="text-xs text-muted-foreground">
                    Creëer en wijs taken toe aan gebruikers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cashflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Cashflow beheer</div>
                  <p className="text-xs text-muted-foreground">
                    Beheer cashflow voor alle gebruikers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Notificaties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Notificatiebeheer</div>
                  <p className="text-xs text-muted-foreground">
                    Verstuur notificaties naar gebruikers
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="py-4">
              <p className="text-muted-foreground text-center">
                Admin Dashboard - Nog in ontwikkeling
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
