"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ui/components/ui/carousel";
import { cn } from "@ui/lib/utils";
import { useQueryUserTicketList } from "@uket/api/queries/user";
import Ticket from "./ticket";

export default function TicketListSection() {
  const { data } = useQueryUserTicketList();
  
  return (
    <Carousel className="w-full max-w-full" opts={{ loop: true }}>
      <CarouselContent
        className={cn(
          "-ml-1",
          data.length === 1 && "flex justify-center",
          data.length >= 2 && "mx-3 sm:ml-0",
        )}
      >
        {data.length > 0 ? (
          data.map(ticket => (
            <CarouselItem
              key={ticket.ticketId}
              className="basis-11/12 justify-items-center pb-2 pl-2"
            >
              <div className="p-1">
                <Ticket ticket={ticket} />
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="container flex h-60 items-center justify-center text-center">
            <div className="text-lg font-bold text-gray-500">
              예매한 티켓이 없어요.
            </div>
          </div>
        )}
      </CarouselContent>
    </Carousel>
  );
}
