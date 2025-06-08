import { Router } from 'express';
import { loginUser } from '../../services/auth/auth.service';
import { signAccessToken } from '../../services/auth/jwt.service';

const login = Router();

login.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { user, token, id, email: userEmail } = result;

    if (!user || !token || !id) {
      return res.status(500).json({ message: 'Malformed user data' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hr
    });

    return res.status(200).json({
      message: 'Login successful',
      user,
      id,
      email: userEmail,
    });
  } catch (err) {
    console.error('Login route error:', err);
    return res.status(500).json({ message: 'Unexpected error during login' });
  }
});

export default login;
