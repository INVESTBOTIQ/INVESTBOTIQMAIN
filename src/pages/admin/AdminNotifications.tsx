import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ComposeNotificationForm } from "@/components/notifications/ComposeNotificationForm";
import { NotificationsList } from "@/components/notifications/NotificationsList";

// Mock sent notifications data
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

const AdminNotifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
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
                <ComposeNotificationForm />
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
                <NotificationsList notifications={sentNotifications} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminNotifications, ["admin"]);
