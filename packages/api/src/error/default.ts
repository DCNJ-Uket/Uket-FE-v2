import { AxiosError } from "axios";

// AxiosError를 확장한 커스텀 에러 클래스
class CustomAxiosError extends AxiosError {
  isToast: boolean;
  errorContent: { title: string; description?: string } | null;
  constructor(
    error: AxiosError,
    errorContent: { title: string; description?: string } | null = null,
    isToast: boolean = false, // isToast 기본 값은 false
  ) {
    super(error.message, error.code);
    this.config = error.config;
    this.request = error.request;
    this.response = error.response;
    /** 커스텀 필드에 값을 할당합니다. */
    this.errorContent = errorContent;
    this.isToast = isToast;
  }
}

export default CustomAxiosError;
