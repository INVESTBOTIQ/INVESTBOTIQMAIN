
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

  const fetchUserRole = async (userId: string, userEmail: string) => {
    try {
      console.log("Fetching role for user email:", userEmail);
      
      // Use email to determine role (hard-coded for demo)
      if (userEmail === "investbotiq@gmail.com") {
        console.log("Admin user detected with email:", userEmail);
        return "admin";
      } else {
        console.log("Member user detected with email:", userEmail);
        return "member";
      }
      
      // In production, you would query the database like this:
      /*
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
      
      return data.role;
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
          
          const userEmail = currentSession.user.email;
          console.log("Session found, user email:", userEmail);
          
          const role = await fetchUserRole(currentSession.user.id, userEmail || "");
          setUserRole(role);
          console.log("Session found, user role:", role);
          
          // Redirect if necessary
          redirectBasedOnRole(role);
        }
        
        // Then set up auth state listener for future changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.email);
          
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (newSession?.user) {
            const userEmail = newSession.user.email;
            const role = await fetchUserRole(newSession.user.id, userEmail || "");
            setUserRole(role);
            console.log("Auth state change - user role:", role, "for email:", userEmail);
            
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
