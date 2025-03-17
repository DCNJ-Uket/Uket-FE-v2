/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Form } from "@uket/ui/components/ui/form";
import { clearToken } from "@uket/util/cookie-client";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  baseSchema,
  completeSchema,
  NameSchema,
  PhoneSchema,
  useSignupForm,
} from "../../../../hooks/use-signup-form";

const StepTerm = dynamic(() => import("./step/step-term"), {
  ssr: false,
});

const StepName = dynamic(() => import("./step/step-name"), {
  ssr: false,
});

const StepPhone = dynamic(() => import("./step/step-phone"), {
  ssr: false,
});

const StepComplete = dynamic(() => import("./step/step-complete"), {
  ssr: false,
});

export default function SignupSection() {
  const { form, onSubmit } = useSignupForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const funnel = useFunnel({
    id: "signup",
    steps: {
      Term: {
        parse: baseSchema.parse,
      },
      Name: {
        parse: NameSchema.parse,
      },
      Phone: {
        parse: PhoneSchema.parse,
      },
      Complete: {
        parse: completeSchema.parse,
      },
    },
    initial: {
      step: "Term",
      context: {},
    },
  });

  // 이전 단계를 스킵하는 비정상적인 플로우를 제한합니다. 초기 단계로 강제 이동합니다.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const signupStep = params.get("signup.step");

    if (signupStep) {
      funnel.history.replace("Term");
    }
  }, []);

  return (
    <Form {...form}>
      <funnel.Render
        Term={({ history }) => (
          <StepTerm
            onPrev={() => {
              router.replace("/login");
              clearToken("user", "access");
              clearToken("user", "refresh");
            }}
            onNext={() =>
              history.push("Name", {
                userType: "no_univ",
              })
            }
          />
        )}
        Name={({ history }) => (
          <StepName
            onPrev={() => history.back()}
            onNext={(name: string) => {
              history.push("Phone", {
                userName: name,
              });
            }}
          />
        )}
        Phone={({ history }) => (
          <StepPhone
            form={form}
            onSubmit={onSubmit}
            onPrev={() => history.back()}
            onNext={(phone: string) => {
              history.replace("Complete", {
                userPhone: phone,
              });
            }}
          />
        )}
        Complete={() => <StepComplete />}
      />
    </Form>
  );
}
