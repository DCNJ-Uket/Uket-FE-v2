/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";

import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import { MyTicketQRCodeResponse, TicketItem } from "../types/ticket";

export const ticket = createQueryKeys("ticket", {
  qrcode: (ticketId: TicketItem["ticketId"]) => ({
    queryKey: ["qrcode", ticketId],
    queryFn: async () => {
      const { data } = await fetcher.get<MyTicketQRCodeResponse>(
        `/tickets/${ticketId}/qrcode`,
        {
          mode: "BOUNDARY",
          responseType: "blob",
        },
      );

      return data;
    },
  }),
});

export const useQueryTicketQrcode = (
  ticketId: TicketItem["ticketId"],
  ticketStatus: TicketItem["ticketStatus"],
) => {
  return useQuery({
    ...ticket.qrcode(ticketId),
    select: data => URL.createObjectURL(data as any),
    staleTime: 0,
    enabled: !!ticketId && ticketStatus !== "입금 확인중",
  });
};

export const prefetchTicketQrcode = (
  ticketId: TicketItem["ticketId"],
) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...ticket.qrcode(ticketId),
  });
};
