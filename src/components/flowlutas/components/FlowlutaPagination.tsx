
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { FlowlutaPaginationProps } from "../types/flowluta";

export const FlowlutaPagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  isPreviousDisabled,
  isNextDisabled,
}: FlowlutaPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={onPreviousPage}
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
            onClick={onNextPage}
            disabled={isNextDisabled}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
