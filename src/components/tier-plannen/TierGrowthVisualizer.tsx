
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FadeIn } from "../info/FadeInAnimation";

// Monthly growth data for flowlutas
const growthData = [
  { month: "1", flowlutas: 0, cashflow: 0, tier: "Start" },
  { month: "2", flowlutas: 1, cashflow: 400, tier: "Tier 2" },
  { month: "3", flowlutas: 2, cashflow: 800, tier: "Tier 3" },
  { month: "4", flowlutas: 2, cashflow: 800, tier: "Tier 3" },
  { month: "5", flowlutas: 2, cashflow: 800, tier: "Tier 3" },
  { month: "6", flowlutas: 3, cashflow: 1200, tier: "Tier 4" },
  { month: "7", flowlutas: 3, cashflow: 1200, tier: "Tier 4" },
  { month: "8", flowlutas: 3, cashflow: 1200, tier: "Tier 4" },
  { month: "9", flowlutas: 5, cashflow: 2000, tier: "Tier 5" },
  { month: "10", flowlutas: 5, cashflow: 2000, tier: "Tier 5" },
  { month: "11", flowlutas: 5, cashflow: 2000, tier: "Tier 5" },
  { month: "12", flowlutas: 5, cashflow: 2000, tier: "Tier 5" },
  { month: "13", flowlutas: 5, cashflow: 2000, tier: "Tier 6" },
  { month: "14", flowlutas: 5, cashflow: 2000, tier: "Tier 6" },
  { month: "15", flowlutas: 5, cashflow: 2000, tier: "Tier 6" },
];

interface Props {
  className?: string;
}

export default function TierGrowthVisualizer({ className = "" }: Props) {
  return (
    <FadeIn delay={0.3} className={`overflow-hidden rounded-lg shadow-md ${className}`}>
      <div className="bg-white p-4">
        <h3 className="text-xl font-semibold text-center mb-4">Flowlutas & Cashflow Groei</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={growthData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="flowlutaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="cashflowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12 }}
                tickLine={false}
                domain={[0, 6]}
                label={{ value: 'Aantal Flowlutas', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickLine={false}
                domain={[0, 2500]}
                label={{ value: 'Cashflow (€)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                        <p className="font-medium text-gray-800">Maand {label} - {payload[0].payload.tier}</p>
                        <p className="text-sm text-purple-600">
                          Flowlutas: <span className="font-semibold">{payload[0].value}</span>
                        </p>
                        <p className="text-sm text-blue-600">
                          Cashflow: <span className="font-semibold">€{payload[1].value}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="flowlutas"
                name="Flowlutas"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#flowlutaGradient)"
                animationDuration={1500}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="cashflow"
                name="Cashflow"
                stroke="#0EA5E9"
                fillOpacity={1}
                fill="url(#cashflowGradient)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </FadeIn>
  );
}
