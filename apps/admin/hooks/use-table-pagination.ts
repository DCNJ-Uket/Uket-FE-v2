export interface UseTablePaginationProps {
  currentPage: number;
  totalPages: number;
  maxButtonCount?: number;
}

export const useTablePagination = ({
  currentPage,
  totalPages,
  maxButtonCount = 5,
}: UseTablePaginationProps) => {
  const currentGroup = Math.floor((currentPage - 1) / maxButtonCount);
  const totalGroups = Math.ceil(totalPages / maxButtonCount);

  const startPage = currentGroup * maxButtonCount;
  const endPage = Math.min(startPage + maxButtonCount, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, index) => startPage + index + 1,
  );

  return {
    currentGroup,
    totalGroups,
    startPage,
    endPage,
    pageNumbers,
  };
};
