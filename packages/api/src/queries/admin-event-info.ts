/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/rules-of-hooks */
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";

import { EventType, PaymentInfo, SubmitEventRequestParams } from "../mutations/use-mutation-submit-event";
import {
  AdminTicketDetailInfoResponse,
  AdminTicketInfoResponse,
} from "../types/admin-event";

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

const getAdminEventInfoList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await fetcherAdmin.get<AdminTicketInfoResponse>(
    "/uket-event-registrations",
    {
      mode: "TOAST_UI",
      params: {
        page,
        size,
      },
    },
  );

  return data;
};

const getAdminEventInfoDetail = async (id: string) => {
  const { data } = await fetcherAdmin.get<AdminTicketDetailInfoResponse>(
    `/uket-event-registrations/${id}`,
    {
      mode: "BOUNDARY",
    },
  );

  return data;
};

export const adminEventInfo = createQueryKeys("admin-event-info", {
  list: ({ page, size }) => ({
    queryKey: [page],
    queryFn: () => getAdminEventInfoList({ page, size }),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => getAdminEventInfoDetail(id),
  }),
});

export const useQueryAdminEventInfoList = ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  return useSuspenseQuery({
    ...adminEventInfo.list({ page, size }),
    select: data => {
      const timeDate = data.content.map(item => {
        return {
          ...item,
          eventStartDate: formatDate(item.eventStartDate, "shortCompact"),
          eventEndDate: formatDate(item.eventEndDate, "shortCompact"),
          ticketingStartDateTime: formatDate(
            item.ticketingStartDateTime,
            "fullCompact",
          ),
        };
      });

      return {
        ...data,
        timezoneData: timeDate,
      };
    },
  });
};

export const useQueryAdminEventInfoDetail = (id: string | undefined) => {
  if (!id) {
    return { data: null };
  }

  return useSuspenseQuery({
    ...adminEventInfo.detail(id),
    select: data => {
      const eventType = (
        data.eventType === "FESTIVAL" ? "축제" : "공연"
      ) as EventType;
      const eventInfo =
        data.eventType === "PERFORMANCE"
          ? data.performanceData
          : data.festivalData;
      const ticketingDate = {
        ticketingStartDateTime: new Date(eventInfo?.ticketingStartDateTime!),
        ticketingEndDateTime: new Date(eventInfo?.ticketingEndDateTime!),
      };
      const eventRound = eventInfo?.eventRound.map(item => {
        const [hours, minutes] = item.startTime.split(":").map(Number);
        const date = new Date(item.date);
        date.setHours(hours!, minutes!, 0, 0);

        return {
          date,
          startTime: item.startTime,
        };
      });
      const buyTicketLimit = eventInfo?.buyTicketLimit || 0;
      const noLimit = (buyTicketLimit === 0 ? "제한 없음" : "제한") as SubmitEventRequestParams["noLimit"];
      const paymentInfo = {
        isFree: (eventInfo?.paymentInfo.ticketPrice === 0
          ? "무료"
          : "유료") as PaymentInfo["isFree"],
        ...eventInfo?.paymentInfo!,
      };
      const uketEventImageId = {
        file: undefined,
        previewImage: undefined,
        id: eventInfo?.uketEventImageId,
      };
      const thumbnailImageId = {
        file: undefined,
        previewImage: undefined,
        id: eventInfo?.thumbnailImageId,
      };
      const banners = eventInfo?.banners.map(item => {
        return {
          file: undefined,
          previewImage: undefined,
          link: item.link,
          id: item.imageId.toString(),
        };
      });
      const location = {
        base: eventInfo?.location!,
        detail: "",
      };
      return {
        eventType: data.eventType,
        data: {
          ...eventInfo,
          eventType,
          ticketingDate,
          paymentInfo,
          uketEventImageId,
          thumbnailImageId,
          banners,
          location,
          eventRound,
          noLimit,
          buyTicketLimit,
        },
      };
    },
  });
};

export const prefetchAdminEventInfoList = async (page: number) => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery({ ...adminEventInfo.list({ page }) });

  return {data, prefetchState: dehydrate(queryClient)};
};

export const prefetchAdminEventInfoDetail = (id: string) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({ ...adminEventInfo.detail(id) });

  return dehydrate(queryClient);
};
