interface StepHeaderProps {
  step: string;
  content: string;
}

export default function StepHeader({ step, content }: StepHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-[1px] px-6">
      <p className="text-[15px] font-light text-[#5E5E6E]">{`STEP ${step}`}</p>
      <h1 className="text-[23px] font-black">
        <p>{content}</p>
      </h1>
    </div>
  );
}
