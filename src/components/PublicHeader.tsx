import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [
  {
    title: "Alles over Investbot",
    submenu: [
      { label: "Wat is het?", to: "#wat-is-investbotiq" },
      { label: "Hoe werkt het?", to: "#hoe-werkt-het" },
      { label: "Missie & Visie", to: "#missie-visie" },
    ],
  },
  { title: "Tier Plannen", to: "#tier-plannen" },
  { title: "Veiligheid", to: "#veiligheid" },
  { title: "FAQ", to: "#faq" },
];

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const isMember = !!user && userRole === "member";

  // TODO: Vervang deze door een <img> tag als het logo-bestand is toegevoegd.
  const Logo = (
    <span className="font-extrabold text-2xl md:text-3xl text-indigo-600 tracking-tight select-none">
      {/* Hier liefst een logo-IMG */}
      INVESTBOTIQ
    </span>
  );

  // Mobile: Sluit menu bij navigeren
  const handleNav = (to: string) => {
    setMenuOpen(false);
    if (to.startsWith("#")) {
      // Smooth scroll naar anchor
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    navigate(to);
  };

  // Render submenu voor "Alles over Investbot"
  const Submenu = (
    <div 
      className="absolute bg-white left-0 top-full min-w-[210px] rounded-md shadow-lg py-2 z-40 border animate-fade-in"
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      {NAV_ITEMS[0].submenu.map((item) => (
        <button
          key={item.label}
          className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors"
          onClick={() => handleNav(item.to)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo as homebtn */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Homepage"
        >
          {Logo}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-5 relative">
          {/* Alles over Investbot (Dropdown) */}
          <div
            className="relative group"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button
              className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-50 font-semibold transition-colors"
            >
              Alles over Investbot
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <AnimatePresence>
              {submenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full"
                  style={{ zIndex: 40 }}
                >
                  {Submenu}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Single nav items */}
          {NAV_ITEMS.slice(1).map((item) => (
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

          {/* Log in/member/reg links */}
          {!user && (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md bg-indigo-500 text-white shadow hover:bg-indigo-600 font-semibold transition-all ml-2"
              >
                Log-in
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md bg-gray-100 text-indigo-700 hover:bg-indigo-100 font-semibold transition-all"
              >
                Register
              </Link>
            </>
          )}
          {isMember && (
            <Link
              to="/member/dashboard"
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold transition-all ml-2"
            >
              Member
            </Link>
          )}
        </div>

        {/* Hamburger (altijd zichtbaar) */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-indigo-50 transition-colors"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Slide-out menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.26 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-3/4 sm:w-2/5 min-w-[230px] max-w-[340px] bg-white shadow-lg flex flex-col p-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top: logo/close */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  {Logo}
                </Link>
                <button
                  className="p-2 rounded-full hover:bg-indigo-50"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Sluit menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col gap-2 px-6 py-4">
                {/* Dropdown: Alles over Investbot */}
                <div>
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
                        transition={{ duration: 0.18 }}
                        className="flex flex-col mt-1 ml-4"
                      >
                        {NAV_ITEMS[0].submenu.map((item) => (
                          <button
                            key={item.label}
                            className="py-2 w-full text-left text-gray-800 hover:text-indigo-600"
                            onClick={() => {
                              setMenuOpen(false);
                              setSubmenuOpen(false);
                              handleNav(item.to);
                            }}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Other navs */}
                {NAV_ITEMS.slice(1).map((item) => (
                  <button
                    key={item.title}
                    className="font-semibold py-2 px-2 rounded hover:bg-indigo-50 transition text-left"
                    onClick={() => handleNav(item.to!)}
                  >
                    {item.title}
                  </button>
                ))}

                <div className="border-t mt-3 pt-3 flex flex-col gap-2">
                  {!user && (
                    <>
                      <Link
                        to="/auth"
                        className="block w-full py-2 px-3 rounded bg-indigo-500 text-white font-semibold text-center hover:bg-indigo-600 transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        Log-in
                      </Link>
                      <Link
                        to="/auth"
                        className="block w-full py-2 px-3 rounded bg-gray-100 text-indigo-700 font-semibold text-center hover:bg-indigo-200 transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                  {isMember && (
                    <Link
                      to="/member/dashboard"
                      className="block w-full py-2 px-3 rounded bg-blue-100 text-blue-700 font-semibold text-center hover:bg-blue-200 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Member
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
