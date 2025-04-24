
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
  kaspositie?: number;
  kas?: number;
  bel?: number;
  plat?: number;
  flowluta?: number;
  cashflow: number;
  timegap?: number;
  flowlutas?: string;
  flowlutas_count?: number;
  tier?: string;
};
