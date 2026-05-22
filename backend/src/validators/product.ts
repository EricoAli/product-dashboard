// src/validators/product.ts
// Zod schemas untuk validasi product requests

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().int().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  image: z.string().url('Image must be a valid URL'),
  tags: z.array(z.string()).default([]),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
