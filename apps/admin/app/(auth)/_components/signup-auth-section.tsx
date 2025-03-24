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

export default function SignupAuthSection() {
  const { form, onSubmit } = useSignupForm();
  const { isValid } = form.formState;

  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-brand font-bold">
        비밀번호를 설정하면 회원가입이 완료됩니다
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-7 w-full">
            <FormField
              control={form.control}
              name="email"
              defaultValue={form.control._defaultValues.email}
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                  <FormLabel className="text-desc">아이디</FormLabel>
                  <FormControl>
                    <Input
                      id="id"
                      className="text-base bg-formInput"
                      {...field}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5 md:w-full">
                  <FormLabel className="text-desc">비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      id="pw"
                      type="password"
                      placeholder="8~16자 : 영문 대소문자, 숫자, 특수문자 모두 사용 필요"
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
                  <FormLabel className="text-desc">비밀번호 확인</FormLabel>
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
          <div className="h-5 text-center text-sm text-[#EF4444] sm:text-left">
            에러
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-lg py-6 text-base md:min-w-80 ${
              !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand hover:bg-brandHover"
            }`}
          >
            회원가입
          </Button>
        </form>
      </Form>
    </main>
  );
}
