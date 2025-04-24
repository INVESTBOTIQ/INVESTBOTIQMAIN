
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userRole: "admin" | "member" | "guest" | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "member" | "guest" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            // Try to get the role from the session jwt claim first
            if (session.user?.app_metadata?.role) {
              setUserRole(session.user.app_metadata.role as "admin" | "member" | "guest");
            } else {
              // Fallback to RPC call
              const { data: role, error } = await supabase
                .rpc('get_user_role', { user_id: session.user.id });
              
              if (error) {
                console.error("Error getting user role:", error);
                // Default to "guest" if there's an error
                setUserRole("guest");
                // Let's notify the user that there's an issue with their role
                if (error.message.includes("role \"member\" does not exist")) {
                  toast.error("Er is een probleem met uw gebruikersrol. Neem contact op met de beheerder.");
                }
              } else {
                setUserRole(role || "guest");
              }
            }
          } catch (error) {
            console.error("Error in auth state change:", error);
            setUserRole("guest");
          }
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          // Try to get the role from the session jwt claim first
          if (session.user?.app_metadata?.role) {
            setUserRole(session.user.app_metadata.role as "admin" | "member" | "guest");
          } else {
            // Fallback to RPC call
            const { data: role, error } = await supabase
              .rpc('get_user_role', { user_id: session.user.id });
            
            if (error) {
              console.error("Error getting initial user role:", error);
              // Default to "guest" if there's an error
              setUserRole("guest");
              // Let's notify the user that there's an issue with their role
              if (error.message.includes("role \"member\" does not exist")) {
                toast.error("Er is een probleem met uw gebruikersrol. Neem contact op met de beheerder.");
              }
            } else {
              setUserRole(role || "guest");
            }
          }
        } catch (error) {
          console.error("Error getting initial user role:", error);
          setUserRole("guest");
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
