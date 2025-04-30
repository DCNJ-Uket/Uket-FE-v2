const AUTH_REQUIRED_PATH = [
  "/users/register",
  "/users/info",
  "/users/delete",
  "/tickets",
  "/users/tickets",
  "/tickets/:id/cancel",
  "/terms",
  "/terms/agreement",
  "/survey",
];
const DYNAMIC_AUTH_REQUIRED_PATH = [
  /\/events\/\d+\/shows/,
  /\/events\/shows\/\d+\/reservations/,
  /\/tickets\/\d+\/qrcode/,
  /\/tickets\/\d+\/cancel/,
  /\/events\/\d+\/account/,
  /\/events\/\d+\/survey/,
];

const ADMIN_STATIC_AUTH_REQUIRED_PATH = [
  "/users",
  "/users/info",
  "/users/register",
  "/organizations",
  "/uket-event-registrations",
  "/upload/images",
  "/search",
  "/filtering/events",
  "/live/enter-users",
];

const ADMIN_DYNAMIC_AUTH_REQUIRED_PATH = [
  /\/[^/]+\/enter/,
  /^\/ticket(\/.*)?$/,
  /^\/users\/([^/]+)$/,
  /^\/uket-event-registrations\/([^/]+)$/,
  /^\/uket-event-registrations\/([^/]+)\/status\/([^/]+)$/,
  /^\/uket-event-registrations\/organiztaions\/([^/]+)\/event-type\/([^/]+)$/,
  /^\/(\d+)\/status\/([^/]+)$/,
];

const isDynamicUrlMatched = (url: string): boolean => {
  return DYNAMIC_AUTH_REQUIRED_PATH.some(path => path.test(url));
};

const isStaticUrlMatched = (url: string): boolean => {
  return AUTH_REQUIRED_PATH.includes(url);
};

const isAdminStaticUrlMatched = (url: string): boolean => {
  return ADMIN_STATIC_AUTH_REQUIRED_PATH.includes(url);
};

const isAdminDynamicUrlMatched = (url: string): boolean => {
  return ADMIN_DYNAMIC_AUTH_REQUIRED_PATH.some(path => path.test(url));
};

export {
  isAdminDynamicUrlMatched,
  isAdminStaticUrlMatched,
  isDynamicUrlMatched,
  isStaticUrlMatched,
};
