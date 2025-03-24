import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";

export default function SelectorRole() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-normal text-base">권한</Label>
      <Select>
        <SelectTrigger className="border border-formInput rounded-md text-[#8989a1]">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent className="border border-formInput">
          <SelectGroup>
            <SelectLabel>선택</SelectLabel>
            <SelectItem value="관리자">관리자</SelectItem>
            <SelectItem value="멤버">멤버</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
