import { useMutation } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";
import { onErrorHandler } from "../error/handler";
import { getQueryClient } from "../get-query-client";
import { adminTicket } from "../queries/admin-ticket";
import {
  ChangeTicketParams,
  ChangeTicketResponse,
} from "../types/admin-ticket";

export const useMutationChangeTicketStatus = (page: number) => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ ticketId, status }: ChangeTicketParams) => {
      const { data } = await fetcherAdmin.patch<ChangeTicketResponse>(
        `/${ticketId}/status/${status}`,
        null,
        {
          mode: "TOAST_UI",
          errorContent: {
            title: "행사 상태 변경 에러",
            description: "변경할 수 없는 상태입니다.",
          },
        },
      );

      return data;
    },
    onMutate: async ({ ticketId, status }: ChangeTicketParams) => {
      const previousData = queryClient.getQueryData<ChangeTicketResponse>([
        ...adminTicket.list({ page }).queryKey,
        ticketId,
      ]);

      await queryClient.cancelQueries({
        queryKey: adminTicket.list({ page }).queryKey,
      });

      if (previousData) {
        queryClient.setQueryData<ChangeTicketResponse>(
          [...adminTicket.list({ page }).queryKey, ticketId],
          { ...previousData, status },
        );
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [...adminTicket.list({ page }).queryKey, variables.ticketId],
          context.previousData,
        );
      }

      onErrorHandler(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminTicket.list({ page }).queryKey,
      });
    },
  });

  return mutation;
};
