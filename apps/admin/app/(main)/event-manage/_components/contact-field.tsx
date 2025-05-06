/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Control, FieldValues, useWatch } from "react-hook-form";

type ContactType = {
  type: "INSTAGRAM" | "KAKAO" | "CONTACT" | "ETC";
  value: "인스타그램" | "카카오톡" | "연락처" | "기타";
};

const contact: ContactType[] = [
  { type: "INSTAGRAM", value: "인스타그램" },
  { type: "KAKAO", value: "카카오톡" },
  { type: "CONTACT", value: "연락처" },
  { type: "ETC", value: "기타" },
];

interface ContactFieldProps {
  control: Control<FieldValues, any>;
}

export default function ContactField({ control }: ContactFieldProps) {
  const contactType = useWatch({
    control,
    name: "contact.type",
  });
  const isTypeSocialMedia =
    contactType === "INSTAGRAM" || contactType === "KAKAO";

  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={control}
        name="contact.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#8989A1] text-base font-normal">
              문의처 {"(sns, 담당자 연락처)"}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="[&>span]:grow bg-brand text-white rounded-lg font-medium text-base">
                  <SelectValue placeholder="문의처" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {contact.map(({ type, value }) => (
                  <SelectItem key={type} value={type}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="contact.content"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#8989A1] text-base font-normal">
              표시 이름
            </FormLabel>
            <FormControl>
              <Input
                className="disabled:bg-[#f2f2f2] border-formInput"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {isTypeSocialMedia && (
        <FormField
          control={control}
          name="contact.link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#8989A1] text-base font-normal">
                링크
              </FormLabel>
              <FormControl>
                <Input
                  className="disabled:bg-[#f2f2f2] border-formInput"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
