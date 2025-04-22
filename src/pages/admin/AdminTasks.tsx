
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";

const AdminTasks = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Taakbeheer</h2>
      <Card>
        <CardHeader>
          <CardTitle>Taken Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Hier kun je bestaande taken beheren en nieuwe taken aanmaken per gebruiker.
          </p>
          <div className="bg-muted p-4 rounded-md text-sm">
            <p>Functionaliteit voor het beheren van taken wordt hier ontwikkeld.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoleGuard(AdminTasks, ["admin"]);
