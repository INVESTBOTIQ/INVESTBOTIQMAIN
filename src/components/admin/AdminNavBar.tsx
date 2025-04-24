import {
  Home,
  BarChartBig,
  ListChecks,
  Coins,
  TrendingUp,
  Bell,
  Users,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Leads", href: "/admin/leads", icon: UserPlus },
  { name: "Gebruikers", href: "/admin/users", icon: Users },
  { name: "Taken", href: "/admin/tasks", icon: ListChecks },
  { name: "Cashflows", href: "/admin/cashflows", icon: Coins },
  { name: "Flowlutas", href: "/admin/flowlutas", icon: TrendingUp },
  { name: "Notificaties", href: "/admin/notifications", icon: Bell },
  { name: "Instellingen", href: "/admin/settings", icon: Settings },
  { name: "Profiel", href: "/admin/profile", icon: User },
];

const AdminNavBar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 py-12 px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 font-semibold" : ""
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminNavBar;
