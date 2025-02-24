"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@ui/components/ui/toast";
import { useToast } from "@ui/components/ui/use-toast";

interface ToasterProps {
  className?: string;
}

export function Toaster(props: ToasterProps) {
  const { toasts, dismiss } = useToast();
  const { className } = props;

  const handleToastClick = (toastId: string) => {
    toasts.forEach(toast => {
      if (toast.id === toastId) {
        dismiss(toastId);
      }
    });
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} onClick={() => handleToastClick(id)}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport className={className} />
    </ToastProvider>
  );
}
