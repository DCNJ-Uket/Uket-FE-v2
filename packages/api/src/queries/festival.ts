import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useSuspenseQuery } from "@tanstack/react-query";

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
  FestivalInfoResponse,
  TicketingStatus,
  UketEventItem,
  UketEventListResponse,
} from "../types/univ";

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
          return `${format(start, "MM.dd(E) HH:mm")}`;
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
) => {
  const now = new Date();
  const start = parseISO(ticketingStartDate);
  const end = parseISO(ticketingEndDate);

  if (status === "티켓팅_진행중") {
    const diff = differenceInSeconds(end, now);
    if (diff <= 48 * 3600 && diff > 0) {
      // 티켓 판매 마감까지 48시간 이하일 경우
      return formatSecondsToHHMMSS(diff);
    } else if (diff > 48 * 3600) {
      // 티켓 판매 마감까지 48시간 넘게 남은 경우
      return null;
    }
  }

  if (status === "오픈_예정") {
    const diff = differenceInSeconds(start, now);
    if (diff <= 48 * 3600 && diff > 0) {
      // 티켓 오픈까지 48시간 이하일 경우
      const days = Math.floor(diff / (3600 * 24));
      const time = formatSecondsToHHMMSS(diff % (3600 * 24));
      return `D-${days} ${time}`;
    } else if (diff > 48 * 3600) {
      // 티켓 오픈까지 48시간 넘게 남은 경우
      const date = format(ticketingStartDate, "MM/dd(E)", {
        locale: ko,
      });
      return date + "티켓 오픈 예정";
    }
  }
};

export const festival = createQueryKeys("festival", {
  list: ({ type }: UketEventListRequestParams) => ({
    queryKey: ["festival-list", type],
    queryFn: async () => {
      const { data } = await fetcher.get<UketEventListResponse>(
        `/uket-events?type=${type}`,
      );
      return data.events;
    },
  }),
  detail: (id: UketEventItem["eventId"]) => ({
    queryKey: ["festival-detail"],
    queryFn: async () => {
      const { data } = await fetcher.get<FestivalInfoResponse>(
        `/universities/${id}/event`,
      );
      return data;
    },
  }),
});

/**
 * 현재 진행중인 모든 축제의 목록을 조회합니다.
 * @param {UketEventListRequestParams} params
 * @returns {FestivalUniversity[]} 축제 목록 배열
 */
export const useQueryFestivalList = ({ type }: UketEventListRequestParams) => {
  return useSuspenseQuery({
    ...festival.list({ type }),
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

/**
 * 전달된 id값을 가지는 축제의 상세 정보를 조회합니다.
 * @param {FestivalUniversity["eventId"]} id
 * @returns {FestivalInfo}
 */
export const useQueryFestivalDetail = (id: UketEventItem["eventId"]) => {
  return useSuspenseQuery(festival.detail(id));
};

export const prefetchFestivalList = ({ type }: UketEventListRequestParams) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...festival.list({ type }),
  });

  return dehydrate(queryClient);
};

export const prefetchFestivalDetail = async (id: UketEventItem["eventId"]) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      ...festival.detail(id),
    });

    return { state: dehydrate(queryClient), error: null };
  } catch (error) {
    return { state: dehydrate(queryClient), error };
  }
};
