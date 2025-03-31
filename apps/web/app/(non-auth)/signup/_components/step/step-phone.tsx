import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";
import { Input } from "@ui/components/ui/input";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@ui/components/ui/form";
import { validateForm } from "@uket/util/validate-form";
import { useFormContext } from "react-hook-form";
import { BaseSchema, FormType } from "../../../../../hooks/use-signup-form";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepPhoneProps extends StepControllerProps {
  form: FormType;
  onSubmit: (data: BaseSchema) => Promise<void>;
}

export default function StepPhone({
  form,
  onSubmit,
  onNext,
  onPrev,
}: StepPhoneProps) {
  const { control } = useFormContext();

  const handleNextStep = (phone: string) => {
    form.handleSubmit(onSubmit)();
    onNext(phone);
    return true;
  };

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityHeader className="mb-7">
        <h1 className="text-2xl font-black">
          <p>전화번호를 입력해 주세요.</p>
        </h1>
        <h2 className="text-desc">
          <p>하이픈(-) 없이 숫자로만 입력해 주세요.</p>
        </h2>
      </ActivityHeader>
      <ActivityContent>
        <section className="grow">
          <form
            className="flex h-full flex-col justify-between"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <FormField
              control={control}
              name="userPhone"
              render={({ field }) => (
                <div className="flex h-full flex-col justify-between">
                  <FormItem className="container">
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="e.g. 01012345678"
                        className="border-formInput border placeholder:font-light placeholder:text-[#8989A1]"
                        autoComplete="off"
                        value={field.value || ""}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <ActivityFooter>
                    <StepNextController
                      disabled={
                        !validateForm({
                          type: "phone",
                          value: field.value,
                        })
                      }
                      onNext={() => handleNextStep(field.value)}
                      isLastStep
                    />
                  </ActivityFooter>
                </div>
              )}
            />
          </form>
        </section>
      </ActivityContent>
    </Activity>
  );
}
