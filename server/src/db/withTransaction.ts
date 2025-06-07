import { db } from './knex';
import { Knex } from 'knex';

export async function withTransaction<T>(
  callback: (trx: Knex.Transaction) => Promise<T>
): Promise<T> {
  return await db.transaction(async (trx) => {
    try {
      return await callback(trx);
    } catch (err) {
      console.error('withTransaction error:', err);
      throw err;
    }
  });
}

