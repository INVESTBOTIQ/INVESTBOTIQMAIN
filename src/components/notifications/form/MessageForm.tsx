
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MessageFormProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const MessageForm = ({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange 
}: MessageFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Onderwerp van je bericht" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Bericht</Label>
        <Textarea 
          id="content" 
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Typ hier je bericht..." 
          rows={6} 
        />
      </div>
    </>
  );
};
