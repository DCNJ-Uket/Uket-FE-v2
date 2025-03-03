'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UseModalsProps {
  setState?: boolean; //현재 modal의 상태
  handleState?: boolean; //관리할 다른 변수의 상태
  goBack?: boolean; // 전 페이지로 이동하는 것을 관리하는 변수
}

export const useModals = (props: UseModalsProps) => {
  const { setState, handleState, goBack } = props;
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (setState === true) {
      setIsOpen(true);
    }
  }, [setState]);

  const [handleOtherState, setHandleOtherState] = useState(
    handleState !== undefined ? handleState : undefined,
  );

  const openModal = () => {
    setIsOpen(true);
    setHandleOtherState(handleState);
  };

  const closeModal = () => {
    setIsOpen(false);
    setHandleOtherState(handleState);
    if (goBack !== undefined) {
      router.back();
    }
  };

  const confirmModal = () => {
    setIsOpen(false);
    setHandleOtherState(!handleOtherState);
  };

  return { isOpen, openModal, confirmModal, closeModal, handleOtherState };
};
