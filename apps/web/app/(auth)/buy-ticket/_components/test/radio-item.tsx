import { FormLabel } from "@ui/components/ui/form";
import { cn } from "@ui/lib/utils";

interface RadioItemProps {
  label: string;
  disabled?: boolean;
  isChecked?: boolean;
  isOnlyOne?: boolean;
}

export default function RadioItem({
  label,
  disabled,
  isChecked,
  isOnlyOne,
}: RadioItemProps) {
  return (
    <FormLabel
      className={cn(
        "font-normal px-4 py-2 rounded-lg text-center cursor-pointer relative",
        {
          "border-[1.5px] border-brand text-brand font-bold":
            isChecked && !disabled && !isOnlyOne,
          "border-[0.5px] border-[#8989A1] text-[#8989A1] font-normal":
            !isChecked && !disabled && !isOnlyOne,
          "border-[0.5px] border-[#8989A1] text-[#8989A1] font-normal bg-[#F2F2F2]":
            isOnlyOne && !disabled,
          "bg-[#D9D9D9] text-white cursor-not-allowed pointer-events-none":
            disabled,
        },
      )}
    >
      {label}
      {disabled && (
        <div className="absolute left-1/2 top-1/2 w-full h-[0.75px] bg-white -rotate-45 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      )}
    </FormLabel>
  );
}
