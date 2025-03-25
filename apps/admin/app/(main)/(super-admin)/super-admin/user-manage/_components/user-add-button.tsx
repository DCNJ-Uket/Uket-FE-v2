"use client";

import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { useState } from "react";
import { useNewAdminForm } from "../../../../../../hooks/use-new-admin-form";
import UserForm from "./user-form";

export default function UserAddButton() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useNewAdminForm();

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold bg-brand hover:bg-brandHover w-44">
          사용자 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:rounded-2xl border-none" isXHidden>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">사용자 추가</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <UserForm form={form} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
