"use client";

import { Button } from "@ui/components/ui/button";
import { useErrorBoundaryFallbackProps } from "@uket/api";
import { useRouter } from "next/navigation";
import LogoIcon from "../logo-icon";

export default function TicketBuyErrorFallback() {
  const router = useRouter();
  const { reset } = useErrorBoundaryFallbackProps();

  const handlePreviousPage = () => {
    router.back();
    reset();
  };

  return (
    <section className="flex h-full w-full items-center justify-center flex-col gap-10 mx-auto container">
      <header className="text-center">
        <h1 className="flex flex-col items-center justify-center gap-9 text-lg font-bold">
          <LogoIcon />
          <span>티켓 예매 과정에 에러가 발생했습니다.</span>
        </h1>
        <h2 className="text-sm text-desc">잠시 후 다시 시도해 주세요.</h2>
      </header>
      <footer className="flex w-full flex-col gap-2">
        <Button
          onClick={reset}
          className="rounded-xl border border-desc bg-desc py-5 text-xs font-bold hover:bg-descHover"
        >
          다시 시도
        </Button>
        <Button
          onClick={handlePreviousPage}
          variant="outline"
          className="rounded-xl border border-desc py-5 text-sm font-bold w-full"
        >
          이전 페이지로
        </Button>
      </footer>
    </section>
  );
}
