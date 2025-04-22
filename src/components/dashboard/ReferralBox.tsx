
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Share2 } from "lucide-react";
import { toast } from "sonner";

const ReferralBox = () => {
  const { user } = useAuth();

  const { data: referralData } = useQuery({
    queryKey: ["referralInfo", user?.id],
    queryFn: async () => {
      if (!user) return { code: null, count: 0 };

      // Get referral code
      const { data: referralCode, error: codeError } = await supabase
        .from("referrals")
        .select("referral_code")
        .eq("user_id", user.id)
        .single();

      if (codeError && codeError.code !== "PGRST116") {
        console.error("Error fetching referral code:", codeError);
      }

      // Get successful referrals count
      const { count: referralCount, error: countError } = await supabase
        .from("referrals")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .eq("status", "successful");

      if (countError) {
        console.error("Error fetching referral count:", countError);
      }

      return {
        code: referralCode?.referral_code || null,
        count: referralCount || 0,
      };
    },
    enabled: !!user,
  });

  const copyToClipboard = () => {
    if (referralData?.code) {
      const referralLink = `https://investbotiq.nl/signup?ref=${referralData.code}`;
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link gekopieerd!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5" /> Referral Programma
        </CardTitle>
        <CardDescription>
          Verdien extra voordelen door vrienden uit te nodigen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Succesvolle referrals</p>
            <p className="text-3xl font-bold">{referralData?.count || 0}</p>
          </div>
          
          <Button 
            onClick={copyToClipboard} 
            className="w-full md:w-auto flex gap-2 items-center"
            disabled={!referralData?.code}
          >
            <Share2 className="h-4 w-4" />
            <span>Kopieer Referral Link</span>
          </Button>
        </div>
        
        {referralData?.code && (
          <div className="mt-4 p-3 bg-muted rounded-md text-sm text-center overflow-hidden text-ellipsis">
            <code>https://investbotiq.nl/signup?ref={referralData.code}</code>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralBox;
