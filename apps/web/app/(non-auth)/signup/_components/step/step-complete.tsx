import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";
import { Button } from "@ui/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepComplete() {
  const router = useRouter();

  return (
    <Activity>
      <ActivityContent>
        <ActivityHeader className="relative grow items-center justify-center overflow-hidden">
          <h1 className="text-lg text-[#5E5E6E]">회원가입이 완료되었습니다.</h1>
          <h2 className="text-center text-2xl font-black">
            <p>이제 행사 티켓을</p>
            <p>예매하러 가볼까요?</p>
          </h2>
          <Image
            src={"/signup-complete.png"}
            alt="회원가입 완료"
            width={200}
            height={200}
            className="animate-ping-dealy absolute h-full w-full object-cover"
          />
        </ActivityHeader>
        <ActivityFooter className="z-10">
          <Button
            className="bg-brand hover:bg-brandHover h-16 w-full rounded-none text-base font-extrabold"
            onClick={() => router.replace("/")}
          >
            다음으로
          </Button>
        </ActivityFooter>
      </ActivityContent>
    </Activity>
  );
}
