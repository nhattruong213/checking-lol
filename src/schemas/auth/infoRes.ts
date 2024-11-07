import { z } from 'zod';

import { Response } from '../template/response';

export const AuthInfo = z.object({
  email: z.string().optional(),
});

export type TAuthInfo = z.infer<typeof AuthInfo>;

export const AuthInfoRes = Response.extend({
  data: AuthInfo.optional(),
});
