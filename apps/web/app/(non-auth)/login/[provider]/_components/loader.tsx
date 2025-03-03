"use client";

import { LoaderCircleIcon } from "@ui/components/ui/icon";
import { useMutationLogin } from "@uket/api/mutations/use-mutation-login";
import { Provider } from "@uket/api/types/auth";
import { useEffect } from "react";

interface LoaderProps {
  code: string | undefined;
  provider: Provider;
}

export default function Loader({ code, provider }: LoaderProps) {
  const { mutate } = useMutationLogin();

  useEffect(() => {
    if (!code) return;
    mutate({ code, provider });
  }, [code, provider, mutate]);

  return (
    <main className="flex justify-center items-center h-full">
      <LoaderCircleIcon className="flex items-center justify-center animate-spin" />
    </main>
  );
}
