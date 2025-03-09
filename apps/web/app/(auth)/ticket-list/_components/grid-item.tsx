/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChevronRightIcon } from "@ui/components/ui/icon";
import { cn } from "@ui/lib/utils";
import Link from "next/link";

interface GridItemProps {
  title: string;
  content: string;
  isTicketNo?: boolean;
  isPlace?: boolean;
}

export default function GridItem({
  title,
  content,
  isTicketNo,
  isPlace,
}: GridItemProps) {
  const locationToMapLink = `https://map.kakao.com/?q=${content}`;

  const item = isPlace ? (
    <Link
      href={isPlace ? locationToMapLink : "#"}
      target="_blank"
      className="flex items-center font-bold"
    >
      {title}
      {isPlace && <ChevronRightIcon className="h-4 w-4 pt-0.5" />}
    </Link>
  ) : (
    <p className="font-bold">{title}</p>
  );

  return (
    <div
      className="space-y-2 text-xs"
      onClick={e => {
        isPlace && e.stopPropagation();
      }}
    >
      {item}
      <p
        className={cn(
          isTicketNo
            ? "truncate text-[#7250FD]"
            : "line-clamp-2 text-[#5E5E6E]",
        )}
      >
        {content}
      </p>
    </div>
  );
}
