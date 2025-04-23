
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
  Calendar,
  User,
  AlertCircle,
  Clock,
  InfoIcon,
  History
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

// Task categories
const TASK_CATEGORIES = [
  { value: 'verification', label: 'Verificatie' },
  { value: 'documentation', label: 'Documentatie' },
  { value: 'financial', label: 'Financieel' },
  { value: 'educational', label: 'Educatief' },
  { value: 'reminder', label: 'Reminder' }
];

// Mock data with categories, deadlines and history
const tasks = [
  {
    id: "1",
    title: "Onderteken contract voor Spirit 3",
    user: "Jan Jansen",
    userEmail: "jan.jansen@example.com",
    dueDate: "26 Apr 2025",
    status: "pending",
    priority: "high",
    type: "contract",
    category: "documentation",
    history: [
      { date: "20 Apr 2025", action: "Taak aangemaakt", user: "Admin" },
      { date: "21 Apr 2025", action: "Email notificatie verstuurd", user: "Systeem" }
    ]
  },
  {
    id: "2",
    title: "Identiteitsverificatie documenten uploaden",
    user: "Emma Visser",
    userEmail: "emma.visser@example.com",
    dueDate: "28 Apr 2025",
    status: "completed",
    priority: "medium",
    type: "document",
    category: "verification",
    history: [
      { date: "15 Apr 2025", action: "Taak aangemaakt", user: "Admin" },
      { date: "16 Apr 2025", action: "Email notificatie verstuurd", user: "Systeem" },
      { date: "18 Apr 2025", action: "Documenten geüpload", user: "Emma Visser" },
      { date: "18 Apr 2025", action: "Taak afgerond", user: "Systeem" }
    ]
  },
  {
    id: "3",
    title: "Maandelijks voortgangsrapport bevestigen",
    user: "Lucas de Wit",
    userEmail: "lucas.dewit@example.com",
    dueDate: "30 Apr 2025",
    status: "pending",
    priority: "low",
    type: "report",
    category: "educational",
    history: [
      { date: "19 Apr 2025", action: "Taak aangemaakt", user: "Admin" }
    ]
  },
  {
    id: "4",
    title: "Persoonlijke gegevens bijwerken",
    user: "Sophie Bakker",
    userEmail: "sophie.bakker@example.com",
    dueDate: "2 Mei 2025",
    status: "pending",
    priority: "medium",
    type: "document",
    category: "verification",
    history: [
      { date: "22 Apr 2025", action: "Taak aangemaakt", user: "Admin" }
    ]
  },
  {
    id: "5",
    title: "Nieuwe spirit activatie bevestigen",
    user: "Thomas Meijer",
    userEmail: "thomas.meijer@example.com",
    dueDate: "5 Mei 2025",
    status: "pending",
    priority: "high",
    type: "contract",
    category: "financial",
    history: [
      { date: "21 Apr 2025", action: "Taak aangemaakt", user: "Admin" },
      { date: "22 Apr 2025", action: "Email notificatie verstuurd", user: "Systeem" }
    ]
  },
];

const AdminTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    user: "",
    dueDate: "",
    priority: "medium",
    category: "verification"
  });
  
  const handleStatusChange = (taskId, newStatus) => {
    // In een echte implementatie zou dit een update naar de database doen
    console.log(`Updating task ${taskId} status to ${newStatus}`);
    toast.success(`Taakstatus bijgewerkt naar ${newStatus === "completed" ? "afgerond" : newStatus}`);
  };
  
  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log("Creating new task:", newTask);
    toast.success("Nieuwe taak aangemaakt");
    setNewTaskDialogOpen(false);
    setNewTask({
      title: "",
      user: "",
      dueDate: "",
      priority: "medium",
      category: "verification"
    });
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "pending") return matchesSearch && task.status === "pending";
    if (filter === "completed") return matchesSearch && task.status === "completed";
    if (filter === "high") return matchesSearch && task.priority === "high";
    if (filter === "medium") return matchesSearch && task.priority === "medium";
    if (filter === "low") return matchesSearch && task.priority === "low";
    if (TASK_CATEGORIES.find(cat => cat.value === filter)) 
      return matchesSearch && task.category === filter;
    
    return matchesSearch;
  });
  
  const getPriorityColor = (priority) => {
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
  
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high": return "Hoog";
      case "medium": return "Gemiddeld";
      case "low": return "Laag";
      default: return priority;
    }
  };
  
  const getCategoryLabel = (categoryValue) => {
    const category = TASK_CATEGORIES.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };
  
  const getTypeLabel = (type) => {
    switch (type) {
      case "contract": return "Contract";
      case "document": return "Document";
      case "report": return "Rapport";
      default: return type;
    }
  };
  
  const isTaskNearDeadline = (dueDate: string): boolean => {
    const today = new Date();
    // Parse the dueDate string to a Date object
    const taskDateParts = dueDate.split(' ');
    const day = parseInt(taskDateParts[0], 10);
    const month = taskDateParts[1];
    const year = parseInt(taskDateParts[2], 10);
    
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4,
      'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8,
      'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const taskDate = new Date(year, monthMap[month], day);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Taakbeheer</h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start gap-2">
        <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <p className="font-medium text-blue-800">Taken zijn gekoppeld aan stappen binnen het Investbotiq-protocol</p>
          <p className="text-sm text-blue-600">Deze taken helpen leden bij het doorlopen van het activatieproces en zorgen voor een soepele doorstroming in het systeem.</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op taak of gebruiker"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle taken</SelectItem>
              <SelectItem value="pending">Openstaand</SelectItem>
              <SelectItem value="completed">Afgerond</SelectItem>
              <SelectItem value="high">Hoge prioriteit</SelectItem>
              <SelectItem value="medium">Gemiddelde prioriteit</SelectItem>
              <SelectItem value="low">Lage prioriteit</SelectItem>
              <SelectItem value="divider" disabled>
                <div className="h-px w-full bg-muted my-1"></div>
              </SelectItem>
              <SelectItem value="verification">Verificatie</SelectItem>
              <SelectItem value="documentation">Documentatie</SelectItem>
              <SelectItem value="financial">Financieel</SelectItem>
              <SelectItem value="educational">Educatief</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={newTaskDialogOpen} onOpenChange={setNewTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Nieuwe Taak
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuwe taak toevoegen</DialogTitle>
                <DialogDescription>
                  Maak een nieuwe taak aan binnen het Investbotiq-protocol. De member ontvangt automatisch een notificatie.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTask}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title">Taakomschrijving</label>
                    <Input 
                      id="title"
                      placeholder="Beschrijf de taak"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="user">Gebruiker</label>
                    <Select 
                      value={newTask.user} 
                      onValueChange={(value) => setNewTask({...newTask, user: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een gebruiker" />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map(task => (
                          <SelectItem key={task.id} value={task.user}>
                            {task.user} ({task.userEmail})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="category">Categorie</label>
                      <Select 
                        value={newTask.category} 
                        onValueChange={(value) => setNewTask({...newTask, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer categorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {TASK_CATEGORIES.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="priority">Prioriteit</label>
                      <Select 
                        value={newTask.priority} 
                        onValueChange={(value) => setNewTask({...newTask, priority: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer prioriteit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Hoog</SelectItem>
                          <SelectItem value="medium">Gemiddeld</SelectItem>
                          <SelectItem value="low">Laag</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="dueDate">Deadline</label>
                    <Input 
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendNotification"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="sendNotification">
                        Stuur automatisch notificatie naar gebruiker
                      </label>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setNewTaskDialogOpen(false)}>
                    Annuleren
                  </Button>
                  <Button type="submit">
                    Taak aanmaken
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
            <Check className="h-4 w-4 mr-2" />
            Taken ({filteredTasks.length})
          </CardTitle>
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
                <TableHead>Categorie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow 
                  key={task.id} 
                  className={
                    task.status !== "completed" && isTaskNearDeadline(task.dueDate) 
                      ? "bg-red-50" 
                      : ""
                  }
                >
                  <TableCell>
                    <div>
                      <span className="font-medium">{task.title}</span>
                      {task.status !== "completed" && isTaskNearDeadline(task.dueDate) && (
                        <div className="flex items-center mt-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Deadline nadert
                        </div>
                      )}
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
                    {getCategoryLabel(task.category)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          {task.status === "completed" ? (
                            <div className="flex items-center">
                              <Check className="mr-1 h-3 w-3 text-green-500" /> Afgerond
                            </div>
                          ) : task.status === "in_progress" ? (
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-blue-500" /> In uitvoering
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div> Openstaand
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                            Openstaand
                          </div>
                        </SelectItem>
                        <SelectItem value="in_progress">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3 text-blue-500" />
                            In uitvoering
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="flex items-center">
                            <Check className="mr-1 h-3 w-3 text-green-500" />
                            Afgerond
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon" title="Geschiedenis">
                            <History className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Taakgeschiedenis</h4>
                            <div className="h-px w-full bg-border"></div>
                            <div className="max-h-48 overflow-auto">
                              {task.history.map((item, index) => (
                                <div key={index} className="py-1 border-b last:border-0">
                                  <div className="flex justify-between text-sm">
                                    <span>{item.action}</span>
                                    <span className="text-muted-foreground">{item.date}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Door: {item.user}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
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
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, "completed")}>
                            <Check className="mr-2 h-4 w-4" /> Markeren als afgerond
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Bewerken
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" /> Gebruiker wijzigen
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Verwijderen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
