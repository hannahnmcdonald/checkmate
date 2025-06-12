import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('password_resets', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('token').notNullable().unique();
        table.timestamp('expires_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('password_resets');
}
