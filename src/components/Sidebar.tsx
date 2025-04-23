
import React, { useState, useEffect } from "react";
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
  Settings,
  User,
  CircleDollarSign,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const SidebarItem = ({ 
  href, 
  icon: Icon, 
  label, 
  external = false,
  isActive = false
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  external?: boolean;
  isActive?: boolean;
}) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
          "text-muted-foreground"
        )}
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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent group",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && (
        <ChevronRight className="h-4 w-4 ml-auto opacity-60" />
      )}
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { userRole } = useAuth();
  const location = useLocation();
  const isAdmin = userRole === "admin";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("U bent uitgelogd");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  // If on mobile, don't render the sidebar (it will be in MobileMenu)
  if (isMobile) {
    return null;
  }

  const memberItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/member/dashboard",
    },
    {
      icon: BarChart,
      label: "Voortgang",
      href: "/member/dashboard/progress",
    },
    {
      icon: CheckSquare,
      label: "Taken",
      href: "/member/dashboard/tasks",
    },
    {
      icon: User,
      label: "Mijn Profiel",
      href: "/member/profile",
    },
    {
      icon: Sparkles,
      label: "AI Running",
      href: "/member/ai-running",
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
      icon: CircleDollarSign,
      label: "Cashflow Beheer",
      href: "/admin/cashflows",
    },
    {
      icon: Sparkles,
      label: "Spirits Beheer",
      href: "/admin/spirits",
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
    <aside className={cn("w-64 border-r bg-card p-4 hidden md:block fade-in", className)}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="py-2">
            <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">
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
                  isActive={location.pathname === item.href}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="py-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Uitloggen</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
