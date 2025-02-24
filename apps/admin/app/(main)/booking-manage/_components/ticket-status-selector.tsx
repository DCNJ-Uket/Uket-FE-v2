import { useMutationChangeTicketStatus } from "@uket/api/mutations/useMutationChangeTicketStatus";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uket/ui/components/ui/select";
import { useState } from "react";
import TicketStatusChangeDialog from "./ticket-status-change-dialog";

interface TicketStatusSelectorProps {
  id: number;
  status: string;
  userName: string;
  page: number;
}

export default function TicketStatusSelector({
  id,
  status,
  userName,
  page,
}: TicketStatusSelectorProps) {
  const [selectedText, setSelectedText] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(selectedText);

  const currentItem = TICKET_STATUS_INFO.find(
    item => item.text === selectedText,
  )!;

  const handleSelectChange = (text: string) => {
    setNewStatus(text);
    setIsOpen(true);
  };

  const mutation = useMutationChangeTicketStatus(page);

  const handleConfirmChange = () => {
    const newTicketValue = TICKET_STATUS_INFO.find(
      item => item.text === newStatus,
    )!.value;

    mutation.mutate(
      { ticketId: id, status: newTicketValue },
      {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedText(newStatus);
        },
      },
    );
  };

  return (
    <>
      <Select value={currentItem.text} onValueChange={handleSelectChange}>
        <SelectTrigger
          className="h-7 max-w-28 gap-2 rounded-lg px-2 py-px leading-tight text-[#2F2F37]"
          style={{ backgroundColor: currentItem.color }}
        >
          <SelectValue placeholder={currentItem.text} />
        </SelectTrigger>
        <SelectContent>
          {TICKET_STATUS_INFO.map(item => (
            <SelectItem key={item.value} value={item.text}>
              {item.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TicketStatusChangeDialog
        userName={userName}
        isOpen={isOpen}
        onOpenDialog={setIsOpen}
        beforeStatus={selectedText}
        newStatus={newStatus}
        onConfirmChange={handleConfirmChange}
      />
    </>
  );
}
