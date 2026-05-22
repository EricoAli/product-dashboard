// src/controllers/authController.ts
// Controller untuk handling auth requests

import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { successResponse } from '../utils/response';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(
        successResponse('User registered successfully', result)
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(successResponse('Login successful', result));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
