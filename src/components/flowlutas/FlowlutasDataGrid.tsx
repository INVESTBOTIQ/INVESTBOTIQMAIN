
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

export const FlowlutasDataGrid = () => {
  const { data: flowlutas } = useQuery({
    queryKey: ["flowlutas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flowlutas")
        .select("*")
        .order("created_at", { ascending: false });

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
