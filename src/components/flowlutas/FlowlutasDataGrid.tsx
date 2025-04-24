
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FlowlutaStatus = Database["public"]["Enums"]["flowluta_status"];

interface FlowlutasDataGridProps {
  tier: string;
  status: string;
  search: string;
}

const ITEMS_PER_PAGE = 10;

export const FlowlutasDataGrid = ({ tier, status, search }: FlowlutasDataGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: flowlutasData } = useQuery({
    queryKey: ["flowlutas", tier, status, search, currentPage],
    queryFn: async () => {
      let query = supabase
        .from("flowlutas")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

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

      const { data, error, count } = await query;

      if (error) throw error;
      return { flowlutas: data, totalCount: count || 0 };
    },
  });

  const totalPages = Math.ceil((flowlutasData?.totalCount || 0) / ITEMS_PER_PAGE);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages || totalPages === 0;

  const handlePreviousPage = () => {
    if (!isPreviousDisabled) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  return (
    <div className="space-y-4">
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
            {flowlutasData?.flowlutas.map((flowluta) => (
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

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousPage}
                disabled={isPreviousDisabled}
                className="cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className="px-4">
                Pagina {currentPage} van {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={isNextDisabled}
                className="cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
