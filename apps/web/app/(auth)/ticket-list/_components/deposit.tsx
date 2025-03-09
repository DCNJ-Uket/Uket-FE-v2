/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@ui/components/ui/button";
import { useQueryDepositurl } from "@uket/api/queries/reservation";
import { TicketItem } from "@uket/api/types/ticket";
import Link from "next/link";
import { handleClipboard } from "../../../../utils/clipboard";

interface DepositProps
  extends Pick<TicketItem, "ticketId" | "eventId" | "ticketStatus"> {}

export default function Deposit({
  ticketId,
  eventId,
  ticketStatus: isDepositActive,
}: DepositProps) {
  const { data } = useQueryDepositurl(ticketId, eventId, isDepositActive);

  return (
    <>
      {isDepositActive && data && (
        <div className="text-center">
          <header className="mb-3 space-y-1.5 font-medium">
            <h1 className="text-desc text-xl font-black">
              입금 완료 시 QR 활성화
            </h1>
            <h2>
              <p>입급 후 예매가 완료되면 QR이 활성화됩니다.</p>
              <p>입금 확인까지 시간이 다소 소요될 수 있습니다.</p>
            </h2>
            <h3>
              공연 티켓가 <span className="font-bold">₩{data.ticketPrice}</span>
            </h3>
          </header>
          <div className="space-y-1">
            <Button
              asChild
              className="bg-brand hover:bg-brandHover rounded-lg text-xs"
            >
              <Link
                href={data.depositUrl}
                target="_blank"
                className="font-bold"
              >
                카카오로 입금하기
              </Link>
            </Button>
            <footer className="flex items-center justify-center gap-1 text-sm">
              <div>
                <span>{data.accountNumber} </span>
                <span>{data.accountOwner}</span>
              </div>
              <Button
                variant="link"
                className="text-brand cursor-pointer px-1 font-bold"
                onClick={() => handleClipboard(data?.accountNumber ?? "")}
              >
                복사
              </Button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
