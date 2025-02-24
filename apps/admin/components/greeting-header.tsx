interface GreetingHeaderProps {
  isMobileDevice?: boolean;
  group?: string;
}

// TODO: 기획 변경 후, 특정 동아리에 종속적인 문구 수정
export default function GreetingHeader({
  isMobileDevice = false,
  group = "",
}: GreetingHeaderProps) {
  return (
    <>
      {isMobileDevice ? (
        <div className="w-full bg-[#F2F2F2] px-5 py-3 text-sm">
          <span className="font-bold">
            <span className="text-brand">{group} 관리자님, </span>
            <span>안녕하세요.</span>
          </span>
        </div>
      ) : (
        <div className="text-sm">
          <p className="text-desc">
            <span className="text-brand">{group} 관리자님, </span>
            <span>안녕하세요.</span>
          </p>
        </div>
      )}
    </>
  );
}
