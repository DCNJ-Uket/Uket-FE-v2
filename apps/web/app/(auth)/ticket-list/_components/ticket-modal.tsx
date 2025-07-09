import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Separator } from "@ui/components/ui/separator";
import { TicketItem } from "@uket/api/types/ticket";
import dynamic from "next/dynamic";
import QrcodeDepositErrorFallback from "../../../../components/error-fallback/qrcode-deposit-error-fallback";
import Indicator from "../../../../components/indicator";
import RetryApiErrorBoundary from "../../../../components/retry-api-error-boundary";
import Deposit from "./deposit";
import GridItem from "./grid-item";
import Qrcode from "./qr-code";

const ConfirmModal = dynamic(() => import("./confirm-modal"));

interface TicketModalProps {
  ticket: TicketItem;
}

export default function TicketModal({
  ticket: {
    userName,
    showDate,
    enterStartTime,
    location,
    organizationName,
    ticketStatus,
    uketEventId,
    eventName,
    ticketId,
    createdAt,
  },
}: TicketModalProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="gap-3">
        <CardTitle>
          <div className="text-left">
            <Indicator
              variant={ticketStatus}
              title={ticketStatus}
              rounded
              className="relative left-0 top-0"
            />
          </div>
        </CardTitle>
        <CardDescription className="flex flex-col items-center justify-center text-[12px] sm:text-sm">
          <RetryApiErrorBoundary fallback={<QrcodeDepositErrorFallback />}>
            {ticketStatus === "입금 확인중" && (
              <Deposit ticketStatus={ticketStatus} uketEventId={uketEventId} />
            )}
            {ticketStatus === "예매 완료" && (
              <Qrcode ticketId={ticketId} ticketStatus={ticketStatus} />
            )}
            {ticketStatus === "입장 완료" && (
              <div className="flex flex-col items-center text-desc h-40 justify-center gap-2">
                <h1 className="font-black text-xl">
                  입장 완료! 공연을 즐겨보세요
                </h1>
                <h2 className="font-medium text-sm">
                  재입장은 관리자에게 문의 바랍니다.
                </h2>
              </div>
            )}
            {ticketStatus === "환불 요청" && (
              <div className="flex flex-col items-center text-desc h-40 justify-center gap-2">
                <h1 className="font-black text-xl">
                  관리자에게 환불 요청을 보냈습니다!
                </h1>
                <h2 className="font-medium text-sm">
                  추가 문의는 UKET 공식 채널을 이용해주세요.
                </h2>
              </div>
            )}
          </RetryApiErrorBoundary>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-3">
          <header className="space-y-1">
            <p className="text-xs text-[#5E5E6E]">{organizationName}</p>
            <h1 className="flex items-center gap-3 font-black">
              <p className="text-[22px]">{eventName}</p>
            </h1>
          </header>
          <Separator className="bg-desc" />
          <section className="grid auto-rows-auto grid-cols-2 gap-4">
            <GridItem title={"예매자"} content={userName} />
            <GridItem title={"입장 날짜"} content={showDate} />
            <GridItem title={"위치(공연장)"} content={location} isPlace />
            <GridItem title={"입장 시간"} content={`${enterStartTime}`} />
            {createdAt && (
              <>
                <GridItem title={"구매 일시"} content={createdAt} />
              </>
            )}
          </section>
          <Separator className="bg-[#5E5E6E]" />
          <footer>
            {ticketStatus !== "입장 완료" &&
              ticketStatus !== "환불 요청" &&
              ticketStatus !== "예매 취소" && (
                <ConfirmModal ticketId={ticketId} ticketStatus={ticketStatus} />
              )}
          </footer>
        </section>
      </CardContent>
      {ticketStatus !== "입금 확인중" && (
        <CardFooter className="mx-5 mb-3 justify-center overflow-hidden rounded-lg bg-[#FDC950] py-3">
          <div className="inline-flex min-w-full flex-nowrap items-center gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <h1
                key={index}
                className="animate-infinite-scroll min-w-full text-center text-sm text-[#5E5E6E]"
                aria-hidden={true}
              >
                <span>입장 시 신분증을 함께 제시해 주세요!</span>
              </h1>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
