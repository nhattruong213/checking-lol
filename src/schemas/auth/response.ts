import { z } from 'zod';

import { Response } from '../template/response';

export const Login = z
  .object({
    access_token: z.string().optional(),
    refresh_token: z.string().optional(),
  })
  .transform((originalValue) => {
    return {
      accessToken: originalValue.access_token,
      refreshToken: originalValue.refresh_token,
    };
  });

export const LoginRes = Response.extend({
  data: Login.optional(),
});
