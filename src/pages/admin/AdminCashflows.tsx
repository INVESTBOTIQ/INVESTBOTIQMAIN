import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { CashflowSearch } from "@/components/cashflow/CashflowSearch";
import { CashflowTable } from "@/components/cashflow/CashflowTable";
import { CashflowHistoryTable } from "@/components/cashflow/CashflowHistoryTable";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import { useCashflowManagement } from "@/hooks/useCashflowManagement";
import Header from "@/components/Header";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const { data: users = [], isLoading, error } = useQuery({
  queryKey: ["admin-cashflow-users"],
  queryFn: async () => {
    // Fetch users and their cashflow data from Supabase
    const { data, error } = await supabase
      .from("cashflows")
      .select("user_id, cashflow_bedrag, previous_cashflow, last_updated, profiles:profiles!cashflows_user_id_fkey(id, email, voornaam, achternaam)");
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.user_id,
      email: row.profiles?.email || "",
      name: `${row.profiles?.voornaam || ''} ${row.profiles?.achternaam || ''}`.trim() || row.profiles?.email || row.user_id,
      currentCashflow: row.cashflow_bedrag || 0,
      previousCashflow: row.previous_cashflow || 0,
      changePercentage: row.previous_cashflow ? ((row.cashflow_bedrag - row.previous_cashflow) / row.previous_cashflow) * 100 : 0,
      lastUpdated: row.last_updated || ""
    }));
  }
});

const AdminCashflows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>("1"); // Default to the first user to show history
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { cashflowValues, isUpdating, handleCashflowChange, handleSave } = useCashflowManagement(users);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-4">Cashflowbeheer</h2>
        
        <div className="flex justify-between items-center mb-6">
          <CashflowSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" />
            Cashflow Rapporten
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Cashflow Aanpassingen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Pas de maandelijkse cashflow aan per gebruiker. Wijzigingen worden direct doorgevoerd in het systeem.
            </p>
            
            <CashflowTable
              users={filteredUsers}
              cashflowValues={cashflowValues}
              isUpdating={isUpdating}
              onCashflowChange={handleCashflowChange}
              onSave={handleSave}
            />

            <div className="mt-8">
              <CardTitle className="mb-4">Cashflow Historie</CardTitle>
              {selectedUserId && <CashflowHistoryTable userId={selectedUserId} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminCashflows, ["admin"]);
