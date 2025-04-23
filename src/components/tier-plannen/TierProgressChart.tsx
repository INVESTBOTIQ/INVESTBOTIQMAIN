
import React, { useState } from "react";
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
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { FadeIn } from "../info/FadeInAnimation";

// Enhanced dataset with more detailed information
const data = [
  {
    month: "1",
    kaspositie: 1000,
    bel: 4000,
    plat: 2000,
    flowluta: 0,
    cashflow: 0,
    flowlutas_count: 0,
    tier: "Tier 2"
  },
  {
    month: "2",
    kaspositie: 1200,
    bel: 3800,
    plat: 0,
    flowluta: 4000,
    cashflow: 400,
    flowlutas_count: 1,
    tier: "Tier 2"
  },
  {
    month: "3",
    kaspositie: 1400,
    bel: 3600,
    plat: 0,
    flowluta: 8000,
    cashflow: 800,
    flowlutas_count: 2,
    tier: "Tier 3"
  },
  {
    month: "6",
    kaspositie: 2000,
    bel: 3200,
    plat: 0,
    flowluta: 12000,
    cashflow: 1200,
    flowlutas_count: 3,
    tier: "Tier 4"
  },
  {
    month: "9",
    kaspositie: 2500,
    bel: 2800,
    plat: 0,
    flowluta: 16000,
    cashflow: 1600,
    flowlutas_count: 4,
    tier: "Tier 5"
  },
  {
    month: "12",
    kaspositie: 3000,
    bel: 2400,
    plat: 0,
    flowluta: 20000,
    cashflow: 2000,
    flowlutas_count: 5,
    tier: "Tier 5"
  },
  {
    month: "15",
    kaspositie: 3500,
    bel: 2000,
    plat: 0,
    flowluta: 20000,
    cashflow: 2000,
    flowlutas_count: 5,
    tier: "Tier 6"
  },
];

// Custom tooltip component for enhanced information display
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-lg rounded-lg">
        <p className="text-gray-800 font-semibold mb-2">Maand {label}: {dataPoint.tier}</p>
        <div className="space-y-1">
          <p className="text-sm flex justify-between">
            <span className="text-gray-600">Kaspositie:</span> 
            <span className="font-medium">€{dataPoint.kaspositie}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="text-gray-600">BEL lening:</span> 
            <span className="font-medium">€{dataPoint.bel}</span>
          </p>
          {dataPoint.plat > 0 && (
            <p className="text-sm flex justify-between">
              <span className="text-gray-600">PLAT lening:</span> 
              <span className="font-medium">€{dataPoint.plat}</span>
            </p>
          )}
          <p className="text-sm flex justify-between">
            <span className="text-gray-600">Flowlutas:</span> 
            <span className="font-medium">{dataPoint.flowlutas_count}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="text-gray-600">Flowluta waarde:</span> 
            <span className="font-medium">€{dataPoint.flowluta}</span>
          </p>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-indigo-600 font-semibold flex justify-between">
              <span>Maandelijkse cashflow:</span> 
              <span>€{dataPoint.cashflow}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TierProgressChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Highlight bar on hover
  const handleBarMouseEnter = (dataKey: string) => {
    setHoveredBar(dataKey);
  };

  const handleBarMouseLeave = () => {
    setHoveredBar(null);
  };

  // Get opacity based on hover state
  const getBarOpacity = (dataKey: string) => {
    if (!hoveredBar) return 1;
    return hoveredBar === dataKey ? 1 : 0.5;
  };

  return (
    <FadeIn delay={0.2}>
      <div className="w-full">
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="kaspositie"
                stackId="a"
                fill="#0EA5E9"
                name="Kaspositie"
                opacity={getBarOpacity("kaspositie")}
                onMouseEnter={() => handleBarMouseEnter("kaspositie")}
                onMouseLeave={handleBarMouseLeave}
                animationDuration={1000}
              />
              <Bar
                yAxisId="left"
                dataKey="bel"
                stackId="a"
                fill="#22C55E"
                name="BEL"
                opacity={getBarOpacity("bel")}
                onMouseEnter={() => handleBarMouseEnter("bel")}
                onMouseLeave={handleBarMouseLeave}
                animationDuration={1000}
              />
              <Bar
                yAxisId="left"
                dataKey="plat"
                stackId="a"
                fill="#F97316"
                name="PLAT"
                opacity={getBarOpacity("plat")}
                onMouseEnter={() => handleBarMouseEnter("plat")}
                onMouseLeave={handleBarMouseLeave}
                animationDuration={1000}
              />
              <Bar
                yAxisId="left"
                dataKey="flowluta"
                stackId="a"
                fill="#8B5CF6"
                name="Flowluta"
                opacity={getBarOpacity("flowluta")}
                onMouseEnter={() => handleBarMouseEnter("flowluta")}
                onMouseLeave={handleBarMouseLeave}
                animationDuration={1000}
              />
              <Line
                yAxisId="right"
                type="stepAfter"
                dataKey="cashflow"
                stroke="#000000"
                strokeWidth={2}
                name="Maandelijkse Cashflow"
                dot={{ fill: "#000000" }}
                activeDot={{ r: 8, fill: "#6D28D9" }}
                animationDuration={1500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </FadeIn>
  );
}
