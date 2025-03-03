"use client";

import { getToken } from "@uket/util/cookie-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RedirectAndModalPath {
  path?: string;
  onCustomClick?: () => void;
}

export const useControlRedirect = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpenModalOrRedirect = ({
    path,
    onCustomClick,
  }: RedirectAndModalPath) => {
    const accessToken = getToken("user", "access");
    const refreshToken = getToken("user", "refresh");

    const isAuthenticated = !!accessToken && !!refreshToken;

    if (!isAuthenticated) {
      setOpen(true);
    } else {
      setOpen(false);
      if (path) router.push(path);
      if (onCustomClick) onCustomClick();
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRedirectToLogin = () => {
    handleCloseModal();
    router.push("/login");
  };

  return {
    isModalOpen: open,
    handleOpenModalOrRedirect,
    handleCloseModal,
    handleRedirectToLogin,
  };
};
