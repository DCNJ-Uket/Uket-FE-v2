import { Button } from "@ui/components/ui/button";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
} from "@uket/api/constants/auth-url";
import { Metadata } from "next";
import Link from "next/link";
import { Auth_Site_Config } from "../../../config/site";

export const metadata: Metadata = {
  title: Auth_Site_Config.title,
  description: Auth_Site_Config.description,
  openGraph: Auth_Site_Config.openGraph,
  twitter: Auth_Site_Config.twitter,
};

export default function Page() {
  return (
    <main className="w-full h-full container flex flex-col items-center justify-evenly">
      <main className="container mb-10 mt-6 flex h-full w-full flex-col justify-between">
        <section className="flex w-full flex-col items-center gap-4">
          <h1 className="w-full text-2xl font-black">
            <p>공연 티켓을</p>
            <p>예매해 볼까요?</p>
          </h1>
          <h2 className="w-full text-[#454545]">
            회원가입/로그인 방식을 선택해 주세요.
          </h2>
        </section>
        <section className="flex w-full flex-col items-center justify-center gap-2">
          <Link href={KAKAO_LOGIN_URL} className="w-full sm:w-80">
            <Button className="h-12 w-full rounded-xl bg-[#FEE500] text-base text-[#191919] hover:bg-[#eed600]">
              카카오 계정으로 계속하기
            </Button>
          </Link>
          <Link href={GOOGLE_LOGIN_URL} className="w-full sm:w-80">
            <Button className="hover:bg-primary-foreground h-12 w-full rounded-xl border bg-transparent text-base text-black">
              구글 계정으로 계속하기
            </Button>
          </Link>
        </section>
      </main>
    </main>
  );
}
