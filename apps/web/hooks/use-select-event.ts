'use client';

import { useRouter, useSearchParams } from "next/navigation";

export const useSelectEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const selectedEventId = searchParams.get('id') ? Number(searchParams.get('id')) : null;
  const selectedEventName = searchParams.get('select-event');

  const handleSelectEvent = (id: number, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('select-event', name);
    params.set('id', String(id));
    router.push(`/home?${params.toString()}`);
  };

  const handleNavigate = () => {
    if (!selectedEventId) return;
    const params = new URLSearchParams();
    params.set('select-event', selectedEventName || '');
    params.set('id', String(selectedEventId));
    router.push(`/home?${params.toString()}`);
  };

  return {
    selectedEventId,
    handleSelectEvent,
    handleNavigate,
  };
};
