import bcrypt from 'bcrypt';
import { db } from '../db/knex';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

interface RegisterPayload {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  username: string;
}

export async function registerUser({
  email,
  password,
  lastName,
  firstName,
  username,
  }: RegisterPayload): Promise<User> {
   const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

  

  interface InsertUserPayload {
    id: string;
    email: string;
    password: string;
    last_name: string;
    first_name: string;
    username: string;
  }

  interface ReturnedUser {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    password: string;
  }

  return await db.transaction(async (trx): Promise<User> => {
        const [user]: ReturnedUser[] = await trx<InsertUserPayload>('users')
                .insert({
                        id,
                        email,
                        password: hashedPassword,
                        last_name: lastName,
                        first_name: firstName,
                        username,
                })
                .returning([
                        'id',
                        'email',
                        'username',
                        'first_name',
                        'last_name',
                        'created_at',
                        'updated_at',
                        'password',
                ]);

        return user;
  });
}


export async function loginUser(email: string, password: string): Promise<User | null> {
  const user = await db<User>('users').where({ email }).first();
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
