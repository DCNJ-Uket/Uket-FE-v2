export type AccountInfo = {
  email: string;
  password: string;
};

export type AdminLoginRequestParams = {} & AccountInfo;

export type AdminLoginResponse = {
  accessToken: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
};

export type AdminSignupRequestParams = {
  name: string;
} & AccountInfo;

export type AdminSignupResponse = {
  adminId: number;
  name: string;
};
