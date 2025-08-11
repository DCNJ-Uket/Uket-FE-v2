import { useMutation } from "@tanstack/react-query";
import { format, formatTime } from "@uket/util/time";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { adminEventInfo } from "../queries/admin-event-info";
import { AdminUserInfoResponse } from "../types/admin-auth";
import { AdminTicketInfoResponse } from "../types/admin-event";
export type EventType = "공연" | "축제";

type EventRound = {
  date: Date;
  startTime: string;
};

type EntryGroup = {
  ticketCount: number;
  entryStartTime: {
    hour: number;
    minute: number;
  };
};

type TicketingDate = {
  ticketingStartDateTime: Date;
  ticketingEndDateTime: Date;
};

type Banner = {
  id?: string | null | undefined;
  link: string | null | undefined;
};

type Location = {
  base: string;
  detail: string;
};

type Details = {
  information: string;
  caution: string;
};

type Contact = {
  type: string;
  content: string;
  link: string;
};

type ImageId = {
  id?: string | null | undefined;
};

export type PaymentInfo = {
  isFree: "무료" | "유료";
  ticketPrice: number;
  bankCode: string;
  accountNumber: string;
  depositorName: string;
  depositUrl: string;
};

export type SubmitEventRequestParams = {
  eventType: EventType;
  organizationId: AdminUserInfoResponse["organizationId"];
  eventName: string;
  location: Location;
  entryGroup: EntryGroup[];
  eventRound: EventRound[];
  ticketingDate: TicketingDate;
  totalTicketCount: number;
  details: Details;
  contact: Contact;
  uketEventImageId: ImageId;
  thumbnailImageId: ImageId;
  banners: Banner[];
  paymentInfo: PaymentInfo;
  noLimit: "제한 없음" | "제한";
  buyTicketLimit: number;
};

type SubmitEventResponse = {
  uketEventRegistrationId: number;
  eventType: "FESTIVAL" | "PERFORMANCE";
};

export const useMutationSubmitEvent = (
  {
    methodType,
    eventId,
  }: {
    methodType?: "modify" | "add";
    eventId?: string;
  } = {
    methodType: "add",
    eventId: undefined,
  },
) => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ params }: { params: SubmitEventRequestParams }) => {
      const {
        eventType,
        organizationId,
        eventName,
        totalTicketCount,
        details,
        contact,
      } = params;
      const location = params.location.base + " " + params.location.detail;
      const eventRound = params.eventRound.map(round => {
        return {
          date: format(round.date, "yyyy-MM-dd"),
          startTime: round.startTime,
        };
      });
      const ticketingDate = {
        ticketingStartDateTime: format(
          params.ticketingDate.ticketingStartDateTime,
          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        ),
        ticketingEndDateTime: format(
          params.ticketingDate.ticketingEndDateTime.toISOString(),
          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        ),
      };
      const entryGroup =
        params.entryGroup.length === 0
          ? params.eventRound.map(round => {
              return {
                ticketCount: params.totalTicketCount,
                entryStartTime: round.startTime,
              };
            })
          : params.entryGroup.map(entry => {
              return {
                ticketCount: entry.ticketCount,
                entryStartTime: formatTime(
                  entry.entryStartTime.hour,
                  entry.entryStartTime.minute,
                ),
              };
            });
      const imageIds = {
        uketEventImageId: params.uketEventImageId.id,
        thumbnailImageId: params.thumbnailImageId.id,
        banners: params.banners.map(banner => {
          return {
            imageId: Number(banner.id),
            link: banner.link,
          };
        }),
      };

      const paymentInfo = {
        ticketPrice: params.paymentInfo.ticketPrice,
        bankCode: params.paymentInfo.bankCode,
        accountNumber: params.paymentInfo.accountNumber,
        depositorName: params.paymentInfo.depositorName,
        depositUrl: params.paymentInfo.depositUrl,
      };

      const buyTicketLimit = params.noLimit  === "제한 없음"? 0 : params.buyTicketLimit;

      const formattedData = {
        eventName,
        location,
        eventRound,
        ...ticketingDate,
        entryGroup,
        totalTicketCount,
        details,
        contact,
        ...imageIds,
        paymentInfo,
        buyTicketLimit,
      };
      const type = eventType === "공연" ? "PERFORMANCE" : "FESTIVAL";
      const body =
        eventType === "공연"
          ? { performanceData: formattedData }
          : {
              festivalData: formattedData,
            };

      let response;
      if (methodType === "add") {
        response = await fetcherAdmin.post<SubmitEventResponse>(
          `/uket-event-registrations/organizations/${organizationId}/event-type/${type}`,
          body,
          {
            mode: "TOAST_UI",
          },
        );
      } else {
        response = await fetcherAdmin.put<SubmitEventResponse>(
          `/uket-event-registrations/${eventId}/event-type/${type}`,
          body,
          {
            mode: "TOAST_UI",
          },
        );
      }

      return response.data;
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData<AdminTicketInfoResponse>([
        ...adminEventInfo.list({ page: 1 }).queryKey,
      ]);

      await queryClient.cancelQueries({
        queryKey: adminEventInfo.list({ page: 1 }).queryKey,
      });

      if (previousData) {
        queryClient.setQueryData<AdminTicketInfoResponse>(
          [...adminEventInfo.list({ page: 1 }).queryKey],
          { ...previousData },
        );
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [...adminEventInfo.list({ page: 1 }).queryKey],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminEventInfo.list({ page: 1 }).queryKey,
      });
    },
  });

  return mutation;
};
