import { CircleX, Search } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { useMemo, useState } from "react";

export default function PerformerSheet({
  isOpen,
  onClose,
  performerList,
  onSelectItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  performerList: string[];
  onSelectItem: (friend: string) => void;
}) {
  const [searchText, setSearchText] = useState("");

  const filteredPerformerList = useMemo(() => {
    return performerList.filter(name =>
      searchText.trim()
        ? name.toLowerCase().includes(searchText.toLowerCase())
        : true,
    );
  }, [performerList, searchText]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side={"bottom"}
        className="mx-auto max-w-[500px] rounded-t-2xl pt-5"
      >
        <SheetHeader className="w-full">
          <SheetTitle hidden />
          <SheetDescription hidden />
          <p className="px-8 text-start text-xs text-[#8989A1]">지인 이름</p>
          <div className="border-brand flex w-full items-center justify-between border-b-[1px] px-1 pb-1">
            <Search className="h-5 w-5 text-[#8989A1]" />
            <Input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="지인 이름을 입력하세요."
              className="border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <CircleX
              className="h-5 w-5 text-[#8989A1]"
              onClick={() => {
                setSearchText("");
                onClose();
              }}
            />
          </div>
        </SheetHeader>
        <section className="h-40 overflow-y-auto py-4">
          {filteredPerformerList.length > 0 ? (
            <ul>
              {filteredPerformerList.map((performer, index) => (
                <li
                  key={index}
                  className="mb-1 rounded-lg px-8 py-2 text-sm hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => onSelectItem(performer)}
                >
                  {performer}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-8 text-sm text-gray-500">검색 결과가 없습니다.</p>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}
