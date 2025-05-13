import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";

import { getQueryClient } from "../get-query-client";
import { fetcher } from "../instance";
import {
  ReservationInfoResponse,
  ShowInfo,
  ShowInfoResponse,
} from "../types/show";
import { SurveyResponse } from "../types/survey";
import { DepositResponse, TicketItem } from "../types/ticket";
import { UketEventDetail } from "../types/univ";

export const reservation = createQueryKeys("reservation", {
  show: (id: UketEventDetail["id"]) => ({
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
  survey: (id: UketEventDetail["id"]) => ({
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
});

export const useQueryShowList = (id: UketEventDetail["id"]) => {
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

export const useQuerySurveyList = (id: UketEventDetail["id"]) => {
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

export const prefetchShowList = (id: UketEventDetail["id"]) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...reservation.show(id),
  });

  return dehydrate(queryClient);
};

export const prefetchSurveyList = (id: UketEventDetail["id"]) => {
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
