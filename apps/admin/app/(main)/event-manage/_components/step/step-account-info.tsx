"use client";

import { Button } from "@ui/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import Image from "next/image";

interface StepAccountInfoProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function StepAccountInfo({
  onPrev,
  onNext,
}: StepAccountInfoProps) {
  return (
    <main className="flex w-full flex-col gap-2">
      <section className="flex w-full bg-white shadow-sm p-11 grow rounded-lg flex-col gap-6">
        <header>
          <h3 className="text-[#17171C] font-bold text-xl">
            4. 입금 정보를 입력해 주세요.
          </h3>
        </header>
        <section className="flex justify-between gap-16">
          <aside className="basis-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                티켓 가격
              </Label>
              <div className="flex items-center gap-4">
                <RadioGroup defaultValue="무료" className="flex">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="무료" id={`무료`} />
                    <Label htmlFor={`무료`}>무료</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="유료" id={`유료`} />
                    <Label htmlFor={`유료`}>유료</Label>
                  </div>
                </RadioGroup>
                <div className="relative grow">
                  <Input
                    className="disabled:bg-[#f2f2f2] border-formInput peer pe-12"
                    defaultValue={10000}
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                    원
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                입금 계좌
              </Label>
              <div className="flex border rounded-lg border-formInput overflow-hidden">
                <Select>
                  <SelectTrigger className="w-40 border-r border-formInput">
                    <SelectValue placeholder="은행 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="카카오뱅크">카카오뱅크</SelectItem>
                      <SelectItem value="토스">토스</SelectItem>
                      <SelectItem value="신한은행">신한은행</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="입금 계좌정보 입력"/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                예금주
              </Label>
              <Input className="disabled:bg-[#f2f2f2] border-formInput" placeholder="예금주 입력"/>
            </div>
          </aside>
          <aside className="flex flex-col gap-4 basis-1/2">
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                송금 코드 링크
              </Label>
              <Input className="disabled:bg-[#f2f2f2] border-formInput" placeholder="https://qr.kakaopay.com/..." />
            </div>
            <div className="rounded-lg bg-[#F2F2F2] p-4">
              <h1 className="font-medium text-sm mb-2">
                송금 코드 링크 만들기
              </h1>
              <div className="text-[#8989A1] text-xs  mb-4">
                <ol className="list-decimal ml-4 space-y-1">
                  <li>
                    {"[카카오톡] - [더보기] - [코드 스캔] 버튼을 누르세요."}
                  </li>
                  <li>
                    {"[송금코드] 버튼을 누르면 송금 코드 링크가 생성됩니다."}
                  </li>
                  <li>
                    {
                      "화면 내 링크 아이콘을 눌러 링크를 복사해 위 입력창에 붙여 넣으세요."
                    }
                  </li>
                </ol>
              </div>
              <div className="relative flex gap-4">
                <Image
                  src={"/account-link-1.png"}
                  alt="송금 링크 만들기-1"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
                <Image
                  src={"/account-link-2.png"}
                  alt="송금 링크 만들기-1"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
                <Image
                  src={"/account-link-3.png"}
                  alt="송금 링크 만들기-1"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>
          </aside>
        </section>
      </section>
      <footer className="flex justify-between">
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onPrev}
        >
          <ArrowLeftIcon size={16} strokeWidth={3} />
          이전으로
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onNext}
        >
          제출하기
          <ArrowRightIcon size={16} strokeWidth={3} />
        </Button>
      </footer>
    </main>
  );
}
