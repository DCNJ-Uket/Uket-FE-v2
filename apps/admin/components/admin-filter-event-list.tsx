import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { useQueryAdminFilterEventList } from "@uket/api/queries/admin-filter-event";

interface AdminFilterEventProps {
  isActive?: boolean;
  eventName: string;
  onClick: () => void;
}

const AdminFilterEvent = ({
  isActive = false,
  eventName,
  onClick,
}: AdminFilterEventProps) => {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded cursor-pointer whitespace-nowrap ${
        isActive ? "bg-brand text-white" : "bg-white text-brand"
      }`}
    >
      {eventName}
    </div>
  );
};

interface AdminFilterEventListProps {
  currentEventId?: number;
  onChangeEventId: (eventId?: number, eventName?: string) => void;
}

export default function AdminFilterEventList({
  currentEventId,
  onChangeEventId,
}: AdminFilterEventListProps) {
  const { data } = useQueryAdminFilterEventList();

  return (
    <ScrollArea>
      <div className="flex justify-start items-center gap-2 pb-3">
        <AdminFilterEvent
          key={-1}
          eventName="전체"
          isActive={currentEventId === undefined}
          onClick={() => onChangeEventId(undefined, "전체")}
        />
        {data &&
          data?.map(({ eventId, eventName }) => (
            <AdminFilterEvent
              key={eventId}
              eventName={eventName}
              isActive={currentEventId === eventId}
              onClick={() => onChangeEventId(eventId, eventName)}
            />
          ))}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
