/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

// import { useMutationChangeTicketStatus } from "@uket/api/mutations/use-mutation-change-ticket-status";
import { TICKET_INFO_STATUS_INFO } from "@uket/api/types/admin-ticket-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uket/ui/components/ui/select";
import { useState } from "react";
import TicketInfoChangeDialog from "./ticket-info-change-dialog";

interface TicketStatusSelectorProps {
  id: number;
  status: string;
  eventName: string;
  page: number;
}

export default function TicketStatusSelector({
  id,
  status,
  eventName,
  page,
}: TicketStatusSelectorProps) {
  const [selectedText, setSelectedText] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(selectedText);

  const currentItem = TICKET_INFO_STATUS_INFO.find(
    item => item.value === selectedText,
  )!;

  const handleSelectChange = (text: string) => {
    setNewStatus(text);
    setIsOpen(true);
  };

  const handleConfirmChange = () => {
    const newTicketValue = TICKET_INFO_STATUS_INFO.find(
      item => item.value === newStatus,
    )!.value;
  };

  return (
    <>
      <Select value={currentItem.value} onValueChange={handleSelectChange}>
        <SelectTrigger
          className="h-7 max-w-28 gap-2 rounded-lg px-2 py-px leading-tight text-[#2F2F37]"
          style={{ backgroundColor: currentItem.color }}
        >
          <SelectValue placeholder={currentItem.value} />
        </SelectTrigger>
        <SelectContent>
          {TICKET_INFO_STATUS_INFO.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TicketInfoChangeDialog
        eventName={eventName}
        isOpen={isOpen}
        onOpenDialog={setIsOpen}
        beforeStatus={selectedText}
        newStatus={newStatus}
        onConfirmChange={handleConfirmChange}
      />
    </>
  );
}
