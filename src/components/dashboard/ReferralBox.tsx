
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const ReferralBox = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  
  // In a real app, you would get this from the user's profile or generate it
  const referralCode = user?.id?.substring(0, 8) || "ABC123";
  const referralLink = `https://investbotiq.nl?ref=${referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link gekopieerd naar klembord");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Referral Programma</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 space-y-2">
            <p>
              Verwijs vrienden naar Investbotiq en ontvang €100 extra cashflow voor elke succesvolle referral.
            </p>
            <p className="text-muted-foreground text-sm">
              Deel je unieke link hieronder om te beginnen:
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="p-2 bg-gray-100 rounded text-sm truncate max-w-[200px] sm:max-w-none">
              {referralLink}
            </div>
            <Button 
              className="flex-shrink-0" 
              onClick={copyToClipboard}
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Gekopieerd
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Kopieer link
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralBox;
