"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useSelectEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedEventId = searchParams.get("id")
    ? Number(searchParams.get("id"))
    : null;
  const selectedEventName = searchParams.get("event");

  const handleSelectEvent = (id: number, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", name);
    params.set("id", String(id));
    router.push(`?${params.toString()}`);
  };

  const handleNavigate = () => {
    if (!selectedEventId || !selectedEventName) return;
    router.push(`/home/${selectedEventName}/${selectedEventId}`);
  };

  return {
    selectedEventId,
    handleSelectEvent,
    handleNavigate,
  };
};
