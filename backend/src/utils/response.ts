// src/utils/response.ts
// Utility untuk standardisasi response

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: string;
  };
}

export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message: string,
  errorCode: string = 'INTERNAL_ERROR',
  details?: string
): ApiResponse<null> => {
  return {
    success: false,
    message,
    error: {
      code: errorCode,
      details,
    },
  };
};
