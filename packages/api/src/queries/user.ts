import { ACCESS_TOKEN, REFRESH_TOKEN } from "@uket/util/token";
import { formatDate } from "@uket/util/time";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UserInfoResponse } from "../types/user";
import { MyTicketListInfoResponse } from "../types/ticket";
import { fetcher } from "../instance";

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
  const accessToken = ACCESS_TOKEN.get();
  const refreshToken = REFRESH_TOKEN.get("refreshToken");

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
