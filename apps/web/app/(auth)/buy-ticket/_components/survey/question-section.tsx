import { Input } from "@ui/components/ui/input";
import { OptionType } from "@uket/api/types/survey";
import { useEffect, useState } from "react";
import PerformerSheet from "./performer-sheet";

interface QuestionSectionProps {
  isNecessary: boolean;
  performer: string;
  setPerformer: (performer: string) => void;
  question: string;
  performerList: OptionType[];
}

export default function QuestionSection({
  isNecessary,
  performer,
  setPerformer,
  question,
  performerList,
}: QuestionSectionProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSelectPerformer = (performer: string) => {
    setPerformer(performer);
    setIsSheetOpen(false);
  };

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

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex grow flex-col justify-start gap-4 px-[22px]">
      <section className="flex flex-col gap-2 rounded-lg bg-white px-5 py-5 pt-4 shadow-lg">
        <h1 className="text-[15px] font-bold">
          {isNecessary ? "(필수)" : "(선택)"} {question}
        </h1>
        <Input
          isLeftIcon
          value={performer}
          placeholder="지인검색"
          onClick={() => setIsSheetOpen(true)}
          readOnly
        />
      </section>
      <PerformerSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        performers={performerList.map(option => option.value)}
        onSelectPerformer={handleSelectPerformer}
      />
    </div>
  );
}
