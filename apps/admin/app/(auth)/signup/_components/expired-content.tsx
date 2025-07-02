import { Button } from "@ui/components/ui/button";
import { KAKAO_OPEN_CHAT_URL } from "@uket/api/constants/auth-url";
import Link from "next/link";

export default function ExpiredContent() {
  return (
    <div className="flex flex-col gap-20 max-w-sm">
      <div className="flex flex-col gap-5 justify-center items-center text-center">
        <h1 className="text-[#17171B] font-black text-[28px]">
          회원가입 링크가 만료됐어요!
        </h1>
        <p className="font-medium text-[#8989A1] text-lg sm:w-[379px]">
          해당 링크는 발송 시점으로부터 24시간 동안만 유효합니다. 회원가입을
          원하시면, 링크 재발송을 UKET 채널에 요청해주세요. 감사합니다.
        </p>
      </div>
      <footer className="flex flex-col gap-2">
        <Button
          asChild
          className="w-full rounded-xl sm:w-full bg-brand hover:bg-brand py-6"
        >
          <Link href={KAKAO_OPEN_CHAT_URL}>UKET 채널 바로가기</Link>
        </Button>
        <Button
          asChild
          className="bg-[#D9D9D9] text-white hover:bg-[#D9D9D9] w-full rounded-xl py-6"
        >
          <Link href="/">메인 페이지로</Link>
        </Button>
      </footer>
    </div>
  );
}
