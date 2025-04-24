
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";
import { Json } from "@/integrations/supabase/types";

type Lead = {
  id: string;
  role: string;
  general: {
    voornaam: string;
    achternaam: string;
    email: string;
    [key: string]: any;
  };
  status: string;
  created_at: string;
  answers: any;
  updated_at: string;
};

type SupabaseLead = {
  id: string;
  role: string;
  general: Json;
  status: string;
  created_at: string;
  answers: Json;
  updated_at: string;
}

const AdminLeads = () => {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads, isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registration_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Lead type
      return (data as SupabaseLead[]).map(lead => ({
        ...lead,
        general: lead.general as Lead["general"]
      })) as Lead[];
    }
  });

  const filteredLeads = leads?.filter(lead => {
    const matchesRole = roleFilter === "all" || lead.role === roleFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === "" || 
      lead.general.voornaam?.toLowerCase().includes(searchLower) ||
      lead.general.achternaam?.toLowerCase().includes(searchLower) ||
      lead.general.email?.toLowerCase().includes(searchLower);
    
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-2">Leads Overzicht</h2>
        <p className="text-muted-foreground mb-4">
          Beheer alle leads die zijn binnengekomen via het aanmeldformulier.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Lead Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Zoeken op naam of email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter op rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle rollen</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="ouder">Ouder</SelectItem>
                  <SelectItem value="affiliated">Affiliated</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="ondernemer">Ondernemer</SelectItem>
                  <SelectItem value="artiest">Artiest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div>Laden...</div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>Er is een fout opgetreden bij het laden van de leads.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {filteredLeads?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Geen leads gevonden die voldoen aan de filteropties
                  </p>
                ) : (
                  filteredLeads?.map((lead) => (
                    <Card key={lead.id}>
                      <CardContent className="pt-6">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Naam</p>
                            <p>{lead.general.voornaam} {lead.general.achternaam}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{lead.general.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Rol</p>
                            <p className="capitalize">{lead.role}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Aangemeld op</p>
                            <p>{new Date(lead.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Details bekijken
                          </Button>
                          <Button size="sm">
                            Account aanmaken
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLeads;
