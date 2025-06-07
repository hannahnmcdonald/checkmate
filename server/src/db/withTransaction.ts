// src/db/withTransaction.ts
import { db } from './knex';
import { Knex } from 'knex';

export async function withTransaction<T>(
  callback: (trx: Knex.Transaction) => Promise<T>
): Promise<T> {
  return await db.transaction(async (trx) => {
    try {
      const result = await callback(trx);
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  });
}
