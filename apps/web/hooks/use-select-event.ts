'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSelectEvent = () => {
  const router = useRouter();
  const [selectedEventId, setSelectedUnivId] = useState<number | null>(null);
  const [selectedEventName, setSelectedUnivIdName] = useState<string | null>(
    null,
  );

  const handleSelectEvent = (id: number, name: string) => {
    setSelectedUnivId(id);
    setSelectedUnivIdName(name);
  };

  const handleNavigate = () => {
    if (!selectedEventId) return;
    router.push(`/home?select-event=${selectedEventName}&id=${selectedEventId}`);
  };

  return {
    selectedEventId,
    handleSelectEvent,
    handleNavigate,
  };
};
