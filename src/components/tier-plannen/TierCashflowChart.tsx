
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartData = [
  { month: "1", kas: 0, cashflow: 0, timegap: 1500 },
  { month: "2", kas: 0, cashflow: 500, timegap: -4000 },
  { month: "3", kas: 400, cashflow: 1200, timegap: -6000, flowlutas: "1x Flowluta" },
  { month: "4", kas: 500, cashflow: 1500, timegap: 2000 },
  { month: "5", kas: 600, cashflow: 6200, timegap: 2000 },
  { month: "6", kas: 800, cashflow: 800, timegap: -4000, flowlutas: "2x Flowluta" },
  { month: "7", kas: 900, cashflow: 900, timegap: 2000 },
  { month: "8", kas: 1000, cashflow: 6500, timegap: 2000 },
  { month: "9", kas: 1100, cashflow: 400, timegap: -4000, flowlutas: "3x Flowluta" },
  { month: "10", kas: 1200, cashflow: 1200, timegap: 2000 },
  { month: "11", kas: 1300, cashflow: 7000, timegap: 2000 },
  { month: "12", kas: 2000, cashflow: 300, timegap: -6000, flowlutas: "5x Flowluta" },
  { month: "13", kas: 2000, cashflow: 0, timegap: -2000 },
  { month: "14", kas: 2000, cashflow: 0, timegap: -2000 },
  { month: "15", kas: 0, cashflow: 0, timegap: -2000 }
];

export default function TierCashflowChart() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] w-full flex items-center justify-center">Laden...</div>;
  }

  const ReferenceLabels = () => (
    <>
      {chartData.map((entry) => {
        if (entry.flowlutas) {
          return (
            <ReferenceLine
              key={entry.month}
              x={entry.month}
              stroke="#9333EA"
              strokeDasharray="3 3"
              label={{
                value: entry.flowlutas,
                position: "top",
                fill: "#9333EA",
                fontSize: 12
              }}
            />
          );
        }
        return null;
      })}
    </>
  );

  const chartContent = (
    <LineChart
      data={chartData}
      margin={{
        top: 30,
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
        label={{ value: "Bedrag (€)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="kas"
        name="Kas"
        stroke="#FFB800"
        strokeWidth={2}
        dot={{ fill: "#FFB800" }}
      />
      <Line
        type="monotone"
        dataKey="cashflow"
        name="Cashflow"
        stroke="#FFB800"
        strokeWidth={2}
        dot={{ fill: "#FFB800" }}
      />
      <Line
        type="monotone"
        dataKey="timegap"
        name="TimeGap"
        stroke="#FF0000"
        strokeWidth={2}
        strokeDasharray="5 5"
        dot={{ fill: "#FF0000" }}
      />
      <ReferenceLabels />
    </LineChart>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Kaspositie, Cashflow, Flowlutas en TimeGap-leningen per maand (TIER 2-6)
      </h3>
      <div className="h-[500px] w-full">
        {isMobile ? (
          <ScrollArea className="w-full h-[500px]">
            <div className="min-w-[800px] h-[500px]">
              {chartContent}
            </div>
          </ScrollArea>
        ) : (
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            {chartContent}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
