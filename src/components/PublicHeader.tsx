
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import PublicHeaderMobileMenu from "./PublicHeaderMobileMenu";
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

  const Logo = (
    <Link 
      to="/" 
      className="flex items-center gap-2 cursor-pointer select-none" 
      aria-label="Homepage"
    >
      <img 
        src="/lovable-uploads/f072ab55-6051-4ac3-a481-2047383cf59f.png" 
        alt="Investbotiq Icon" 
        className="h-10 w-auto"
      />
      <img 
        src="/lovable-uploads/4befc6ee-1b19-4552-af1f-062bf7191a8a.png" 
        alt="Investbotiq Logo" 
        className="h-8 w-auto hidden md:block"
      />
    </Link>
  );

  const handleNav = (to: string) => {
    setMenuOpen(false);
    if (to.startsWith("#")) {
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
      return;
    }
    navigate(to);
  };

  return <header className="fixed top-0 left-0 w-full z-40 bg-white shadow">
      <div className="container flex items-center justify-between h-16 md:h-20 px-2">
        {Logo}
        <PublicHeaderDesktopMenu handleNav={handleNav} />
        <button className="md:hidden p-2 rounded-full hover:bg-indigo-50 transition-colors" aria-label={menuOpen ? "Sluit menu" : "Open menu"} onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      <PublicHeaderMobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} Logo={Logo} />
    </header>;
};

export default PublicHeader;
