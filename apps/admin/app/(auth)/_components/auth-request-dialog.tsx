import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import { KAKAO_OPEN_CHAT_ID } from "@uket/api/constants/auth-url";
import Link from "next/link";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao?: any;
  }
}

interface AuthRequestDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthRequestDialog({
  open,
  onClose,
}: AuthRequestDialogProps) {
  const handleDialogClose = () => {
    onClose();

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    }

    window.Kakao.Channel.chat({
      channelPublicId: KAKAO_OPEN_CHAT_ID,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[300px] sm:max-w-sm rounded-2xl border-none"
        isXHidden
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            아래 정보를 UKET 공식 채널로 보내주세요.
          </DialogTitle>
          <DialogDescription className="text-sm text-[#5F6368]">
            확인 후 24시간 이내 승인해 드립니다.
          </DialogDescription>
        </DialogHeader>
        <section className="text-[#8989A1] text-sm py-3">
          <ol className="list-disc ml-4 space-y-1">
            <li>이름</li>
            <li>{"소속명(주최/주관명)"}</li>
            <li>이메일</li>
            <li>전화번호</li>
          </ol>
        </section>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Link href={""} className="w-full">
              <Button
                type="button"
                className="bg-brand hover:bg-brandHover text-white w-full text-base font-bold py-6"
                onClick={handleDialogClose}
              >
                UKET 채널 바로가기
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
