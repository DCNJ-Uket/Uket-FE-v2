import { useState } from "react";

interface CounterButtonProps {
  remaining: number | undefined;
  defaultCount?: number;
  onChange?: (count: number) => void;
}

export default function CounterButton({
  remaining,
  defaultCount = 1,
  onChange,
}: CounterButtonProps) {
  const [count, setCount] = useState(defaultCount);

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  const handleIncrement = () => {
    if (count < remaining!) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  return (
    <div className="flex items-center gap-5 rounded-sm py-1.5 px-3.5 bg-white border-[0.5px] border-[#cccccc] ml-auto">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-50 text-base"
        disabled={count <= 1}
      >
        -
      </button>
      <span className="w-6 text-center text-sm">{count}</span>
      <button
        type="button"
        onClick={handleIncrement}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-50 text-base"
        disabled={remaining === undefined || count >= remaining}
      >
        +
      </button>
    </div>
  );
}
