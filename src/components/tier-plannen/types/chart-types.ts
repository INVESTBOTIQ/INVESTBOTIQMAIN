
export type ChartConfig = {
  yAxisId: "left" | "right";
  orientation: "left" | "right";
  label: {
    value: string;
    angle: number;
    position: string;
  };
};

export type TierChartData = {
  month: string;
  kas: number;
  cashflow: number;
  timegap: number;
  flowlutas: string;
};
