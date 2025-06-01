"use client";

import { LoaderCircleIcon } from "@ui/components/ui/icon";
import { useMutationAgreeTerm } from "@uket/api/mutations/use-mutation-agree-term";
import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@uket/ui/components/ui/activity";

import { Suspense } from "react";
import { useTermAgreement } from "../../../../../hooks/use-term-agreement";
import TermSection from "../term-section";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

export default function StepTerm({ onNext, onPrev }: StepControllerProps) {
  const { mutateAsync: agreeTerm } = useMutationAgreeTerm();
  const { agreements, handleToggleAgreement, handleAgreementAll, initAgreement } =
    useTermAgreement();

  const handleNextStep = () => {
    agreeTerm(agreements);
    onNext();
  };

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityHeader className="mb-6">
        <h1 className="text-2xl font-black">
          <p>티켓팅 경험 개선을 위해</p>
          <p>아래 약관의 동의가 필요합니다.</p>
        </h1>
      </ActivityHeader>
      <ActivityContent className="items-center">
        <Suspense
          fallback={
            <LoaderCircleIcon
              className="flex items-center justify-center animate-spin text-brand"
              size={28}
            />
          }
        >
          <TermSection
            onInit={initAgreement}
            onToggle={handleToggleAgreement}
            onToggleAll={handleAgreementAll}
            agreements={agreements}
          />
        </Suspense>
      </ActivityContent>
      <ActivityFooter>
        <StepNextController
          onNext={handleNextStep}
          disabled={agreements.some(
            agreement => agreement.type === "MANDATORY" && !agreement.isAgreed,
          )}
        />
      </ActivityFooter>
    </Activity>
  );
}
