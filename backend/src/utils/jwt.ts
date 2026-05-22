// src/utils/jwt.ts
// Utility untuk membuat dan verifikasi JWT

import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './errors';

interface JwtPayload {
  userId: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export const generateToken = (payload: JwtPayload): string => {
  // use any casts to satisfy the jsonwebtoken type variations across versions
  return jwt.sign(payload as any, JWT_SECRET as any, {
    expiresIn: JWT_EXPIRE as any,
  } as any) as string;
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token', 'INVALID_TOKEN');
  }
};

export const extractTokenFromHeader = (authHeader?: string): string => {
  if (!authHeader) {
    throw new UnauthorizedError('Missing authorization header', 'MISSING_TOKEN');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedError('Invalid authorization format', 'INVALID_FORMAT');
  }

  return parts[1];
};
