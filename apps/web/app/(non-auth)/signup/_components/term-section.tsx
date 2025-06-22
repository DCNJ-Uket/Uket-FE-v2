/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronRightIcon } from "@ui/components/ui/icon";
import { useQueryTermList } from "@uket/api/queries/term";
import { Term, TermAgreedParams } from "@uket/api/types/term";
import { Checkbox } from "@uket/ui/components/ui/checkbox";
import Link from "next/link";
import { useEffect, useMemo } from "react";

interface TermSectionProps {
  onInit: (data: Term[]) => void;
  onToggle: ({ termId, isAgreed }: TermAgreedParams) => void;
  onToggleAll: (checked: boolean) => void;
  agreements: TermAgreedParams[];
}

export default function TermSection({
  onInit,
  onToggle,
  onToggleAll,
  agreements,
}: TermSectionProps) {
  const { data } = useQueryTermList();

  const getIsAgreed = useMemo(
    () => (termId: number) => {
      return (
        agreements.find(
          agreement => agreement.termId === termId && agreement.isAgreed,
        ) !== undefined
      );
    },
    [agreements],
  );

  useEffect(() => {
    onInit(data);
  }, [data]);

  return (
    <section className="grow px-4 w-full">
      <div className="flex items-center gap-4 py-3 border-b-[1px] border-formInput mb-2">
        <Checkbox
          className="text-xl"
          checked={
            agreements.length === data.length &&
            agreements.every(agreement => agreement.isAgreed)
          }
          onCheckedChange={checked => onToggleAll(checked as boolean)}
        />
        <div className="font-medium">전체 동의</div>
      </div>
      <div className="flex flex-col divide-y-[1px]">
        {data.map(term => (
          <div className="flex items-center gap-4 py-3" key={term.termsId}>
            <Checkbox
              className="text-xl"
              checked={getIsAgreed(term.termsId)}
              onCheckedChange={checked =>
                onToggle({
                  type: term.type,
                  termId: term.termsId,
                  isAgreed: checked as boolean,
                  documentId: term.documentId,
                })
              }
            />
            <Link
              href={term.link}
              target="_blank"
              className="flex w-full items-center justify-between text-sm"
            >
              <div className="font-medium">
                {term.type === "MANDATORY" ? "[필수]" : "[선택]"} {term.name}
              </div>
              {term.termsId !== 3 && (
                <ChevronRightIcon className="text-desc h-5 w-5" />
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
