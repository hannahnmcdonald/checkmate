import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_game_session');
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_game_session', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.uuid('session_id').notNullable();
        table.enum('result', ['win', 'loss', 'tie']);
        table.timestamps(true, true);
    });
}
