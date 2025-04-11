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
import { Trash2Icon } from "@ui/components/ui/icon";
import { useMutationRemoveAdmin } from "@uket/api/mutations/use-mutation-manage-admin";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface UserRemoveButtonProps {
  userId: number;
  userName: string;
}

// TODO: 사용자 이름 연동 및 핸들러 추가
export default function UserRemoveButton({
  userId,
  userName,
}: UserRemoveButtonProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") as string;
  const [open, setOpen] = useState(false);

  const { mutate } = useMutationRemoveAdmin(Number(pageParam));

  const handleRemove = () => {
    mutate(
      { adminId: userId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Trash2Icon className="text-[#5e5e6e]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:rounded-2xl border-none" isXHidden>
        <DialogHeader className="h-20 justify-center sm:text-center">
          <DialogTitle className="text-base font-bold">
            <p>
              <span className="underline underline-offset-4">{userName}</span>
              <span>님의 계정을</span>
            </p>
            <p>삭제하시겠습니까?</p>
          </DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <section></section>
        <DialogFooter className="flex-row space-x-2 sm:justify-center">
          <DialogClose asChild>
            <Button className="basis-1/2 text-xs bg-formInput hover:bg-[#c1c1c1]">
              취소
            </Button>
          </DialogClose>
          <Button
            className="basis-1/2 bg-error text-xs hover:bg-[#ff5f37]"
            onClick={handleRemove}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
