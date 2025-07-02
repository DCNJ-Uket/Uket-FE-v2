"use client";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import {
  KAKAO_OPEN_CHAT_ID,
  KAKAO_OPEN_CHAT_URL,
} from "@uket/api/constants/auth-url";
import Link from "next/link";
import LogoutModal from "./logout-modal";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao?: any;
  }
}

function LinkButton({
  content,
  link,
  isMobileDevice = false,
}: {
  content: string;
  link: string;
  isMobileDevice?: boolean;
}) {
  return (
    <Link
      href={link}
      passHref
      target="_blank"
      className={cn("flex justify-center")}
    >
      <Button
        variant={isMobileDevice ? "link" : "outline"}
        className={cn(
          "block",
          isMobileDevice
            ? "px-0 text-xs text-desc"
            : "border-none text-[#8989A1]",
        )}
      >
        {content}
      </Button>
    </Link>
  );
}

export default function HelperMenu() {
  const moveToChat = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    }

    window.Kakao.Channel.chat({
      channelPublicId: KAKAO_OPEN_CHAT_ID,
    });
  };

  return (
    <div>
      <LinkButton content="카카오톡 채널" link={KAKAO_OPEN_CHAT_URL} />
      <hr className="mx-auto my-1 w-3 border-[1px] rounded-md" />
      <Button
        variant={"outline"}
        onClick={moveToChat}
        className={cn("border-none text-[#8989A1] mx-auto block")}
      >
        1:1 상담
      </Button>
      <hr className="mx-auto my-1 w-3 border-[1px] rounded-md" />
      <div className="flex justify-center">
        <LogoutModal />
      </div>
    </div>
  );
}
