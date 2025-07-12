import { Router } from 'express';
import { registerUser } from '../../services/auth/auth.service';
import { DuplicateEmailError, DuplicateUsernameError } from '../../errors/register.errors';

const register = Router();

register.post('/register', async (req, res) => {
  const { email, password, lastName, firstName, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { user, token } = await registerUser({ email, password, firstName, lastName, username });

    if (!user || !token) {
      return res.status(500).json({ message: 'Malformed registration data' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.status(201).json({ user });

  } catch (err: any) {
    const isDuplicateEmail = err instanceof DuplicateEmailError || err.name === 'DuplicateEmailError';
    const isDuplicateUsername = err instanceof DuplicateUsernameError || err.name === 'DuplicateUsernameError';

    if (isDuplicateEmail || isDuplicateUsername) {
      return res.status(409).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Unexpected error' });
  }
});

export default register;
