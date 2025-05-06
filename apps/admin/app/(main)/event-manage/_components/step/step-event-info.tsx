"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { FieldValues, useFormContext } from "react-hook-form";
import BannerImageField from "../step-event/banner-image-field";
import ContactField from "../step-event/contact-field";
import EventEditor from "../editor/event-editor";
import PosterImageField from "../step-event/poster-image-field";
import ThumbnailImageField from "../step-event/thumbnail-image-field";
import StepController from "./step-controller";

interface StepEventInfoProps {
  onPrev: () => void;
  onNext: (
    values: Pick<
      FieldValues,
      "details" | "contact" | "uketEventImageId" | "thumbnailImageId"
    > & {
      banners?: FieldValues["banners"];
    },
  ) => void;
}

export default function StepEventInfo({ onPrev, onNext }: StepEventInfoProps) {
  const { control, register, trigger, watch, setValue, getValues } =
    useFormContext();
  const allFieldValues = watch();

  const handleNext = async () => {
    const isValid = await trigger(
      [
        "details.information",
        "details.caution",
        "contact.type",
        "contact.content",
        "uketEventImageId.file",
        "thumbnailImageId.file",
        "banners.[0].file",
      ],
      {
        shouldFocus: true,
      },
    );

    if (!isValid) return;

    const selectedValues = {
      details: {
        information: allFieldValues.details.information,
        caution: allFieldValues.details.caution,
      },
      contact: {
        type: allFieldValues.contact.type,
        content: allFieldValues.contact.content,
        link: allFieldValues.contact.link,
      },
      uketEventImageId: allFieldValues.uketEventImageId,
      thumbnailImageId: allFieldValues.thumbnailImageId,
      banners: allFieldValues.banners,
    };

    onNext(selectedValues);
  };

  return (
    <main className="flex w-full flex-col gap-2">
      <section className="flex w-full bg-white shadow-sm p-11 grow rounded-lg flex-col gap-6">
        <header>
          <h3 className="text-[#17171C] font-bold text-xl">
            3. 공연 정보를 입력해 주세요.
          </h3>
        </header>
        <section className="flex gap-12">
          <aside className="flex flex-col gap-6 basis-1/2">
            <FormField
              control={control}
              name="details.information"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-[#8989A1] text-base font-normal">
                    공연 상세 정보
                  </FormLabel>
                  <FormControl>
                    <EventEditor field={field} id={field.name} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="details.caution"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-[#8989A1] text-base font-normal">
                    주의 사항
                  </FormLabel>
                  <FormControl>
                    <EventEditor field={field} id={field.name} />
                  </FormControl>
                </FormItem>
              )}
            />
          </aside>
          <aside className="flex basis-1/2 gap-12">
            <aside className="flex flex-col gap-6 basis-1/2">
              <ThumbnailImageField
                control={control}
                onSetValue={setValue}
                onGetValue={getValues}
              />
              <BannerImageField
                control={control}
                onRegister={register}
                onSetValue={setValue}
                onGetValue={getValues}
              />
            </aside>
            <aside className="flex flex-col gap-6 basis-1/2">
              <PosterImageField
                control={control}
                onSetValue={setValue}
                onGetValue={getValues}
              />
              <ContactField control={control} />
            </aside>
          </aside>
        </section>
      </section>
      <StepController onPrev={onPrev} onNext={handleNext} />
    </main>
  );
}
