"use client";

import { Button } from "@ui/components/ui/button";
import { isAxiosError, useErrorBoundaryFallbackProps } from "@uket/api";
import { useRouter } from "next/navigation";
import LogoIcon from "../logo-icon";

export default function EventListErrorFallback() {
  const router = useRouter();
  const { reset, error } = useErrorBoundaryFallbackProps();

  const handlePrevPage = () => {
    router.back();
    reset();
  };

  const errorMessage = isAxiosError(error)
    ? error.response?.data.message
    : "에러가 발생했어요.";

  return (
    <section className="flex h-full w-full items-center justify-center flex-col gap-10">
      <header className="text-center">
        <h1 className="flex flex-col items-center justify-center gap-9 text-lg font-bold">
          <LogoIcon />
          <span>{errorMessage}</span>
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
          variant="outline"
          className="rounded-xl border border-desc py-5 text-xs font-bold"
          onClick={handlePrevPage}
        >
          이전 페이지로
        </Button>
      </footer>
    </section>
  );
}
