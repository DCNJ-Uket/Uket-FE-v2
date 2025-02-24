import { useMutation } from "@tanstack/react-query";

import { TermAgreedParams, TermAgreedResponse } from "../types/term";
import { fetcher } from "../instance";

export const useMutationAgreeTerm = () => {
  const mutation = useMutation({
    mutationFn: async (agreements: TermAgreedParams[]) => {
      const { data } = await fetcher.post<TermAgreedResponse>(
        "/terms/agreement",
        agreements,
      );

      return data;
    },
    throwOnError: false,
  });

  return mutation;
};
