// src/middleware/auth.ts
// Middleware untuk verifikasi JWT dan ekstrak user data

import { Request, Response, NextFunction } from 'express';
import { extractTokenFromHeader, verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
