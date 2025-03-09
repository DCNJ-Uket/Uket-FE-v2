interface InfoItemProps {
  title: string;
  content: string;
  isEdit?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InfoItem(props: InfoItemProps) {
  const { title, content, isEdit, onChange, error } = props;

  return (
    <div className="w-full">
      <div className="grid h-7 w-full grid-cols-2 text-[13px] text-[#5E5E6E]">
        <p className="flex items-center">{title}</p>
        {isEdit ? (
          <input
            className="box-border h-full rounded bg-[#F2F2F2] pl-1.5 font-semibold leading-7"
            value={content}
            onChange={onChange}
          />
        ) : (
          <p className="flex items-center pl-1.5 font-semibold leading-7">
            {content}
          </p>
        )}
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}
