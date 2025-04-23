
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

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
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
      
      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return null;
    }
  };

  // Redirect based on role without causing infinite redirects
  const redirectBasedOnRole = (role: string | null) => {
    if (!role) return;
    
    const currentPath = location.pathname;
    
    // Don't redirect if already on the correct page or at login
    if ((role === 'admin' && currentPath.startsWith('/admin')) || 
        (role === 'member' && currentPath.startsWith('/member')) ||
        currentPath === '/auth') {
      return;
    }
    
    // Redirect to the appropriate dashboard
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'member') {
      navigate('/member/dashboard');
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
          
          // Only redirect if we have a role and aren't on the correct page already
          if (role) {
            redirectBasedOnRole(role);
          }
        }
        
        // Then set up auth state listener for future changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.id);
          
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (newSession?.user) {
            const role = await fetchUserRole(newSession.user.id);
            setUserRole(role);
            
            if (event === 'SIGNED_IN') {
              redirectBasedOnRole(role);
            }
          } else {
            setUserRole(null);
            if (event === 'SIGNED_OUT') {
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

  return (
    <AuthContext.Provider value={{ user, session, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
