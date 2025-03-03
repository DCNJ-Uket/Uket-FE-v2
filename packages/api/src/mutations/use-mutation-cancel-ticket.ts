import { useMutation } from "@tanstack/react-query";

import { TicketItem } from "../types/ticket";
import { fetcher } from "../instance";

export const useMutationCancelTicket = () => {
  const mutation = useMutation({
    mutationKey: ["cancelTicket"],
    mutationFn: async (ticketId: TicketItem["ticketId"]) => {
      const { data } = await fetcher.delete(`/tickets/${ticketId}/cancel`, {
        mode: "TOAST_UI",
        errorContent: {
          title: "티켓 취소 오류",
          description: "잠시 후 다시 시도해 주세요.",
        },
      });

      return data;
    },
    onMutate: () => {
      return { mutationKey: "cancelTicket" };
    },
  });

  return mutation;
};
