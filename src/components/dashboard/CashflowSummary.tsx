
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CashflowSummary = () => {
  const { data: totalCashflow } = useQuery({
    queryKey: ["monthlyTotalCashflow"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cashflows")
        .select("cashflow_bedrag")
        .eq("maand", new Date().toISOString().slice(0, 7))
        .single();
      
      if (error) throw error;
      return data?.cashflow_bedrag || 0;
    },
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Maandelijkse Cashflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          €{totalCashflow?.toLocaleString("nl-NL", { minimumFractionDigits: 2 }) || "0,00"}
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowSummary;
