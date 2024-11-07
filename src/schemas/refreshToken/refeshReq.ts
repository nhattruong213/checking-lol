import { z } from 'zod';

export const RefreshTokenReq = z.object({
  token: z.string(),
});
