import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { FilterIcon } from "@ui/components/ui/icon";
import { cn } from "@ui/lib/utils";

export type EventType = "ALL" | "FESTIVAL" | "PERFORMANCE";

interface EventTypeFilterProps {
  value: EventType;
  onSelect: (value: EventType) => void;
}

interface DropdownItemProps {
  selected?: boolean;
  onSelect: (value: EventType) => void;
  type: EventType;
}

const DropdownItem = ({
  selected = false,
  onSelect,
  type,
}: DropdownItemProps) => (
  <div
    className="rounded-sm py-1.5 px-1 text-sm hover:bg-slate-100 items-center flex justify-center gap-2 relative cursor-pointer"
    onClick={() => onSelect(type)}
  >
    <span>
      {
        {
          ALL: "전체",
          FESTIVAL: "축제",
          PERFORMANCE: "공연",
        }[type]
      }
    </span>
    <div className="relative w-3 h-3">
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          selected ? "bg-brand" : "border-[0.5px] border-black bg-white",
        )}
      />

      <span
        className={cn(
          "absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full",
          selected && "bg-[#C6B8FE]",
        )}
      />
    </div>
  </div>
);

export default function EventTypeFilter({
  value,
  onSelect,
}: EventTypeFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex justify-center items-center gap-0.5">
        <p>구분</p>
        <FilterIcon className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-[#8989A1] min-w-[80px] px-1 py-1">
        <DropdownItem
          type="ALL"
          selected={value === "ALL"}
          onSelect={onSelect}
        />
        <DropdownItem
          type="FESTIVAL"
          selected={value === "FESTIVAL"}
          onSelect={onSelect}
        />
        <DropdownItem
          type="PERFORMANCE"
          selected={value === "PERFORMANCE"}
          onSelect={onSelect}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
