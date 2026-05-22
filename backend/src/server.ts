// src/server.ts
// Entry point untuk Express server

import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// ─── Security Middleware ─────────────────────────────────────────────────
app.use(helmet());

// ─── CORS Configuration ──────────────────────────────────────────────────
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Rate Limiting ───────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// ─── Body Parser Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── Error Handling ─────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Server Startup ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ API documentation: http://localhost:${PORT}/api`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
});
