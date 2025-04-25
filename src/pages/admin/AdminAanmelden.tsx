
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { withRoleGuard } from "@/utils/withRoleGuard";

type UserRole = "admin" | "member" | "guest";

const AdminAanmelden = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    voornaam: "",
    achternaam: "",
    woonplaats: "",
    geboortedatum: "",
    telefoon: "",
    role: "member" as UserRole,
    referral: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value as UserRole
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      if (!formData.email || !formData.voornaam || !formData.achternaam) {
        throw new Error("Email, voornaam en achternaam zijn verplicht");
      }
      
      // Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: generateTemporaryPassword(),
        email_confirm: true,
        user_metadata: {
          full_name: `${formData.voornaam} ${formData.achternaam}`
        }
      });
      
      if (authError) throw authError;
      
      // Store additional user data in profiles table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            first_name: formData.voornaam,
            last_name: formData.achternaam,
            city: formData.woonplaats,
            birth_date: formData.geboortedatum,
            phone: formData.telefoon,
            referred_by: formData.referral || null
          });
          
        if (profileError) throw profileError;
        
        // Set user role with properly typed role value
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: formData.role
          });
          
        if (roleError) throw roleError;
        
        // Send welcome email with reset password link
        const { error: resetError } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: formData.email,
        });
        
        if (resetError) console.error("Error generating reset link:", resetError);
        
        toast.success(`Account aangemaakt voor ${formData.email}`);
        // Reset form
        setFormData({
          email: "",
          voornaam: "",
          achternaam: "",
          woonplaats: "",
          geboortedatum: "",
          telefoon: "",
          role: "member" as UserRole,
          referral: ""
        });
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Er is een fout opgetreden bij het aanmaken van het account");
    } finally {
      setLoading(false);
    }
  };
  
  // Generate a secure temporary password
  const generateTemporaryPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Account Aanmaken</h1>
          <p className="text-muted-foreground">
            Maak handmatig een nieuw account aan voor een gebruiker
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Gebruikersgegevens</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voornaam">Voornaam <span className="text-destructive">*</span></Label>
                <Input
                  id="voornaam"
                  name="voornaam"
                  value={formData.voornaam}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achternaam">Achternaam <span className="text-destructive">*</span></Label>
                <Input
                  id="achternaam"
                  name="achternaam"
                  value={formData.achternaam}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefoon">Telefoonnummer</Label>
                <Input
                  id="telefoon"
                  name="telefoon"
                  value={formData.telefoon}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="woonplaats">Woonplaats</Label>
                <Input
                  id="woonplaats"
                  name="woonplaats"
                  value={formData.woonplaats}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="geboortedatum">Geboortedatum</Label>
                <Input
                  id="geboortedatum"
                  name="geboortedatum"
                  type="date"
                  value={formData.geboortedatum}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Gebruikersrol <span className="text-destructive">*</span></Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referral">Doorverwezen door (email)</Label>
                <Input
                  id="referral"
                  name="referral"
                  type="email"
                  value={formData.referral}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Account aanmaken..." : "Account aanmaken"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Een tijdelijk wachtwoord wordt gegenereerd en de gebruiker ontvangt een wachtwoord reset link.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoleGuard(AdminAanmelden, ["admin"]);
