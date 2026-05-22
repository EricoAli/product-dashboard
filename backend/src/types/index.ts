// src/types/index.ts
// TypeScript type definitions

export interface AuthRequest {
  userId: string;
  email: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  tags: string[];
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  image?: string;
  tags?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthRequest;
    }
  }
}
