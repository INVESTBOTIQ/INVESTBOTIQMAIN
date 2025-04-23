
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Search, 
  Mail, 
  ArrowUpDown, 
  Edit, 
  Trash2, 
  CircleDollarSign,
  Sparkles,
  ArrowRight,
  UserCog,
  Info,
  PlusCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data with roles and notes
const users = [
  {
    id: "1",
    email: "jan.jansen@example.com",
    name: "Jan Jansen",
    cashflow: 1420,
    spirits: 4,
    belLening: 32000,
    status: "active",
    role: "member",
    notes: "Wacht op documentatie voor spirit 5"
  },
  {
    id: "2",
    email: "emma.visser@example.com",
    name: "Emma Visser",
    cashflow: 1780,
    spirits: 5,
    belLening: 28500,
    status: "active",
    role: "member",
    notes: "Zeer actief, heeft al 5 spirits"
  },
  {
    id: "3",
    email: "lucas.dewit@example.com",
    name: "Lucas de Wit",
    cashflow: 2240,
    spirits: 8,
    belLening: 15000,
    status: "active",
    role: "member",
    notes: ""
  },
  {
    id: "4",
    email: "sophie.bakker@example.com",
    name: "Sophie Bakker",
    cashflow: 920,
    spirits: 2,
    belLening: 36000,
    status: "pending",
    role: "member",
    notes: "Wacht op identificatieverificatie"
  },
  {
    id: "5",
    email: "thomas.meijer@example.com",
    name: "Thomas Meijer",
    cashflow: 1650,
    spirits: 6,
    belLening: 22000,
    status: "active",
    role: "member",
    notes: ""
  },
  {
    id: "6",
    email: "investbotiq@gmail.com",
    name: "Admin Gebruiker",
    cashflow: 0,
    spirits: 0,
    belLening: 0,
    status: "active",
    role: "admin",
    notes: "Hoofdadmin-account"
  },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [userNotes, setUserNotes] = useState({});
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: "",
    name: "",
    role: "member",
  });

  // Initialize user notes from mock data
  React.useEffect(() => {
    const initialNotes = {};
    users.forEach(user => {
      initialNotes[user.id] = user.notes;
    });
    setUserNotes(initialNotes);
  }, []);

  const handleSaveNotes = (userId, notes) => {
    setUserNotes(prev => ({
      ...prev,
      [userId]: notes
    }));
    toast.success("Notitie opgeslagen");
  };
  
  const handleAddUser = (e) => {
    e.preventDefault();
    // In een echte implementatie zou dit een API call naar Supabase doen
    console.log("Creating new user:", newUserData);
    toast.success("Nieuwe gebruiker aangemaakt");
    setIsNewUserDialogOpen(false);
    setNewUserData({
      email: "",
      name: "",
      role: "member",
    });
  };
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatusFilter = statusFilter === "all" || user.status === statusFilter;
    const matchesRoleFilter = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesStatusFilter && matchesRoleFilter;
  });
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Gebruikers Overzicht</h2>
      <p className="text-muted-foreground mb-4">
        Bekijk hier het overzicht van alle gebruikers in het ecosysteem van Investbotiq. 
        Je ziet hun maandelijkse cashflow, spiritstatus en BEL-lening status in één oogopslag.
      </p>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam of email"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="active">Actief</SelectItem>
              <SelectItem value="pending">In afwachting</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={roleFilter}
            onValueChange={setRoleFilter}
          >
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter op rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle rollen</SelectItem>
              <SelectItem value="member">Members</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nieuwe Gebruiker
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuwe gebruiker toevoegen</DialogTitle>
                <DialogDescription>
                  Dit maakt een nieuwe gebruiker aan in het Investbotiq systeem. Er wordt automatisch een account aangemaakt in Supabase auth.users.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@voorbeeld.com"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="name">Naam</label>
                    <Input 
                      id="name" 
                      placeholder="Voornaam Achternaam"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role">Rol</label>
                    <Select 
                      value={newUserData.role} 
                      onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsNewUserDialogOpen(false)}>
                    Annuleren
                  </Button>
                  <Button type="submit">
                    Gebruiker aanmaken
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Alle Gebruikers ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Naam / Email / Rol
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Cashflow (€)</TableHead>
                <TableHead>Spirits</TableHead>
                <TableHead>BEL-lening (€)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notities</TableHead>
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
                      <div className="flex items-center mt-1">
                        <UserCog className="mr-1 h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                          Rol: {user.role === "admin" ? "Admin" : "Member"}
                        </span>
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
                      className={user.status === "active" ? "bg-green-500" : "bg-yellow-100 text-yellow-800"}
                    >
                      {user.status === "active" ? "Actief" : "In afwachting"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          {userNotes[user.id] ? "Bekijk notitie" : "Voeg notitie toe"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Notitie voor {user.name}</DialogTitle>
                          <DialogDescription>
                            Voeg een interne notitie toe over deze gebruiker (alleen zichtbaar voor admins)
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="Voeg hier notities toe..."
                          value={userNotes[user.id] || ""}
                          onChange={(e) => setUserNotes({...userNotes, [user.id]: e.target.value})}
                          rows={4}
                        />
                        <DialogFooter>
                          <Button onClick={() => handleSaveNotes(user.id, userNotes[user.id] || "")}>
                            Opslaan
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" title="Details bekijken">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Details bekijken</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" title="Bewerken">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Gebruiker bewerken</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" title="Verwijderen">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Gebruiker verwijderen</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
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
