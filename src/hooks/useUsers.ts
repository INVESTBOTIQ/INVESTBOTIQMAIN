import { useState } from 'react';
import { UserType } from '@/components/admin/users/types';

// Mock data - in a real implementation, this would come from Supabase
const mockUsers: UserType[] = [
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

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatusFilter = statusFilter === "all" || user.status === statusFilter;
    const matchesRoleFilter = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesStatusFilter && matchesRoleFilter;
  });

  return {
    users: filteredUsers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter
  };
};
