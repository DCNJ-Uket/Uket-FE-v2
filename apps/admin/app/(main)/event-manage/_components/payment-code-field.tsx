/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import Image from "next/image";
import { Control, FieldValues } from "react-hook-form";

interface PaymentCodeFieldProps {
  control: Control<FieldValues, any>;
}

export default function PaymentCodeField({ control }: PaymentCodeFieldProps) {
  return (
    <>
      <FormField
        control={control}
        name="paymentInfo.depositUrl"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-[#8989A1] text-base font-normal">
              송금 코드 링크
            </FormLabel>
            <FormControl>
              <Input
                className="disabled:bg-[#f2f2f2] border-formInput"
                placeholder="https://qr.kakaopay.com/..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="rounded-lg bg-[#F2F2F2] p-4 space-y-3">
        <h1 className="font-medium text-sm mb-2">송금 코드 링크 만들기</h1>
        <div className="text-[#8989A1] text-xs pb-5">
          <ol className="list-decimal ml-4 space-y-1">
            <li>{"[카카오톡] - [더보기] - [코드 스캔] 버튼을 누르세요."}</li>
            <li>{"[송금코드] 버튼을 누르면 송금 코드 링크가 생성됩니다."}</li>
            <li>
              {
                "화면 내 링크 아이콘을 눌러 링크를 복사해 위 입력창에 붙여 넣으세요."
              }
            </li>
          </ol>
        </div>
        <div className="relative flex gap-2 overflow-hidden">
          <div className="w-60">
            <Image
              src={"/account-link-1.png"}
              alt="송금 링크 만들기-1"
              width={500}
              height={500}
              className="w-full h-fit object-contain"
            />
          </div>
          <div className="w-60">
            <Image
              src={"/account-link-2.png"}
              alt="송금 링크 만들기-1"
              width={500}
              height={500}
              className="w-full h-fit object-contain"
            />
          </div>
          <div className="w-60">
            <Image
              src={"/account-link-3.png"}
              alt="송금 링크 만들기-1"
              width={500}
              height={500}
              className="w-full h-fit object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
