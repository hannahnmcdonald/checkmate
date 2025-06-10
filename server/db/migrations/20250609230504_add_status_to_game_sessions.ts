import { Knex } from 'knex';

export async function up(knex: Knex) {

    await knex.schema.alterTable('game_sessions', (table) => {
        table
            .enum('status', ['pending', 'in_progress', 'completed'])
            .notNullable()
            .defaultTo('pending');
    });
}

export async function down(knex: Knex) {
    await knex.schema.alterTable('game_sessions', (table) => {
        table.dropColumn('status');
    });
}
