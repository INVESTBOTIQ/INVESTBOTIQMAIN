
import React from "react";
import Header from "@/components/Header";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { FinancialDevelopmentChart } from "@/components/progress/FinancialDevelopmentChart";
import { CashflowGrowthChart } from "@/components/progress/CashflowGrowthChart";

const Progress = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <CollapsibleSidebar />
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
                <ProgressStats />
                <FinancialDevelopmentChart />
                <CashflowGrowthChart />
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
