// src/repositories/userRepository.ts
// Repository untuk User queries

import prisma from '../config/database';
import { User } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(
    email: string,
    username: string,
    hashedPassword: string
  ): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }
}

export const userRepository = new UserRepository();
