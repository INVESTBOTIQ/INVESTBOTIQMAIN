
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CashflowChart from "./CashflowChart";
import ProgressTimeline from "./ProgressTimeline";

const DashboardSummary: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Cashflow Ontwikkeling</CardTitle>
          <p className="text-sm text-muted-foreground">
            Cashflow groeit automatisch naarmate spirits worden geactiveerd.
            Elke 3 maanden activeert de IQ Bot een nieuwe spirit.
          </p>
        </CardHeader>
        <CardContent>
          <CashflowChart />
        </CardContent>
      </Card>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Maandelijkse Voortgang</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressTimeline />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
