
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { type Task } from "@/types/task";

export const useTaskManagement = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Task[];
    },
  });

  const handleStatusChange = async (taskId: string) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status: "completed" })
      .eq("id", taskId);

    if (error) {
      toast.error("Er is een fout opgetreden bij het bijwerken van de taak");
      return;
    }

    toast.success("Taakstatus bijgewerkt");
  };

  const handleUpload = (taskId: string) => {
    toast.info("Uploadfunctionaliteit komt binnenkort beschikbaar");
  };

  return {
    tasks,
    isLoading,
    handleStatusChange,
    handleUpload
  };
};
