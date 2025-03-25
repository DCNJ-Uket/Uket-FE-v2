"use client";

import { useState } from "react";
import { FormType } from "./use-buy-ticket-form";
import { useSelectItem } from "./use-select-item";

export const useReservationSelection = (form: FormType) => {
  const [selectedStartTime, setSelectedStartTme] = useState("");
  const [selectedEndTime, setSelectedEndTme] = useState("");

  const { selectedItem, handleSelectItem } = useSelectItem<number>();

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
