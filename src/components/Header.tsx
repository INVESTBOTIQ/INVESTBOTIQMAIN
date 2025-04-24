
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { LogOut, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BrandLogo from "./BrandLogo";

const Header = () => {
  const { user, userRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("U bent uitgelogd");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  console.log("Mobile menu open status:", mobileMenuOpen);

  const unreadNotificationsCount = 3;

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => {
                console.log("Menu button clicked, setting mobileMenuOpen to", !mobileMenuOpen);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <BrandLogo />
        </div>
        
        <div className="flex items-center gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:flex">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Notificaties</p>
                    <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                      Alles markeren als gelezen
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="flex items-center px-4 py-3 hover:bg-muted transition-colors cursor-pointer border-b">
                    <div className="ml-3">
                      <p className="text-sm font-medium">Flowluta Tier 2 geactiveerd</p>
                      <p className="text-xs text-muted-foreground">Vandaag, 10:45</p>
                    </div>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-muted transition-colors cursor-pointer border-b">
                    <div className="ml-3">
                      <p className="text-sm font-medium">Nieuwe taak toegewezen</p>
                      <p className="text-xs text-muted-foreground">Gisteren, 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-muted transition-colors cursor-pointer border-b">
                    <div className="ml-3">
                      <p className="text-sm font-medium">Cashflow ontvangen: €400</p>
                      <p className="text-xs text-muted-foreground">2 dagen geleden</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t">
                  <Link 
                    to={userRole === 'admin' ? "/admin/notifications" : "/member/notifications"}
                    className="text-sm text-primary hover:underline w-full inline-block py-2"
                  >
                    Alle notificaties bekijken
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Desktop user menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:flex">
                <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium capitalize">{userRole}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to={userRole === 'admin' ? "/admin/profile" : "/member/profile"} className="cursor-pointer">
                    Mijn profiel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Uitloggen</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {/* Pass current state and handlers to MobileMenu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        setIsOpen={setMobileMenuOpen} 
        onClose={handleCloseMobileMenu} 
      />
    </header>
  );
};

export default Header;
