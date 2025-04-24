
export interface TierChartData {
  month: string;
  kaspositie: number;
  bel: number;
  plat: number;
  flowluta: number;
  cashflow: number;
  flowlutas_count: number;
  tier: string;
}

export interface ChartConfig {
  yAxisId: "left" | "right";
  orientation?: "right";
  label?: {
    value: string;
    angle: number;
    position: "insideLeft" | "insideRight";
  };
}
