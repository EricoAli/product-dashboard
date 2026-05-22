// src/middleware/errorHandler.ts
// Global error handling middleware

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json(
      errorResponse(err.message, err.errorCode, undefined)
    );
    return;
  }

  // Zod validation error
  if (err instanceof Error && err.name === 'ZodError') {
    res.status(400).json(
      errorResponse('Validation failed', 'VALIDATION_ERROR', err.message)
    );
    return;
  }

  // Default error
  res.status(500).json(
    errorResponse('Internal server error', 'INTERNAL_ERROR')
  );
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json(
    errorResponse(`Route ${req.path} not found`, 'NOT_FOUND')
  );
};
