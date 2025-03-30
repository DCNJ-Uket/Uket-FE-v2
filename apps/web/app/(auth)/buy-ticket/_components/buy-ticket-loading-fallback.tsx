import { Skeleton } from "@ui/components/ui/skeleton";
import { cn } from "@ui/lib/utils";

interface BuyTicketLoadingFallbackProps {
  isTime?: boolean;
}

export default function BuyTicketLoadingFallback({
  isTime = false,
}: BuyTicketLoadingFallbackProps) {
  return (
    <div className="flex flex-col gap-4 px-[22px]">
      {[...Array(3)].map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "rounded-lg bg-white w-full h-[155px]",
            isTime && "h-[124px]",
          )}
        />
      ))}
    </div>
  );
}
