import { toast } from "@uket/ui/components/ui/sonner";
import CustomAxiosError from "./default";

/** 성공 시 토스트 */
export const TOAST_HANDLER: Record<
  string,
  {
    onSuccess: () => void;
    onError?: (error: CustomAxiosError) => void;
  }
> = {
  deleteUser: {
    onSuccess: () => {
      toast.success("정상적으로 탈퇴되었습니다.");
    },
    onError: error => {
      toast.error(`${error.errorContent?.title || "에러가 발생했어요"}`, {
        description:
          error.errorContent?.description || "잠시 후 다시 시도해 주세요.",
      });
    },
  },
  cancelTicket: {
    onSuccess: () => {
      toast.success("예매가 취소되었습니다.");
    },
  },
  addAdmin: {
    onSuccess: () => {
      toast.success("초대 이메일을 전송했습니다.");
    },
  },
  removeAdmin: {
    onSuccess: () => {
      toast.success("선택하신 멤버를 삭제했습니다.");
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
