import { useQueryAdminInfo } from "@uket/api/queries/admin-user";

interface GreetingHeaderProps {
  isMobileDevice?: boolean;
}

export default function GreetingHeader({
  isMobileDevice = false,
}: GreetingHeaderProps) {
  const { data } = useQueryAdminInfo();
  const organizationName = data && data.organization;

  return (
    <>
      {isMobileDevice ? (
        <div className="w-full bg-[#F2F2F2] px-5 py-3 text-sm">
          <span className="font-bold">
            <span className="text-brand">{organizationName} 관리자님, </span>
            <span>안녕하세요.</span>
          </span>
        </div>
      ) : (
        <div className="text-sm">
          <p className="text-desc flex flex-col">
            <span className="text-brand">{organizationName}</span>
            <span>관리자님, 안녕하세요.</span>
          </p>
        </div>
      )}
    </>
  );
}
