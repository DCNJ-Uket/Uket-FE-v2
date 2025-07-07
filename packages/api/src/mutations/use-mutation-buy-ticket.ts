import { useMutation } from "@tanstack/react-query";

import { TicketResponse } from "../types/show";
import { fetcher } from "../instance";

type FormSchemaType = {
  entryGroupId: number;
  buyCount: number;
  performerName: string;
};

export const useMutationBuyTicket = () => {
  const mutation = useMutation({
    mutationFn: async (formData: FormSchemaType) => {
      const { data } = await fetcher.post<TicketResponse>("/tickets", formData);
      return data;
    },
  });

  return mutation;
};
