export type AccountInfo = {
  email: string;
  password: string;
};

export type LoginRequestParams = {} & AccountInfo;

export type LoginResponse = {
  accessToken: string;
};

export type SignupRequestParams = {
  name: string;
} & AccountInfo;

export type SignupResponse = {
  adminId: number;
  name: string;
};
