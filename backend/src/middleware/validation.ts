// src/middleware/validation.ts
// Middleware untuk validasi request body menggunakan Zod

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      const errorMessage =
        error.errors?.[0]?.message || 'Validation failed';
      next(new ValidationError(errorMessage));
    }
  };
