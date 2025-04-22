
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";

const AdminSpirits = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Spirits Beheer</h2>
      <Card>
        <CardHeader>
          <CardTitle>Spirits Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Hier kun je spirits toevoegen of aanpassen. Selecteer een gebruiker om hun spirits te beheren.
          </p>
          <div className="bg-muted p-4 rounded-md text-sm">
            <p>Functionaliteit voor het beheren van spirits wordt hier ontwikkeld.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoleGuard(AdminSpirits, ["admin"]);
