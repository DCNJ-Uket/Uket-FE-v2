import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useSuspenseQuery } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { AdminFilterEventListResponse } from "../types/admin-filter-event";

export const adminFilterEvent = createQueryKeys("admin-filter-event", {
  list: () => ({
    queryKey: ["admin-filter-event-list"],
    queryFn: async () => {
      const { data } =
        await fetcherAdmin.get<AdminFilterEventListResponse>(
          `/filtering/events`,
        );
      return data.items;
    },
  }),
});

export const useQueryAdminFilterEventList = () => {
  return useSuspenseQuery(adminFilterEvent.list());
};

export const prefetchFestivalList = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...adminFilterEvent.list(),
  });

  return dehydrate(queryClient);
};
