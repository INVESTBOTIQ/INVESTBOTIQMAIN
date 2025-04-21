
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    opbouw: 8500,
    afbouw: 38000,
  },
  {
    month: "Feb",
    opbouw: 12400,
    afbouw: 37200,
  },
  {
    month: "Mar",
    opbouw: 16800,
    afbouw: 36400,
  },
  {
    month: "Apr",
    opbouw: 21600,
    afbouw: 35600,
  },
  {
    month: "Mei",
    opbouw: 27000,
    afbouw: 34800,
  },
  {
    month: "Jun",
    opbouw: 33000,
    afbouw: 34000,
  },
  {
    month: "Jul",
    opbouw: 39600,
    afbouw: 33200,
  },
];

const ProgressTimeline: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis
          tickFormatter={(value) =>
            `€${value >= 1000 ? `${value / 1000}k` : value}`
          }
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value) => [`€${value}`, ""]}
          labelFormatter={(label) => `Maand: ${label}`}
        />
        <Bar
          name="Opbouw"
          dataKey="opbouw"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          name="BEL-leningen"
          dataKey="afbouw"
          fill="hsl(var(--muted))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProgressTimeline;
