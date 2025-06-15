import { Button } from "@ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import AuthRequiredModalButton from "../components/auth-requried-modal-button";
import Footer from "../components/footer";
import LandingBackgroundImage from "../public/landing-bg.png";

export default async function Page() {
  return (
    <main className="relative flex h-full flex-col items-center justify-evenly container">
      <div className="absolute -z-10 flex h-full w-full items-center justify-center bg-[linear-gradient(171.65deg,_#6343E1_5.82%,_#000000_81.67%)]">
        <Image
          src={LandingBackgroundImage}
          alt="landing-image"
          width={800}
          className="bg-contain bg-center bg-no-repeat"
        />
      </div>
      <main className="flex h-screen w-full flex-col justify-evenly">
        <section className="mt-10 flex w-full grow flex-col items-center gap-5 pt-10">
          <h1 className="text-center text-3xl font-bold text-white">
            <p>축제 공연 감상,</p>
            <p>기다림 없이 UKET</p>
          </h1>
        </section>
        <section className="flex w-full flex-col items-center justify-center gap-2 bottom-0 sticky pb-5">
          <Link href={"/select-event"} className="block w-full text-center">
            <Button
              variant="secondary"
              className="w-full rounded-xl bg-white p-7 text-base font-bold text-black hover:bg-slate-200 sm:w-80"
            >
              티켓 예매하기
            </Button>
          </Link>
          <AuthRequiredModalButton
            title="내 티켓 확인하기"
            path="/ticket-list"
            className="w-full rounded-xl border border-white bg-black p-7 text-base text-white sm:w-80"
          />
        </section>
      </main>
      <Footer />
    </main>
  );
}
