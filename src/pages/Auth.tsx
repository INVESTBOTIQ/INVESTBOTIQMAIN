
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      console.log("Auth page - Already logged in as:", userRole);
      if (userRole === 'admin') {
        navigate('/admin', { replace: true });
      } else if (userRole === 'member') {
        navigate('/member/dashboard', { replace: true });
      }
    }
  }, [user, userRole, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log("Attempting to sign in with email:", email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Check if we have a successful login with user data
        if (data.user) {
          toast.success("Succesvol ingelogd");
          console.log("Login successful for user ID:", data.user.id);
          // Don't navigate here - let the AuthProvider handle redirection based on role
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast.success("Registratie succesvol. Controleer uw e-mail om uw account te bevestigen.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || `Fout bij ${isLogin ? "inloggen" : "registreren"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Inloggen" : "Registreren"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Bezig..."
                : isLogin
                ? "Inloggen"
                : "Account aanmaken"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Nog geen account? Registreer hier"
                : "Al een account? Log hier in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
