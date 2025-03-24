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

// TODO: 소속 목록 API 연동
export default function SelectorGroup() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-normal text-base">소속</Label>
      <Select>
        <SelectTrigger className="border border-formInput rounded-md text-[#8989a1]">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent className="border border-formInput">
          <SelectGroup>
            <SelectLabel>선택</SelectLabel>
            <SelectItem value="light">소속1</SelectItem>
            <SelectItem value="dark">소속2</SelectItem>
            <SelectItem value="system">소속3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
