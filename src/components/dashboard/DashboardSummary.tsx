
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CashflowChart from "./CashflowChart";
import ProgressTimeline from "./ProgressTimeline";

const DashboardSummary: React.FC = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Totale opbouw
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€48.250</div>
            <p className="text-xs text-muted-foreground">
              +12% t.o.v. vorige maand
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Actieve Spirits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 nieuwe spirits deze maand
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maandelijkse cashflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€1.620</div>
            <p className="text-xs text-muted-foreground">
              +€180 t.o.v. vorige maand
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Openstaande BEL-leningen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€32.400</div>
            <p className="text-xs text-muted-foreground">
              -€2.400 t.o.v. vorige maand
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Cashflow Ontwikkeling</CardTitle>
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
    </div>
  );
};

export default DashboardSummary;
