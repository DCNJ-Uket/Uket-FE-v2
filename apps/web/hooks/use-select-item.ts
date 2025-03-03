"use client";

import { useState } from "react";

export const useSelectItem = <T>() => {
  const [selectedItem, setSelectItem] = useState<T | null>(null);

  const handleSelectItem = (item: T) => {
    setSelectItem(item);
  };

  return {
    selectedItem,
    handleSelectItem,
  };
};
