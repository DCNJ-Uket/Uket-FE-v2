"use client";

import { Button } from "@uket/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@uket/ui/components/ui/form";
import { Input } from "@uket/ui/components/ui/input";
import { useLoginForm } from "../../../hooks/use-login-form";

export default function AuthSection() {
  const { form, onSubmit, error } = useLoginForm();

  return (
    <main className="flex flex-col gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                  <FormLabel className="text-desc">ID</FormLabel>
                  <FormControl>
                    <Input
                      id="id"
                      placeholder="아이디"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                  <FormLabel className="text-desc">PW</FormLabel>
                  <FormControl>
                    <Input
                      id="pw"
                      type="password"
                      placeholder="비밀번호"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <p className="h-5 text-center text-sm text-[#EF4444] sm:text-left">
              {error && <span>{error}</span>}
            </p>
            <Button
              type="submit"
              className="bg-brand hover:bg-brandHover w-full rounded-lg py-6 text-base md:min-w-80"
            >
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
