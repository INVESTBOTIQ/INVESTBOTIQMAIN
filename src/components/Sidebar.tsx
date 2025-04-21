
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Chart, Tasks, FileText } from "lucide-react";

const sidebarItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Chart,
    label: "Voortgang",
    href: "/progress",
  },
  {
    icon: Tasks,
    label: "Taken",
    href: "/tasks",
  },
  {
    icon: FileText,
    label: "Rapporten",
    href: "/reports",
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
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
