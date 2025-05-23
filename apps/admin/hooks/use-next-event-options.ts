import {
  EVENT_STATUS_INFO,
  EventStatus,
  EventStatusInfo,
} from "@uket/api/types/admin-event";

const NEXT_STATUS_MAP: Record<EventStatus, EventStatus[]> = {
  "검수 진행": ["검수 완료"],
  "검수 완료": ["등록 완료", "등록 취소"],
  "등록 완료": ["검수 완료", "등록 취소", "행사 완료"],
  "등록 취소": [],
  "행사 완료": [],
};

export const getNextEventStatusOptions = (
  currentStatus: EventStatus,
): EventStatusInfo[] => {
  const currentItem = EVENT_STATUS_INFO.find(
    item => item.text === currentStatus,
  )!;

  const nextStatuses = NEXT_STATUS_MAP[currentStatus] || [];

  let options = EVENT_STATUS_INFO.filter(item =>
    nextStatuses.includes(item.text as EventStatus),
  );

  // 현재 상태가 옵션에 없으면 가장 앞으로 추가
  if (!options.find(item => item.text === currentStatus)) {
    options = [currentItem, ...options];
  }

  return options;
};
