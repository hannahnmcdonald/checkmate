import { Router } from 'express';
import { registerUser } from '../../services/auth.service';

const register = Router();

register.post('/register', async (req, res) => {
  const { email, password, lastName, firstName, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await registerUser({email, password, lastName, firstName, username});
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

export default register;
