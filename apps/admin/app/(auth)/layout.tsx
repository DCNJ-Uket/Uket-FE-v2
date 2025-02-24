import "@uket/ui/globals.css";
import { cn } from "@uket/ui/lib/utils";
import Nav from "../../components/nav";
import { checkUserAgent } from "../../utils/check-user-agent";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobileDevice = await checkUserAgent();

  return (
    <main className="flex h-dvh flex-col items-center">
      <Nav isMobileDevice={isMobileDevice} />
      <main className="grow w-full mt-12">
        <main
          className={cn(
            "flex h-full flex-col",
            isMobileDevice ? "w-full" : "container max-w-sm",
          )}
        >
          {isMobileDevice && (
            <h1 className="font-black text-2xl">관리자 로그인</h1>
          )}
          {children}
        </main>
      </main>
    </main>
  );
}
