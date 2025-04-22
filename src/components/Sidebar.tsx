
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BarChart, 
  CheckSquare, 
  Link as LinkIcon, 
  LogOut, 
  Users, 
  Bell, 
  Settings 
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SidebarItem = ({ 
  href, 
  icon: Icon, 
  label, 
  external = false 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  external?: boolean;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-item"
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("U bent uitgelogd");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  const memberItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: BarChart,
      label: "Voortgang",
      href: "/progress",
    },
    {
      icon: CheckSquare,
      label: "Taken",
      href: "/tasks",
    },
    {
      icon: LinkIcon,
      label: "Homepage",
      href: "https://investbotiq.nl",
      external: true,
    },
  ];

  const adminItems = [
    {
      icon: Home,
      label: "Admin Dashboard",
      href: "/admin",
    },
    {
      icon: Users,
      label: "Gebruikers",
      href: "/admin/users",
    },
    {
      icon: CheckSquare,
      label: "Taken Beheer",
      href: "/admin/tasks",
    },
    {
      icon: Bell,
      label: "Notificaties",
      href: "/admin/notifications",
    },
    {
      icon: Settings,
      label: "Instellingen",
      href: "/admin/settings",
    },
    {
      icon: LinkIcon,
      label: "Homepage",
      href: "https://investbotiq.nl",
      external: true,
    },
  ];

  const sidebarItems = isAdmin ? adminItems : memberItems;

  return (
    <aside className={cn("w-64 border-r bg-card p-4", className)}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {isAdmin ? "Admin Panel" : "Member Portal"}
            </h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  external={item.external}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="py-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Uitloggen</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
