import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../instance";
import { TermAgreedParams, TermAgreedResponse } from "../types/term";

export const useMutationAgreeTerm = () => {
  const mutation = useMutation({
    mutationFn: async (agreements: TermAgreedParams[]) => {
      const formattedAgreements = agreements.map(
        ({ termId, isAgreed, documentId }) => ({
          termsId: termId,
          isAgree: isAgreed,
          documentId,
        }),
      );

      const { data } = await fetcher.post<TermAgreedResponse>(
        "/terms/agreement",
        formattedAgreements,
      );

      return data;
    },
    throwOnError: false,
  });

  return mutation;
};
