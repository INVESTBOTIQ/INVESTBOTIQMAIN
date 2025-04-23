
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
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    // Extract referral code from URL if it exists
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('ref');
    if (code) {
      setReferralCode(code);
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      console.log("Auth page - Already logged in as:", userRole, "with email:", user.email);
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
          console.log("Login successful for user email:", data.user.email);
          // Don't navigate here - let the AuthProvider handle redirection based on role
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;

        // If there's a referral code, handle the referral after registration
        if (referralCode && data.user) {
          try {
            // First, find the user who owns this referral code
            const { data: referrerData, error: referrerError } = await supabase
              .from('referrals')
              .select('user_id')
              .eq('referral_code', referralCode)
              .is('referred_user_id', null)
              .single();

            if (referrerError) {
              console.error("Error finding referrer:", referrerError);
            } else if (referrerData) {
              // Insert with the user_id from the referrer
              const { error: referralError } = await supabase
                .from('referrals')
                .insert({
                  user_id: referrerData.user_id, // The referrer
                  referred_user_id: data.user.id, // The new user being referred
                  referral_code: referralCode,
                  status: 'pending'
                });

              if (referralError) {
                console.error("Error storing referral:", referralError);
              }
            }
          } catch (refError) {
            console.error("Error processing referral:", refError);
          }
        }
        
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
          {referralCode && !isLogin && (
            <div className="text-sm text-green-600 mt-1">
              Je bent uitgenodigd! Registreer om €100 bonus te ontvangen.
            </div>
          )}
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
