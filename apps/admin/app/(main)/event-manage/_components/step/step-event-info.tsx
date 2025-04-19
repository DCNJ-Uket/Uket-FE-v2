"use client";

import { Button } from "@ui/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import EventEditor from "../editor/event-editor";
import ImageUploader from "../image-uploader";

interface StepEventInfoProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function StepEventInfo({ onPrev, onNext }: StepEventInfoProps) {
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
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                공연 상세 정보
              </Label>
              <EventEditor />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#8989A1] text-base font-normal">
                주의 사항
              </Label>
              <EventEditor />
            </div>
          </aside>
          <aside className="flex basis-1/2 gap-12">
            <aside className="flex flex-col gap-6 basis-1/2">
              <div className="flex flex-col gap-2">
                <Label className="text-[#8989A1] text-base font-normal">
                  공연 썸네일 이미지
                </Label>
                <ImageUploader maxFiles={1} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[#8989A1] text-base font-normal">
                  메인 배너 이미지
                </Label>
                <ImageUploader maxFiles={2} />
              </div>
            </aside>
            <aside className="flex flex-col gap-6 basis-1/2">
              <div className="flex flex-col gap-2">
                <Label className="text-[#8989A1] text-base font-normal">
                  공연 상세 이미지 {"(ex.포스터)"}
                </Label>
                <ImageUploader maxFiles={1} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[#8989A1] text-base font-normal">
                  문의처 {"(sns, 담당자 연락처)"}
                </Label>
                <div className="flex border rounded-lg border-formInput overflow-hidden">
                  <Select>
                    <SelectTrigger className="w-40 border-r border-formInput">
                      <SelectValue placeholder="문의처" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="인스타그램">인스타그램</SelectItem>
                        <SelectItem value="카카오톡">카카오톡</SelectItem>
                        <SelectItem value="연락처">연락처</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
              </div>
            </aside>
          </aside>
        </section>
      </section>
      <footer className="flex justify-between">
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onPrev}
        >
          <ArrowLeftIcon size={16} strokeWidth={3} />
          이전으로
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onNext}
        >
          다음으로
          <ArrowRightIcon size={16} strokeWidth={3} />
        </Button>
      </footer>
    </main>
  );
}
