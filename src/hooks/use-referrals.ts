
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Referral,
  ReferralReward,
  ReferralSummary,
  ReferralWithDetails,
  getUserReferrals,
  getUserReferralRewards,
  getReferralSummary
} from "@/utils/referral-utils";

export function useUserReferrals(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferrals", userId],
    queryFn: async (): Promise<Referral[]> => {
      if (!userId) return [];
      return getUserReferrals(userId);
    },
    enabled: !!userId
  });
}

export function useUserReferralRewards(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferralRewards", userId],
    queryFn: async (): Promise<ReferralReward[]> => {
      if (!userId) return [];
      return getUserReferralRewards(userId);
    },
    enabled: !!userId
  });
}

export function useReferralSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ["referralSummary", userId],
    queryFn: async (): Promise<ReferralSummary | null> => {
      if (!userId) return null;
      const summary = await getReferralSummary(userId);
      
      if (!summary) {
        return {
          referrer_id: userId,
          pending_referrals: 0,
          successful_referrals: 0,
          total_bonus: 0
        };
      }
      
      return summary;
    },
    enabled: !!userId
  });
}

export function useAdminReferrals() {
  return useQuery({
    queryKey: ["adminReferrals"],
    queryFn: async (): Promise<ReferralWithDetails[]> => {
      // Use a join to get both the referrer and referred user emails
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          id,
          referral_code,
          user_id,
          referred_user_id,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to match our interface
      const transformedData: ReferralWithDetails[] = [];
      
      for (const ref of data) {
        // Get referrer email
        let referrerEmail = 'Unknown';
        const { data: referrerData } = await supabase
          .auth.admin.getUserById(ref.user_id);
        
        if (referrerData?.user) {
          referrerEmail = referrerData.user.email || 'Unknown';
        }
        
        // Get referred email if available
        let referredEmail = null;
        if (ref.referred_user_id) {
          const { data: referredData } = await supabase
            .auth.admin.getUserById(ref.referred_user_id);
          
          if (referredData?.user) {
            referredEmail = referredData.user.email || null;
          }
        }
        
        // Count rewards - for now use a simplified approach
        const rewardsCount = ref.status === 'successful' ? 1 : 0;
        const totalRewards = ref.status === 'successful' ? 100 : 0;
        
        transformedData.push({
          referral_id: ref.id,
          referral_code: ref.referral_code,
          referrer_id: ref.user_id,
          referrer_email: referrerEmail,
          referred_user_id: ref.referred_user_id,
          referred_email: referredEmail,
          status: ref.status as 'pending' | 'successful',
          rewards_count: rewardsCount,
          total_rewards: totalRewards,
          last_reward_at: ref.status === 'successful' ? ref.created_at : null,
          created_at: ref.created_at
        });
      }
      
      return transformedData;
    }
  });
}
