
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, CheckSquare, CircleDollarSign, Settings, UserCog } from "lucide-react";

const navItems = [
  {
    title: "Gebruikers",
    href: "/admin/users",
    icon: Users
  },
  {
    title: "Taken",
    href: "/admin/tasks",
    icon: CheckSquare
  },
  {
    title: "Cashflows",
    href: "/admin/cashflows",
    icon: CircleDollarSign
  },
  {
    title: "Instellingen",
    href: "/admin/settings", 
    icon: Settings
  },
  {
    title: "Mijn Profiel",
    href: "/admin/profile",
    icon: UserCog
  }
];

export const AdminNavBar = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap items-center gap-1 mb-6 bg-background border rounded-lg p-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            location.pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};
