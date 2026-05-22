// src/services/productService.ts
// Service untuk business logic product

import { productRepository } from '../repositories/productRepository';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import { CreateProductInput, UpdateProductInput } from '../validators/product';
import { AuthRequest } from '../types';

export class ProductService {
  async getAllProducts() {
    const products = await productRepository.findAll();
    return products.map(this.formatProduct);
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }
    return this.formatProduct(product);
  }

  async getProductsByCategory(category: string) {
    const products = await productRepository.findByCategory(category);
    return products.map(this.formatProduct);
  }

  async createProduct(input: CreateProductInput, user: AuthRequest) {
    const product = await productRepository.create(input, user.userId);
    return this.formatProduct(product);
  }

  async updateProduct(
    id: string,
    input: UpdateProductInput,
    user: AuthRequest
  ) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }

    // Check if user is the owner
    if (product.createdBy !== user.userId) {
      throw new ForbiddenError('You can only update your own products');
    }

    const updatedProduct = await productRepository.update(id, input);
    return this.formatProduct(updatedProduct);
  }

  async deleteProduct(id: string, user: AuthRequest) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }

    // Check if user is the owner
    if (product.createdBy !== user.userId) {
      throw new ForbiddenError('You can only delete your own products');
    }

    await productRepository.delete(id);
  }

  private formatProduct(product: any) {
    return {
      ...product,
      tags: typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags,
    };
  }
}

export const productService = new ProductService();
