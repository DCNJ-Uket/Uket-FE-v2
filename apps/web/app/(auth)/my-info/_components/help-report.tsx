/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalLink } from "@ui/components/ui/icon";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function HelpReport() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleChatClick = () => {
    if (window.Kakao?.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
      });
    }
  };

  return (
    <main className="flex w-full flex-col gap-2 bg-white px-6 py-4">
      <div className="flex h-8 items-center justify-start gap-3">
        <h1 className="text-lg font-bold text-[#17171B]">문의﹒제보하기</h1>
        <button onClick={handleChatClick}>
          <ExternalLink className="h-5" />
        </button>
      </div>
    </main>
  );
}
