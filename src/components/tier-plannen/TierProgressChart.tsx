
import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FadeIn } from "../info/FadeInAnimation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartYAxis } from "./components/ChartYAxis";
import { ChartBars } from "./components/ChartBars";
import { useTierChartData } from "./hooks/useTierChartData";

const leftAxisConfig = {
  yAxisId: "left" as const,
  orientation: "left" as const,
  label: { value: "Investering (€)", angle: -90, position: "insideLeft" as const }
};

const rightAxisConfig = {
  yAxisId: "right" as const,
  orientation: "right" as const,
  label: { value: "Cashflow (€)", angle: 90, position: "insideRight" as const }
};

export default function TierProgressChart() {
  const isMobile = useIsMobile();
  const { data } = useTierChartData();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Ensure component is mounted before rendering chart
    setMounted(true);
    
    // Force reflow on mobile devices
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!mounted) {
    return <div className="h-[400px] w-full flex items-center justify-center">Laden...</div>;
  }
  
  const chartContent = (
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
      <ChartYAxis config={leftAxisConfig} />
      <ChartYAxis config={rightAxisConfig} />
      <Tooltip />
      <Legend />
      <ChartBars />
      <Line
        yAxisId="right"
        type="stepAfter"
        dataKey="cashflow"
        stroke="#000000"
        strokeWidth={2}
        name="Maandelijkse Cashflow"
        dot={{ fill: "#000000" }}
        activeDot={{ r: 8, fill: "#6D28D9" }}
        animationDuration={1000}
      />
    </ComposedChart>
  );

  return (
    <div className="w-full h-[400px]">
      {isMobile ? (
        <ScrollArea className="w-full h-[400px]">
          <div className="min-w-[600px] h-[400px]">
            {chartContent}
          </div>
        </ScrollArea>
      ) : (
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          {chartContent}
        </ResponsiveContainer>
      )}
    </div>
  );
}
