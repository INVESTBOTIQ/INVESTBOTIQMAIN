
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, CheckSquare, CircleDollarSign, Sparkles, Bell } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminMenuItems = [
    {
      title: "Gebruikers",
      description: "Beheer alle gebruikers en hun toegang",
      icon: <Users className="h-8 w-8" />,
      path: "/admin/users",
      color: "bg-blue-100",
    },
    {
      title: "Taken Beheer",
      description: "Taken configureren en toewijzen aan gebruikers",
      icon: <CheckSquare className="h-8 w-8" />,
      path: "/admin/tasks",
      color: "bg-green-100",
    },
    {
      title: "Cashflow Beheer",
      description: "Beheer cashflow settings en rapportages",
      icon: <CircleDollarSign className="h-8 w-8" />,
      path: "/admin/cashflows",
      color: "bg-yellow-100",
    },
    {
      title: "Spirits Beheer",
      description: "Configureer en beheer de spirits voor gebruikers",
      icon: <Sparkles className="h-8 w-8" />,
      path: "/admin/spirits",
      color: "bg-purple-100",
    },
    {
      title: "Notificaties",
      description: "Beheer systeem en gebruiker notificaties",
      icon: <Bell className="h-8 w-8" />,
      path: "/admin/notifications",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welkom bij het beheerderspanel van Investbotiq. Kies een optie om te beginnen.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminMenuItems.map((item, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(item.path)}
                >
                  <CardHeader className={`${item.color} rounded-t-lg`}>
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminDashboard, ["admin"]);
