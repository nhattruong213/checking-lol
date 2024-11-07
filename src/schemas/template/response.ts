import { z } from 'zod';

export const Error = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export const Response = z.object({
  data: z.any().optional(),
  success: z.boolean().optional(),
  statusCode: z.number(),
  errors: Error.optional(),
});

export const SuccessResponse = Response.transform((val) => ({
  data: val.data,
  success: val.success,
  statusCode: val.statusCode,
}));

export const ErrorResponse = Response.transform((val) => ({
  errors: val.errors,
  success: val.success,
  statusCode: val.statusCode,
}));

export type TError = z.infer<typeof Error>;
export type TResponse = z.infer<typeof Response>;
export type TSuccessResponse = z.infer<typeof SuccessResponse>;
export type TErrorResponse = z.infer<typeof ErrorResponse>;
