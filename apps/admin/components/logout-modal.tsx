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
import { cn } from "@uket/ui/lib/utils";
import { clearToken } from "@uket/util/cookie-client";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isMobileDevice?: boolean;
}

export default function LogoutModal({
  isMobileDevice = false,
}: LogoutModalProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearToken("admin", "access");
    toast.success("로그아웃이 완료되었습니다.");
    router.replace("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isMobileDevice ? "link" : "outline"}
          className={cn(
            "m-auto block",
            isMobileDevice
              ? "px-0 text-xs text-desc"
              : "border-none text-[#8989A1]",
          )}
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
              아니오
            </Button>
          </DialogClose>
          <Button
            className="basis-1/2 bg-error text-xs hover:bg-[#ff5f37]"
            onClick={handleLogout}
          >
            네
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
