"use client";

import { Button } from "@ui/components/ui/button";
import { isAxiosError, useErrorBoundaryFallbackProps } from "@uket/api";
import LogoIcon from "../logo-icon";

export default function QrcodeDepositErrorFallback() {
  const { reset, error } = useErrorBoundaryFallbackProps();

  const errorMessage = isAxiosError(error)
    ? error.response?.data.message
    : "에러가 발생했어요.";

  return (
    <section className="flex h-full w-full items-center justify-center flex-col gap-10">
      <header className="text-center">
        <h1 className="flex flex-col items-center justify-center gap-9 text-lg font-bold">
          <LogoIcon />
          <span>잠시 후 다시 시도해 주세요.</span>
        </h1>
        <h2 className="text-sm text-desc">{errorMessage}</h2>
      </header>
      <footer className="flex w-full flex-col gap-2">
        <Button
          onClick={reset}
          className="rounded-xl border border-desc bg-desc py-5 text-xs font-bold hover:bg-descHover"
        >
          다시 시도
        </Button>
      </footer>
    </section>
  );
}
