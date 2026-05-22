// src/services/authService.ts
// Service untuk business logic authentication

import { userRepository } from '../repositories/userRepository';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { generateToken } from '../utils/jwt';
import {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} from '../utils/errors';
import { RegisterInput, LoginInput } from '../validators/auth';

export class AuthService {
  async register(input: RegisterInput) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictError('Email already registered', 'EMAIL_EXISTS');
    }

    // Check if username already exists
    const existingUsername = await userRepository.findByUsername(
      input.username
    );
    if (existingUsername) {
      throw new ConflictError('Username already taken', 'USERNAME_EXISTS');
    }

    // Hash password
    const hashedPassword = await hashPassword(input.password);

    // Create user
    const user = await userRepository.create(
      input.email,
      input.username,
      hashedPassword
    );

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async login(input: LoginInput) {
    // Find user by email
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Verify password
    const isPasswordValid = await verifyPassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
}

export const authService = new AuthService();
