
import { Bar } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartBars = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Bar
        yAxisId="left"
        dataKey="kaspositie"
        stackId="a"
        fill="#0EA5E9"
        name="Kaspositie"
        animationDuration={1000}
      />
      <Bar
        yAxisId="left"
        dataKey="bel"
        stackId="a"
        fill="#22C55E"
        name="BEL"
        animationDuration={1000}
      />
      <Bar
        yAxisId="left"
        dataKey="plat"
        stackId="a"
        fill="#F97316"
        name="PLAT"
        animationDuration={1000}
      />
      <Bar
        yAxisId="left"
        dataKey="flowluta"
        stackId="a"
        fill="#8B5CF6"
        name="Flowluta"
        animationDuration={1000}
      />
    </>
  );
};
