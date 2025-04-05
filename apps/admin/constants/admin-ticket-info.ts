const allAdminTicketInfoList = [
  {
    organizationId: 1,
    organizationName: "건국대학교",
    uketEventRegistrationId: 1,
    eventName: "녹색지대",
    eventType: "FESTIVAL",
    eventStartDate: "2023-12-25",
    eventEndDate: "2023-12-26",
    ticketingStartDateTime: "2023-12-24T01:22:44+09:00",
    registrationStatus: "검수 완료",
  },
  {
    organizationId: 2,
    organizationName: "소리터",
    uketEventRegistrationId: 2,
    eventName: "봄날의밤",
    eventType: "PERFORMANCE",
    eventStartDate: "yyyy-MM-dd",
    eventEndDate: "yyyy-MM-dd",
    ticketingStartDateTime: "yyyy-MM-ddThh:mm:ss+09:00",
    registrationStatus: "검수 진행",
  },
  {
    organizationId: 3,
    organizationName: "소리터",
    uketEventRegistrationId: 3,
    eventName: "봄날의밤",
    eventType: "PERFORMANCE",
    eventStartDate: "yyyy-MM-dd",
    eventEndDate: "yyyy-MM-dd",
    ticketingStartDateTime: "yyyy-MM-ddThh:mm:ss+09:00",
    registrationStatus: "등록 완료",
  },
  {
    organizationId: 4,
    organizationName: "세종대",
    uketEventRegistrationId: 4,
    eventName: "축제3",
    eventType: "FESTIVAL",
    eventStartDate: "yyyy-MM-dd",
    eventEndDate: "yyyy-MM-dd",
    ticketingStartDateTime: "yyyy-MM-ddThh:mm:ss+09:00",
    registrationStatus: "등록 취소",
  },
  {
    organizationId: 5,
    organizationName: "소리터",
    uketEventRegistrationId: 5,
    eventName: "봄날의밤",
    eventType: "FESTIVAL",
    eventStartDate: "yyyy-MM-dd",
    eventEndDate: "yyyy-MM-dd",
    ticketingStartDateTime: "yyyy-MM-ddThh:mm:ss+09:00",
    registrationStatus: "행사 완료",
  },
];

export function getAdminTicketInfo(page = 1, size = 10) {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedTicketInfos = allAdminTicketInfoList.slice(
    startIndex,
    endIndex,
  );

  return {
    content: paginatedTicketInfos,
    pageNumber: page,
    pageSize: size,
    first: page === 0,
    last: endIndex >= allAdminTicketInfoList.length,
    totalElements: allAdminTicketInfoList.length,
    totalPages: Math.ceil(allAdminTicketInfoList.length / size),
    empty: paginatedTicketInfos.length === 0,
  };
}
