"use client";

import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import SelectorGroup from "./selector-group";
import SelectorRole from "./selector-role";

export default function UserForm() {
  return (
    <section className="flex flex-col gap-3">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className="font-normal text-base">
          이름
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="이름을 입력하세요."
          autoComplete="off"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand placeholder:text-[#8989a1] border-formInput"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="font-normal text-base">
          아이디
        </Label>
        <Input
          type="text"
          id="email"
          placeholder="이메일을 입력하세요."
          autoComplete="off"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand placeholder:text-[#8989a1] border-formInput"
        />
      </div>
      <SelectorGroup />
      <SelectorRole />
    </section>
  );
}
