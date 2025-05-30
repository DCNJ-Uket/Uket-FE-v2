/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@ui/components/ui/textarea";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useTextarea } from "../../../../../hooks/use-textarea";

interface BulletListTextareaProps {
  field: ControllerRenderProps<FieldValues, any>;
  id: string;
}
export default function BulletListTextarea({
  field,
  id,
}: BulletListTextareaProps) {
  const { value, handleChange, handleKeyDown, handlePaste, textareaRef } =
    useTextarea(field);

  return (
    <div className="relative">
      <div className="flex absolute right-2 bottom-0 z-10 mb-2 gap-2">
        <div
          className={
            "rounded-lg px-2 py-1 text-sm text-muted-foreground text-[#CCCCCC]"
          }
        >
          {value.length}/1,000
        </div>
      </div>
      <div className="space-y-4">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="w-full h-64 p-6 rounded-lg focus-visible:ring-0 resize-none border-formInput"
          placeholder="주의 사항을 입력해 주세요."
        />
      </div>
    </div>
  );
}
