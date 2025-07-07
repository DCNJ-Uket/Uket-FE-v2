/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";
import { Button } from "@ui/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

export default function StepCompleteFree({}: Props) {
  const router = useRouter();

  return (
    <Activity>
      <ActivityContent>
        <ActivityHeader className="relative grow items-center justify-center overflow-hidden">
          <Image
            src="/complete-3d-ticket.png"
            alt="티켓 이미지"
            width={180}
            height={180}
            className="animate-rotate-axis w-[180px] h-auto"
          />
          <div className="z-20 mt-10 flex flex-col justify-start gap-5 text-center">
            <h1 className="text-[23px] font-black">
              <p>예매가 완료되었습니다.</p>
            </h1>
            <h6 className="text-desc text-sm">
              <p>예매 내역은 알림톡으로 발송되었으며,</p>
              <p>
                <strong>내 티켓 확인</strong> 메뉴에서도 확인 가능합니다.
              </p>
            </h6>
          </div>
          <Image
            src="/ticketing-complete.png"
            alt="티켓팅 완료 이미지"
            width={200}
            height={200}
            className="animate-ping-dealy absolute h-full w-full"
          />
        </ActivityHeader>
        <ActivityFooter>
          <div className="mb-5 flex w-full flex-row justify-center gap-3 px-4 sm:flex-row">
            <Button
              className="bg-brand text-white grow basis-1/2 hover:bg-brand"
              onClick={() => router.replace("/")}
            >
              UKET 홈으로
            </Button>
          </div>
        </ActivityFooter>
      </ActivityContent>
    </Activity>
  );
}
