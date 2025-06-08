import { AspectRatio } from "@ui/components/ui/aspect-ratio";
import { Card, CardContent } from "@ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { TicketItem } from "@uket/api/types/ticket";
import dynamic from "next/dynamic";
import Image from "next/image";
import Indicator from "../../../../components/indicator";
import GridItem from "./grid-item";

const ConfirmModal = dynamic(() => import("./confirm-modal"));
const TicketModal = dynamic(() => import("./ticket-modal"));

interface TicketProps {
  ticket: TicketItem;
}

// TODO: 효율적인 모달 관리 방식 찾고 적용하기
export default function Ticket({ ticket }: TicketProps) {
  const isTicketCancelAvailable =
    ticket.ticketStatus === "입금 확인중" ||
    ticket.ticketStatus === "예매 완료";

  return (
    <Dialog>
      <DialogTrigger className="text-start">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col divide-y divide-dashed p-0">
            <section className="flex basis-3/4 flex-col overflow-hidden rounded-b-3xl rounded-t-xl bg-white shadow-xl">
              <header className="relative">
                <AspectRatio ratio={16 / 9}>
                  {ticket.backgroundImageUrl ? (
                    <Image
                      src={ticket.backgroundImageUrl}
                      alt={ticket.eventName}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-100 h-full w-full"></div>
                  )}
                </AspectRatio>
                <Indicator
                  variant={ticket.ticketStatus}
                  title={ticket.ticketStatus}
                  rounded
                  className="left-3 top-3"
                />
              </header>
              <main className="container flex grow flex-col justify-around gap-3 py-5">
                <header className="space-y-1">
                  <p className="text-xs text-[#5E5E6E]">
                    {ticket.universityName}
                  </p>
                  <h1 className="flex items-center gap-3 font-black">
                    <p className="text-[22px]">{ticket.eventName}</p>
                  </h1>
                </header>
                <section className="grid auto-rows-auto grid-cols-2 gap-4">
                  <GridItem title={"예매자"} content={ticket.userName} />
                  <GridItem title={"입장 날짜"} content={ticket.showDate} />
                  <GridItem
                    title={"위치(공연장)"}
                    content={ticket.showLocation}
                    isPlace
                  />
                  <GridItem
                    title={"입장 시간"}
                    content={`${ticket.enterStartTime} ~ ${ticket.enterEndTime}`}
                  />
                </section>
              </main>
            </section>
            <footer className="flex basis-1/4 rounded-b-xl rounded-t-3xl bg-white pb-2 pl-7 pt-5 shadow-md">
              <aside className="flex flex-col items-start justify-between">
                <div className="w-32 truncate">
                  <GridItem
                    title="일련번호"
                    content={ticket.ticketNo}
                    isTicketNo
                  />
                </div>
                {isTicketCancelAvailable ? (
                  <ConfirmModal
                    ticketId={ticket.ticketId}
                    ticketStatus={ticket.ticketStatus}
                  />
                ) : (
                  <div className="py-5"></div>
                )}
              </aside>
            </footer>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-lg p-0 sm:max-w-md">
        <DialogTitle hidden />
        <TicketModal ticket={ticket} />
      </DialogContent>
    </Dialog>
  );
}
