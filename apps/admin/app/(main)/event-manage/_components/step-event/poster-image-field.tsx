/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import Image from "next/image";
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import StepTooltip from "../step/step-tooltip";

interface PosterImageFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
  onGetValue: UseFormGetValues<FieldValues>;
  labelTitle: string;
}

export default function PosterImageField({
  control,
  onSetValue,
  onGetValue,
  labelTitle,
}: PosterImageFieldProps) {
  const handleFileChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    onSetValue("uketEventImageId.file", file);
    onSetValue("uketEventImageId.previewImage", previewUrl);
  };
  const previewImageSrc = onGetValue(`uketEventImageId.previewImage`);

  return (
    <FormField
      control={control}
      name="uketEventImageId.file"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            htmlFor="poster-upload"
            className="text-[#8989A1] text-base font-normal flex flex-col gap-4"
          >
            <div className="flex items-center gap-1">
              <span>{labelTitle}</span>
              <StepTooltip
                content={
                  <div className="flex flex-col">
                    <p>권장 사이즈: 335x467 px</p>
                    <p>최대 파일 크기: 5MB</p>
                  </div>
                }
              />
            </div>
            <div className="h-32 rounded-lg flex items-center justify-between bg-formInput text-sm">
              {field.value ? (
                <div className="w-full h-full flex items-center justify-between text-sm">
                  <div className="relative h-full w-full basis-1/2 rounded-s-lg overflow-hidden">
                    {previewImageSrc && (
                      <Image
                        src={previewImageSrc}
                        alt="Poster"
                        width={100}
                        height={100}
                        className="w-full h-full aspect-square object-cover"
                      />
                    )}
                  </div>
                  <div className="rounded-e-lg text-center items-center justify-center border border-formInput bg-white h-full basis-1/2 flex flex-col text-black gap-2">
                    <div className="truncate w-24">{field.value?.name}</div>
                    <div className="text-error underline underline-offset-4 font-medium">
                      수정하기
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="underline text-white basis-1/2 flex items-center justify-center font-bold underline-offset-4">
                    파일 선택
                  </div>
                  <div className="rounded-lg text-center flex flex-col items-center justify-center border border-formInput bg-white text-formInput h-full basis-1/2">
                    <p>업로드된</p>
                    <p>이미지가 </p>
                    <p>없습니다.</p>
                  </div>
                </>
              )}
            </div>
          </FormLabel>
          <FormControl>
            <Input
              id="poster-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              {...field}
              value={""}
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 1024 * 1024 * 5) {
                  control.setError("uketEventImageId.file", {
                    type: "validate",
                    message: "이미지 파일은 5MB 이하만 가능합니다.",
                  });
                  return;
                }
                handleFileChange(file);
                field.onChange(file || null);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
