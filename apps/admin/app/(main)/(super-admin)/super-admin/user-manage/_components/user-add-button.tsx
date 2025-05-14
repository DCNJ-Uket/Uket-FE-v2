"use client";

import { useOverlay } from "@toss/use-overlay";
import { Button } from "@ui/components/ui/button";
import AdminFormDialog from "./admin-form-dialog";

interface UserAddButtonProps {
  page: number;
}

export default function UserAddButton({ page }: UserAddButtonProps) {
  const overlay = useOverlay();

  return (
    <Button
      className="font-bold bg-brand hover:bg-brandHover w-44"
      onClick={() =>
        overlay.open(({ isOpen, close }) => (
          <AdminFormDialog open={isOpen} onClose={close} page={page} />
        ))
      }
    >
      사용자 추가
    </Button>
  );
}
