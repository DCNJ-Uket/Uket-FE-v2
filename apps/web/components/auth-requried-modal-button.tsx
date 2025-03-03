"use client";

import { Button, ButtonProps } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { useControlRedirect } from "../hooks/use-control-redirect";

interface AuthRequiredModalButtonProps extends ButtonProps {
  title: string;
  path?: string;
}

export default function AuthRequiredModalButton({
  title,
  path,
  variant,
  className,
  onClick,
  ...rest
}: AuthRequiredModalButtonProps) {
  const {
    isModalOpen,
    handleOpenModalOrRedirect,
    handleCloseModal,
    handleRedirectToLogin,
  } = useControlRedirect();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() =>
        handleOpenModalOrRedirect({
          path,
          onCustomClick: onClick as () => void,
        })
      }
    >
      <DialogTrigger asChild>
        <Button variant={variant} className={className} {...rest}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-72 rounded-2xl sm:max-w-xs" isXHidden>
        <DialogHeader className="sm:text-center pt-10 pb-5">
          <DialogTitle>로그인 후 이용 가능합니다.</DialogTitle>
        </DialogHeader>
        <DialogFooter className="w-full flex-row justify-center gap-3 sm:flex-row">
          <Button
            className="border-brand text-brand grow basis-1/2 border bg-white hover:bg-slate-100"
            onClick={handleCloseModal}
          >
            취소
          </Button>
          <Button
            className="bg-brand border-brand hover:bg-brandHover grow basis-1/2 border text-white"
            onClick={handleRedirectToLogin}
          >
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
