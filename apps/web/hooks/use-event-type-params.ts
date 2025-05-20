/* eslint-disable react-hooks/exhaustive-deps */
import { UketEventListRequestParams } from "@uket/api/queries/uket-event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useEventTypeParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventType = (searchParams.get("type") ||
    "ALL") as UketEventListRequestParams["type"];

  useEffect(() => {
    if (!eventType) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", "ALL");
    }
  }, []);

  const handleChangeParams = (type: UketEventListRequestParams["type"]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.push(`?${params.toString()}`);
  };

  return {
    eventType,
    handleChangeParams,
  };
};
