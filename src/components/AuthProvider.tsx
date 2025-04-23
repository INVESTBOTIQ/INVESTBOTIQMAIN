
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  session: null, 
  userRole: null, 
  isLoading: true 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserRole = async (userId: string) => {
    try {
      console.log("Fetching role for user ID:", userId);
      
      // For testing, let's explicitly check email for admin access
      // In production, this should be replaced with a proper DB query
      if (userId === "ac2f8180-d56e-4fed-86a5-4a1b4b05f070" || 
          userId === "3895ff35-bdb1-4300-9e48-d75126f66e88") {
        console.log("Admin user detected");
        return "admin";
      }
      
      return "member";
      
      // Uncomment this when the DB function is fixed
      /*
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
      
      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
      
      return data;
      */
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return null;
    }
  };

  // Redirect based on role without causing infinite redirects
  const redirectBasedOnRole = (role: string | null) => {
    if (!role) return;
    
    console.log("Redirecting based on role:", role);
    const currentPath = location.pathname;
    
    // Only redirect from auth page or if on wrong dashboard type
    if (currentPath === '/auth' || 
        (role === 'admin' && currentPath.startsWith('/member')) ||
        (role === 'member' && currentPath.startsWith('/admin'))) {
      
      if (role === 'admin') {
        console.log("Redirecting admin to /admin");
        navigate('/admin');
      } else if (role === 'member') {
        console.log("Redirecting member to /member/dashboard");
        navigate('/member/dashboard');
      }
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // First check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          const role = await fetchUserRole(currentSession.user.id);
          setUserRole(role);
          console.log("Session found, user role:", role);
          
          // Redirect if necessary
          redirectBasedOnRole(role);
        }
        
        // Then set up auth state listener for future changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.id);
          
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (newSession?.user) {
            const role = await fetchUserRole(newSession.user.id);
            setUserRole(role);
            console.log("Auth state change - user role:", role);
            
            if (event === 'SIGNED_IN') {
              redirectBasedOnRole(role);
            }
          } else {
            setUserRole(null);
            if (event === 'SIGNED_OUT' && !isPublicRoute(location.pathname)) {
              navigate('/auth');
            }
          }
        });
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [navigate, location.pathname]);

  // Helper function to check if a route is public
  const isPublicRoute = (path: string): boolean => {
    const publicRoutes = ['/', '/auth', '/faq'];
    return publicRoutes.includes(path) || publicRoutes.some(route => path.startsWith(`${route}/`));
  };

  return (
    <AuthContext.Provider value={{ user, session, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
