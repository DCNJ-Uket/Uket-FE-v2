/* eslint-disable @typescript-eslint/no-empty-object-type */
export type EmailInfo = {
  email: string;
  universityId: number;
};

export type EmailAuthRequestParams = {} & EmailInfo;

export type EmailAuthResponse = {
  success: boolean;
  email: string;
  expiration: number;
};

export type EmailAuthVerifyParams = { authCode: string } & EmailInfo;

export type EmailAuthVerifyResponse = {};
