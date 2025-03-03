"use client";

import { Button } from "@ui/components/ui/button";
import { RotateCcwIcon } from "@ui/components/ui/icon";
import { useErrorBoundaryFallbackProps } from "@uket/api";

export default function TermErrorFallback() {
  const { reset } = useErrorBoundaryFallbackProps();

  return (
    <section className="flex h-full w-full items-center justify-center flex-col gap-10">
      <header className="text-center">
        <h1>약관을 불러오는 중에 오류가 발생했어요</h1>
        <h2 className="text-sm text-desc">잠시 후 다시 시도해 주세요.</h2>
      </header>
      <footer className="flex w-full flex-col items-center">
        <Button onClick={reset} variant={"outline"} size={"icon"}>
          <RotateCcwIcon />
        </Button>
      </footer>
    </section>
  );
}
