// Migration for new tables: friendships, game_sessions, user_game_session, user_stats (ESM + TypeScript)

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Friendships table
  await knex.schema.createTable('friendships', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('friend_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('status').notNullable(); // 'pending', 'accepted', 'blocked'
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'friend_id']);
  });

  // Game sessions table
  await knex.schema.createTable('game_sessions', (table) => {
    table.uuid('id').primary();
    table.string('game_id').notNullable(); // from BoardGameGeek
    table.timestamp('started_at').defaultTo(knex.fn.now());
    table.timestamp('ended_at');
    table.string('result'); // 'win', 'tie', 'loss', 'draw'
  });

  // User game session table
  await knex.schema.createTable('user_game_session', (table) => {
    table.uuid('id').primary();
    table.uuid('session_id').notNullable().references('id').inTable('game_sessions').onDelete('CASCADE');
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('result'); // 'win', 'loss', 'tie', etc.
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // User stats table
  await knex.schema.createTable('user_stats', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('wins').defaultTo(0);
    table.integer('losses').defaultTo(0);
    table.integer('ties').defaultTo(0);
    table.decimal('draws', null).defaultTo(0);
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_stats');
  await knex.schema.dropTableIfExists('user_game_session');
  await knex.schema.dropTableIfExists('game_sessions');
  await knex.schema.dropTableIfExists('friendships');
}
