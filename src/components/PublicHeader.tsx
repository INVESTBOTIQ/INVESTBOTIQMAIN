
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import PublicHeaderMobileMenu from "./PublicHeaderMobileMenu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [{
  title: "Home",
  to: "/",
  desktopOnly: false
}, {
  title: "Alles over Investbot",
  submenu: [{
    label: "Wat is het?",
    to: "/alles-over-investbot/wat-is-het"
  }, {
    label: "Hoe werkt het?",
    to: "/alles-over-investbot/hoe-werkt-het"
  }, {
    label: "Missie & Visie",
    to: "/alles-over-investbot/mission-vision"
  }],
  desktopOnly: false
}, {
  title: "Tier Plannen",
  to: "/tier-plannen",
  desktopOnly: false
}, {
  title: "Veiligheid",
  to: "/veiligheid",
  desktopOnly: false
}, {
  title: "FAQ",
  to: "/faq",
  desktopOnly: false
}];

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";

  // Add the missing handleNav function here
  const handleNav = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const Logo = (
    <Link 
      to="/" 
      className="flex items-center gap-4 cursor-pointer select-none" 
      aria-label="Invest Bot IQ Homepage"
    >
      <img 
        src="/lovable-uploads/f072ab55-6051-4ac3-a481-2047383cf59f.png" 
        alt="Invest Bot IQ Icon" 
        className="h-10 w-auto"
      />
      <img 
        src="/lovable-uploads/4befc6ee-1b19-4552-af1f-062bf7191a8a.png" 
        alt="Invest Bot IQ Logo" 
        className="h-8 w-auto hidden md:block"
      />
      <img
        src="/lovable-uploads/4befc6ee-1b19-4552-af1f-062bf7191a8a.png"
        alt="Extra Logo"
        className="h-8 w-auto block md:hidden"
      />
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white shadow">
      <div className="container flex items-center justify-between h-16 md:h-20 px-2">
        {Logo}
        <div className="flex items-center space-x-4">

          <PublicHeaderDesktopMenu handleNav={handleNav} />
          <button className="md:hidden p-2 rounded-full hover:bg-indigo-50 transition-colors" aria-label={menuOpen ? "Sluit menu" : "Open menu"} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>
      <PublicHeaderMobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} Logo={Logo} />
    </header>
  );
};

export default PublicHeader;
