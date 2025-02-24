import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { EntryListResponse } from "../types/admin-entrance";
import { TicketQrCodeResponse } from "../types/admin-ticket";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const getAdminEntranceList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await fetcherAdmin.get<EntryListResponse>(
    `/ticket/live/enter-users`,
    {
      mode: "BOUNDARY",
      params: { page, size },
    },
  );
  
  return data;
};

export const adminEntrance = createQueryKeys("admin-entrance", {
  list: ({ page, size }) => ({
    queryKey: [page],
    queryFn: () => getAdminEntranceList({ page, size }),
  }),
  scan: (token: string | null) => ({
    queryKey: ["admin-entrance-scan"],
    queryFn: async () => {
      const { data } = await fetcherAdmin.post<TicketQrCodeResponse>(
        `/ticket/${token}/enter`,
      );
      return data;
    },
  }),
});

export const useQueryEntranceList = ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  return useSuspenseQuery({
    ...adminEntrance.list({ page, size }),
    select: data => {
      const newContent = data.content.map(item => {
        return {
          ...item,
          enterTime: formatDate(item.enterTime, "fullCompact"),
          ticketDate: formatDate(item.ticketDate, "fullCompact"),
        };
      });

      return {
        ...data,
        content: newContent,
      };
    },
    refetchInterval: 1000 * 10,
  });
};

export const prefetchQueryEntranceList = (
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...adminEntrance.list({
      page,
      size,
    }),
  });
  
  return dehydrate(queryClient);
};
