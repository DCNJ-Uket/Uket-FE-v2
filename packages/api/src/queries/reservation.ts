import { ACCESS_TOKEN } from "@uket/util/token";
import { formatDate } from "@uket/util/time";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

import { FestivalInfo } from "../types/univ";
import { DepositResponse, TicketItem } from "../types/ticket";
import { SurveyResponse } from "../types/survey";
import {
  ReservationInfoResponse,
  ShowInfo,
  ShowInfoResponse,
} from "../types/show";
import { fetcher } from "../instance";

export const reservation = createQueryKeys("reservation", {
  show: (id: FestivalInfo["id"]) => ({
    queryKey: ["show-info", id],
    queryFn: async () => {
      const accessToken = ACCESS_TOKEN.get();
      const { data } = await fetcher.get<ShowInfoResponse>(
        `/events/${id}/shows`,
        {
          mode: "BOUNDARY",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return {
        reservationUserType: data.reservationUserType,
        shows: data.shows,
      };
    },
  }),
  survey: (id: FestivalInfo["id"]) => ({
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
      const accessToken = ACCESS_TOKEN.get();

      const { data } = await fetcher.get<ReservationInfoResponse>(
        `/events/shows/${id}/reservations/${reservationUserType}`,
        {
          mode: "BOUNDARY",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

export const useQueryShowList = (id: FestivalInfo["id"]) => {
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

export const useQuerySurveyList = (id: FestivalInfo["id"]) => {
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
  ticketStatus: TicketItem["ticketStatus"],
) => {
  return useQuery({
    ...reservation.account(ticketId, eventId),
    enabled: !!eventId && ticketStatus === "입금 확인중",
  });
};
