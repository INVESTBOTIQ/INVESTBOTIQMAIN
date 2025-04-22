
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
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Sparkles, 
  ArrowUpDown, 
  Edit, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  CalendarClock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const spirits = [
  {
    id: "1",
    name: "Spirit Alpha",
    user: "Jan Jansen",
    userEmail: "jan.jansen@example.com",
    activationDate: "15 Mar 2025",
    status: "active",
    value: 12000,
    cashflowContribution: 380
  },
  {
    id: "2",
    name: "Spirit Beta",
    user: "Emma Visser",
    userEmail: "emma.visser@example.com",
    activationDate: "20 Mar 2025",
    status: "active",
    value: 15000,
    cashflowContribution: 450
  },
  {
    id: "3",
    name: "Spirit Gamma",
    user: "Lucas de Wit",
    userEmail: "lucas.dewit@example.com",
    activationDate: "5 Apr 2025",
    status: "active",
    value: 18000,
    cashflowContribution: 540
  },
  {
    id: "4",
    name: "Spirit Delta",
    user: "Sophie Bakker",
    userEmail: "sophie.bakker@example.com",
    activationDate: "Nog niet geactiveerd",
    status: "pending",
    value: 10000,
    cashflowContribution: 300
  },
  {
    id: "5",
    name: "Spirit Epsilon",
    user: "Thomas Meijer",
    userEmail: "thomas.meijer@example.com",
    activationDate: "12 Apr 2025",
    status: "active",
    value: 20000,
    cashflowContribution: 600
  },
];

const AdminSpirits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredSpirits = spirits.filter(spirit => {
    const matchesSearch = spirit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      spirit.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && spirit.status === "active";
    if (filter === "pending") return matchesSearch && spirit.status === "pending";
    
    return matchesSearch;
  });
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Spirits Beheer</h2>
      
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op spirit of gebruiker"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle spirits</SelectItem>
              <SelectItem value="active">Actief</SelectItem>
              <SelectItem value="pending">In afwachting</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nieuwe Spirit
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Spirits Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <div className="flex items-center">
                    Spirit Naam
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Gebruiker</TableHead>
                <TableHead>Activatie Datum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Waarde (€)</TableHead>
                <TableHead>Cashflow (€)</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpirits.map((spirit) => (
                <TableRow key={spirit.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                      <span className="font-medium">{spirit.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{spirit.user}</p>
                      <p className="text-sm text-muted-foreground">{spirit.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {spirit.status === "active" ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          {spirit.activationDate}
                        </>
                      ) : (
                        <>
                          <CalendarClock className="mr-2 h-4 w-4 text-yellow-500" />
                          {spirit.activationDate}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {spirit.status === "active" ? (
                      <Badge className="bg-green-500">Actief</Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        In afwachting
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{spirit.value.toLocaleString('nl-NL')}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{spirit.cashflowContribution}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        title="Bewerken"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {spirit.status === "pending" && (
                        <Button
                          variant="outline"
                          size="icon"
                          title="Activeren"
                          className="text-green-500 hover:text-green-600"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        title="Verwijderen"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSpirits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">Geen spirits gevonden</p>
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

export default withRoleGuard(AdminSpirits, ["admin"]);
