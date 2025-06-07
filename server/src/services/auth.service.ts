// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import { insertUser, findUserByEmail } from '../db/repos/userRepo';
import { withTransaction } from '../db/withTransaction';

interface RegisterPayload {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  username: string;
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const id = uuidv4();

  return withTransaction(async (trx) => {
    const user = await insertUser({
      id,
      email: payload.email,
      password: hashedPassword,
      first_name: payload.firstName,
      last_name: payload.lastName,
      username: payload.username,
    }, trx);

    // e.g., audit log insert or welcome email queue could go here

    return user;
  });
}

// TODO: add email validation and uniqueness check

export async function loginUser(email: string, password: string): Promise<User | null> {
  return withTransaction(async (trx) => {
    const user = await findUserByEmail(email, trx);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  });
}
