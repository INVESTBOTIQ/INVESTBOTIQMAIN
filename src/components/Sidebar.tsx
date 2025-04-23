
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  BarChart4,
  FileText,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  CheckSquare,
  Users,
  UserCircle,
  Sparkles,
  Bell,
  CircleDollarSign,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { userRole } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  
  React.useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const memberLinks = [
    { to: '/member/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/member/progress', icon: <BarChart4 className="h-4 w-4" />, label: 'Voortgang' },
    { to: '/member/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/member/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/member/ai-running', icon: <Sparkles className="h-4 w-4" />, label: 'AI Bot' }
  ];

  const adminLinks = [
    { to: '/admin', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users className="h-4 w-4" />, label: 'Gebruikers' },
    { to: '/admin/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/admin/cashflows', icon: <CircleDollarSign className="h-4 w-4" />, label: 'Cashflows' },
    { to: '/admin/spirits', icon: <Sparkles className="h-4 w-4" />, label: 'Spirits' },
    { to: '/admin/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/admin/notifications', icon: <Bell className="h-4 w-4" />, label: 'Notificaties' },
  ];

  const links = userRole === 'admin' ? adminLinks : memberLinks;
  const profileLink = userRole === 'admin' ? '/admin/profile' : '/member/profile';

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 -mr-10 mt-4 lg:hidden"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Menu />
      </Button>
      <aside
        className={cn(
          'fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] flex-col border-r bg-background transition-all duration-300 lg:static lg:z-0',
          expanded ? 'w-64' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0 overflow-hidden'
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="grid gap-1 px-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary',
                    isActive
                      ? 'bg-accent text-primary font-medium'
                      : 'text-muted-foreground'
                  )
                }
              >
                {link.icon}
                <span className={cn('truncate', !expanded && 'lg:hidden')}>
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto px-2 py-4">
            <NavLink
              to={profileLink}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary',
                  isActive
                    ? 'bg-accent text-primary font-medium'
                    : 'text-muted-foreground'
                )
              }
            >
              <UserCircle className="h-4 w-4" />
              <span className={cn('truncate', !expanded && 'lg:hidden')}>
                Profiel
              </span>
            </NavLink>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
