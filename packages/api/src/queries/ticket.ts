/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

import { MyTicketQRCodeResponse, TicketItem } from "../types/ticket";
import { fetcher } from "../instance";

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
