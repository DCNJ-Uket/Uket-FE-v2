import { Suspense } from "react";
import UserAddButton from "./_components/user-add-button";

// TODO: 사용자 목록 테이블 추가
export default function Page() {
  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <header className="flex items-center justify-between">
        <h1 className="text-[34px] font-bold">사용자 관리</h1>
        <UserAddButton />
      </header>
      <Suspense>{/* 사용자 목록 테이블 */}</Suspense>
    </main>
  );
}
