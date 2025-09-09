import { z } from 'zod';

export const createPurchaseSchema = z.object({
  body: z.object({
    courseId: z
      .string({
        message: 'Course ID is required',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Invalid course ID format',
      }),
  }),
});
