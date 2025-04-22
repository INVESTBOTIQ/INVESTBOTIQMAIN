
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

// MENU structuur gedefinieerd zoals wireframe
const NAV_ITEMS = [
  {
    title: "Home",
    to: "/",
    desktopOnly: false
  },
  {
    title: "Alles over Investbot",
    submenu: [
      { label: "Wat is het?", to: "/alles-over-investbot/wat-is-het" },
      { label: "Hoe werkt het?", to: "/alles-over-investbot/hoe-werkt-het" },
      { label: "Missie & Visie", to: "/alles-over-investbot/mission-vision" }
    ],
    desktopOnly: false
  },
  { title: "Tier Plannen", to: "/tier-plannen", desktopOnly: false },
  { title: "Veiligheid", to: "/veiligheid", desktopOnly: false },
  { title: "FAQ", to: "/faq", desktopOnly: false }
];

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false); // voor mobile
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const isMember = !!user && userRole === "member";

  // Logo (gebruik <img> indien je het bestand hebt) - klikbaar naar /
  const Logo = (
    <Link
      to="/"
      className="flex items-center gap-2 cursor-pointer select-none"
      aria-label="Homepage"
    >
      <span className="font-extrabold text-2xl md:text-3xl text-indigo-600 tracking-tight">
        {/* Hier je <img src={...}/> voor het logo */}
        INVESTBOTIQ
      </span>
    </Link>
  );

  // Navigation helpers (smooth scroll op anchors)
  const handleNav = (to: string) => {
    setMenuOpen(false);
    setSubmenuOpen(false);
    if (to.startsWith("#")) {
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    navigate(to);
  };

  // --- DESKTOP MENU ---
  const renderDesktopMenu = () => (
    <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-6 relative">
      <Link to="/" className="px-3 py-2 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
        Home
      </Link>
      {/* Alles over Investbot (Dropdown) */}
      <div
        className="relative group"
        onMouseEnter={() => setDesktopSubmenuOpen(true)}
        onMouseLeave={() => setDesktopSubmenuOpen(false)}
      >
        <button
          className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-50 font-semibold transition-colors"
        >
          Alles over Investbot
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <AnimatePresence>
        {desktopSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24 }}
            className="absolute left-0 top-full min-w-[220px] rounded-md shadow-lg bg-white border z-[100] animate-fade-in"
            onMouseLeave={() => setDesktopSubmenuOpen(false)}
          >
            {NAV_ITEMS[1].submenu?.map((item) => (
              <button
                key={item.label}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors"
                onClick={() => handleNav(item.to)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      {/* Single nav items (NB: skip index 1 want dat is de dropdown) */}
      {NAV_ITEMS.slice(2).map((item) => (
        <button
          key={item.title}
          className="px-3 py-2 rounded-md hover:bg-indigo-50 font-semibold transition-colors"
          onClick={() => handleNav(item.to!)}
        >
          {item.title}
        </button>
      ))}
      {/* Spacer */}
      <span className="hidden xl:inline-block w-[2.5rem]"></span>
      {/* Reg/Mem logica */}
      {!user && (
        <>
          <Link
            to="/auth"
            className="px-5 py-2 rounded-md bg-indigo-500 text-white shadow hover:bg-indigo-600 font-semibold transition-all ml-3"
          >
            Register
          </Link>
          <Link
            to="/auth"
            className="px-5 py-2 rounded-md bg-gray-100 text-indigo-700 hover:bg-indigo-200 font-semibold transition-all"
          >
            Log-in
          </Link>
        </>
      )}
      {isMember && (
        <Link
          to="/member/dashboard"
          className="px-5 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold transition-all ml-2"
        >
          Member Dashboard
        </Link>
      )}
    </nav>
  );

  // --- MOBILE HAMBURGER MENU ---
  const renderMobileMenu = () => (
    <AnimatePresence>
    {menuOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.27 }}
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setMenuOpen(false)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.32 }}
          className="absolute right-0 top-0 h-full w-4/5 max-w-xs sm:max-w-md bg-white shadow-2xl flex flex-col p-0 z-[100]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top: logo/close */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {Logo}
            <button
              className="p-2 rounded-full hover:bg-indigo-50 transition"
              onClick={() => setMenuOpen(false)}
              aria-label="Sluit menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          {/* Hoofdmenu */}
          <nav className="flex-1 flex flex-col gap-1 px-6 py-5">
            <button
              className="font-semibold py-2 px-2 rounded hover:bg-indigo-50 text-left transition"
              onClick={() => {
                setMenuOpen(false);
                navigate("/");
              }}
            >
              Home
            </button>
            {/* Alles over Investbot: dropdown in uitklap */}
            <div className="w-full">
              <button
                className="flex items-center w-full justify-between font-semibold py-2 px-2 rounded hover:bg-indigo-50 transition"
                onClick={() => setSubmenuOpen((o) => !o)}
              >
                <span>Alles over Investbot</span>
                <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.21 }}
                    className="flex flex-col mt-1 ml-4"
                  >
                    {NAV_ITEMS[1].submenu?.map((item) => (
                      <button
                        key={item.label}
                        className="py-2 w-full text-left text-gray-800 rounded hover:text-indigo-600 hover:bg-indigo-50 transition"
                        onClick={() => {
                          setMenuOpen(false);
                          setSubmenuOpen(false);
                          navigate(item.to);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Overige navs */}
            {NAV_ITEMS.slice(2).map((item) => (
              <button
                key={item.title}
                className="font-semibold py-2 px-2 rounded hover:bg-indigo-50 text-left transition"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(item.to!);
                }}
              >
                {item.title}
              </button>
            ))}
            {/* Spacer */}
            <div className="flex-1" />
          </nav>
          {/* Ondermenu: Reg/Log-in/Member onderin */}
          <div className="border-t mt-0 pt-3 pb-5 px-6 flex flex-col gap-2">
            {!user && (
              <>
                <Link
                  to="/auth"
                  className="block w-full py-2 px-3 rounded bg-indigo-500 text-white font-semibold text-center hover:bg-indigo-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/auth"
                  className="block w-full py-2 px-3 rounded bg-gray-100 text-indigo-700 font-semibold text-center hover:bg-indigo-200 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Log-in
                </Link>
              </>
            )}
            {isMember && (
              <Link
                to="/member/dashboard"
                className="block w-full py-2 px-3 rounded bg-blue-100 text-blue-700 font-semibold text-center hover:bg-blue-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Member Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow">
      <div className="container flex items-center justify-between h-16 md:h-20 px-2">
        {Logo}
        {renderDesktopMenu()}
        {/* Hamburger ONLY visible on mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-indigo-50 transition-colors"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      {renderMobileMenu()}
    </header>
  );
};

export default PublicHeader;
