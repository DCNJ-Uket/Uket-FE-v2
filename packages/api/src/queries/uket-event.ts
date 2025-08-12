import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  dehydrate,
  useQueries,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  differenceInDays,
  differenceInSeconds,
  format,
  isToday,
  isTomorrow,
  ko,
  parseISO,
} from "@uket/util/time";
import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import {
  TicketingStatus,
  UketEventDetailResponse,
  UketEventItem,
  UketEventListResponse,
} from "../types/uket-event";

export type UketEventListRequestParams = {
  type: "ALL" | "FESTIVAL" | "PERFORMANCE";
};

const formateEventDate = (start: string, end: string) => {
  const eventDayLabel = formatEventDayLabel(start);
  const eventDuration = differenceInDays(end, start);

  switch (eventDayLabel) {
    case "오늘":
    case "내일":
      switch (eventDuration) {
        case 0: // 행사 날짜가 단 하루
          return `${format(start, "MM.dd(E) HH:mm", {
            locale: ko,
          })}`;
        default: // 행사 날짜가 2일 이상
          return `${format(start, "MM.dd(E)", {
            locale: ko,
          })} ~ ${format(end, "MM.dd(E)", {
            locale: ko,
          })}`;
      }
    default:
      switch (eventDuration) {
        case 0:
          return `${format(start, "MM.dd(E) HH:mm", {
            locale: ko,
          })}`;
        default:
          return `${format(start, "MM.dd(E)", {
            locale: ko,
          })} ~ ${format(end, "MM.dd(E)", {
            locale: ko,
          })}`;
      }
  }
};

const formatEventDayLabel = (date: string): "오늘" | "내일" | null => {
  if (isToday(date)) {
    return "오늘";
  } else if (isTomorrow(date)) {
    return "내일";
  } else {
    return null;
  }
};

const formatSecondsToHHMMSS = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const calculateLeftTimeBasedOnStatus = (
  status: TicketingStatus,
  ticketingStartDate: string,
  ticketingEndDate: string,
): string | null => {
  const now = new Date();
  const start = parseISO(ticketingStartDate);
  const end = parseISO(ticketingEndDate);

  if (status === "티켓팅_진행중") {
    const diff = differenceInSeconds(end, now);
    if (diff <= 48 * 3600 && diff > 0) {
      // 마감까지 48시간 이하: "마감까지 hh:mm:ss 남음"
      return `마감까지 ${formatSecondsToHHMMSS(diff)} 남음`;
    }
    // 48시간 초과: 별도 출력 없음
    return null;
  }

  if (status === "오픈_예정") {
    const diff = differenceInSeconds(start, now);
    if (diff <= 48 * 3600 && diff > 0) {
      // 오픈까지 48시간 이하: "D-날짜 hh:mm:ss 남음"
      const days = Math.floor(diff / (3600 * 24));
      const time = formatSecondsToHHMMSS(diff % (3600 * 24));
      return `D-${days} ${time} 남음`;
    }
    if (diff > 48 * 3600) {
      // 오픈까지 48시간 초과: "MM.dd(E) 티켓 오픈 예정"
      const date = format(ticketingStartDate, "MM.dd(E)", { locale: ko });
      return `${date} 티켓 오픈 예정`;
    }
    return null;
  }

  return null;
};

export const uketEvent = createQueryKeys("uket-event", {
  list: ({ type }: UketEventListRequestParams) => ({
    queryKey: ["uket-event-list", type],
    queryFn: async () => {
      const { data } = await fetcher.get<UketEventListResponse>(
        `/uket-events?type=${type}`,
      );
      return data.events;
    },
  }),
  detail: (id: UketEventItem["eventId"]) => ({
    queryKey: ["uket-event-detail"],
    queryFn: async () => {
      const { data } = await fetcher.get<UketEventDetailResponse>(
        `/uket-events/${id}`,
      );
      return data;
    },
  }),
  image: (id: string | number | undefined) => ({
    queryKey: ["event-thumbnail-image", id],
    queryFn: async () => {
      const response = await fetcher.get(`/image/${id}`, {
        mode: "TOAST_UI",
        responseType: "blob",
      });

      return response.data;
    },
  }),
});

/**
 * 현재 진행중인 모든 축제의 목록을 조회합니다.
 * @param {UketEventListRequestParams} params
 * @returns {FestivalUniversity[]} 축제 목록 배열
 */
export const useQueryUketEventList = ({ type }: UketEventListRequestParams) => {
  return useSuspenseQuery({
    ...uketEvent.list({ type }),
    select: data => {
      return data.map(item => ({
        ...item,
        eventStartDate: format(item.eventStartDate, "MM.dd (E) HH:mm", {
          locale: ko,
        }),
        eventEndDate: format(item.eventEndDate, "MM.dd (E) HH:mm", {
          locale: ko,
        }),
        leftDate: calculateLeftTimeBasedOnStatus(
          item.ticketingStatus,
          item.ticketingStartDate,
          item.ticketingEndDate,
        ),
        eventDayLabel: formatEventDayLabel(item.eventStartDate),
        eventDate: formateEventDate(item.eventStartDate, item.eventEndDate),
      }));
    },
  });
};

export const useQueryUketEventDetail = (id: UketEventItem["eventId"]) => {
  return useSuspenseQuery({
    ...uketEvent.detail(id),
    select: data => {
      const isSingleRound = differenceInDays(
        data.lastRoundStartDateTime,
        data.firstRoundStartDateTime,
      );
      const startDate = format(
        data.firstRoundStartDateTime,
        "MM.dd(E) HH:mm",
        {
          locale: ko,
        },
      );
      const endDate = format(data.lastRoundStartDateTime, "MM.dd(E) HH:mm", {
        locale: ko,
      });
      const eventDate =
        isSingleRound === 0
          ? startDate
          : `${startDate.split(" ")[0]} ~ ${endDate.split(" ")[0]}`;

      const caution = data.caution.split("\n");
      const reservationTitle =
        data.ticketingStatus === "티켓팅_진행중"
          ? "예매하기"
          : data.ticketingStatus === "오픈_예정"
            ? format(data.ticketingStartDateTime, "MM.dd(E)", {
                locale: ko,
              }) + "티켓 오픈"
            : "예매 마감";
      const isTicketOpen = data.ticketingStatus === "티켓팅_진행중";
      return {
        ...data,
        eventDate,
        eventType: data.eventType === "PERFORMANCE" ? "공연" : "축제",
        reservationTitle,
        caution,
        isTicketOpen,
      };
    },
  });
};

export const useQueryUketEventImage = (id: string | number | undefined) => {
  return useQuery({
    ...uketEvent.image(id),
    enabled: !!id,
  });
};

export const useQueryUketEventImageList = (idList: string[] | number[]) => {
  return useQueries({
    queries: idList.map(id => {
      return {
        ...uketEvent.image(id),
        enabled: !!id,
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
      };
    },
  });
};

export const prefetchUketEventList = async ({
  type,
}: UketEventListRequestParams) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.fetchQuery({
      ...uketEvent.list({ type }),
    });

    return { state: dehydrate(queryClient), error: null };
  } catch (error) {
    return { state: dehydrate(queryClient), error };
  }
};

export const prefetchUketEventDetail = async (id: UketEventItem["eventId"]) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      ...uketEvent.detail(id),
    });

    return { state: dehydrate(queryClient), error: null };
  } catch (error) {
    return { state: dehydrate(queryClient), error };
  }
};
