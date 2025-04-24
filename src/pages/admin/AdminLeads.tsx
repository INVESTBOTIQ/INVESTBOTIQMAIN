
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

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
        general: typeof lead.general === 'string' 
          ? JSON.parse(lead.general) 
          : lead.general as Lead['general']
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

  // Dynamisch alle velden tonen
  const renderLeadDetails = (lead: Lead) => {
    if (!lead) return null;
    const generalFields = [
      ["Voornaam", lead.general.voornaam],
      ["Achternaam", lead.general.achternaam],
      ["Woonplaats", lead.general.woonplaats],
      ["Geboortedatum", lead.general.geboortedatum],
      ["E-mail", lead.general.email],
      ["Telefoonnummer", lead.general.telefoonnummer],
      ["Hoe gehoord", lead.general.hoe_gehoord],
      ["Referral", lead.general.referral_email],
      ["Plus 1", `${lead.general.plus1_voornaam || ''} ${lead.general.plus1_achternaam || ''} (${lead.general.plus1_email || ''})`],
    ];
    // Rol-specifieke velden
    const roleFields: Record<string, [string,string|boolean|undefined][]> = {
      member: [
        ["Motivatie", lead.general.motivatie],
        ["Financieel actief", lead.general.financieel_actief ? "Ja" : "Nee"]
      ],
      student: [
        ["Opleiding", lead.general.opleiding],
        ["Instelling", lead.general.instelling],
        ["Verwachte afstudeerdatum", lead.general.afstudeerdatum],
      ],
      ouder: [
        ["Naam kind", lead.general.kind_naam],
        ["Geboortedatum kind", lead.general.kind_geboortedatum],
        ["Kind heeft eigen e-mail?", lead.general.kind_email ? "Ja" : "Nee"],
      ],
      affiliated: [
        ["Regio", lead.general.regio],
        ["Netwerkbereik", lead.general.netwerk],
      ],
      freelancer: [
        ["Vakgebied", lead.general.vakgebied],
        ["Heeft klanten?", lead.general.heeft_klanten ? "Ja" : "Nee"]
      ],
      ondernemer: [
        ["Bedrijfsnaam", lead.general.bedrijfsnaam],
        ["KvK-nummer", lead.general.kvk],
        ["Bedrijfsmodel", lead.general.bedrijfsmodel],
      ],
      artiest: [
        ["Type artiest", lead.general.artiest_type],
        ["Portfolio", lead.general.portfolio],
      ],
    };
    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-indigo-700">Algemene gegevens</h4>
          <ul className="space-y-1">
            {generalFields.map(([label, value]) => (
              value ? (
                <li key={label} className="flex gap-2 text-sm"><span className="w-40 font-medium text-gray-700">{label}:</span> <span>{value}</span></li>
              ) : null
            ))}
          </ul>
        </div>
        {roleFields[lead.role] && (
          <div>
            <h4 className="font-semibold mt-4 mb-2 text-indigo-700 capitalize">{lead.role} specifieke vragen</h4>
            <ul className="space-y-1">
              {roleFields[lead.role].map(([label, value]) => (
                value ? (
                  <li key={label} className="flex gap-2 text-sm"><span className="w-40 font-medium text-gray-700">{label}:</span> <span>{value}</span></li>
                ) : null
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Orbs voor branding en sfeer */}
      <div className="pointer-events-none select-none">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200 rounded-full opacity-20 blur-3xl z-0 animate-fade-in" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-pink-200 rounded-full opacity-20 blur-2xl z-0 animate-fade-in" />
      </div>
      <Header />
      <div className="container mx-auto px-2 md:px-6 py-6 relative z-10">
        <AdminNavBar />
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-800 flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle text-indigo-500"><circle cx="12" cy="12" r="12" fill="#eef2ff" /><path d="M7 13l3 3 7-7" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Leads Overzicht
        </h2>
        <p className="text-muted-foreground mb-4">
          Beheer alle leads die zijn binnengekomen via het aanmeldformulier.
        </p>
        <Card className="shadow-xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-indigo-700">Lead Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              <div className="text-center py-12 text-lg text-indigo-500 animate-pulse">Laden...</div>
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
                    <Card
                      key={lead.id}
                      className="transition-all duration-200 hover:shadow-2xl hover:scale-[1.012] border-indigo-100 hover:border-indigo-300 group"
                    >
                      <CardContent className="pt-6 pb-4">
                        <div className="grid md:grid-cols-4 gap-4 items-center">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Naam</p>
                            <p className="font-medium text-gray-900">{lead.general.voornaam} {lead.general.achternaam}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Email</p>
                            <p className="font-medium text-gray-900">{lead.general.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rol</p>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm bg-indigo-50 text-indigo-700 border border-indigo-100 group-hover:bg-indigo-100 transition-all`}>{lead.role}</span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Aangemeld op</p>
                            <p className="font-medium text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Dialog open={detailsOpen && selectedLead?.id === lead.id} onOpenChange={open => { setDetailsOpen(open); if (!open) setSelectedLead(null); }}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="group-hover:border-indigo-400 group-hover:text-indigo-700 transition-all" onClick={() => { setSelectedLead(lead); setDetailsOpen(true); }}>
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline mr-1"><path d="M15 12H9m6 0l-3-3m3 3l-3 3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                Details bekijken
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Lead details</DialogTitle>
                                <DialogDescription>Volledige antwoorden van deze lead</DialogDescription>
                              </DialogHeader>
                              {selectedLead && renderLeadDetails(selectedLead)}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setDetailsOpen(false)}>Sluiten</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <AccountCreateDialog lead={lead} />
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
      {/* Fade-in animatie keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

// Modal component voor account aanmaken
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { useState as useReactState } from "react";

type AccountCreateDialogProps = { lead: Lead };
const AccountCreateDialog = ({ lead }: AccountCreateDialogProps) => {
  const [open, setOpen] = useReactState(false);
  const [loading, setLoading] = useReactState(false);
  const [success, setSuccess] = useReactState(false);
  const form = useForm({
    defaultValues: {
      email: lead.general.email || "",
      voornaam: lead.general.voornaam || "",
      achternaam: lead.general.achternaam || "",
      rol: lead.role || "member",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch("/.netlify/functions/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          voornaam: values.voornaam,
          achternaam: values.achternaam,
          rol: values.rol,
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Fout bij aanmaken account");
      }
      setSuccess(true);
      toast.success("Account succesvol aangemaakt!");
    } catch (error: any) {
      toast.error(error.message || "Fout bij aanmaken account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md transition-all" onClick={() => setOpen(true)}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline mr-1"><path d="M12 4v16m8-8H4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Account aanmaken
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Account aanmaken</DialogTitle>
          <DialogDescription>Maak handmatig een account aan voor deze lead. Er wordt een e-mail verstuurd met inloginstructies.</DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="text-center py-8">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto mb-2 text-green-500"><circle cx="12" cy="12" r="12" fill="#dcfce7" /><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p className="font-semibold text-green-700">Account succesvol aangemaakt!</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} type="email" required disabled={loading} />
                </FormItem>
              )} />
              <div className="flex gap-2">
                <FormField name="voornaam" control={form.control} render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Voornaam</FormLabel>
                    <Input {...field} required disabled={loading} />
                  </FormItem>
                )} />
                <FormField name="achternaam" control={form.control} render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Achternaam</FormLabel>
                    <Input {...field} required disabled={loading} />
                  </FormItem>
                )} />
              </div>
              <FormField name="rol" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="ouder">Ouder</SelectItem>
                      <SelectItem value="affiliated">Affiliated</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="ondernemer">Ondernemer</SelectItem>
                      <SelectItem value="artiest">Artiest</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white" loading={loading} disabled={loading}>
                  {loading ? "Bezig..." : "Account aanmaken"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Annuleren</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminLeads;
