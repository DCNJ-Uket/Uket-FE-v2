// 공연 구매를 위해 선택한 요소를 보여주는 element

interface SelectTicketItemProps {
  title?: string;
  content?: string;
}

const SelectTicketItem = ({ title, content }: SelectTicketItemProps) => {
  return (
    <div className="flex h-[32px] w-1/2 items-center gap-1.5 rounded-md border-[0.5px] border-[#D9D9D9] bg-[#F2F2F2] pl-3 text-[10px]">
      <div>{title}</div>
      <div className="font-bold">{content}</div>
    </div>
  );
};

interface SelectHeaderProps {
  eventName: string | null;
  formatShowDate: string;
  formatSelectTime?: string;
}

const SelectHeader = ({
  eventName,
  formatShowDate,
  formatSelectTime,
}: SelectHeaderProps) => {
  return (
    <div className="sticky z-50 left-0 top-0 flex flex-col gap-2 bg-white px-[22px]">
      <div className="text-lg font-bold">{eventName}</div>
      <div className="flex gap-3  pb-4">
        <SelectTicketItem title="선택 날짜" content={formatShowDate} />
        <SelectTicketItem title="선택 시간" content={formatSelectTime ?? ""} />
      </div>
    </div>
  );
};

export { SelectHeader, SelectTicketItem };
