
import { YAxis } from "recharts";
import { ChartConfig } from "../types/chart-types";

interface ChartYAxisProps {
  config: ChartConfig;
}

export const ChartYAxis = ({ config }: ChartYAxisProps) => {
  return (
    <YAxis
      yAxisId={config.yAxisId}
      orientation={config.orientation}
      label={config.label}
    />
  );
};
