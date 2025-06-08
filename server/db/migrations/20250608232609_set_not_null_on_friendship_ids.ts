import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (table) => {
    table.uuid('user_id_1').notNullable().alter();
    table.uuid('user_id_2').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (table) => {
    table.uuid('user_id_1').nullable().alter();
    table.uuid('user_id_2').nullable().alter();
  });
}
