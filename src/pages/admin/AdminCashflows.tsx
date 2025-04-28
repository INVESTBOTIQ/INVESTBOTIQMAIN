
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

const users = [
  {
    id: "1",
    email: "jan.jansen@example.com",
    name: "Jan Jansen",
    currentCashflow: 1420,
    previousCashflow: 1200,
    changePercentage: 18.33,
    lastUpdated: "15 Apr 2025"
  },
  {
    id: "2",
    email: "emma.visser@example.com",
    name: "Emma Visser",
    currentCashflow: 1780,
    previousCashflow: 1620,
    changePercentage: 9.88,
    lastUpdated: "12 Apr 2025"
  },
  {
    id: "3",
    email: "lucas.dewit@example.com",
    name: "Lucas de Wit",
    currentCashflow: 2240,
    previousCashflow: 2040,
    changePercentage: 9.80,
    lastUpdated: "18 Apr 2025"
  },
  {
    id: "4",
    email: "sophie.bakker@example.com",
    name: "Sophie Bakker",
    currentCashflow: 920,
    previousCashflow: 920,
    changePercentage: 0,
    lastUpdated: "10 Apr 2025"
  },
  {
    id: "5",
    email: "thomas.meijer@example.com",
    name: "Thomas Meijer",
    currentCashflow: 1650,
    previousCashflow: 1450,
    changePercentage: 13.79,
    lastUpdated: "20 Apr 2025"
  },
];

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
