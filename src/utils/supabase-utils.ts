
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function updateCashflow(userId: string, newAmount: number, note?: string) {
  try {
    // Eerst de huidige cashflow ophalen
    const { data: currentCashflow } = await supabase
      .from('cashflows')
      .select('cashflow_bedrag')
      .eq('user_id', userId)
      .single();

    const previousAmount = currentCashflow?.cashflow_bedrag || 0;

    // Update de cashflow
    const { error: updateError } = await supabase
      .from('cashflows')
      .update({ cashflow_bedrag: newAmount })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // Log de wijziging in de historie
    const { error: historyError } = await supabase
      .from('cashflow_history')
      .insert({
        user_id: userId,
        amount: newAmount,
        previous_amount: previousAmount,
        changed_by: (await supabase.auth.getUser()).data.user?.id,
        note
      });

    if (historyError) throw historyError;

    return { success: true };
  } catch (error) {
    console.error('Error updating cashflow:', error);
    throw error;
  }
}

export async function activateSpirit(spiritId: string) {
  try {
    const { data: spirit, error: spiritError } = await supabase
      .from('spirits')
      .update({
        status: 'active',
        activated_at: new Date().toISOString()
      })
      .eq('id', spiritId)
      .select()
      .single();

    if (spiritError) throw spiritError;

    // Stuur een notificatie
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: spirit.user_id,
        type: 'spirit',
        bericht: `Je Spirit is succesvol geactiveerd!`
      });

    if (notificationError) throw notificationError;

    return { success: true, spirit };
  } catch (error) {
    console.error('Error activating spirit:', error);
    throw error;
  }
}

export async function scheduleNotification({
  title,
  content,
  type,
  scheduledFor,
  recipientId,
  isGroupNotification = false
}: {
  title: string;
  content: string;
  type: 'taak' | 'spirit' | 'system';
  scheduledFor: Date;
  recipientId?: string;
  isGroupNotification?: boolean;
}) {
  try {
    const { error } = await supabase
      .from('scheduled_notifications')
      .insert({
        title,
        content,
        type,
        scheduled_for: scheduledFor.toISOString(),
        recipient_id: recipientId,
        is_group_notification: isGroupNotification
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}
