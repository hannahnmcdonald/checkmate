import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Missing auth token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}