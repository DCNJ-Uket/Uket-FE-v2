import { useSuspenseQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

import { TermListResponse } from "../types/term";
import { fetcher } from "../instance";

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
