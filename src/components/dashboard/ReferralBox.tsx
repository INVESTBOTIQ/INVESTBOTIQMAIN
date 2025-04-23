
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Users, CheckCircle2 } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';

const ReferralBox = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  
  // Generate a unique referral link based on user ID
  const referralLink = user ? `https://investbotiq.nl/?ref=${user.id.substring(0, 8)}` : "https://investbotiq.nl/?ref=demo";
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast.success("Referral link gekopieerd!");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error("Kopiëren mislukt. Probeer handmatig te selecteren.");
      });
  };
  
  return (
    <Card className="card-hover bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10 fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Referral Programma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 space-y-2">
            <p className="text-sm">
              Verdien extra cashflow door vrienden uit te nodigen voor Investbotiq. 
              Voor elke succesvolle aanmelding ontvang je €100 extra maandelijkse cashflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="relative flex-1">
                <Input 
                  value={referralLink} 
                  readOnly
                  className="pr-10 truncate bg-white/50"
                />
                {copied && (
                  <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              <Button 
                onClick={handleCopyLink} 
                className="whitespace-nowrap mobile-btn"
                variant={copied ? "outline" : "default"}
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Gekopieerd" : "Kopieer referral link"}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center bg-primary/10 rounded-lg p-4 text-center min-w-[120px]">
            <div>
              <div className="text-3xl font-bold text-primary">€100</div>
              <div className="text-xs text-muted-foreground">per referral</div>
            </div>
          </div>
        </div>
        
        {/* Success indicators */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">3 succesvolle referrals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-muted-foreground">1 referral in behandeling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">€300 extra cashflow verdiend</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralBox;
