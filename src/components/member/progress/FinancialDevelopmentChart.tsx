
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyData } from "../data/monthly-data";

export const FinancialDevelopmentChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financiële Ontwikkeling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorOpbouw"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  `€${value >= 1000 ? `${value / 1000}k` : value}`
                }
              />
              <Tooltip
                formatter={(value) => [`€${value}`, ""]}
                labelFormatter={(label) => `Maand: ${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="opbouw"
                name="Totale opbouw"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorOpbouw)"
              />
              <Area
                type="monotone"
                dataKey="belLeningen"
                name="BEL-leningen"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
