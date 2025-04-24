
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  { month: "Jan", cashflow: 580 },
  { month: "Feb", cashflow: 720 },
  { month: "Mar", cashflow: 880 },
  { month: "Apr", cashflow: 1050 },
  { month: "Mei", cashflow: 1200 },
  { month: "Jun", cashflow: 1440 },
  { month: "Jul", cashflow: 1620 },
  { month: "Aug", cashflow: 1620 },
  { month: "Sep", cashflow: 1620 },
  { month: "Okt", cashflow: 1620 },
  { month: "Nov", cashflow: 1620 },
  { month: "Dec", cashflow: 1620 },
];

const CashflowChart: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <h3 className="text-sm font-medium flex-grow">Maandelijkse Cashflow</h3>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full p-1 hover:bg-muted transition-colors">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>Deze grafiek toont uw maandelijkse cashflow groei sinds activatie van uw eerste flowluta. De cashflow stijgt automatisch met elke nieuwe flowluta activatie.</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </div>
      
      <div className={isMobile ? "min-w-[600px] pr-4" : ""}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `€${value}`}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`€${value}`, "Maandelijkse Cashflow"]}
              labelFormatter={(label) => `Maand: ${label}`}
              contentStyle={{ background: "white", borderRadius: "0.5rem", border: "1px solid rgba(0,0,0,0.1)" }}
              cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey="cashflow"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCashflow)"
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "white" }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
      )}
    </div>
  );
};

export default CashflowChart;
