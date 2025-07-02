// src/middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  console.log("JWT Middleware running");
  console.log('cookies:', req.cookies);
  console.log('auth header:', req.headers.authorization);

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  const token = req.cookies?.token || bearerToken;
  console.log('Extracted token:', token);
  console.log("Raw token:", JSON.stringify(token));
  console.log("Is valid JWT:", typeof token === 'string' && token.split('.').length === 3);

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('DECODED:', decoded)
    req.user = decoded;
    console.log('middleware', req.user)
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(403).json({ message: 'Invalid token' });
  }
}

export const protectedRoute = authenticateJWT;