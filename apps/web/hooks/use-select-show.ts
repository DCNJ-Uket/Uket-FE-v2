"use client";

import { useState } from "react";

export const useSelectShow = () => {
  const [selectedShowDate, setSelectedShowDate] = useState("");
  const [selectedShowName, setSelectedShowName] = useState("");

  return {
    selectedShowDate,
    setSelectedShowDate,
    selectedShowName,
    setSelectedShowName,
  };
};
