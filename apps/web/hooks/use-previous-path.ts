/* eslint-disable no-console */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 페이지 이동 기록을 관리하는 커스텀 훅
 * @returns [이전 경로, 이전 경로로 이동하는 함수]
 */
export const usePreviousPath = (): [string, () => void] => {
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState<string>("/");

  useEffect(() => {
    try {
      const pathStack: string[] = JSON.parse(
        sessionStorage.getItem("pathStack") || "[]",
      );

      // 티켓 구매 페이지는 스택에 추가하지 않음
      if (pathname.includes("/buy-ticket")) return;

      // 새로운 경로가 스택의 마지막 경로와 다른 경우에만 추가
      if (
        pathStack.length === 0 ||
        pathStack[pathStack.length - 1] !== pathname
      ) {
        setPreviousPath(pathStack[pathStack.length - 1] || "/");
        pathStack.push(pathname);
        sessionStorage.setItem("pathStack", JSON.stringify(pathStack));
      }
    } catch (error) {
      console.error("Failed to update path stack:", error);
    }
  }, [pathname]);

  const popPreviousPath = () => {
    try {
      const pathStack: string[] = JSON.parse(
        sessionStorage.getItem("pathStack") || "[]",
      );

      if (pathStack.length > 1) {
        pathStack.pop(); // 현재 경로 제거
        const prevPath = pathStack.pop() || "/"; // 이전 경로 가져오기
        setPreviousPath(prevPath);
        sessionStorage.setItem("pathStack", JSON.stringify(pathStack));
        return prevPath;
      }
    } catch (error) {
      console.error("Failed to pop previous path:", error);
    }
    return "/";
  };

  return [previousPath, popPreviousPath];
};
