
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";

const AdminCashflows = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cashflowbeheer</h2>
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Aanpassingen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Hier kun je cashflowbedragen aanpassen per gebruiker. Selecteer een gebruiker om hun cashflow te wijzigen.
          </p>
          <div className="bg-muted p-4 rounded-md text-sm">
            <p>Functionaliteit voor het beheren van cashflows wordt hier ontwikkeld.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoleGuard(AdminCashflows, ["admin"]);
