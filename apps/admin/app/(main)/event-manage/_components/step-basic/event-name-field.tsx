/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { useQueryAdminInfo } from "@uket/api/queries/admin-user";
import { useEffect } from "react";
import { Control, FieldValues, UseFormSetValue } from "react-hook-form";

interface EventNameFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
  labelTitle: string;
}

export default function EventNameField({
  control,
  onSetValue,
  labelTitle,
}: EventNameFieldProps) {
  const { data } = useQueryAdminInfo();

  useEffect(() => {
    if (!data) return;
    onSetValue("organization", data?.organization);
    onSetValue("organizationId", data?.organizationId);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full items-center gap-2">
        <Label
          htmlFor="organization"
          className="text-[#8989A1] text-base font-normal"
        >
          주최명
        </Label>
        <Input
          type="text"
          id="organization"
          disabled
          readOnly
          className="disabled:bg-[#f2f2f2] border-formInput"
          defaultValue={data?.organization || ""}
        />
      </div>
      <FormField
        control={control}
        name="eventName"
        render={({ field }) => (
          <FormItem className="grid w-full items-center gap-2">
            <FormLabel className="text-[#8989A1] text-base font-normal">
              {labelTitle}
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                className="border-formInput"
                placeholder={labelTitle}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
