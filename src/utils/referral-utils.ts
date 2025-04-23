
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ReferralSummary {
  referrer_id: string;
  pending_referrals: number;
  successful_referrals: number;
  total_bonus: number;
}

export interface ReferralReward {
  id: string;
  referral_id: string;
  user_id: string;
  reward_type: string;
  reward_value: number;
  granted_at: string;
  note: string | null;
}

export interface Referral {
  id: string;
  user_id: string;
  referral_code: string;
  referred_user_id: string | null;
  status: 'pending' | 'successful';
  created_at: string;
  updated_at: string;
  referred_user_email?: string; // Added this property as optional
}

export interface ReferralWithDetails {
  referral_id: string;
  referral_code: string;
  referrer_id: string;
  referrer_email: string;
  referred_user_id: string | null;
  referred_email: string | null;
  status: 'pending' | 'successful';
  rewards_count: number;
  total_rewards: number;
  last_reward_at: string | null;
  created_at: string;
}

export async function getReferralSummary(userId: string): Promise<ReferralSummary | null> {
  try {
    const { data, error } = await supabase
      .from("referrals")
      .select("user_id, referred_user_id, status")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching referral summary:", error);
      return null;
    }

    // Calculate metrics from raw referral data
    const pendingReferrals = data.filter(r => r.referred_user_id && r.status === 'pending').length;
    const successfulReferrals = data.filter(r => r.referred_user_id && r.status === 'successful').length;
    
    // Get total rewards
    const { data: rewardsData, error: rewardsError } = await supabase
      .from("referrals")
      .select(`
        id,
        status
      `)
      .eq("user_id", userId)
      .eq("status", "successful");
    
    let totalBonus = 0;
    
    if (!rewardsError && rewardsData) {
      // Calculate total bonuses - for now we'll use a simplified approach
      totalBonus = successfulReferrals * 100; // Assuming €100 per successful referral
    }

    return {
      referrer_id: userId,
      pending_referrals: pendingReferrals,
      successful_referrals: successfulReferrals,
      total_bonus: totalBonus
    };
  } catch (error) {
    console.error("Error in getReferralSummary:", error);
    return null;
  }
}

export async function getUserReferrals(userId: string): Promise<Referral[]> {
  try {
    const { data, error } = await supabase
      .from("referrals")
      .select(`
        id,
        user_id,
        referral_code,
        referred_user_id,
        status,
        created_at,
        updated_at
      `)
      .eq("user_id", userId);

    if (error) throw error;

    // Get referred user emails in separate query to avoid join issues
    const referrals = [...data];
    
    for (const referral of referrals) {
      if (referral.referred_user_id) {
        try {
          // Get the auth user data directly
          const { data: authUser } = await supabase
            .auth.admin.getUserById(referral.referred_user_id);
          
          if (authUser?.user) {
            // Add email as a new property
            referral.referred_user_email = authUser.user.email || 'Unknown';
          } else {
            referral.referred_user_email = 'Unknown';
          }
        } catch (err) {
          console.error("Error fetching user details:", err);
          referral.referred_user_email = 'Error fetching email';
        }
      }
    }

    return referrals as Referral[];
  } catch (error) {
    console.error("Error fetching user referrals:", error);
    return [];
  }
}

export async function getUserReferralRewards(userId: string): Promise<ReferralReward[]> {
  try {
    // Since we don't have a dedicated function in the database, use a simpler approach
    const { data: referralsData, error: referralsError } = await supabase
      .from("referrals")
      .select(`
        id,
        status,
        referred_user_id,
        created_at
      `)
      .eq("user_id", userId)
      .eq("status", "successful");
    
    if (referralsError) throw referralsError;
    
    // Create synthetic rewards data for now
    const rewards: ReferralReward[] = (referralsData || []).map(referral => ({
      id: referral.id,
      referral_id: referral.id,
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100, // Fixed reward value
      granted_at: referral.created_at, // Use creation date as granted date
      note: "Referral bonus"
    }));
    
    return rewards;
  } catch (error) {
    console.error("Error fetching referral rewards:", error);
    return [];
  }
}

export async function createReferralLinkFromCode(code: string): Promise<string> {
  return `https://investbotiq.nl/?ref=${code}`;
}

export function copyReferralLink(link: string): void {
  navigator.clipboard.writeText(link)
    .then(() => toast.success("Referral link gekopieerd!"))
    .catch(() => toast.error("Kopiëren mislukt. Probeer handmatig te selecteren."));
}
