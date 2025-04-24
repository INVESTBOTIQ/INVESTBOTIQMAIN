
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProgressStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Huidige opbouw
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€48.250</div>
          <p className="text-xs text-muted-foreground">
            Geschatte groei dit jaar: +€72.000
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
            Geschatte groei dit jaar: +€720
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
            Geschatte afbouw dit jaar: -€8.800
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
