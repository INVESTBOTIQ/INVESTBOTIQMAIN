
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog } from "@/components/ui/dialog";
import { ArrowRight, Edit, Trash2, CircleDollarSign, Sparkles, UserCog } from "lucide-react";
import { UserNotes } from "./UserNotes";
import { UserType } from "./types";

interface UserTableProps {
  users: UserType[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Naam / Email / Rol</TableHead>
          <TableHead>Cashflow (€)</TableHead>
          <TableHead>Spirits</TableHead>
          <TableHead>BEL-lening (€)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notities</TableHead>
          <TableHead className="text-right">Acties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              <p className="text-muted-foreground">Geen gebruikers gevonden</p>
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
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
                <UserNotes userId={user.id} initialNotes={user.notes} />
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
          ))
        )}
      </TableBody>
    </Table>
  );
};
