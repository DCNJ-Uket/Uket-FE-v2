import { Dialog, DialogContent } from "@ui/components/ui/dialog";
import { ChevronUpIcon } from "@ui/components/ui/icon";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import { useState } from "react";

interface StatusHelpModalProps {
  open: boolean;
  onClose: () => void;
}

const StatusText = ({ text }: { text: string }) => {
  const color = TICKET_STATUS_INFO.find(item => item.text === text)!.color;

  return (
    <span className="relative inline-block" style={{ color }}>
      {text}
      <span
        className="absolute top-[0.5px] -right-[0.5px] w-[3px] h-[3px] rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
};

const StatusBadge = ({ desc, text }: { desc: string; text: string }) => {
  const color = TICKET_STATUS_INFO.find(item => item.text === text)!.color;
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-[13px] font-light text-[#8989A1]">{desc}</p>
      <div
        className="w-36 gap-2 rounded-lg px-2 py-1 leading-tight text-[#2F2F37] flex items-center justify-start text-sm font-normal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 [&>span]:line-clamp-1"
        style={{ backgroundColor: color }}
      >
        <ChevronUpIcon className="opacity-50 scale-[1.05]" />
        <p className="text-lg font-medium">{text}</p>
      </div>
    </div>
  );
};

export default function StatusHelpModal({
  open,
  onClose,
}: StatusHelpModalProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      onClose();
      setStep(0);
    }
  };

  const steps = [
    {
      content: (
        <>
          <div className="flex justify-between items-end gap-5">
            <StatusBadge desc="입금 확인 전" text="입금 확인중" />
            <span className="text-xl font-medium text-[#BFBFBF] mb-1">→</span>
            <StatusBadge desc="입금 확인 후" text="예매 완료" />
          </div>
          <p className="text-[15px] font-bold text-[#17171C]">
            입금 확인 후 수동으로 변경
          </p>
        </>
      ),
      description: (
        <>
          입금이 확인되면 티켓 상태값을 <StatusText text="예매 완료" />로 변경해
          주세요.
          <br />
          변경 후 사용자에게 예매 확정 알림톡이 전송돼요.
        </>
      ),
    },
    {
      content: (
        <>
          <div className="flex justify-between items-end gap-5">
            <StatusBadge desc="QR 입장 확인 후" text="입장 완료" />
          </div>
          <p className="text-[15px] font-bold text-[#17171C]">
            QR 확인 후 자동 <span className="text-xs">또는</span> 수동으로 변경
          </p>
        </>
      ),
      description: (
        <>
          QR 입장이 확인되면 상태값이 자동으로
          <StatusText text="입장 완료" />로 변경돼요.
          <br />
          직접 <StatusText text="입장 완료" />로 변경해 입장 처리를 진행할 수도
          있어요.
        </>
      ),
    },
    {
      content: (
        <>
          <div className="flex justify-between items-end gap-5">
            <StatusBadge desc="티켓 취소 시" text="환불 요청" />
            <span className="text-xl font-medium text-[#BFBFBF] mb-1">→</span>
            <StatusBadge desc="환불 완료 후" text="예매 취소" />
          </div>
          <p className="text-[15px] font-bold text-[#17171C]">
            환불 완료 후 수동으로 변경
          </p>
        </>
      ),
      description: (
        <>
          입금을 완료한 사용자가 티켓을 취소하면 상태값이{" "}
          <StatusText text="환불 요청" />
          으로 <br />
          자동으로 변경돼요. 환불 완료 후 <StatusText text="예매 취소" />로
          상태값을 바꿔주세요.
        </>
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
        setStep(0);
      }}
    >
      <DialogContent className="max-w-md rounded-xl p-0" isXHidden>
        <div className="flex flex-col items-center justify-center py-10 px-8 gap-4">
          {steps[step]!.content}
        </div>
        <div className="flex flex-col gap-4">
          <section className="rounded-xl flex flex-col gap-4 bg-[#F2F2F2] px-7 py-4">
            <div className="flex flex-col gap-1.5">
              <p className="font-bold text-xl">티켓 상태값 변경 안내</p>
              <div className="text-sm font-medium text-[#8989A1]">
                {steps[step]!.description}
              </div>
            </div>
            <div className="w-full h-[0.75px] bg-[#CCCCCC]"></div>
            <div className="flex items-center justify-between">
              <div className="flex justify-center gap-3">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i === step ? "bg-brand" : "bg-[#D6CDFE]"}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="text-sm font-semibold text-brand hover:underline"
              >
                {step === steps.length - 1 ? "완료" : "다음으로 →"}
              </button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
