export type EntryGroupItem = {
  entryGroupId: number;
  startDateTime: string;
  ticketCount: number;
  totalTicketCount: number;
};

export type EventRoundItem = {
  eventRoundId: number;
  eventRoundDateTime: string;
  weekDay: string;
  entryGroups: EntryGroupItem[];
};

export type ReservationResponse = {
  eventRounds: EventRoundItem[];
  ticketPrice: number;
  friend: string;
};

export type PerformerListResponse = {
  items: {
    performerId: number;
    name: string;
    ticketCount: number;
  }[];
};
