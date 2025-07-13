import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { format, formatDate, ko } from "@uket/util/time";

import { clearToken, getToken } from "@uket/util/cookie-client";
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

      return data.items;
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
  const { data } = useQuery({
    ...user.info(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!accessToken && !!refreshToken,
  });

  if (!data?.isRegistered) {
    clearToken("user", "access");
    clearToken("user", "refresh");

    return { data: null };
  }

  return { data };
};

/**
 * 유저가 소유한 티켓 목록을 조회합니다.
 * @returns {TicketItem[]}
 */
export const useQueryUserTicketList = () => {
  return useSuspenseQuery({
    ...user.ticket(),
    select: data => {
      return data.map(item => {
        const enterDate = format(item.enterStartDateTime, "MM월 dd일 (eee)", {
          locale: ko,
        });
        const enterTime = format(item.enterStartDateTime, "HH:mm");
        return {
          ...item,
          createdAt: formatDate(item.createdAt, "full"),
          showDate: enterDate,
          enterStartTime: enterTime,
        };
      });
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

export const prefetchUserTicketList = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...user.ticket(),
  });

  return dehydrate(queryClient);
};
