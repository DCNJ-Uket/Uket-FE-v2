import { useMutation } from "@tanstack/react-query";
import { format } from "@uket/util/time";
import { fetcherAdmin } from "../admin-instance";
import { AdminUserInfoResponse } from "../types/admin-auth";
type EventType = "공연" | "축제";

type EventRound = {
  date: Date;
  startTime: string;
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

type PaymentInfo = {
  isFree: "무료" | "유료";
  ticketPrice: number;
  bankCode: string;
  accountNumber: string;
  depositorName: string;
  depositUrl: string;
};

type SubmitEventRequestParams = {
  eventType: EventType;
  organizationId: AdminUserInfoResponse["organizationId"];
  eventName: string;
  location: Location;
  eventRound: EventRound[];
  ticketingDate: TicketingDate;
  totalTicketCount: number;
  details: Details;
  contact: Contact;
  uketEventImageId: ImageId;
  thumbnailImageId: ImageId;
  banners: Banner[];
  paymentInfo: PaymentInfo;
};

type SubmitEventResponse = {
  uketEventRegistrationId: number;
  eventType: "FESTIVAL" | "PERFORMANCE";
};

export const useMutationSubmitEvent = () => {
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
        ticketingStartDateTime:
          params.ticketingDate.ticketingStartDateTime.toISOString(),
        ticketingEndDateTime:
          params.ticketingDate.ticketingEndDateTime.toISOString(),
      };
      const entryGroup = eventRound.map((_, index) => {
        return {
          ticketCount: params.totalTicketCount,
          entryStartTime: eventRound[index]?.startTime,
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
      };
      const type = eventType === "공연" ? "PERFORMANCE" : "FESTIVAL";
      const body =
        eventType === "공연"
          ? { performanceData: formattedData }
          : {
              festivalData: formattedData,
            };

      const { data } = await fetcherAdmin.post<SubmitEventResponse>(
        `/uket-event-registrations/organizations/${organizationId}/event-type/${type}`,
        body,
        {
          mode: "TOAST_UI",
        },
      );

      return data;
    },
  });

  return mutation;
};
