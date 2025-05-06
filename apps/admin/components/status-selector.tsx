import { useMutationChangeEventStatus } from "@uket/api/mutations/use-mutation-change-event-status";
import { useMutationChangeTicketStatus } from "@uket/api/mutations/use-mutation-change-ticket-status";
import { EVENT_STATUS_INFO } from "@uket/api/types/admin-event";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import {
  NonSelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uket/ui/components/ui/select";
import { useState } from "react";
import StatusChangeDialog from "./status-change-dialog";

interface TicketStatusSelectorProps {
  isTicket?: boolean;
  id: number;
  status: string;
  name: string;
  page: number;
  changeable?: boolean;
}

export default function StatusSelector({
  isTicket = true,
  id,
  status,
  name,
  page,
  changeable = false,
}: TicketStatusSelectorProps) {
  const stateInfo = isTicket ? TICKET_STATUS_INFO : EVENT_STATUS_INFO;

  const ticketMutation = useMutationChangeTicketStatus(page);
  const eventMutation = useMutationChangeEventStatus(page);

  const currentItem = stateInfo.find(item => item.text === status)!;

  const [selectedText, setSelectedText] = useState<string>(currentItem.text);
  const [isOpen, setIsOpen] = useState(false);
  const [newStatusText, setNewStatusText] = useState<string>(currentItem.text);

  const handleSelectChange = (text: string) => {
    setNewStatusText(text);
    setIsOpen(true);
  };

  const handleConfirmChange = () => {
    const newValue = stateInfo.find(item => item.text === newStatusText)!.value;

    if (isTicket) {
      ticketMutation.mutate(
        { ticketId: id, status: newValue },
        {
          onSuccess: () => {
            setIsOpen(false);
            setSelectedText(newStatusText);
          },
        },
      );
    } else {
      eventMutation.mutate(
        { uketEventRegistrationId: id, registrationStatus: newValue },
        {
          onSuccess: () => {
            setIsOpen(false);
            setSelectedText(newStatusText);
          },
        },
      );
    }
  };

  return (
    <>
      <Select value={currentItem.text} onValueChange={handleSelectChange}>
        <>
          {changeable ? (
            <SelectTrigger
              className="h-7 max-w-28 gap-2 rounded-lg px-2 py-px leading-tight text-[#2F2F37]"
              style={{ backgroundColor: currentItem.color }}
            >
              <SelectValue placeholder={currentItem.text} />
            </SelectTrigger>
          ) : (
            <NonSelectTrigger
              className="h-7 max-w-28 gap-2 rounded-lg px-2 py-px leading-tight text-[#2F2F37]"
              style={{ backgroundColor: currentItem.color }}
            >
              <SelectValue placeholder={currentItem.text} />
            </NonSelectTrigger>
          )}

          <SelectContent>
            {stateInfo.map(item => (
              <SelectItem key={item.value} value={item.text}>
                {item.text}
              </SelectItem>
            ))}
          </SelectContent>
        </>
      </Select>
      <StatusChangeDialog
        isTicket={isTicket}
        name={name}
        isOpen={isOpen}
        onOpenDialog={setIsOpen}
        beforeStatusText={selectedText}
        newStatusText={newStatusText}
        onConfirmChange={handleConfirmChange}
      />
    </>
  );
}
