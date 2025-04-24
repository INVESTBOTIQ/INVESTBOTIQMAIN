
import { TierChartData } from "../types/chart-types";

export const useTierChartData = () => {
  const data: TierChartData[] = [
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
    }
  ];

  return { data };
};
