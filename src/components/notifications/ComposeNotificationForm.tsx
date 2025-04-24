
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { MessageTypeSelector } from "./form/MessageTypeSelector";
import { RecipientSelector } from "./form/RecipientSelector";
import { MessageForm } from "./form/MessageForm";

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
      <MessageForm
        title={messageTitle}
        content={messageContent}
        onTitleChange={setMessageTitle}
        onContentChange={setMessageContent}
      />
      
      <div className="grid gap-4 md:grid-cols-2">
        <MessageTypeSelector 
          value={messageType}
          onChange={setMessageType}
        />
        
        <RecipientSelector
          value={recipientType}
          onChange={setRecipientType}
        />
      </div>
      
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
