import { toast } from "@ui/components/ui/sonner";

export const handleClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사되었습니다.");
  } catch (error) {
    toast.error("클립보드 복사에 실패했습니다.");
  }
};
