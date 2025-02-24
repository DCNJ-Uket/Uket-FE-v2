import { Button } from "@uket/ui/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "@uket/ui/components/ui/icon";
import { cn } from "@uket/ui/lib/utils";
import { useTablePagination } from "../hooks/use-table-pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtonCount?: number;
}

export default function PaginationControls({
  maxButtonCount = 5,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const { currentGroup, totalGroups, startPage, pageNumbers } =
    useTablePagination({
      currentPage,
      totalPages,
      maxButtonCount,
    });

  return (
    <div className="mt-4 flex items-center justify-center space-x-6">
      <div className="flex items-center justify-center space-x-6">
        {currentGroup > 0 && (
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={() => onPageChange(1)}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onPageChange(startPage)}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
        {pageNumbers.map(pageNum => (
          <Button
            key={pageNum}
            variant="ghost"
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit",
              currentPage === pageNum && `font-semibold text-[#17171B]`,
            )}
          >
            {pageNum}
          </Button>
        ))}
        {currentGroup < totalGroups - 1 && (
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={() =>
                onPageChange((currentGroup + 1) * maxButtonCount + 1)
              }
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onPageChange(totalPages)}
              className="p-0 text-sm font-light text-[#5E5E6E] hover:bg-inherit"
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
