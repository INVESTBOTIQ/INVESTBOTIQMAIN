
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  {
    month: "Jan",
    opbouw: 8500,
    cashflow: 580,
    belLeningen: 38000,
  },
  {
    month: "Feb",
    opbouw: 12400,
    cashflow: 720,
    belLeningen: 37200,
  },
  {
    month: "Mar",
    opbouw: 16800,
    cashflow: 880,
    belLeningen: 36400,
  },
  {
    month: "Apr",
    opbouw: 21600,
    cashflow: 1050,
    belLeningen: 35600,
  },
  {
    month: "Mei",
    opbouw: 27000,
    cashflow: 1200,
    belLeningen: 34800,
  },
  {
    month: "Jun",
    opbouw: 33000,
    cashflow: 1440,
    belLeningen: 34000,
  },
  {
    month: "Jul",
    opbouw: 39600,
    cashflow: 1620,
    belLeningen: 33200,
  },
  {
    month: "Aug",
    opbouw: 46800,
    cashflow: 1620,
    belLeningen: 32400,
  },
  {
    month: "Sep",
    opbouw: 54000,
    cashflow: 1800,
    belLeningen: 31600,
  },
  {
    month: "Okt",
    opbouw: 61800,
    cashflow: 1980,
    belLeningen: 30800,
  },
  {
    month: "Nov",
    opbouw: 70200,
    cashflow: 2160,
    belLeningen: 30000,
  },
  {
    month: "Dec",
    opbouw: 79200,
    cashflow: 2340,
    belLeningen: 29200,
  },
];

const Progress = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Voortgang</h1>
              <p className="text-muted-foreground">
                Volg uw financiële groei over tijd
              </p>
            </div>

            <Tabs defaultValue="monthly" className="w-full">
              <TabsList>
                <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
                <TabsTrigger value="yearly">Jaarlijks</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Huidige opbouw
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€48.250</div>
                      <p className="text-xs text-muted-foreground">
                        Geschatte groei dit jaar: +€72.000
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Maandelijkse cashflow
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€1.620</div>
                      <p className="text-xs text-muted-foreground">
                        Geschatte groei dit jaar: +€720
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Openstaande BEL-leningen
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€32.400</div>
                      <p className="text-xs text-muted-foreground">
                        Geschatte afbouw dit jaar: -€8.800
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Financiële Ontwikkeling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={monthlyData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorOpbouw"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
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
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="month" />
                          <YAxis
                            tickFormatter={(value) =>
                              `€${
                                value >= 1000 ? `${value / 1000}k` : value
                              }`
                            }
                          />
                          <Tooltip
                            formatter={(value) => [`€${value}`, ""]}
                            labelFormatter={(label) => `Maand: ${label}`}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="opbouw"
                            name="Totale opbouw"
                            stroke="hsl(var(--primary))"
                            fillOpacity={1}
                            fill="url(#colorOpbouw)"
                          />
                          <Area
                            type="monotone"
                            dataKey="belLeningen"
                            name="BEL-leningen"
                            stroke="hsl(var(--muted-foreground))"
                            fill="hsl(var(--muted))"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maandelijkse Cashflow Groei</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="month" />
                          <YAxis
                            tickFormatter={(value) => `€${value}`}
                          />
                          <Tooltip
                            formatter={(value) => [`€${value}`, ""]}
                            labelFormatter={(label) => `Maand: ${label}`}
                          />
                          <Bar
                            dataKey="cashflow"
                            name="Maandelijkse cashflow"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="yearly">
                <Card>
                  <CardHeader>
                    <CardTitle>Jaarlijkse Prognose</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Jaarlijkse prognose wordt binnenkort beschikbaar gemaakt.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Progress;
