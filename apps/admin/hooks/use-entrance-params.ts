import { useRouter, useSearchParams } from "next/navigation";

export interface SearchParams {
  page?: number;
  uketEventId?: number;
}

export const useEntranceParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const uketEventId = Number(searchParams.get("uketEventId")) || undefined;

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
    uketEventId,
    updateQuery,
  };
};
