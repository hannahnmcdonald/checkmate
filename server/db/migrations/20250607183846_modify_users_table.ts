import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.dropColumn('friends');
    table.dropColumn('games');
    table.dropColumn('wins');
    table.dropColumn('losses');
    table.dropColumn('tie');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.specificType('friends', 'uuid[]');
    table.specificType('games', 'uuid[]');
    table.jsonb('wins');
    table.jsonb('losses');
    table.jsonb('tie');
  });
}