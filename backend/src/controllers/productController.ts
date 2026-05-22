// src/controllers/productController.ts
// Controller untuk handling product requests

import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/productService';
import { successResponse } from '../utils/response';

export class ProductController {
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(
        successResponse('Products retrieved successfully', products)
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await productService.getProductById(req.params.id as string);
      res.status(200).json(
        successResponse('Product retrieved successfully', product as any)
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category } = req.query;
      if (!category || typeof category !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Category query parameter is required',
        });
        return;
      }
      const products = await productService.getProductsByCategory(category);
      res.status(200).json(
        successResponse('Products retrieved successfully', products)
      );
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await productService.createProduct(
        req.body,
        req.user!
      );
      res.status(201).json(successResponse('Product created successfully', product));
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await productService.updateProduct(
        req.params.id as string,
        req.body,
        req.user!
      );
      res.status(200).json(successResponse('Product updated successfully', product));
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
        await productService.deleteProduct(req.params.id as string, req.user!);
      res.status(200).json(successResponse('Product deleted successfully'));
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
