import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import { TermListResponse } from "../types/term";

export const term = createQueryKeys("term", {
  list: () => ({
    queryKey: ["term-list"],
    queryFn: async () => {
      const { data } = await fetcher.get<TermListResponse>("/terms");

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

export const prefetchTermList = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...term.list(),
  });
};
