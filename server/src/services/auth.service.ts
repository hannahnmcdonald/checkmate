import bcrypt from 'bcrypt';
import { pool } from '../utils/db';
import { User } from '../models/user.model';

const SALT_ROUNDS = 10;

export const registerUser = async (email: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};