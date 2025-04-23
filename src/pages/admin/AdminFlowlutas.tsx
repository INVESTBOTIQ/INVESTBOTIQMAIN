
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
const flowlutas = [
  {
    id: "1",
    name: "Flowluta Alpha",
    user: "Jan Jansen",
    userEmail: "jan.jansen@example.com",
    activationDate: "15 Mar 2025",
    status: "active",
    value: 12000,
    cashflowContribution: 380
  },
  {
    id: "2",
    name: "Flowluta Beta",
    user: "Emma Visser",
    userEmail: "emma.visser@example.com",
    activationDate: "20 Mar 2025",
    status: "active",
    value: 15000,
    cashflowContribution: 450
  },
  {
    id: "3",
    name: "Flowluta Gamma",
    user: "Lucas de Wit",
    userEmail: "lucas.dewit@example.com",
    activationDate: "5 Apr 2025",
    status: "active",
    value: 18000,
    cashflowContribution: 540
  },
  {
    id: "4",
    name: "Flowluta Delta",
    user: "Sophie Bakker",
    userEmail: "sophie.bakker@example.com",
    activationDate: "Nog niet geactiveerd",
    status: "pending",
    value: 10000,
    cashflowContribution: 300
  },
  {
    id: "5",
    name: "Flowluta Epsilon",
    user: "Thomas Meijer",
    userEmail: "thomas.meijer@example.com",
    activationDate: "12 Apr 2025",
    status: "active",
    value: 20000,
    cashflowContribution: 600
  },
];

const AdminFlowlutas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredFlowlutas = flowlutas.filter(flowluta => {
    const matchesSearch = flowluta.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      flowluta.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && flowluta.status === "active";
    if (filter === "pending") return matchesSearch && flowluta.status === "pending";
    
    return matchesSearch;
  });
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flowlutas Beheer</h2>
      
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op flowluta of gebruiker"
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
              <SelectItem value="all">Alle flowlutas</SelectItem>
              <SelectItem value="active">Actief</SelectItem>
              <SelectItem value="pending">In afwachting</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nieuwe Flowluta
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Flowlutas Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <div className="flex items-center">
                    Flowluta Naam
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
              {filteredFlowlutas.map((flowluta) => (
                <TableRow key={flowluta.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                      <span className="font-medium">{flowluta.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{flowluta.user}</p>
                      <p className="text-sm text-muted-foreground">{flowluta.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {flowluta.status === "active" ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          {flowluta.activationDate}
                        </>
                      ) : (
                        <>
                          <CalendarClock className="mr-2 h-4 w-4 text-yellow-500" />
                          {flowluta.activationDate}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {flowluta.status === "active" ? (
                      <Badge className="bg-green-500">Actief</Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        In afwachting
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{flowluta.value.toLocaleString('nl-NL')}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{flowluta.cashflowContribution}</span>
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
                      {flowluta.status === "pending" && (
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
              {filteredFlowlutas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">Geen flowlutas gevonden</p>
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

export default withRoleGuard(AdminFlowlutas, ["admin"]);
