// routes/protected.route.ts
import { Router } from 'express';
import { authenticateJWT } from '../../middleware/authMiddleware';

const protectedRoute = Router();

protectedRoute.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated!',
    user: req.user, // contains decoded JWT payload
  });
});

export default protectedRoute;
