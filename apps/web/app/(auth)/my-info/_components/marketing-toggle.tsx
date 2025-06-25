"use client";

import { useMutationAgreeTerm } from "@uket/api/mutations/use-mutation-agree-term";
import { useQueryMarketingTerm } from "@uket/api/queries/term";
import { Switch } from "@uket/ui/components/ui/switch";
import { useEffect, useState } from "react";

export default function MarketingToggle() {
  const { data: marketingTerm } = useQueryMarketingTerm();
  const [checked, setChecked] = useState(false);
  const { mutate } = useMutationAgreeTerm();

  useEffect(() => {
    if (marketingTerm) {
      setChecked(marketingTerm.isAgreed);
    }
  }, [marketingTerm]);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);

    if (marketingTerm) {
      mutate([
        {
          type: "OPTIONAL",
          termId: marketingTerm.termsId,
          isAgreed: newValue,
          documentId: marketingTerm.documentId,
        },
      ]);
    }
  };

  return (
    <main className="flex w-full flex-col gap-2 bg-white px-6 py-4">
      <div className="flex h-8 items-center justify-between gap-3">
        <h1 className="text-lg font-bold text-[#17171B]">마케팅 수신 동의</h1>
        <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
          <Switch
            checked={checked}
            onCheckedChange={handleToggle}
            className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-full [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-full [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
          />
          <span className="invisible pointer-events-none relative ms-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
            <span className="text-[10px] font-medium uppercase">Off</span>
          </span>
          <span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
            <span className="text-[10px] font-medium uppercase">On</span>
          </span>
        </div>
      </div>
    </main>
  );
}
