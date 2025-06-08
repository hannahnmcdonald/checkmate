import { Knex } from 'knex';
import { useDb } from '../repoHelper';
import { User, InsertUserPayload } from '../../models/user.model';

/**
 * User repository for managing user data in the database.
 * Provides methods to find users by email and insert new users.
 */
export async function findUserByEmail(
  email: string,
  trx?: Knex.Transaction
): Promise<User | null> {
  const user = await useDb(trx)<User>('users').where({ email }).first();
  console.log('findUserByEmail', user)
  return user ?? null;
}

/**
 * Inserts a new user into the database.
 * @param user - The user data to insert.
 * @param trx - Optional transaction for database operations.
 * @returns The created user object.
 */
export async function insertUser(
  user: InsertUserPayload,
  trx: Knex.Transaction
): Promise<User> {
  try {
    const [createdUser] = await useDb(trx)<InsertUserPayload>('users')
    .insert(user)
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
  return createdUser as User;
  } catch (error) {
    console.log(error)
    throw error;
  }
  
}

export async function findUserByUsername(
  username: string,
  trx?: Knex.Transaction
): Promise<User | null> {
  const user = await useDb(trx)<User>('users').where({ username }).first();
  return user ?? null;
}

