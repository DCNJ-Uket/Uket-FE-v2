/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@ui/components/ui/button";
import { useQueryDepositurl } from "@uket/api/queries/reservation";
import { TicketItem } from "@uket/api/types/ticket";
import { handleClipboard } from "../../../../utils/clipboard";

interface DepositProps
  extends Pick<TicketItem, "uketEventId" | "ticketStatus"> {}

export default function Deposit({
  uketEventId,
  ticketStatus: isDepositActive,
}: DepositProps) {
  const { data } = useQueryDepositurl(uketEventId, isDepositActive);
  
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
            <footer className="flex items-center justify-center gap-1 text-sm">
              <div className="space-x-1">
                <span>{data.account.bankCode}</span>
                <span>{data.account.accountNumber} </span>
                <span>{data.account.depositorName}</span>
              </div>
              <Button
                variant="link"
                className="text-brand cursor-pointer px-1 font-bold underline"
                onClick={() =>
                  handleClipboard(data?.account.accountNumber ?? "")
                }
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
