
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, onClose }) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const location = useLocation();

  // Close menu when route changes
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

  if (!isOpen) return null;

  const memberItems = [
    { label: "Dashboard", href: "/member/dashboard" },
    { label: "Voortgang", href: "/member/dashboard/progress" },
    { label: "Taken", href: "/member/dashboard/tasks" },
    { label: "Mijn Profiel", href: "/member/profile" },
    { label: "AI Running", href: "/member/ai-running" },
  ];

  const adminItems = [
    { label: "Admin Dashboard", href: "/admin" },
    { label: "Gebruikers", href: "/admin/users" },
    { label: "Taken Beheer", href: "/admin/tasks" },
    { label: "Cashflow Beheer", href: "/admin/cashflows" },
    { label: "Spirits Beheer", href: "/admin/spirits" },
    { label: "Notificaties", href: "/admin/notifications" },
  ];

  const menuItems = isAdmin ? adminItems : memberItems;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-xl p-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="font-semibold text-lg">
            {isAdmin ? "Admin Menu" : "Menu"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Menu items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Logout button at bottom */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
