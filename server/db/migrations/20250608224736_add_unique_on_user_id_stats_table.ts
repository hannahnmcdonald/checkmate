import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_stats', (table) => {
    table.unique(['user_id'], 'user_stats_user_id_unique');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_stats', (table) => {
    table.dropUnique(['user_id'], 'user_stats_user_id_unique');
  });
}
