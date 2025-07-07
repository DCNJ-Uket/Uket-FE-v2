import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { format, formatDate, ko, parseISO } from "@uket/util/time";

import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import {
  PerformerListResponse,
  ReservationResponse,
} from "../types/reservation";
import {
  ReservationInfoResponse,
  ShowInfo,
  ShowInfoResponse,
} from "../types/show";
import { SurveyResponse } from "../types/survey";
import { DepositResponse, TicketItem } from "../types/ticket";
import { UketEventDetail } from "../types/uket-event";

export const reservation = createQueryKeys("reservation", {
  show: (id: UketEventDetail["eventId"]) => ({
    queryKey: ["show-info", id],
    queryFn: async () => {
      const { data } = await fetcher.get<ShowInfoResponse>(
        `/events/${id}/shows`,
        {
          mode: "BOUNDARY",
        },
      );

      return {
        reservationUserType: data.reservationUserType,
        shows: data.shows,
      };
    },
  }),
  survey: (id: UketEventDetail["eventId"]) => ({
    queryKey: ["survey-list", id],
    queryFn: async () => {
      const { data } = await fetcher.get<SurveyResponse>(
        `/events/${id}/survey`,
      );

      return { surveyId: data.surveyId, surveys: data.forms };
    },
  }),
  time: (id: ShowInfo["id"], reservationUserType: string = "일반인") => ({
    queryKey: ["time-info", id],
    queryFn: async () => {
      const { data } = await fetcher.get<ReservationInfoResponse>(
        `/events/shows/${id}/reservations/${reservationUserType}`,
        {
          mode: "BOUNDARY",
        },
      );

      return data.reservations;
    },
  }),
  account: (
    ticketId: TicketItem["ticketId"],
    eventId: TicketItem["eventId"],
  ) => ({
    queryKey: ["deposit", eventId, ticketId],
    queryFn: async () => {
      const { data } = await fetcher.get<DepositResponse>(
        `/events/${eventId}/account`,
      );

      return data;
    },
  }),
  select: (id: UketEventDetail["eventId"]) => ({
    queryKey: ["reservation-info", id],
    queryFn: async () => {
      const { data } = await fetcher.get<ReservationResponse>(
        `/uket-events/${id}/reservation`,
        {
          mode: "BOUNDARY",
        },
      );

      return data;
    },
  }),
  performer: (id: UketEventDetail["eventId"]) => ({
    queryKey: ["performer-list", id],
    queryFn: async () => {
      const { data } = await fetcher.get<PerformerListResponse>(
        `/rounds/${id}/performers`,
        {
          mode: "BOUNDARY",
        },
      );
      return data.items;
    },
  }),
});

export const useQueryShowList = (id: UketEventDetail["eventId"]) => {
  return useSuspenseQuery({
    ...reservation.show(id),
    select: data => {
      return data.shows.map(show => ({
        ...show,
        startTime: formatDate(show.startDate, "time"),
        endTime: formatDate(show.endDate, "time"),
        showDate: formatDate(show.startDate, "compact"),
        ticketingDate: formatDate(show.ticketingDate, "fullCompact"),
      }));
    },
  });
};

export const useQueryReservationInfoList2 = (
  id: UketEventDetail["eventId"],
) => {
  return useSuspenseQuery({
    ...reservation.select(id),
    select: data => {
      return data.eventRounds.map(round => {
        const date = parseISO(round.eventRoundDateTime);
        const dateLabel = format(date, "MM.dd(E)", { locale: ko }); // 예: 06.30(월)

        const times = round.entryGroups.map(group => {
          const time = parseISO(group.startDateTime);
          const timeLabel = format(time, "HH:mm"); // 예: 10:00

          return {
            timeLabel,
            entryGroupId: group.entryGroupId,
            remaining: group.totalTicketCount - group.ticketCount,
          };
        });

        return {
          ticketLimit:
            data.buyTicketLimit === 0 ? undefined : data.buyTicketLimit,
          price: data.ticketPrice,
          dateLabel,
          eventRoundId: round.eventRoundId,
          times,
        };
      });
    },
  });
};

export const useQueryReservationInfoList = (id: UketEventDetail["eventId"]) => {
  return useSuspenseQuery({
    ...reservation.select(id),
    select: data => {
      return {
        ticketPrice: data.ticketPrice,
        dates: data.eventRounds.map(round => ({
          id: round.eventRoundId,
          date: round.eventRoundDateTime,
        })),
        times: data.eventRounds.flatMap(round =>
          round.entryGroups.map(group => ({
            id: group.entryGroupId,
            time: group.startDateTime,
            remaining: group.totalTicketCount - group.ticketCount,
          })),
        ),
      };
    },
  });
};

export const useQueryPerformerList = (id: UketEventDetail["eventId"]) => {
  return useSuspenseQuery({
    ...reservation.performer(id),
    select: data => data.map(item => item.name),
  });
};

export const useQuerySurveyList = (id: UketEventDetail["eventId"]) => {
  return useSuspenseQuery(reservation.survey(id));
};

export const useQueryReservationList = (
  id: ShowInfo["id"],
  reservationUserType: string = "일반인",
) => {
  const userType =
    reservationUserType !== undefined ? reservationUserType : "일반인";

  return useSuspenseQuery({
    ...reservation.time(id, userType),
    select: data => {
      return data.map(item => ({
        ...item,
        startDate: formatDate(item.startTime, "fullTimeStamp"),
        startTime: formatDate(item.startTime, "time"),
        endTime: formatDate(item.endTime, "time"),
      }));
    },
    staleTime: 0,
  });
};

export const useQueryDepositurl = (
  ticketId: TicketItem["ticketId"],
  eventId: TicketItem["eventId"],
  ticketStatus: TicketItem["ticketStatus"] = "입금 확인중",
) => {
  return useQuery({
    ...reservation.account(ticketId, eventId),
    enabled: !!eventId && ticketStatus === "입금 확인중",
  });
};

export const prefetchShowList = (id: UketEventDetail["eventId"]) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...reservation.show(id),
  });

  return dehydrate(queryClient);
};

export const prefetchSurveyList = (id: UketEventDetail["eventId"]) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...reservation.survey(id),
  });

  return dehydrate(queryClient);
};

export const prefetchReservationList = (
  id: ShowInfo["id"],
  reservationUserType: string = "일반인",
) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...reservation.time(id, reservationUserType),
  });

  return dehydrate(queryClient);
};

export const prefetchDepositUrl = (
  ticketId: TicketItem["ticketId"],
  eventId: TicketItem["eventId"],
) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...reservation.account(ticketId, eventId),
  });

  return dehydrate(queryClient);
};
