import CustomAxiosError from "@/utils/customError";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: CustomAxiosError;
  }
}
