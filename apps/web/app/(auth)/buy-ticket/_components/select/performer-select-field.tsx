import { Input } from "@ui/components/ui/input";
import { useEffect, useState } from "react";
import PerformerSheet from "./performer-sheet";

interface PerformerSelectFieldProps {
  performer: string;
  setPerformer: (name: string) => void;
  performerList: string[];
}

export default function PerformerSelectField({
  performer,
  setPerformer,
  performerList,
}: PerformerSelectFieldProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleResize = () => {
    if (window.visualViewport) {
      const viewportHeight = window.visualViewport.height || window.innerHeight;
      const keyboardHeight = window.innerHeight - viewportHeight;

      if (keyboardHeight > 0) {
        window.scrollTo(0, keyboardHeight);
      }
    }
  };

  useEffect(() => {
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <h3 className="font-medium">초대 지인</h3>
        <p className="text-xs font-normal text-[#8989A1]">*선택</p>
      </div>
      <div className="flex grow flex-col gap-2">
        <Input
          isIcon
          value={performer}
          placeholder="초대한 지인 찾기"
          onClick={() => setIsSheetOpen(true)}
          readOnly
          className="text-slate-500 font-light py-2.5 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <PerformerSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          performers={performerList}
          onSelectPerformer={name => {
            setPerformer(name);
            setIsSheetOpen(false);
          }}
        />
      </div>
    </div>
  );
}
