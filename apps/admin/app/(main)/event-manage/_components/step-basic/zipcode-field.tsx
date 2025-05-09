/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { SearchIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { cn } from "@ui/lib/utils";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  Control,
  FieldValues,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface ZipcodeFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
}

const DAUM_POSTCODE_SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function ZipcodeField({
  control,
  onSetValue,
}: ZipcodeFieldProps) {
  const open = useDaumPostcodePopup(DAUM_POSTCODE_SCRIPT_URL);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onSetValue("location.base", fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const baseLocation = useWatch({
    control,
    name: "location.base",
  });

  return (
    <>
      <FormField
        control={control}
        name="location.base"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-[#8989A1] text-base font-normal">
              위치
            </FormLabel>
            <FormControl>
              <div className="flex items-center">
                {field.value ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="relative" onClick={handleClick}>
                      <Input
                        type="text"
                        className="border-formInput peer pe-9"
                        readOnly
                        {...field}
                      />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                        <SearchIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    className={cn(
                      "w-full border-input text-foreground border-none hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#c3c3c3] bg-[#d9d9d9]",
                      field.value && "rounded-s-none",
                    )}
                    onClick={handleClick}
                  >
                    우편 번호 찾기
                  </Button>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      {baseLocation && (
        <FormField
          control={control}
          name="location.detail"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <Input
                  type="text"
                  className="border-formInput peer pe-9"
                  placeholder="상세 주소 입력"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </>
  );
}
