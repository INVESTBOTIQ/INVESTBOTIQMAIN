
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  ArrowUpDown, 
  Save, 
  CircleDollarSign,
  BarChart,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Mock data
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
  const [cashflowValues, setCashflowValues] = useState<Record<string, number>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.currentCashflow }), {})
  );
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCashflowChange = (userId: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setCashflowValues({ ...cashflowValues, [userId]: numValue });
  };
  
  const handleSave = (userId: string) => {
    // In een echte applicatie zou je hier een API-call maken om de cashflow op te slaan
    console.log(`Updating cashflow for user ${userId} to ${cashflowValues[userId]}`);
    // Toon succes melding of error
    alert(`Cashflow bijgewerkt naar €${cashflowValues[userId]}`);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cashflowbeheer</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam of email"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Gebruiker
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Huidige Cashflow (€)</TableHead>
                <TableHead>Vorige Cashflow (€)</TableHead>
                <TableHead>Verandering</TableHead>
                <TableHead>Laatste Update</TableHead>
                <TableHead className="text-right">Aanpassen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center font-medium">
                      <CircleDollarSign className="mr-2 h-4 w-4 text-green-500" />
                      {user.currentCashflow}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.previousCashflow}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {user.changePercentage > 0 ? (
                        <>
                          <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                          <span className="text-green-600">+{user.changePercentage}%</span>
                        </>
                      ) : user.changePercentage < 0 ? (
                        <>
                          <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                          <span className="text-red-600">{user.changePercentage}%</span>
                        </>
                      ) : (
                        <span>0%</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24">
                        <Input
                          type="number"
                          value={cashflowValues[user.id]}
                          onChange={(e) => handleCashflowChange(user.id, e.target.value)}
                          className="text-right"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleSave(user.id)}
                        title="Opslaan"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <p className="text-muted-foreground">Geen gebruikers gevonden</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoleGuard(AdminCashflows, ["admin"]);
