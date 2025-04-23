
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

  // Only redirect if coming from specific locations or new login
  const redirectBasedOnRole = (role: string | null, event?: string) => {
    if (!role) return;
    
    const currentPath = window.location.pathname;
    
    // Don't redirect on initial load unless on restricted pages
    if (!event && !currentPath.includes('/admin') && !currentPath.includes('/member')) {
      return;
    }
    
    // Don't redirect if already on appropriate dashboard or auth page
    if ((role === 'admin' && currentPath === '/admin') || 
        (role === 'member' && currentPath === '/member/dashboard') ||
        currentPath === '/auth') {
      return;
    }
    
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
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event, session?.user?.id);
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
            redirectBasedOnRole(role, event);
          } else {
            setUserRole(null);
            // Only redirect to auth on explicit signout
            if (event === 'SIGNED_OUT') {
              navigate('/auth');
            }
          }
        });
        
        // THEN check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
          redirectBasedOnRole(role);
        }
        
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
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, session, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
