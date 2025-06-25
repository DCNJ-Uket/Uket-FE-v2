"use client";

import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { LoaderCircleIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { useMemo } from "react";
import { useNewAdminForm } from "../../../../../../hooks/use-new-admin-form";
import SelectorOrganization from "./selector-organization";

interface AdminFormDialogProps {
  page: number;
  open: boolean;
  onClose: () => void;
}

export default function AdminFormDialog({
  page,
  open,
  onClose,
}: AdminFormDialogProps) {
  const { form, onSubmit, isLoading } = useNewAdminForm({
    page,
    onClose,
  });
  const formatPhoneNumber = useMemo(
    () => (value: string) => {
      const cleaned = value.replace(/\D/g, "");
      const match = cleaned.match(/^([\d]{3})([\d]{4})([\d]{4})$/);
      return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
    },
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:rounded-2xl border-none" isXHidden>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">사용자 추가</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isErrorBlack>이름</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="이름을 입력하세요."
                        autoComplete="off"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand placeholder:text-[#8989a1] border-formInput"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isErrorBlack>아이디</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="이메일을 입력하세요."
                        autoComplete="off"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand placeholder:text-[#8989a1] border-formInput"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isErrorBlack>전화번호</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="전화번호를 입력하세요."
                        autoComplete="off"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand placeholder:text-[#8989a1] border-formInput"
                        {...field}
                        value={formatPhoneNumber(field.value) || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isErrorBlack>소속</FormLabel>
                    <SelectorOrganization field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="authority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isErrorBlack>권한</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border border-formInput rounded-md text-[#8989a1]">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-formInput">
                        <SelectGroup>
                          <SelectLabel>선택</SelectLabel>
                          <SelectItem value="관리자">관리자</SelectItem>
                          <SelectItem value="멤버">멤버</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex-row space-x-2 sm:justify-center">
              <DialogClose asChild>
                <Button className="basis-1/2 text-xs bg-formInput hover:bg-[#c1c1c1]">
                  취소
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="basis-1/2 bg-brand hover:bg-brandHover"
                disabled={!form.formState.isValid || isLoading}
              >
                {isLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "확인"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
