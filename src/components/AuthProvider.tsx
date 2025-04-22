
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

  const redirectBasedOnRole = (role: string | null) => {
    if (!role) return;
    
    const currentPath = window.location.pathname;
    
    // Don't redirect if already on appropriate dashboard
    if ((role === 'admin' && currentPath === '/admin') || 
        (role === 'member' && currentPath === '/') ||
        currentPath === '/auth') {
      return;
    }
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    // Check active session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
          redirectBasedOnRole(role);
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === "SIGNED_IN" && session?.user) {
        const role = await fetchUserRole(session.user.id);
        setUserRole(role);
        redirectBasedOnRole(role);
      }
      
      if (event === "SIGNED_OUT") {
        setUserRole(null);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, session, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
