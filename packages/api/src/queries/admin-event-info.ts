import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@uket/util/time";
import { fetcherAdmin } from "../admin-instance";
import { AdminTicketInfoResponse } from "../types/admin-event";

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

const getAdminEventInfoList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await fetcherAdmin.get<AdminTicketInfoResponse>(
    "/uket-event-registrations",
    {
      mode: "BOUNDARY",
      params: {
        page,
        size,
      },
    },
  );

  return data;
};

export const adminEventInfo = createQueryKeys("admin-event-info", {
  list: ({ page, size }) => ({
    queryKey: [page],
    queryFn: () => getAdminEventInfoList({ page, size }),
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
