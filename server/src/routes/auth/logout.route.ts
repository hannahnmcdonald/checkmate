import { Router } from 'express';
import { authenticateJWT } from '../../middleware/authMiddleware';

const logout = Router();

logout.post('/logout', authenticateJWT, async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

export default logout;