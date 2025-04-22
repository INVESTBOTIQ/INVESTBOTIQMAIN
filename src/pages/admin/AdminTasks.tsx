
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
  ArrowUpDown, 
  Edit, 
  Trash2, 
  Check,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const tasks = [
  {
    id: "1",
    title: "Onderteken contract voor Spirit 3",
    user: "Jan Jansen",
    userEmail: "jan.jansen@example.com",
    dueDate: "26 Apr 2025",
    status: "pending",
    priority: "high",
    type: "contract"
  },
  {
    id: "2",
    title: "Identiteitsverificatie documenten uploaden",
    user: "Emma Visser",
    userEmail: "emma.visser@example.com",
    dueDate: "28 Apr 2025",
    status: "completed",
    priority: "medium",
    type: "document"
  },
  {
    id: "3",
    title: "Maandelijks voortgangsrapport bevestigen",
    user: "Lucas de Wit",
    userEmail: "lucas.dewit@example.com",
    dueDate: "30 Apr 2025",
    status: "pending",
    priority: "low",
    type: "report"
  },
  {
    id: "4",
    title: "Persoonlijke gegevens bijwerken",
    user: "Sophie Bakker",
    userEmail: "sophie.bakker@example.com",
    dueDate: "2 Mei 2025",
    status: "pending",
    priority: "medium",
    type: "document"
  },
  {
    id: "5",
    title: "Nieuwe spirit activatie bevestigen",
    user: "Thomas Meijer",
    userEmail: "thomas.meijer@example.com",
    dueDate: "5 Mei 2025",
    status: "pending",
    priority: "high",
    type: "contract"
  },
];

const AdminTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "pending") return matchesSearch && task.status === "pending";
    if (filter === "completed") return matchesSearch && task.status === "completed";
    if (filter === "high") return matchesSearch && task.priority === "high";
    if (filter === "medium") return matchesSearch && task.priority === "medium";
    if (filter === "low") return matchesSearch && task.priority === "low";
    
    return matchesSearch;
  });
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Hoog";
      case "medium": return "Gemiddeld";
      case "low": return "Laag";
      default: return priority;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "contract": return "Contract";
      case "document": return "Document";
      case "report": return "Rapport";
      default: return type;
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Taakbeheer</h2>
      
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op taak of gebruiker"
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
              <SelectItem value="all">Alle taken</SelectItem>
              <SelectItem value="pending">Openstaand</SelectItem>
              <SelectItem value="completed">Afgerond</SelectItem>
              <SelectItem value="high">Hoge prioriteit</SelectItem>
              <SelectItem value="medium">Gemiddelde prioriteit</SelectItem>
              <SelectItem value="low">Lage prioriteit</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nieuwe Taak
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Taken ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <div className="flex items-center">
                    Taakomschrijving
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Gebruiker</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Prioriteit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{task.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{task.user}</p>
                      <p className="text-sm text-muted-foreground">{task.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getPriorityColor(task.priority)}
                    >
                      {getPriorityLabel(task.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getTypeLabel(task.type)}
                  </TableCell>
                  <TableCell>
                    {task.status === "completed" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" /> Afgerond
                      </Badge>
                    ) : (
                      <Badge>Openstaand</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" title="Acties">
                          <span className="sr-only">Open menu</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acties</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" /> Markeren als afgerond
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Bewerken
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">Geen taken gevonden</p>
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

export default withRoleGuard(AdminTasks, ["admin"]);
