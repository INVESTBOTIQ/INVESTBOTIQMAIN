
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
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      console.log("Auth page - Already logged in as:", userRole, "with email:", user.email);
      
      // Add a slight delay to ensure role is properly set
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin', { replace: true });
        } else if (userRole === 'member') {
          navigate('/member/dashboard', { replace: true });
        } else {
          // Default to home page for guests or unknown roles
          navigate('/', { replace: true });
        }
      }, 100);
    }
  }, [user, userRole, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Vul alstublieft zowel e-mail als wachtwoord in");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting to sign in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      // Check if we have a successful login with user data
      if (data.user) {
        toast.success("Succesvol ingelogd");
        console.log("Login successful for user email:", data.user.email);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Provide user-friendly error messages
      let errorMessage = error.message;
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "E-mail niet bevestigd. Controleer uw inbox voor een bevestigingslink.";
      }
      
      toast.error(errorMessage || "Fout bij inloggen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inloggen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              {loading ? "Bezig..." : "Inloggen"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
