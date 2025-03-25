"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";

import { Button } from "@ui/components/ui/button";
import { useQueryDepositurl } from "@uket/api/queries/reservation";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Ticketing3DImg from "../../../../../public/complete-3d-ticket.png";

import CompleteBackgroudImg from "../../../../../public/ticketing-complete.png";

import Image from "next/image";

import { handleClipboard } from "../../../../../utils/clipboard";

interface StepCompleteProps {
  ticketId: string;
  eventId: string;
  routeUrl: string;
}

export default function StepComplete({
  ticketId,
  eventId,
  routeUrl,
}: StepCompleteProps) {
  const router = useRouter();

  const { data: deposit } = useQueryDepositurl(
    Number(ticketId),
    Number(eventId),
  );

  return (
    <Activity>
      <ActivityContent>
        <ActivityHeader className="relative grow items-center justify-center overflow-hidden">
          <Image
            src={Ticketing3DImg}
            alt="티켓 이미지"
            className="animate-rotate-axis w-[180px]"
          />
          {deposit && (
            <div className="z-20 mt-10 flex flex-col justify-start gap-5 text-center">
              <h1 className="text-[23px] font-black">
                <p>예매 정보가 등록되었습니다.</p>
                <p>입금 후 예매가 완료됩니다.</p>
              </h1>
              <h6 className="text-desc text-base font-medium">
                공연 티켓가 ₩{deposit.ticketPrice}
              </h6>
              <div className="flex items-center justify-center gap-2">
                <div className="text-base font-normal text-[#8989A1]">
                  <span>{deposit.accountNumber} </span>
                  <span>{deposit.accountOwner}</span>
                </div>
                <p
                  className="text-brand decoration-brand cursor-pointer font-bold underline decoration-solid decoration-1 underline-offset-2"
                  onClick={() => handleClipboard(deposit.accountNumber ?? "")}
                >
                  복사
                </p>
              </div>
            </div>
          )}
          <Image
            src={CompleteBackgroudImg}
            alt="티켓팅 완료 이미지"
            className="animate-ping-dealy absolute h-full"
          />
        </ActivityHeader>
        <ActivityFooter>
          <div className="mb-5 flex w-full flex-row justify-center gap-3 px-4 sm:flex-row">
            <Button
              className="border-brand text-brand grow basis-1/2 border bg-white hover:bg-slate-100"
              onClick={() => router.replace(routeUrl)}
            >
              나중에 하기
            </Button>
            <Button
              asChild
              className="bg-brand border-brand hover:bg-brandHover grow basis-1/2 border"
            >
              <Link
                href={deposit?.depositUrl ?? ""}
                target="_blank"
                className="text-white"
              >
                카카오로 입금하기
              </Link>
            </Button>
          </div>
        </ActivityFooter>
      </ActivityContent>
    </Activity>
  );
}
