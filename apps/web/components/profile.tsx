"use client";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { useQueryUserInfo } from "@uket/api/queries/user";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Profile() {
  const { data } = useQueryUserInfo();
  const pathname = usePathname();
  const router = useRouter();
  const textColor = pathname === "/" && "text-white";

  return (
    <>
      {data ? (
        <Button
          variant="link"
          className={cn("p-0 pt-1 font-bold", textColor)}
          onClick={() => {
            router.push("/myinfo");
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <Image
                src={data.profileImage}
                alt="프로필 이미지"
                width={100}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <p className="font-bold">{data.depositorName}</p>
          </div>
        </Button>
      ) : (
        <Button
          variant="link"
          className={cn("p-0 pt-1 font-bold", textColor)}
          onClick={() => {
            router.push("/login");
          }}
        >
          로그인
        </Button>
      )}
    </>
  );
}
