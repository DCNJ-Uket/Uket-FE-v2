export interface AdminFilterEvent {
  organizationId: number;
  eventId: number;
  eventName: string;
}

export interface AdminFilterEventListResponse {
  items: AdminFilterEvent[];
}
