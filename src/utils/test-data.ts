
import { supabase } from "@/integrations/supabase/client";

export async function createTestAccounts() {
  try {
    // Create admin account
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
      email: 'admin@investbotiq.com',
      password: 'admin123'
    });
    
    if (adminError) throw adminError;
    
    if (adminData.user) {
      await supabase.from('user_roles').insert({
        user_id: adminData.user.id,
        role: 'admin'
      });
    }

    // Create member account
    const { data: memberData, error: memberError } = await supabase.auth.signUp({
      email: 'member@investbotiq.com',
      password: 'member123'
    });
    
    if (memberError) throw memberError;
    
    if (memberData.user) {
      // Add test flowlutas
      await supabase.from('flowlutas').insert([
        {
          user_id: memberData.user.id,
          status: 'active',
          monthly_cashflow: 1200,
          tier: 1
        },
        {
          user_id: memberData.user.id,
          status: 'active',
          monthly_cashflow: 800,
          tier: 2
        }
      ]);

      // Add test tasks
      await supabase.from('tasks').insert([
        {
          user_id: memberData.user.id,
          taak_omschrijving: 'KYC Verificatie - Upload identiteitsbewijs',
          status: 'open',
          priority: 'high',
          deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          user_id: memberData.user.id,
          taak_omschrijving: 'BEL Contract ondertekenen',
          status: 'completed',
          priority: 'medium'
        }
      ]);

      // Add test notifications
      await supabase.from('notifications').insert([
        {
          user_id: memberData.user.id,
          type: 'system',
          bericht: 'Nieuwe flowluta beschikbaar voor activatie',
          gelezen: false
        },
        {
          user_id: memberData.user.id,
          type: 'flowluta',
          bericht: 'Je hebt deze maand €800 cashflow ontvangen',
          gelezen: true
        }
      ]);
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating test accounts:', error);
    return { success: false, error };
  }
}
