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
import { useSignupForm } from "../../../hooks/use-signup-form";

export default function Page() {
  const { form, onSubmit } = useSignupForm();
  return (
    <section className="flex flex-col gap-11 m-[-1rem] p-[1rem] bg-[#E7DCF3]">
      <main className="flex flex-col gap-10">
        <h1 className="text-brand font-bold">
          비밀번호를 설정하면 회원가입이 완료됩니다.
        </h1>
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
              <FormField
                control={form.control}
                name="check_password"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                    <FormLabel className="text-desc">PW</FormLabel>
                    <FormControl>
                      <Input
                        id="check_pw"
                        type="password"
                        placeholder="비밀번호 확인"
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
                에러
              </p>
              <Button
                type="submit"
                className="bg-brand hover:bg-brandHover w-full rounded-lg py-6 text-base md:min-w-80"
              >
                회원가입
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </section>
  );
}
