
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ComposeNotificationForm = () => {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [recipientType, setRecipientType] = useState("all");

  const handleSendMessage = () => {
    if (!messageTitle || !messageContent) {
      alert("Vul een titel en bericht in.");
      return;
    }
    
    alert(`Bericht "${messageTitle}" verzonden naar ${recipientType === "all" ? "alle gebruikers" : "geselecteerde gebruikers"}`);
    
    setMessageTitle("");
    setMessageContent("");
  };

  return (
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
  );
};
