import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { UketEventListRequestParams } from "@uket/api/queries/uket-event";
import { useEventTypeParams } from "../../../../hooks/use-event-type-params";

const eventTypeList: {
  type: UketEventListRequestParams["type"];
  title: string;
}[] = [
  {
    type: "ALL",
    title: "전체",
  },
  {
    type: "PERFORMANCE",
    title: "공연",
  },
  {
    type: "FESTIVAL",
    title: "축제",
  },
];

export default function UketEventTypeSelector() {
  const { eventType, handleChangeParams } = useEventTypeParams();

  return (
    <header className="flex items-center gap-2 px-2">
      {eventTypeList.map(({ type, title }) => (
        <Button
          key={type}
          variant={"ghost"}
          size={"sm"}
          className={cn(
            "border rounded-full px-4 font-medium text-base",
            eventType === type
              ? "bg-[#F0EDFD] text-brand border-brand hover:bg-[#F0EDFD] hover:text-brandHover"
              : "text-[#BFBFBF] border-[#BFBFBF] hover:bg-[#F0EDFD] hover:text-brandHover hover:border-brand",
          )}
          onClick={() => handleChangeParams(type)}
        >
          {title}
        </Button>
      ))}
    </header>
  );
}
