import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";
import axios from "axios";
import { AdminTicketInfoResponse } from "../types/admin-ticket-info";

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

const getAdminTicketInfoList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await axios.get<AdminTicketInfoResponse>(
    "/api/admin/ticket-info",
    {
      params: {
        page,
        size,
      },
    },
  );

  return data;
};

export const adminTicketInfo = createQueryKeys("admin-ticket-info", {
  list: ({ page, size }) => ({
    queryKey: [page],
    queryFn: () => getAdminTicketInfoList({ page, size }),
  }),
});

export const useQueryAdminTicketInfoList = ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  return useSuspenseQuery({
    ...adminTicketInfo.list({ page, size }),
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
