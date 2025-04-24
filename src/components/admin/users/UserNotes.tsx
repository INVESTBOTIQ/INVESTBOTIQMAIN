
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface UserNotesProps {
  userId: string;
  initialNotes: string;
}

export const UserNotes = ({ userId, initialNotes }: UserNotesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const handleSaveNotes = () => {
    // In een echte implementatie zou dit een API call naar Supabase doen
    console.log("Saving notes for user:", userId, notes);
    toast.success("Notitie opgeslagen");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
          {initialNotes ? "Bekijk notitie" : "Voeg notitie toe"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notitie voor gebruiker</DialogTitle>
          <DialogDescription>
            Voeg een interne notitie toe over deze gebruiker (alleen zichtbaar voor admins)
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Voeg hier notities toe..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
        <DialogFooter>
          <Button onClick={handleSaveNotes}>
            Opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
