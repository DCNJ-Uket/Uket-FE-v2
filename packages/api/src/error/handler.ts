import { routerTo } from "@uket/util/global-router";
import { toast } from "@uket/ui/components/ui/sonner";

import CustomAxiosError from "./default";

/** 성공 시 토스트 */
export const SUCCESS_TOAST = {
  deleteUser: {
    onSuccess: () => {
      // TODO: 라우터 처리 - 현재 페이지 이동 후 토스트가 사라짐
      routerTo("/");
      toast.success("정상적으로 탈퇴되었습니다.");
    },
  },
  cancelTicket: {
    onSuccess: () => {
      toast.success("예매가 취소되었습니다.");
    },
  },
};

/** 실패 시 토스트 */
export const onErrorHandler = (error: CustomAxiosError) => {
  if (error.isToast) {
    toast.error(`${error.errorContent?.title || "에러가 발생했어요"}`, {
      description: error.errorContent?.description || "잠시 후 시도해 주세요.",
    });
  }
};
