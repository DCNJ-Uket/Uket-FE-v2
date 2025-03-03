"use client";

import { Button } from "@ui/components/ui/button";
import { isAxiosError, useErrorBoundaryFallbackProps } from "@uket/api";
import Link from "next/link";
import LogoIcon from "../logo-icon";

export default function SignupErrorFallback() {
  const { reset, error } = useErrorBoundaryFallbackProps();

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
          variant="outline"
          className="rounded-xl border border-desc py-5 text-sm font-bold w-full"
          asChild
        >
          <Link href={"/"}>홈 화면으로</Link>
        </Button>
      </footer>
    </section>
  );
}
