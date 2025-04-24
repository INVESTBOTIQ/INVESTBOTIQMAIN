
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type FlowlutaStatus = Database["public"]["Enums"]["flowluta_status"];

interface FlowlutasDataGridProps {
  tier: string;
  status: string;
  search: string;
}

export const FlowlutasDataGrid = ({ tier, status, search }: FlowlutasDataGridProps) => {
  const { data: flowlutas } = useQuery({
    queryKey: ["flowlutas", tier, status, search],
    queryFn: async () => {
      let query = supabase
        .from("flowlutas")
        .select("*")
        .order("created_at", { ascending: false });

      if (tier !== "all") {
        query = query.eq("tier", parseInt(tier));
      }

      if (status !== "all") {
        // Only apply status filter if it's a valid flowluta status
        const validStatuses: FlowlutaStatus[] = ["planned", "active", "paused"];
        if (validStatuses.includes(status as FlowlutaStatus)) {
          query = query.eq("status", status as FlowlutaStatus);
        }
      }

      if (search) {
        // Search in relevant fields - since flowlutas don't have a name/title,
        // we'll search in the id which might be useful for admins
        query = query.or(`id.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Maandelijkse Cashflow</TableHead>
            <TableHead>Geactiveerd Op</TableHead>
            <TableHead>Volgende Activatie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flowlutas?.map((flowluta) => (
            <TableRow key={flowluta.id}>
              <TableCell>{flowluta.tier}</TableCell>
              <TableCell className="capitalize">{flowluta.status}</TableCell>
              <TableCell>€{flowluta.monthly_cashflow}</TableCell>
              <TableCell>
                {format(new Date(flowluta.activated_at), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                {flowluta.next_activation_date
                  ? format(new Date(flowluta.next_activation_date), "dd/MM/yyyy")
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
