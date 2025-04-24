
import React from "react";
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

export default function TierProgressChart() {
  const isMobile = useIsMobile();
  const { data } = useTierChartData();
  
  const leftAxisConfig = {
    yAxisId: "left" as const,
    label: {
      value: "Bedrag (€)",
      angle: -90,
      position: "insideLeft" as const,
    },
  };

  const rightAxisConfig = {
    yAxisId: "right" as const,
    orientation: "right" as const,
    label: {
      value: "Maandelijkse Cashflow (€)",
      angle: 90,
      position: "insideRight" as const,
    },
  };

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
        animationDuration={1500}
      />
    </ComposedChart>
  );

  return (
    <FadeIn delay={0.2} className="overflow-hidden">
      <div className="w-full">
        {isMobile ? (
          <ScrollArea className="w-full">
            <div className="min-w-[600px]">
              <ResponsiveContainer width="100%" height={400}>
                {chartContent}
              </ResponsiveContainer>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartContent}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
