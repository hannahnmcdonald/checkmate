import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    // Ensure uuid extension is available
    await trx.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // 1. Add new UUID column
    await trx.schema.table('users', (table) => {
      table.uuid('new_id').defaultTo(knex.raw('uuid_generate_v4()'));
    });

    // 2. Populate the UUID column
    await trx.raw('UPDATE users SET new_id = uuid_generate_v4()');

    // 3. Drop existing primary key constraint
    await trx.schema.alterTable('users', (table) => {
      table.dropPrimary();
    });

    // 4. Drop old id column
    await trx.schema.table('users', (table) => {
      table.dropColumn('id');
    });

    // 5. Rename new_id to id
    await trx.schema.table('users', (table) => {
      table.renameColumn('new_id', 'id');
    });

    // 6. Set new id as primary key
    await trx.schema.alterTable('users', (table) => {
      table.primary(['id']);
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    // 1. Add old id column back as integer
    await trx.schema.table('users', (table) => {
      table.increments('old_id'); // automatically sets as SERIAL
    });

    // 2. Populate it with row numbers (approximate rollback)
    await trx.raw(`
      WITH numbered AS (
        SELECT ctid, ROW_NUMBER() OVER () AS rn
        FROM users
      )
      UPDATE users
      SET old_id = numbered.rn
      FROM numbered
      WHERE users.ctid = numbered.ctid
    `);

    // 3. Drop primary key on uuid
    await trx.schema.alterTable('users', (table) => {
      table.dropPrimary();
    });

    // 4. Drop uuid column
    await trx.schema.table('users', (table) => {
      table.dropColumn('id');
    });

    // 5. Rename old_id to id and restore primary key
    await trx.schema.table('users', (table) => {
      table.renameColumn('old_id', 'id');
    });

    await trx.schema.alterTable('users', (table) => {
      table.primary(['id']);
    });
  });
}
