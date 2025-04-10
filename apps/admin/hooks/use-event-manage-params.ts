import { useRouter, useSearchParams } from "next/navigation";
import { EventType } from "../app/(main)/(super-admin)/super-admin/event-manage/_components/event-type-filter";

export const DEFAULT_EVENT_TYPE: EventType = "ALL" as const;

export interface EventManageParams {
  page?: number;
  eventType?: EventType | null;
}

export const useEventManageParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const eventType =
    (searchParams.get("eventType") as EventType) || DEFAULT_EVENT_TYPE;

  const updateQuery = (params: EventManageParams) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) newParams.delete(key);
      else newParams.set(key, String(value));
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    page,
    eventType,
    updateQuery,
  };
};
