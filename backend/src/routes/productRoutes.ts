// src/routes/productRoutes.ts
// Routes untuk product endpoints

import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import {
  createProductSchema,
  updateProductSchema,
} from '../validators/product';

const router = Router();

// Public routes
router.get('/', productController.getAllProducts.bind(productController));
router.get(
  '/category',
  productController.getProductsByCategory.bind(productController)
);
router.get('/:id', productController.getProductById.bind(productController));

// Protected routes
router.post(
  '/',
  authMiddleware,
  validateRequest(createProductSchema),
  productController.createProduct.bind(productController)
);

router.patch(
  '/:id',
  authMiddleware,
  validateRequest(updateProductSchema),
  productController.updateProduct.bind(productController)
);

router.delete(
  '/:id',
  authMiddleware,
  productController.deleteProduct.bind(productController)
);

export default router;
