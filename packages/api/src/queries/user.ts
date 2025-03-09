import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";

import { getToken } from "@uket/util/cookie-client";
import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import { MyTicketListInfoResponse } from "../types/ticket";
import { UserInfoResponse } from "../types/user";

export const user = createQueryKeys("user", {
  info: () => ({
    queryKey: ["user-info"],
    queryFn: async () => {
      const { data } = await fetcher.get<UserInfoResponse>("/users/info");

      return data;
    },
  }),
  ticket: () => ({
    queryKey: ["user-ticket-list"],
    queryFn: async () => {
      const { data } =
        await fetcher.get<MyTicketListInfoResponse>("/users/tickets");

      return data;
    },
  }),
});

/**
 * 유저 정보를 조회합니다.
 * @returns {UserInfoResponse}
 */
export const useQueryUserInfo = () => {
  const accessToken = getToken("user", "access");
  const refreshToken = getToken("user", "refresh");

  if (!accessToken || !refreshToken) return { data: null };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    ...user.info(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!accessToken && !!refreshToken,
  });
};

/**
 * 유저가 소유한 티켓 목록을 조회합니다.
 * @returns {TicketItem[]}
 */
export const useQueryUserTicketList = () => {
  return useSuspenseQuery({
    ...user.ticket(),
    select: data => {
      return data.items.map(item => ({
        ...item,
        createdAt: formatDate(item.createdAt, "full"),
        showDate: formatDate(item.showDate, "short"),
        enterStartTime: formatDate(item.enterStartTime, "time"),
        enterEndTime: formatDate(item.enterEndTime, "time"),
      }));
    },
    staleTime: 0,
  });
};

export const prefetchUserInfo = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...user.info(),
  });

  return dehydrate(queryClient);
};
