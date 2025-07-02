import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import { TermListResponse, TermMarketing } from "../types/term";

export const term = createQueryKeys("term", {
  list: () => ({
    queryKey: ["term-list"],
    queryFn: async () => {
      const { data } = await fetcher.get<TermListResponse>(
        "/terms/check-required",
      );

      return data.items;
    },
  }),
  marketing: () => ({
    queryKey: ["term-marketing"],
    queryFn: async () => {
      const { data } = await fetcher.get<TermMarketing>(
        "/terms/optional-answer",
      );

      return data.items;
    },
  }),
});

/**
 * 약관 목록을 조회합니다.
 * @returns {Term[]}
 */
export const useQueryTermList = () => {
  return useSuspenseQuery(term.list());
};

export const useQueryMarketingTerm = () => {
  return useQuery({ ...term.marketing(), select: data => data[0] });
};

export const prefetchTermList = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...term.list(),
  });
};
