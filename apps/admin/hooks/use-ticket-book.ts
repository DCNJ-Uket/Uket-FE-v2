import { SearchType } from "@uket/api/types/admin-ticket";
import { useRouter, useSearchParams } from "next/navigation";

export const DEFAULT_SEARCH_TYPE = "NONE" as const;

export interface SearchParams {
  page?: number;
  searchType?: SearchType | null;
  searchValue?: string | null;
}

export const useTicketBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchType = searchParams.get("searchType") || DEFAULT_SEARCH_TYPE;
  const searchValue = searchParams.get("searchValue") || "";

  const updateQuery = (params: SearchParams) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) newParams.delete(key);
      else newParams.set(key, String(value));
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    page,
    searchType,
    searchValue,
    updateQuery,
  };
};
