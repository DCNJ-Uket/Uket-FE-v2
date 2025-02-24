import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@uket/ui/components/ui/alert-dialog";
import { ChevronTripleRightIcon } from "./chevron-triple-icon";
import TicketChangeItem from "./ticket-change-item";

interface TicketStatusChangeDialogProps {
  userName: string;
  isOpen: boolean;
  onOpenDialog: (open: boolean) => void;
  beforeStatus: string;
  newStatus: string;
  onConfirmChange: () => void;
}

export default function TicketStatusChangeDialog({
  userName,
  isOpen,
  onOpenDialog,
  beforeStatus,
  newStatus,
  onConfirmChange,
}: TicketStatusChangeDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenDialog}>
      <AlertDialogContent className="max-w-[380px] pt-11">
        <AlertDialogHeader className="gap-3">
          <AlertDialogTitle>
            <div className="text-center font-bold">
              <span className="underline decoration-1 underline-offset-4">{userName}</span>
              <span>
                님의 티켓 상태를
                <br />
                수정하시겠습니까?
              </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center gap-5">
            <TicketChangeItem status={beforeStatus} before />
            <ChevronTripleRightIcon />
            <TicketChangeItem status={newStatus} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5 flex gap-3 sm:justify-center">
          <AlertDialogCancel
            onClick={() => onOpenDialog(false)}
            className="basis-1/2 bg-[#D9D9D9] py-6 text-base font-bold text-[#8989A1] hover:bg-[#cacaca]"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmChange}
            className="bg-brand basis-1/2 py-6 text-base font-bold text-white hover:bg-brandHover"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
