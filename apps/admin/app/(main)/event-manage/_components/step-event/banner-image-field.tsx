/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { CircleX, PlusCircleIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import Image from "next/image";
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface BannerImageProps {
  control: Control<FieldValues, any>;
  onRegister: UseFormRegister<FieldValues>;
  onSetValue: UseFormSetValue<FieldValues>;
  onGetValue: UseFormGetValues<FieldValues>;
}

function RemoveImageButton({
  index,
  remove,
  field,
}: {
  index: number;
  remove: (index: number) => void;
  field: any;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full size-6 hover:bg-inherit"
      onClick={() => {
        field.onChange(null);
        remove(index);
      }}
    >
      <CircleX stroke="white" fill="#d9d9d9" />
    </Button>
  );
}

export default function BannerImageField({
  control,
  onRegister,
  onSetValue,
  onGetValue,
}: BannerImageProps) {
  const { fields, append, remove } = useFieldArray({
    name: "banners",
    control,
  });
  
  const handleFileChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        onSetValue(`banners.${index}.file`, file);
        onSetValue(`banners.${index}.previewImage`, previewUrl);
      }
    };

  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="text-[#8989A1] text-base font-normal">
        메인 배너 이미지
      </FormLabel>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`banners.${index}.file`}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={`banners.${index}.file`}>
                <div className="h-32 rounded-lg flex items-center justify-between bg-formInput text-sm">
                  {field.value ? (
                    <div className="w-full h-full flex items-center justify-between text-sm">
                      <div className="basis-1/2 overflow-hidden rounded-s-lg h-full w-full relative">
                        <div className="relative ">
                          <Image
                            src={onGetValue(`banners.${index}.previewImage`)}
                            alt="Thumbnail"
                            width={100}
                            height={100}
                            className="w-full h-full aspect-square object-cover"
                          />
                        </div>
                        <div className="text-error underline underline-offset-4 font-medium absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-75 cursor-pointer">
                          이미지 수정
                        </div>
                      </div>
                      <div className="rounded-e-lg text-center items-center justify-center border border-formInput bg-white h-full basis-1/2 flex flex-col text-black relative">
                        <div className="w-full flex justify-end pt-1 pr-1 absolute top-0 right-0">
                          {index > 0 && (
                            <RemoveImageButton
                              index={index}
                              remove={remove}
                              field={field}
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center px-2">
                          <FormLabel className="text-[#8989A1] text-sm font-normal">
                            링크 입력
                          </FormLabel>
                          <Input
                            type="url"
                            {...onRegister(`banners.${index}.link`)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="underline text-white basis-1/2 flex items-center justify-center font-bold underline-offset-4">
                        파일 선택
                      </div>
                      <div className="rounded-lg text-center flex flex-col items-center justify-center border border-formInput bg-white text-formInput h-full basis-1/2 relative">
                        <div className="w-full flex justify-end pt-1 pr-1 absolute top-0 right-0">
                          {index > 0 && (
                            <RemoveImageButton
                              index={index}
                              remove={remove}
                              field={field}
                            />
                          )}
                        </div>
                        <div>
                          <p>업로드된</p>
                          <p>이미지가 </p>
                          <p>없습니다.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  id={`banners.${index}.file`}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  {...field}
                  value={""}
                  onChange={e => {
                    handleFileChange(index)(e);
                    field.onChange(e.target.files?.[0] || null);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ))}
      <div className="flex justify-center">
        <Button
          size={"icon"}
          variant="ghost"
          className="rounded-full hover:bg-[#f2f2f2]"
          onClick={() =>
            append({
              file: undefined,
              imageId: undefined,
              link: "",
            })
          }
          disabled={fields.length >= 2}
        >
          <PlusCircleIcon className="text-[#d9d9d9]" />
        </Button>
      </div>
    </div>
  );
}
