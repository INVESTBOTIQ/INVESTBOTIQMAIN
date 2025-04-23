
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Referral,
  ReferralReward,
  ReferralSummary,
  ReferralWithDetails
} from "@/utils/referral-utils";

export function useUserReferrals(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferrals", userId],
    queryFn: async (): Promise<Referral[]> => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          id,
          user_id,
          referral_code,
          referred_user_id,
          referred_user:referred_user_id(email),
          status,
          created_at,
          updated_at
        `)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!userId
  });
}

export function useUserReferralRewards(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferralRewards", userId],
    queryFn: async (): Promise<ReferralReward[]> => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("referral_rewards")
        .select("*")
        .eq("user_id", userId);
      
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!userId
  });
}

export function useReferralSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ["referralSummary", userId],
    queryFn: async (): Promise<ReferralSummary | null> => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("referral_summary")
        .select("*")
        .eq("referrer_id", userId)
        .single();
      
      if (error) {
        if (error.code === "PGRST116") { // No rows found
          return {
            referrer_id: userId,
            pending_referrals: 0,
            successful_referrals: 0,
            total_bonus: 0
          };
        }
        throw error;
      }
      
      return data;
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
          referrer:user_id(email),
          referred_user_id,
          referred:referred_user_id(email),
          status,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to match our interface
      const transformedData: ReferralWithDetails[] = await Promise.all(
        data.map(async (ref) => {
          // Get rewards data for this referral
          const { data: rewardsData } = await supabase
            .from("referral_rewards")
            .select("*")
            .eq("referral_id", ref.id);
          
          const rewards = rewardsData || [];
          const totalRewards = rewards.reduce((sum, r) => sum + Number(r.reward_value), 0);
          const lastRewardDate = rewards.length > 0 
            ? rewards.sort((a, b) => new Date(b.granted_at).getTime() - new Date(a.granted_at).getTime())[0].granted_at 
            : null;
          
          return {
            referral_id: ref.id,
            referral_code: ref.referral_code,
            referrer_id: ref.user_id,
            referrer_email: ref.referrer?.email || 'Unknown',
            referred_user_id: ref.referred_user_id,
            referred_email: ref.referred?.email || null,
            status: ref.status,
            rewards_count: rewards.length,
            total_rewards: totalRewards,
            last_reward_at: lastRewardDate,
            created_at: ref.created_at
          };
        })
      );
      
      return transformedData;
    }
  });
}
