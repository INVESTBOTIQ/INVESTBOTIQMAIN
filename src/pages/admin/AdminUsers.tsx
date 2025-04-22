
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
  Mail, 
  ArrowUpDown, 
  Edit, 
  Trash2, 
  CircleDollarSign,
  Sparkles,
  ArrowRight 
} from "lucide-react";

// Mock data
const users = [
  {
    id: "1",
    email: "jan.jansen@example.com",
    name: "Jan Jansen",
    cashflow: 1420,
    spirits: 4,
    belLening: 32000,
    status: "active"
  },
  {
    id: "2",
    email: "emma.visser@example.com",
    name: "Emma Visser",
    cashflow: 1780,
    spirits: 5,
    belLening: 28500,
    status: "active"
  },
  {
    id: "3",
    email: "lucas.dewit@example.com",
    name: "Lucas de Wit",
    cashflow: 2240,
    spirits: 8,
    belLening: 15000,
    status: "active"
  },
  {
    id: "4",
    email: "sophie.bakker@example.com",
    name: "Sophie Bakker",
    cashflow: 920,
    spirits: 2,
    belLening: 36000,
    status: "pending"
  },
  {
    id: "5",
    email: "thomas.meijer@example.com",
    name: "Thomas Meijer",
    cashflow: 1650,
    spirits: 6,
    belLening: 22000,
    status: "active"
  },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gebruikers Overzicht</h2>
      
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
        <Button>Nieuwe Gebruiker</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Alle Gebruikers ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Naam / Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Cashflow (€)</TableHead>
                <TableHead>Spirits</TableHead>
                <TableHead>BEL-lening (€)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CircleDollarSign className="mr-2 h-4 w-4 text-green-500" />
                      <span className="font-medium">{user.cashflow}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                      <span className="font-medium">{user.spirits}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{user.belLening.toLocaleString('nl-NL')}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === "active" ? "default" : "outline"}
                      className={user.status === "active" ? "bg-green-500" : ""}
                    >
                      {user.status === "active" ? "Actief" : "In afwachting"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" title="Details bekijken">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" title="Bewerken">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" title="Verwijderen">
                        <Trash2 className="h-4 w-4" />
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

export default withRoleGuard(AdminUsers, ["admin"]);
