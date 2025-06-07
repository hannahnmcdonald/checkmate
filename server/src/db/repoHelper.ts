// src/db/repoHelper.ts
import { db } from './knex';
import { Knex } from 'knex';

/**
 * Ensures that a Knex query is executed with either a transaction or default db.
 */
export function useDb(trx?: Knex.Transaction): Knex {
  return trx ?? db;
}