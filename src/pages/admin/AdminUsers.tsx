
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { UserCog } from "lucide-react";
import { useState } from "react";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import { useUsers } from "@/hooks/useUsers";
import Header from "@/components/Header";

const AdminUsers = () => {
  const { 
    users, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    roleFilter, 
    setRoleFilter 
  } = useUsers();
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-2">Gebruikers Overzicht</h2>
        <p className="text-muted-foreground mb-4">
          Bekijk hier het overzicht van alle gebruikers in het ecosysteem van Investbotiq. 
          Je ziet hun maandelijkse cashflow, spiritstatus en BEL-lening status in één oogopslag.
        </p>
        
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCog className="h-4 w-4 mr-2" />
              Alle Gebruikers ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminUsers, ["admin"]);
