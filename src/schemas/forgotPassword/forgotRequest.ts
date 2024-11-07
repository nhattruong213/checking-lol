import { z } from 'zod';

export const sendEmailRequest = z.object({
  email: z.string(),
});

export const verifyCodeRequest = z.object({
  email: z.string(),
  code: z.string(),
});

export const changePasswordRequest = z.object({
  password: z.string(),
  token: z.string(),
});

export type TSendMailRequest = z.infer<typeof sendEmailRequest>;
export type TVerifyCodeRequest = z.infer<typeof verifyCodeRequest>;
export type TChangePasswordRequest = z.infer<typeof changePasswordRequest>;
