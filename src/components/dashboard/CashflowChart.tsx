
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", cashflow: 580 },
  { month: "Feb", cashflow: 720 },
  { month: "Mar", cashflow: 880 },
  { month: "Apr", cashflow: 1050 },
  { month: "Mei", cashflow: 1200 },
  { month: "Jun", cashflow: 1440 },
  { month: "Jul", cashflow: 1620 },
  { month: "Aug", cashflow: 1620 },
  { month: "Sep", cashflow: 1620 },
  { month: "Okt", cashflow: 1620 },
  { month: "Nov", cashflow: 1620 },
  { month: "Dec", cashflow: 1620 },
];

const CashflowChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
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
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => `€${value}`}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value) => [`€${value}`, "Maandelijkse Cashflow"]}
          labelFormatter={(label) => `Maand: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="cashflow"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorCashflow)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CashflowChart;
