
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
import { formatDateTime } from "@/utils/date-utils";

export function CashflowHistoryTable({ userId }: { userId: string }) {
  const { data: history, isLoading } = useQuery({
    queryKey: ["cashflow-history", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cashflow_history')
        .select(`
          *,
          changed_by_user:profiles(voornaam, achternaam)
        `)
        .eq('user_id', userId)
        .order('changed_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Laden...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Datum</TableHead>
          <TableHead>Vorige Bedrag</TableHead>
          <TableHead>Nieuwe Bedrag</TableHead>
          <TableHead>Aangepast door</TableHead>
          <TableHead>Notitie</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history?.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{formatDateTime(record.changed_at)}</TableCell>
            <TableCell>€{record.previous_amount}</TableCell>
            <TableCell>€{record.amount}</TableCell>
            <TableCell>
              {record.changed_by_user?.voornaam} {record.changed_by_user?.achternaam}
            </TableCell>
            <TableCell>{record.note || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
