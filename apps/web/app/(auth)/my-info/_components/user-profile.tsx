"use client";

import { Button } from "@ui/components/ui/button";
import { UserInfoResponse } from "@uket/api/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  userInfo: UserInfoResponse;
}

export default function UserProfile(props: UserProfileProps) {
  const { userInfo } = props;
  const router = useRouter();

  return (
    <main className="bg-white flex w-full flex-col items-start gap-5 px-7 pt-5 pb-7">
      <div className="flex items-center gap-6">
        <div className="relative h-14 w-14">
          <Image
            src={userInfo.profileImage}
            alt="프로필 이미지"
            width={100}
            height={100}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="text-xl font-bold">{userInfo.depositorName}</p>
      </div>
      <Button
        variant="outline"
        className="bg-brand hover:bg-brandHover w-full rounded-lg py-6 text-center text-sm font-semibold text-white hover:text-white"
        onClick={() => {
          router.push("/ticket-list");
        }}
      >
        내 티켓 확인하기
      </Button>
    </main>
  );
}
