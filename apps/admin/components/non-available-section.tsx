interface NonAvailableSectionProps {
  title: string;
}

export default function NonAvailableSection({
  title,
}: NonAvailableSectionProps) {
  return (
    <section className="flex h-full flex-col bg-white">
      <div className="flex grow flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl font-bold text-[#7250FD]">
          {title}는(은)
          <br />
          PC에서만 지원됩니다.
        </p>
        <p className="text-center text-base font-medium text-[#5E5E6E]">
          이 기능은 모바일 환경에서 사용이 어렵습니다.
          <br />
          불편하시더라도 PC로 접속해 주세요.
        </p>
      </div>
    </section>
  );
}
