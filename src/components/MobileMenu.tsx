
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, BarChart, CheckSquare, User, Sparkles, LogOut, Users, Bell, CircleDollarSign, Settings, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, onClose }) => {
  const { user, userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const location = useLocation();

  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("U bent uitgelogd");
      onClose();
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  // Als het menu niet open is, render dan een leeg fragment
  if (!isOpen) return null;

  const memberItems = [
    { label: "Dashboard", href: "/member/dashboard", icon: Home },
    { label: "Voortgang", href: "/member/progress", icon: BarChart },
    { label: "Taken", href: "/member/tasks", icon: CheckSquare },
    { label: "Referrals", href: "/member/referrals", icon: Share2 },
    { label: "AI Running", href: "/member/ai-running", icon: Sparkles },
    { label: "Mijn Profiel", href: "/member/profile", icon: User },
  ];

  const adminItems = [
    { label: "Admin Dashboard", href: "/admin", icon: Home },
    { label: "Gebruikers", href: "/admin/users", icon: Users },
    { label: "Taken Beheer", href: "/admin/tasks", icon: CheckSquare },
    { label: "Cashflow Beheer", href: "/admin/cashflows", icon: CircleDollarSign },
    { label: "Flowlutas Beheer", href: "/admin/flowlutas", icon: Sparkles },
    { label: "Referrals", href: "/admin/referrals", icon: Share2 },
    { label: "Notificaties", href: "/admin/notifications", icon: Bell },
    { label: "Instellingen", href: "/admin/settings", icon: Settings },
    { label: "Mijn Profiel", href: "/admin/profile", icon: User },
  ];

  const menuItems = isAdmin ? adminItems : memberItems;

  // Zorg ervoor dat het menu altijd zichtbaar is als isOpen = true
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-xl p-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {user && (
          <div className="flex items-center gap-3 p-4 border-b bg-primary/5">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{userRole}</p>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Sluit menu"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="space-y-0.5 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={onClose}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 py-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Uitloggen</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
