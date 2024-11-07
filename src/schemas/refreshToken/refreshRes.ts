import { z } from 'zod';

import { Response } from '../template/response';

export const RefreshToken = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
  })
  .transform((originalValue) => {
    return {
      accessToken: originalValue.access_token,
      refreshToken: originalValue.refresh_token,
    };
  });

export const RefreshTokenRes = Response.extend({
  data: RefreshToken.optional(),
});
