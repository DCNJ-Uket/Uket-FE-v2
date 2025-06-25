"use client";

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
import { useRouter } from "next/navigation";

import { getQueryClient } from "@uket/api/get-query-client";
import { useMutationDeleteUser } from "@uket/api/mutations/use-mutation-delete-user";
import { user } from "@uket/api/queries/user";
import { clearToken } from "@uket/util/cookie-client";

export default function DeleteUserModal() {
  const { mutate } = useMutationDeleteUser();
  const queryClient = getQueryClient();
  const router = useRouter();

  const handleDeleteUserInfo = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: user.info().queryKey });
        clearToken("user", "access");
        clearToken("user", "refresh");
        router.replace("/");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="basis-1/2 px-0 text-xs border border-[#8989A1] text-[#8989A1]"
        >
          회원탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-xl border-none" isXHidden>
        <DialogHeader className="h-32 justify-center sm:text-center">
          <DialogTitle className="text-base font-bold">
            회원탈퇴 하시겠어요?
          </DialogTitle>
          <h3 className="text-desc text-center text-xs font-medium">
            계정정보가 바로 삭제되며 복구할 수 없습니다.
          </h3>
        </DialogHeader>
        <DialogFooter className="flex-row space-x-2 sm:justify-center">
          <DialogClose asChild>
            <Button className="basis-1/2 border-desc text-xs" variant="outline">
              아니오.
            </Button>
          </DialogClose>
          <Button
            className="basis-1/2 bg-error text-xs hover:bg-[#ff5f37]"
            onClick={handleDeleteUserInfo}
          >
            네, 탈퇴할게요.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
