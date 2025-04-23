
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { user, userRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary truncate">Investbotiq</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:block text-sm text-muted-foreground truncate max-w-[200px]">
              {user.email}
            </span>
          )}
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mobile-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        setIsOpen={setMobileMenuOpen} 
        onClose={handleCloseMobileMenu} 
      />
    </header>
  );
};

export default Header;
