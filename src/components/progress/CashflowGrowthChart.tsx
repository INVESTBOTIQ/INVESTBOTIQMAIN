
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyData } from "./data/monthly-data";

export const CashflowGrowthChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maandelijkse Cashflow Groei</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `€${value}`} />
              <Tooltip
                formatter={(value) => [`€${value}`, ""]}
                labelFormatter={(label) => `Maand: ${label}`}
              />
              <Bar
                dataKey="cashflow"
                name="Maandelijkse cashflow"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

