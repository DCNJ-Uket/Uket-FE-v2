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
  type: "INSTAGRAM" | "KAKAO" | "전화번호" | "기타";
  value: "인스타그램" | "카카오톡" | "연락처" | "기타";
};

type ContactTypeKey = ContactType["type"];

type DisplayOption = {
  [key in ContactTypeKey]: {
    label: string;
    placeholder: string;
    linkPlaceholder?: string;
  };
};

const contact: ContactType[] = [
  { type: "INSTAGRAM", value: "인스타그램" },
  { type: "KAKAO", value: "카카오톡" },
  { type: "전화번호", value: "연락처" },
  { type: "기타", value: "기타" },
];

const displayOption: DisplayOption = {
  INSTAGRAM: {
    label: "프로필 이름",
    placeholder: "ex. @official.uket",
    linkPlaceholder: "https://instagram.com/...",
  },
  KAKAO: {
    label: "채널 이름",
    placeholder: "ex. UKET",
    linkPlaceholder: "https://pf.kakao.com/...",
  },
  전화번호: {
    label: "연락처",
    placeholder: "ex. 010-1234-5678",
  },
  기타: {
    label: "기타 문의 방법",
    placeholder: "이메일 주소 또는 다른 연락 방법 입력",
  },
};

interface ContactFieldProps {
  control: Control<FieldValues, any>;
}

export default function ContactField({ control }: ContactFieldProps) {
  const contactType: ContactTypeKey = useWatch({
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
              {displayOption[contactType].label}
            </FormLabel>
            <FormControl>
              <Input
                className="disabled:bg-[#f2f2f2] border-formInput"
                placeholder={displayOption[contactType].placeholder}
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
                  placeholder={
                    contactType === "INSTAGRAM"
                      ? displayOption[contactType].linkPlaceholder
                      : displayOption[contactType].linkPlaceholder
                  }
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
