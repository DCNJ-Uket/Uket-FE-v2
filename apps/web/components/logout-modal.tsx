"use client";

import { toast } from "@ui/components/ui/sonner";
import { Button } from "@uket/ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@uket/ui/components/ui/dialog";
import { clearToken } from "@uket/util/cookie-client";
import { useRouter } from "next/navigation";

export default function LogoutModal() {
  const router = useRouter();

  const handleLogout = () => {
    clearToken("user", "access");
    clearToken("user", "refresh");
    toast.success("로그아웃이 완료되었습니다.");
    router.replace("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="basis-1/2 px-0 text-xs bg-[#8989A1] text-[#f2f2f2] hover:bg-[#7b7b90]"
        >
          로그아웃
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-xl border-none" isXHidden>
        <DialogHeader className="h-32 justify-center sm:text-center">
          <DialogTitle className="text-base font-bold">
            로그아웃 하시겠어요?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex-row space-x-2 sm:justify-center">
          <DialogClose asChild>
            <Button className="basis-1/2 border-desc text-xs" variant="outline">
              아니오.
            </Button>
          </DialogClose>
          <Button
            className="basis-1/2 bg-error text-xs hover:bg-[#ff5f37]"
            onClick={handleLogout}
          >
            네.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
