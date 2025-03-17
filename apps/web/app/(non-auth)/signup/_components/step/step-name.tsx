"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";

import { useFormContext } from "react-hook-form";
import { validateForm } from "../../../../../utils/validate-form";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

export default function StepName({ onNext, onPrev }: StepControllerProps) {
  const { control } = useFormContext();

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityHeader className="mb-7">
        <h1 className="text-2xl font-black">
          <p>입금자명 확인을 위해</p>
          <p>성함을 입력해 주세요.</p>
        </h1>
        <h2 className="text-desc">예금주명과 동일하게 작성해 주세요.</h2>
      </ActivityHeader>
      <ActivityContent>
        <section className="grow">
          <FormField
            control={control}
            name="userName"
            render={({ field }) => (
              <div className="flex h-full flex-col justify-between">
                <FormItem className="container px-6">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="예금주명"
                      className="border-formInput border placeholder:font-light placeholder:text-[#8989A1]"
                      autoComplete="off"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <ActivityFooter>
                  <StepNextController
                    disabled={
                      !field.value ||
                      !validateForm({
                        type: "name",
                        value: field.value,
                      })
                    }
                    onNext={() => onNext(field.value)}
                  />
                </ActivityFooter>
              </div>
            )}
          />
        </section>
      </ActivityContent>
    </Activity>
  );
}
