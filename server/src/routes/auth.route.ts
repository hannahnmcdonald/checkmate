import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await registerUser(email, password);
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
