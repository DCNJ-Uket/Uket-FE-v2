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

const ADMIN_DYNAMIC_AUTH_REQUIRED_PATH = [
  /\/ticket\/[^/]+\/enter/,
  /^\/ticket(\/.*)?$/,
];

const isDynamicUrlMatched = (url: string): boolean => {
  return DYNAMIC_AUTH_REQUIRED_PATH.some(path => path.test(url));
};

const isAdminDynamicUrlMatched = (url: string): boolean => {
  return ADMIN_DYNAMIC_AUTH_REQUIRED_PATH.some(path => path.test(url));
};

const isStaticUrlMatched = (url: string): boolean => {
  return AUTH_REQUIRED_PATH.includes(url);
};

export { isAdminDynamicUrlMatched, isDynamicUrlMatched, isStaticUrlMatched };
