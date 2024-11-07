import { z } from 'zod';

import { Response } from '../template/response';

export const sendEmail = z.object({
  email: z.string(),
});

export const sendEmailRes = Response.extend({
  data: sendEmail.optional(),
});

const verifyCode = z.object({
  token: z.string(),
});

export const verifyCodeRes = Response.extend({
  data: verifyCode.optional(),
});

const changePas = z.object({
  message: z.string(),
});

export const changePasReq = Response.extend({
  data: changePas.optional(),
});
