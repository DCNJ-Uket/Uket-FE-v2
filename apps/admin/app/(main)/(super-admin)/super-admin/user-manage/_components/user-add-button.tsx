import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import UserForm from "./user-form";

export default function UserAddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold bg-brand hover:bg-brandHover w-44">
          사용자 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:rounded-2xl border-none" isXHidden>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">사용자 추가</DialogTitle>
        </DialogHeader>
        <UserForm />
        <DialogFooter className="flex-row space-x-2 sm:justify-center">
          <DialogClose asChild>
            <Button className="basis-1/2 text-xs bg-formInput hover:bg-[#c1c1c1]">
              취소
            </Button>
          </DialogClose>
          <Button className="basis-1/2 bg-brand hover:bg-brandHover">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
