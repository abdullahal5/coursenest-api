import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z
    .object({
      title: z.string().min(3, 'Title must be at least 3 characters').max(100),
      description: z.string().min(10, 'Description must be at least 10 characters'),
      price: z.number().min(0, 'Price cannot be negative'),
      instructor: z.string().trim(),
    })
    .strict(),
});

export const updateCourseSchema = z.object({
  body: z
    .object({
      title: z.string().min(3, 'Title must be at least 3 characters').max(100).optional(),
      description: z.string().min(10, 'Description must be at least 10 characters').optional(),
      price: z.number().min(0, 'Price cannot be negative').optional(),
      purchaseCount: z.number().optional(),
      instructor: z.string().trim().optional(),
    })
    .strict(),
});
