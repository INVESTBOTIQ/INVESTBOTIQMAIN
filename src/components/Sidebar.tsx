
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BarChart, CheckSquare, Link as LinkIcon } from "lucide-react";

const sidebarItems = [
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

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <aside className={cn("w-64 border-r bg-card p-4", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "sidebar-item",
                  location.pathname === item.href && "sidebar-item-active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
