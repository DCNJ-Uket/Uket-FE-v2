"use client";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao?: any;
  }
}

import {
  KAKAO_OPEN_CHAT_ID,
  KAKAO_OPEN_CHAT_URL,
} from "@uket/api/constants/auth-url";
import { Button } from "@uket/ui/components/ui/button";
import { cn } from "@uket/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINK_LIST, SUPER_ADMIN_NAV_LINK_LIST } from "../constants/link";
import AdminLogo from "./admin-logo";
import GreetingHeader from "./greeting-header";
import LogoutModal from "./logout-modal";

function NavLink({ href, title }: { href: string; title: string }) {
  const pathname = usePathname();
  const isQRScan = href === "/qr-scan";

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center text-lg text-[#8989A1] hover:text-black transition-colors duration-150 h-fit px-3",
        pathname === href && "font-bold text-black border-l-2 border-black",
        isQRScan && "disabled cursor-not-allowed pointer-events-none",
      )}
      aria-disabled={isQRScan}
      tabIndex={isQRScan ? -1 : undefined}
    >
      {isQRScan ? (
        <div className="flex h-fit items-center justify-start gap-1.5 text-[#8989A1] hover:cursor-pointer">
          <p className="text-lg">{title}</p>
          <p className="-mt-1 text-xs font-light">mobile only</p>
        </div>
      ) : (
        title
      )}
    </Link>
  );
}

export function LinkButton({
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

// TODO: 슈퍼 어드민만 SUPER_ADMIN_NAV_LINK_LIST가 보이도록 로직 추가
export default function SideNav() {
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
    <aside className="flex h-full w-52 flex-col gap-5 px-6 pb-20 pt-10">
      <AdminLogo
        styleOverride={{
          image: "w-24",
          font: "font-medium text-xs",
        }}
      />
      <GreetingHeader />
      <div className="h-[0.5px] w-full bg-[#CCCCCC]" />
      <div className="py-4 flex flex-col gap-8">
        {NAV_LINK_LIST.map(({ href, title }) => (
          <NavLink key={href} href={href} title={title} />
        ))}
      </div>
      <hr />
      <div className="h-[0.5px] w-full bg-[#CCCCCC]" />
      <div className="py-4 flex flex-col gap-8 grow">
        {SUPER_ADMIN_NAV_LINK_LIST.map(({ href, title }) => (
          <NavLink key={href} href={href} title={title} />
        ))}
      </div>
      <hr />
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
        <LogoutModal />
      </div>
    </aside>
  );
}
