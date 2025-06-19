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
  const overrideStyle =
    pathname === "/"
      ? `text-white hover:bg-[#ffffff25] hover:text-white`
      : "hover:bg-gray-100";
  return (
    <>
      {data ? (
        <Button
          variant="ghost"
          className={cn("p-0 px-2 font-bold", overrideStyle)}
          onClick={() => {
            router.push("/my-info");
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <Image
                src={data.profileImagePath}
                alt="프로필 이미지"
                width={100}
                height={100}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <p className="font-bold">{data.depositorName}</p>
          </div>
        </Button>
      ) : (
        <Button
          variant="ghost"
          className={cn(`p-0 px-2 font-bold`, overrideStyle)}
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
