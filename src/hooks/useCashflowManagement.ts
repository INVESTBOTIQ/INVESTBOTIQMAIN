
import { useState } from "react";
import { updateCashflow } from "@/utils/supabase-utils";
import { toast } from "sonner";

export type CashflowUser = {
  id: string;
  email: string;
  name: string;
  currentCashflow: number;
  previousCashflow: number;
  changePercentage: number;
  lastUpdated: string;
};

export const useCashflowManagement = (users: CashflowUser[]) => {
  const [cashflowValues, setCashflowValues] = useState<Record<string, number>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.currentCashflow }), {})
  );

  const handleCashflowChange = (userId: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setCashflowValues({ ...cashflowValues, [userId]: numValue });
  };

  const handleSave = async (userId: string) => {
    try {
      await updateCashflow(
        userId,
        cashflowValues[userId],
        "Handmatige aanpassing door admin"
      );
      toast.success("Cashflow succesvol bijgewerkt");
    } catch (error) {
      console.error("Error updating cashflow:", error);
      toast.error("Er is een fout opgetreden bij het bijwerken van de cashflow");
    }
  };

  return {
    cashflowValues,
    handleCashflowChange,
    handleSave,
  };
};
