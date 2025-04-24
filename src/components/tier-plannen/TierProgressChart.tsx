
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
    setMounted(true);
  }, []);
  
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
    <FadeIn delay={0.1} className="overflow-hidden w-full mt-4">
      <div className="w-full relative bg-white p-4 rounded-lg shadow-md">
        {mounted && (
          <>
            {isMobile ? (
              <>
                <ScrollArea className="w-full overflow-x-auto">
                  <div className="min-w-[600px] h-[400px]">
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      {chartContent}
                    </ResponsiveContainer>
                  </div>
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                <div className="text-xs text-center mt-2 text-muted-foreground italic">
                  Schuif horizontaal om de volledige grafiek te bekijken
                </div>
              </>
            ) : (
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                  {chartContent}
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </FadeIn>
  );
}
