import { cn } from "@ui/lib/utils";
import { FestivalUniversity } from "@uket/api/types/univ";
import Image from "next/image";

interface EventItemProps
  extends Pick<FestivalUniversity, "logoUrl" | "name" | "eventName"> {
  isSelected?: boolean;
  onSelect: () => void;
}

export default function EventItem({
  name,
  logoUrl,
  eventName,
  isSelected,
  onSelect,
}: EventItemProps) {
  const festivalLogo = logoUrl ? (
    <Image
      src={logoUrl}
      alt={name}
      width={200}
      height={200}
      loading="lazy"
      className="h-full object-contain"
      unoptimized
    />
  ) : (
    <div className="text-desc flex h-full w-full items-center justify-center rounded-lg text-sm">
      배너 이미지가 없어요.
    </div>
  );

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center gap-3"
      onClick={onSelect}
    >
      <div
        className={cn(
          "h-80 w-full rounded-2xl bg-white p-3 shadow-md transition-colors duration-300 relative",
          isSelected && "bg-brand/50",
        )}
      >
        {festivalLogo}
      </div>
      <header className="text-center">
        <p className="whitespace-wrap font-bold">{eventName}</p>
      </header>
    </div>
  );
}
