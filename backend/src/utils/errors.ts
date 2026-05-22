// src/utils/errors.ts
// Custom error classes untuk standardisasi response error

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errorCode?: string) {
    super(message, 400, errorCode || 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, errorCode?: string) {
    super(`${resource} not found`, 404, errorCode || 'NOT_FOUND');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', errorCode?: string) {
    super(message, 401, errorCode || 'UNAUTHORIZED');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', errorCode?: string) {
    super(message, 403, errorCode || 'FORBIDDEN');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, errorCode?: string) {
    super(message, 409, errorCode || 'CONFLICT');
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
