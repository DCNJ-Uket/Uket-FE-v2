'use client';

import { useState } from "react";
import { useSelectItem } from "./use-select-item";
import { FormType } from "./use-ticket-stack-form";

export const useReservationSelection = (form: FormType) => {
  const [selectedStartTime, setSelectedStartTme] = useState("");
  const [selectedEndTime, setSelectedEndTme] = useState("");

  const { selectedItem, handleSelectItem } = useSelectItem();

  const handleSelectReservation = (
    id: number,
    startTime: string,
    endTime: string,
  ) => {
    handleSelectItem(id);
    form.setValue("reservationId", id);
    setSelectedStartTme(startTime);
    setSelectedEndTme(endTime);
  };

  return {
    selectedItem,
    selectedStartTime,
    setSelectedStartTme,
    selectedEndTime,
    setSelectedEndTme,
    handleSelectReservation,
  };
};
