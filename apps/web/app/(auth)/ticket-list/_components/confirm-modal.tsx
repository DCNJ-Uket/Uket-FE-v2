import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { getQueryClient } from "@uket/api/get-query-client";
import { useMutationCancelTicket } from "@uket/api/mutations/use-mutation-cancel-ticket";
import { user } from "@uket/api/queries/user";
import { useState } from "react";

interface ConfirmModalProps {
  ticketId: number;
  ticketStatus: string;
}

export default function ConfirmModal({
  ticketId,
  ticketStatus,
}: ConfirmModalProps) {
  const queryClient = getQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate } = useMutationCancelTicket();

  const bookingConfirmed = ticketStatus === "예매 완료";

  const handleCancelTicket = () => {
    setOpen(false);
    mutate(ticketId, {
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: user.ticket().queryKey });
        return data;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={e => e.stopPropagation()}>
        <DialogTrigger asChild>
          <div className="cursor-pointer py-3 text-xs text-[#FD724F] underline">
            예매 취소
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-72 rounded-2xl sm:max-w-xs" isXHidden>
          <DialogHeader className="space-y-3 py-5 sm:py-12 sm:pb-8">
            <DialogTitle className="text-center font-semibold">
              정말 예매를 취소하시겠어요?
            </DialogTitle>
            <DialogDescription className="flex flex-col text-center">
              {bookingConfirmed ? (
                <>
                  <span>환불 처리를 위해 입금 받으실 계좌 정보를</span>
                  <span>UKET 공식 채널로 전달해주세요.</span>
                </>
              ) : (
                <>
                  <span>
                    입금을 완료하셨는데 <strong>입금 확인중</strong>상태라면,
                  </span>
                  <span>UKET 공식 채널에 환불 계좌 정보를 보내주세요.</span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row items-center justify-center gap-3">
            <Button
              className="basis-1/2 bg-[#ccc] hover:bg-[#afafaf]"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              아니오
            </Button>
            <DialogClose asChild>
              <Button
                className="basis-1/2 bg-[#FD724F] hover:bg-[#ff5328]"
                onClick={handleCancelTicket}
              >
                네, 취소할게요.
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
