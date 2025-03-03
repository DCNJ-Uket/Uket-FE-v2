/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@ui/components/ui/button";
import Link from "next/link";

// TODO: 콘솔 에러 테스트 후 삭제
// Error boundaries must be Client Components
// 예측 불가능한 에러 (5xx) 처리
// 	•	500: InternalServerError
// 	•	502: BadGatewayError
// 	•	503: ServiceUnavailableError
// 	•	504: GatewayTimeoutError
//  •	error while prefetching
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="relative flex h-full flex-col items-center justify-center gap-6 container sm:w-[500px]">
          <header className="flex flex-col items-center gap-6 grow justify-center">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-black">
                잠시 후 다시 시도해 주세요!
              </h2>
              <p className="container text-center text-sm text-desc flex flex-col">
                <span>이용에 불편을 드려 죄송합니다.</span>
                <span>
                  네트워크 또는 데이터 오류로 페이지를 불러오지 못하였습니다.
                </span>
              </p>
            </div>
          </header>
          <aside className="flex flex-col gap-2 w-full mb-10">
            <Button
              onClick={() => reset()}
              className="rounded-xl border border-desc] bg-desc py-5 text-sm font-bold hover:bg-descHover w-full"
            >
              다시 시도
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border border-desc  py-5 text-sm font-bold w-full"
            >
              <Link href={"/"}>홈 화면으로</Link>
            </Button>
          </aside>
        </main>
      </body>
    </html>
  );
}
