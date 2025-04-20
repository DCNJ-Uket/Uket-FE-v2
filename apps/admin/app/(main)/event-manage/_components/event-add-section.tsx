/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { useFunnel } from "@use-funnel/browser";
import StepAccountInfo from "./step/step-account-info";
import StepBasicInfo from "./step/step-basic-info";
import StepEventInfo from "./step/step-event-info";

export default function EventAddSection() {
  const funnel = useFunnel<{
    기본정보: {};
    행사정보: {};
    입금정보: {};
  }>({
    id: "event-add",
    initial: {
      step: "기본정보",
      context: {},
    },
  });

  return (
    <section className="w-full h-3/4 rounded-lg flex ">
      <funnel.Render
        기본정보={({ history }) => (
          <StepBasicInfo onNext={() => history.push("행사정보")} />
        )}
        행사정보={({ history }) => (
          <StepEventInfo
            onPrev={() => history.back()}
            onNext={() => history.push("입금정보")}
          />
        )}
        입금정보={({ history }) => (
          <StepAccountInfo onPrev={() => history.back()} onNext={() => {}} />
        )}
      />
    </section>
  );
}
