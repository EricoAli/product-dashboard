// src/routes/authRoutes.ts
// Routes untuk authentication endpoints

import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middleware/validation';
import { registerSchema, loginSchema } from '../validators/auth';

const router = Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  authController.register.bind(authController)
);

router.post(
  '/login',
  validateRequest(loginSchema),
  authController.login.bind(authController)
);

export default router;
