"use client";

import { useQueryUserInfo } from "@uket/api/queries/user";
import GeneralInfo from "./general-info";
import HelpReport from "./help-report";
import UserProfile from "./user-profile";

export default function InfoSection() {
  const { data: userInfo } = useQueryUserInfo();

  return (
    <section>
      {userInfo && (
        <main className="flex flex-col gap-2">
          <UserProfile userInfo={userInfo} />
          <GeneralInfo userInfo={userInfo} />
          <HelpReport />
        </main>
      )}
    </section>
  );
}
