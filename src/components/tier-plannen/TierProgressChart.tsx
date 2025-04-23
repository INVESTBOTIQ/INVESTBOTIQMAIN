
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";

const data = [
  {
    month: "1",
    kaspositie: 1000,
    bel: 4000,
    plat: 2000,
    flowluta: 0,
    cashflow: 0,
  },
  {
    month: "2",
    kaspositie: 1200,
    bel: 3800,
    plat: 0,
    flowluta: 4000,
    cashflow: 400,
  },
  {
    month: "3",
    kaspositie: 1400,
    bel: 3600,
    plat: 0,
    flowluta: 8000,
    cashflow: 800,
  },
  {
    month: "6",
    kaspositie: 2000,
    bel: 3200,
    plat: 0,
    flowluta: 12000,
    cashflow: 1200,
  },
  {
    month: "9",
    kaspositie: 2500,
    bel: 2800,
    plat: 0,
    flowluta: 16000,
    cashflow: 1600,
  },
  {
    month: "12",
    kaspositie: 3000,
    bel: 2400,
    plat: 0,
    flowluta: 20000,
    cashflow: 2000,
  },
  {
    month: "15",
    kaspositie: 3500,
    bel: 2000,
    plat: 0,
    flowluta: 20000,
    cashflow: 2000,
  },
];

export default function TierProgressChart() {
  return (
    <div className="w-full">
      <div className="h-[600px] w-full">
        <ComposedChart
          width={1200}
          height={600}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{ value: "Maand", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            yAxisId="left"
            label={{
              value: "Bedrag (€)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Maandelijkse Cashflow (€)",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="kaspositie"
            stackId="a"
            fill="#0EA5E9"
            name="Kaspositie"
          />
          <Bar
            yAxisId="left"
            dataKey="bel"
            stackId="a"
            fill="#22C55E"
            name="BEL"
          />
          <Bar
            yAxisId="left"
            dataKey="plat"
            stackId="a"
            fill="#F97316"
            name="PLAT"
          />
          <Bar
            yAxisId="left"
            dataKey="flowluta"
            stackId="a"
            fill="#8B5CF6"
            name="Flowluta"
          />
          <Line
            yAxisId="right"
            type="stepAfter"
            dataKey="cashflow"
            stroke="#000000"
            strokeWidth={2}
            name="Maandelijkse Cashflow"
            dot={{ fill: "#000000" }}
          />
        </ComposedChart>
      </div>
    </div>
  );
}
