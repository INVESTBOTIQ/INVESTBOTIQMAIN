
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
  referred_user?: { email: string };
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
      .from("referral_summary")
      .select("*")
      .eq("referrer_id", userId)
      .single();

    if (error) {
      if (error.code !== "PGRST116") { // No rows found
        console.error("Error fetching referral summary:", error);
      }
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getReferralSummary:", error);
    return null;
  }
}

export async function getUserReferrals(userId: string): Promise<Referral[]> {
  try {
    const { data, error } = await supabase
      .from("referrals")
      .select("*, referred_user:referred_user_id(email)")
      .eq("user_id", userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching user referrals:", error);
    return [];
  }
}

export async function getUserReferralRewards(userId: string): Promise<ReferralReward[]> {
  try {
    const { data, error } = await supabase
      .from("referral_rewards")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data || [];
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
