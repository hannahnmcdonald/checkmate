import { Router } from 'express';
import { loginUser } from '../../services/auth.service';
import { signAccessToken } from '../../services/authentication/jwt.service';

const login = Router();

login.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signAccessToken({ id: user.id, email: user.email });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  return res.status(200).json({ message: 'Login successful' });
});

export default login;
