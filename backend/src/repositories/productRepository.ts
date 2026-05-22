// src/repositories/productRepository.ts
// Repository untuk Product queries

import prisma from '../config/database';
import { Product } from '@prisma/client';
import { CreateProductInput, UpdateProductInput } from '../validators/product';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async findByCategory(category: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    data: CreateProductInput,
    createdBy: string
  ): Promise<Product> {
    return prisma.product.create({
      data: {
        ...data,
        tags: JSON.stringify(data.tags),
        createdBy,
      },
    });
  }

  async update(
    id: string,
    data: UpdateProductInput
  ): Promise<Product> {
    const updateData: any = { ...data };
    if (data.tags) {
      updateData.tags = JSON.stringify(data.tags);
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { createdBy: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const productRepository = new ProductRepository();
