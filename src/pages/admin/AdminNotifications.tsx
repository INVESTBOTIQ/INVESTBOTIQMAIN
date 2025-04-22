
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Users, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Shield, 
  Eye
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock sent notifications
const sentNotifications = [
  {
    id: "1",
    title: "Nieuwe Spirit Beschikbaar",
    messagePreview: "Er is een nieuwe spirit beschikbaar. Bekijk de details...",
    sentTo: "Alle gebruikers",
    recipientCount: 24,
    sentDate: "20 Apr 2025",
    type: "info",
    status: "delivered"
  },
  {
    id: "2",
    title: "Taak Update: Contract Ondertekening",
    messagePreview: "We hebben je contract voor Spirit Alpha ontvangen...",
    sentTo: "Jan Jansen",
    recipientCount: 1,
    sentDate: "19 Apr 2025",
    type: "task",
    status: "read"
  },
  {
    id: "3",
    title: "Spirit Activatie Bevestiging",
    messagePreview: "Je Spirit Beta is succesvol geactiveerd...",
    sentTo: "Emma Visser",
    recipientCount: 1,
    sentDate: "18 Apr 2025",
    type: "success",
    status: "read"
  },
  {
    id: "4",
    title: "Belangrijk: Systeem Onderhoud",
    messagePreview: "Op 30 april zal het systeem tijdelijk niet beschikbaar zijn...",
    sentTo: "Alle gebruikers",
    recipientCount: 24,
    sentDate: "15 Apr 2025",
    type: "warning",
    status: "delivered"
  },
  {
    id: "5",
    title: "Cashflow Update April",
    messagePreview: "Je maandelijkse cashflow is bijgewerkt naar...",
    sentTo: "Actieve gebruikers",
    recipientCount: 18,
    sentDate: "10 Apr 2025",
    type: "info",
    status: "delivered"
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "task":
      return <Clock className="h-4 w-4 text-purple-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "security":
      return <Shield className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const AdminNotifications = () => {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [recipientType, setRecipientType] = useState("all");
  
  const handleSendMessage = () => {
    if (!messageTitle || !messageContent) {
      alert("Vul een titel en bericht in.");
      return;
    }
    
    // In een echte applicatie zou je hier een API-call maken
    alert(`Bericht "${messageTitle}" verzonden naar ${recipientType === "all" ? "alle gebruikers" : "geselecteerde gebruikers"}`);
    
    // Reset form
    setMessageTitle("");
    setMessageContent("");
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notificaties</h2>
      
      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">Bericht Opstellen</TabsTrigger>
          <TabsTrigger value="history">Verzonden Berichten</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Nieuw Bericht</CardTitle>
              <CardDescription>
                Stel een bericht op om te verzenden naar leden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input 
                    id="title" 
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Onderwerp van je bericht" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Bericht</Label>
                  <Textarea 
                    id="content" 
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Typ hier je bericht..." 
                    rows={6} 
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type Bericht</Label>
                    <Select 
                      value={messageType}
                      onValueChange={setMessageType}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecteer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Informatie</SelectItem>
                        <SelectItem value="task">Taak Update</SelectItem>
                        <SelectItem value="success">Succes Melding</SelectItem>
                        <SelectItem value="warning">Waarschuwing</SelectItem>
                        <SelectItem value="security">Beveiligingsbericht</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Ontvangers</Label>
                    <Select 
                      value={recipientType}
                      onValueChange={setRecipientType}
                    >
                      <SelectTrigger id="recipients">
                        <SelectValue placeholder="Selecteer ontvangers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Gebruikers</SelectItem>
                        <SelectItem value="active">Actieve Gebruikers</SelectItem>
                        <SelectItem value="pending">Nieuwe Gebruikers</SelectItem>
                        <SelectItem value="select">Selecteer Gebruikers...</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {recipientType === "select" && (
                  <div className="p-4 border rounded-md bg-muted">
                    <p className="text-sm text-muted-foreground mb-2">Selecteer specifieke gebruikers:</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Input placeholder="Zoek gebruikers..." className="flex-1" />
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Voeg toe
                      </Button>
                    </div>
                    <div className="h-32 border rounded-md p-2 overflow-y-auto bg-card">
                      <p className="text-center text-sm text-muted-foreground pt-12">
                        Geen gebruikers geselecteerd
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={handleSendMessage}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Verzend Bericht
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verzonden Berichten</CardTitle>
              <CardDescription>
                Overzicht van eerder verzonden berichten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Bericht</TableHead>
                    <TableHead>Ontvanger(s)</TableHead>
                    <TableHead>Verstuurd Op</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {notification.messagePreview}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>{notification.sentTo}</p>
                            <p className="text-xs text-muted-foreground">
                              ({notification.recipientCount} ontvanger{notification.recipientCount > 1 ? "s" : ""})
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {notification.sentDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(notification.type)}
                          <span className="capitalize">
                            {notification.type === "info" ? "Informatie" : 
                             notification.type === "task" ? "Taak" : 
                             notification.type === "success" ? "Succes" : 
                             notification.type === "warning" ? "Waarschuwing" : 
                             "Beveiliging"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={notification.status === "read" ? "outline" : "default"}
                          className={
                            notification.status === "read" 
                              ? "bg-green-100 text-green-800" 
                              : ""
                          }
                        >
                          {notification.status === "read" ? "Gelezen" : "Afgeleverd"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title="Bekijk details">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default withRoleGuard(AdminNotifications, ["admin"]);
