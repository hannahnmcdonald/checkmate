import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create enum types (safe if not already existing)
  await knex.raw(`CREATE TYPE friendship_status AS ENUM ('accepted', 'pending', 'blocked')`);
  await knex.raw(`CREATE TYPE game_result AS ENUM ('win', 'tie', 'loss', 'draw')`);

  // Alter friendships.status to use the new enum
  await knex.schema.alterTable('friendships', (table) => {
    table
      .specificType('status', 'friendship_status')
      .notNullable()
      .defaultTo('pending')
      .alter();
  });

  // Alter game_sessions.result
  await knex.schema.alterTable('game_sessions', (table) => {
    table
      .specificType('result', 'game_result')
      .alter();
  });

  // Alter user_game_session.result
  await knex.schema.alterTable('user_game_session', (table) => {
    table
      .specificType('result', 'game_result')
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (table) => {
    table.string('status').alter();
  });

  await knex.schema.alterTable('game_sessions', (table) => {
    table.string('result').alter();
  });

  await knex.schema.alterTable('user_game_session', (table) => {
    table.string('result').alter();
  });

  await knex.raw('DROP TYPE IF EXISTS friendship_status');
  await knex.raw('DROP TYPE IF EXISTS game_result');
}
