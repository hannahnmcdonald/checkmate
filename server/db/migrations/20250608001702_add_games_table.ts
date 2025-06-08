import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_games', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('game_id').notNullable(); // BGG game id or similar
    table.enum('category', ['wishlist', 'collection']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'game_id', 'category']); // prevent duplicate wishlist/collection entries
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_games');
}