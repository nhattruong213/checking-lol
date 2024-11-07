import { z } from 'zod';

export const LoginReq = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginReq = z.infer<typeof LoginReq>;
