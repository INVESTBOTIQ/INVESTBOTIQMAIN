
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import { Settings } from "lucide-react";
import Header from "@/components/Header";

const AdminSettings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-2">Instellingen</h2>
        <p className="text-muted-foreground mb-4">
          Beheer alle systeeminstellingen voor het Investbotiq platform.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Systeeminstellingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Deze pagina is momenteel in ontwikkeling. Binnenkort kun je hier alle instellingen voor het Investbotiq platform beheren.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminSettings, ["admin"]);
