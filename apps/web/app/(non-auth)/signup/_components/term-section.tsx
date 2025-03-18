import { ChevronRightIcon } from "@ui/components/ui/icon";
import { useQueryTermList } from "@uket/api/queries/term";
import { TermAgreedParams } from "@uket/api/types/term";
import { Checkbox } from "@uket/ui/components/ui/checkbox";
import Link from "next/link";

const TERM_NAME = ["개인 정보 제공 동의", "이용 약관 동의"];

interface TermSectionProps {
  onToggle: ({ termId, isAgreed }: TermAgreedParams) => void;
  agreements: TermAgreedParams[];
}

export default function TermSection({ onToggle, agreements }: TermSectionProps) {
  const { data } = useQueryTermList();

  const getIsAgreed = (termId: number) => {
    return agreements.find(agreement => agreement.termId === termId)?.isAgreed || false;
  };

  return (
    <section className="grow px-4 w-full">
      <div className="flex flex-col divide-y-[1px]">
        {data.map((term, index) => (
          <div className="flex items-center gap-4 py-3" key={term.termsId}>
            <Checkbox
              className="text-xl"
              checked={getIsAgreed(term.termsId)}
              onCheckedChange={checked =>
                onToggle({ termId: term.termsId, isAgreed: checked as boolean })
              }
            />
            <Link
              href={term.link}
              target="_blank"
              className="flex w-full items-center justify-between"
            >
              <div className="font-medium">
                {term.type === "MANDATORY" ? "[필수]" : "[선택]"}{" "}
                {TERM_NAME[index]}
              </div>
              <ChevronRightIcon className="text-desc h-5 w-5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
