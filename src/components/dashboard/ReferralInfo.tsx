
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReferralInfo = () => {
  const { user } = useAuth();

  const { data: referralData } = useQuery({
    queryKey: ["referralInfo"],
    queryFn: async () => {
      const { data: referralCode, error: codeError } = await supabase
        .from("referrals")
        .select("referral_code")
        .eq("user_id", user?.id)
        .single();

      if (codeError && codeError.code !== "PGRST116") {
        throw codeError;
      }

      const { count: referralCount, error: countError } = await supabase
        .from("referrals")
        .select("*", { count: "exact" })
        .eq("user_id", user?.id)
        .eq("status", "successful");

      if (countError) throw countError;

      return {
        code: referralCode?.referral_code || null,
        count: referralCount || 0,
      };
    },
    enabled: !!user,
  });

  const copyToClipboard = () => {
    if (referralData?.code) {
      navigator.clipboard.writeText(referralData.code);
      toast.success("Referral code gekopieerd!");
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Referrals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold">{referralData?.count || 0}</div>
        {referralData?.code && (
          <Button
            variant="outline"
            className="w-full"
            onClick={copyToClipboard}
          >
            Code kopiëren: {referralData.code}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralInfo;
