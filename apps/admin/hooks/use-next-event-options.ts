import {
  EVENT_STATUS_INFO,
  EventStatus,
  EventStatusInfo,
} from "@uket/api/types/admin-event";

export const getNextEventStatusOptions = (
  currentStatus: EventStatus,
): EventStatusInfo[] => {
  const currentItem = EVENT_STATUS_INFO.find(
    item => item.text === currentStatus,
  )!;

  let options: EventStatusInfo[] = [];

  switch (currentStatus) {
    case "검수 진행":
      options = EVENT_STATUS_INFO.filter(item => item.text === "검수 완료");
      break;
    case "검수 완료":
      options = EVENT_STATUS_INFO.filter(item => item.text === "등록 완료");
      break;
    case "등록 완료":
      options = EVENT_STATUS_INFO.filter(
        item => item.text === "검수 완료" || item.text === "등록 취소",
      );
      break;
    default:
      options = [];
  }

  if (!options.find(item => item.text === currentStatus)) {
    options = [currentItem, ...options];
  }

  return options;
};
