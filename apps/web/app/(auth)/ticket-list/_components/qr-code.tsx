/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@ui/components/ui/button";
import { RefreshCwIcon } from "@ui/components/ui/icon";
import { useQueryTicketQrcode } from "@uket/api/queries/ticket";
import { TicketItem } from "@uket/api/types/ticket";
import Image from "next/image";
import { useEffect, useState } from "react";

interface QrcodeProps extends Pick<TicketItem, "ticketId" | "ticketStatus"> {}

export default function Qrcode({
  ticketId,
  ticketStatus: isDepositActive,
}: QrcodeProps) {
  const { data: qrcode, refetch } = useQueryTicketQrcode(
    ticketId,
    isDepositActive,
  );

  const [remainingTime, setRemainingTime] = useState<number>(15);

  const handleReissueQrCode = () => {
    refetch();
    setRemainingTime(15);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1; // Decrease countdown
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      refetch(); // 타이머가 0일 때 refetch 호출
      setRemainingTime(15); // 타이머를 15초로 초기화
    }
  }, [remainingTime]);

  return (
    <>
      {qrcode && (
        <>
          <div>
            <Image
              src={qrcode}
              alt="qrcode"
              width={100}
              height={100}
              className="aspect-square h-36 w-36 scale-125"
            />
          </div>
          <div className="z-50 flex items-center pl-2">
            <div className="space-x-2">
              <span>남은시간</span>
              <span className="text-brand">
                {remainingTime < 10
                  ? `00:0${remainingTime}`
                  : `00:${remainingTime}`}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <RefreshCwIcon
                className="h-5 w-5"
                onClick={handleReissueQrCode}
              />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
